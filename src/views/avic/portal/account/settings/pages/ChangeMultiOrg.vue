<template>
  <div class="currentOrg avic-base-form">
    <div class="basic-title">切换组织</div>
    <a-form layout="horizontal" ref="formRef" v-bind="layout">
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="组织">
            <a-select
              style="width: 300px"
              :value="multiOrg.currentOrg.orgName"
              @change="switchOrg"
              @focus="getNewOrg"
            >
              <a-select-option v-for="item in multiOrg.orgList" :key="item.id" :value="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="部门">
            <a-select
              style="width: 300px"
              :value="userDept.currentDept.currentDeptName"
              @change="switchIdentity"
              @focus="getNewDept"
              :disabled="loading"
            >
              <a-select-option v-for="item in userDept.deptList" :key="item.id" :value="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row>
      <a-col v-bind="formColLayout.cols">
        <a-button
          type="primary"
          title="保存"
          @click="saveOrg"
          style="margin-right: 8px; margin-left: 140px"
        >
          <template #icon>
            <save-outlined />
          </template>
          保存
        </a-button>
        <a-button
          title="重置"
          type="primary"
          ghost
          @click="cancelSetMultiorg"
          :disabled="!isDataChange"
        >
          <template #icon>
            <reload-outlined />
          </template>
          重置
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import {
  changeOrgDept,
  getCurrentMultiOrgInfo,
  getorgDept,
  getOrgList
} from '@/api/avic/system/UserSettingApi';
import NProgress from 'nprogress';
import type { FormInstance } from 'ant-design-vue';
import { useUserStore } from '@/store/user';

NProgress.configure({ showSpinner: false });
const { proxy } = getCurrentInstance();
const userStore = useUserStore();
const layout = {
  labelCol: { flex: '0 0 140px' },
  wrapperCol: { flex: '1 1 0' }
};
const publicPath = '/appsys/user/multiorg';
const formColLayout = proxy.$colLayout2;
const formRef = ref<FormInstance>();
const initOrgName = ref<string>('');
const initDeptName = ref<string>('');
const loading = ref<boolean>(false);
const isDefault = ref<boolean>(true);
const clickDeptSelect = ref<boolean>(false);
const orgId = ref<string>('');
const isDataChange = ref<boolean>(false);
const selected = {
  orgName: null,
  deptName: null
};
const userDept = reactive({
  currentDept: {
    currentDeptName: null,
    currentDeptId: null
  },
  isNewFirst: true,
  deptList: []
});
const multiOrg = reactive({
  currentOrg: {
    orgName: null,
    currentOrgId: null
  },
  orgList: [],
  reqOrgId: null
});
const reqConfig = {
  current: {
    url: publicPath + '/current'
  },
  orgList: {
    url: publicPath + '/list/org'
  },
  orgDept: {
    url: publicPath + '/list/dept/'
  },
  changeOrg: {
    url: publicPath + '/change',
    method: 'post',
    params: { orgId: null, deptId: null, appId: proxy.$settings.appId }
  }
};

onMounted(() => {
  currentMultiOrg();
});
/**
 * 获取用户当前身份多组织
 */
function currentMultiOrg() {
  getCurrentMultiOrgInfo().then((res: any) => {
    if (res.code === '500') {
      proxy.$message.error(res.message.toString());
    } else {
      userDept.currentDept.currentDeptName = res.data.currentDeptName;
      userDept.currentDept.currentDeptId = res.data.currentDeptId;
      multiOrg.currentOrg.orgName = res.data.currentOrgName;
      multiOrg.currentOrg.currentOrgId = res.data.currentOrgId;
      initOrgName.value = res.data.currentOrgName;
      initDeptName.value = res.data.currentDeptName; // 记录表单初始化数据
    }
  });
}
/**
 * 组织信息切换
 */
function switchOrg(v, l) {
  isDataChange.value = true;
  orgId.value = l.key;
  multiOrg.currentOrg.orgName = v;
  multiOrg.currentOrg.currentOrgId = l.key;
  selected.orgName = v;
  //为防止网络延迟大，请求初始禁用下面选择框
  loading.value = true;
  getorgDept(orgId.value).then(res => {
    //有数据相应，激活选择框
    loading.value = false;
    //组织下没有部门的情况
    if (res.data.length === 0) {
      userDept.deptList = [];
      reqConfig.changeOrg.params.deptId = null;
      userDept.currentDept.currentDeptName = '';
      userDept.currentDept.currentDeptId = null;
    } else {
      userDept.deptList = res.data;
      let isHasTrue = false;
      if (userDept.deptList.length > 0) {
        userDept.deptList.map(item => {
          if (item.current === 'true') {
            isHasTrue = true;
            userDept.currentDept.currentDeptName = item.name;
            userDept.currentDept.currentDeptId = item.id;
          }
        });
        //初始化选中的部门
        if (!isHasTrue) {
          userDept.currentDept.currentDeptName = userDept.deptList[0].name;
          userDept.currentDept.currentDeptId = userDept.deptList[0].id;
        }
      }
    }
    reqConfig.changeOrg.params.orgId = orgId;
    isDefault.value = false;
    clickDeptSelect.value = false; //部门是否选择过设置为否
  });
}

function requstDeptMethod(arg) {
  getorgDept(arg).then(res => {
    loading.value = false;
    userDept.deptList = res.data;
    if (userDept.deptList.length > 0) {
      userDept.deptList.map(item => {
        if (item.current === 'true') {
          userDept.currentDept.currentDeptName = item.name;
          userDept.currentDept.currentDeptId = item.id;
        }
      });
    }
  });
}
function getNewDept() {
  if (isDefault) {
    requstDeptMethod(multiOrg.currentOrg.currentOrgId);
  } else {
    if (userDept.isNewFirst) {
      requstDeptMethod(orgId);
    }
  }
}
/**
 * 获取多组织
 */
function getNewOrg() {
  if (multiOrg.orgList.length > 0) return;
  getOrgList()
    .then(res => {
      multiOrg.orgList = res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
/**
 * 当切换部门信息时触发
 */
function switchIdentity(value, node) {
  isDataChange.value = true;
  clickDeptSelect.value = true;
  reqConfig.changeOrg.params.orgId = orgId;
  reqConfig.changeOrg.params.deptId = node.key; //部门信息保存到提交参数中
  userDept.currentDept.currentDeptId = node.key; //部门信息保存到用户页面中
  userDept.currentDept.currentDeptName = value;
  selected.deptName = value;
}
function saveOrg() {
  proxy.$confirm({
    title: '提示',
    content: '确定要切换到当前选中的身份吗？',
    closable: true,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      setMultiOrg();
    },
    onCancel() {}
  });
}
/**
 * 发送切换后的组织和部门信息，切换组织
 */
function setMultiOrg() {
  reqConfig.changeOrg.params.deptId = userDept.currentDept.currentDeptId;
  reqConfig.changeOrg.params.orgId = multiOrg.currentOrg.currentOrgId;

  changeOrgDept(reqConfig.changeOrg.params)
    .then((res: any) => {
      if (res.code === '500') {
        proxy.$message.error(res.message.toString());
      } else if (res.code === '200') {
        isDataChange.value = false;
        userStore.SET_TOKEN(res.data);
        NProgress.start();
        userStore.GENERATE_ROUTES_DYNAMIC();
        NProgress.done();
        proxy.$message.success('切换身份成功！');
        window.location.reload();
      }
    })
    .catch(err => {
      proxy.$message.error('切换身份失败！', err);
    });
}
/**
 * 重置
 */
function cancelSetMultiorg() {
  currentMultiOrg();
  formRef.value.resetFields();
  isDataChange.value = false;
}
</script>
<style lang="less" scoped>
.currentOrg {
  height: calc(100vh - 160px);
  overflow: auto;
}
.basic-title {
  padding: 20px;
  font-size: 16px;
}
</style>
