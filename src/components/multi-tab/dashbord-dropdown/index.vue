<template>
  <div class="dropdown-box">
    <a-dropdown v-model:visible="visible" placement="bottomLeft">
      <div class="ant-dropdown-link">
        <avic-icon class="menu-icon" v-if="tabInfo.icon" :svg="tabInfo.icon" />
        {{ tabInfo.tabTitle ? t(`${tabInfo.tabTitle}`) : t(`${tabInfo.route.meta.title}`) }}
      </div>
      <template #overlay>
        <a-menu>
          <a-radio-group
            name="radioGroup"
            v-model:value="radioValue"
            @change="onChange"
            button-style="solid"
          >
            <a-menu-item class="tabs-drop-item">
              <!-- <ul>
                <li > -->
              <a-radio
                :style="{ display: 'block' }"
                :value="tim.id"
                v-for="(tim, i) in userPortalList"
                :key="'portletName-' + i"
              >
                <span style="display: flex; align-items: center">
                  <!-- <avic-icon class="check" svg="avic-check-fill" /> -->
                  <avic-icon svg="avic-checkbox-circle-fill" class="check" />
                  <span
                    class="tabs-drop-item-span"
                    :title="tim.portletName"
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      width: 120px;
                      white-space: nowrap;
                    "
                  >
                    {{ tim.portletName }}
                  </span>
                  <avic-icon svg="avic-edit-line" class="setting" @click="handleSetting(tim)" />
                </span>
              </a-radio>
              <!-- <setting-outlined
                    class="setting theme-main-hover-color"
                   
                  /> -->

              <!-- </li>
              </ul> -->
            </a-menu-item>
            <a-menu-item class="drop-item-plus" style="padding: 0">
              <a-button @click="handleOpenModal()" type="link" block>
                <avic-icon svg="PlusOutlined" style="margin-right: 4px" />
                添加首页
              </a-button>
            </a-menu-item>
          </a-radio-group>
        </a-menu>
      </template>
    </a-dropdown>
    <a-modal title="添加" :visible="modalVisible" @ok="handleOk" @cancel="handleCancel">
      <a-form>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" label="首页名称">
          <a-input v-model:value="portalName" :maxlength="200" placeholder="请输入首页名称" />
        </a-form-item>
      </a-form>
    </a-modal>
    <portal-designer-modal
      v-if="showDesignerModal"
      ref="portalDesignRefName"
      :portalInfo="portalInfo"
      @closeModal="handeleCloseDesigner"
      @updatePortalList="updatePortalList"
      @reloadData="reloadData"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store/app';
import PortalDesignerModal from '@/components/portal-designer/PortalDesignModal.vue';
import {
  savePortalInfo,
  updatePortalConfig,
  getUserPortal,
  getPortletContentById
} from '@/api/avic/system/PortalApi';
const appStore = useAppStore();
const { proxy } = getCurrentInstance();
defineProps({
  tabInfo: {
    type: Object,
    default: () => {}
  }
});

const visible = ref(false), //Dropdown 显隐控制
  modalVisible = ref(false), //添加首页名称弹窗显隐控制
  radioValue = ref(),
  userPortalList = ref([]), //用户首页配置列表
  showDesignerModal = ref(false),
  portalInfo = ref(),
  portalName = ref(),
  portalDesign = ref();
onMounted(() => {
  getPortalList();
});

const { t } = useI18n();
const portalDesignId = computed(() => appStore.portalDesign);

/** 用户首页配置列表数据初始化和刷新**/
async function getPortalList() {
  const res = await getUserPortal();
  if (res.code === '200') {
    userPortalList.value = res.data;
  }
  radioValue.value = userPortalList.value.find(
    item => item.isDefault === '1' //系统默认
  )?.id;
  portalDesign.value = radioValue.value;
  // 用户首次登陆系统，需要初始化 或者 删除时需要更新
  if (!portalDesignId.value || portalDesignId.value != portalDesign.value) {
    appStore.SET_PORTAL_DESIGN(portalDesign.value);
  }
}

/** 点击radio设置默认状态**/
function onChange(e) {
  let value = e.target.value;
  const params = { id: value, isDefault: 1 };
  updatePortalConfig(params).then(res => {
    if (res.data) {
      radioValue.value = value;
      //保存个性化配置数据
      portalDesign.value = radioValue.value;
      appStore.SET_PORTAL_DESIGN(portalDesign.value);
      proxy.$message.success('设置成功');
    } else {
      proxy.$message.success('设置失败');
    }
  });
}

/**点击设置打开首页布局设置弹窗 **/
function handleSetting(record) {
  visible.value = false; // 隐藏下拉菜单
  modalVisible.value = false;
  getPortletContentByIds(record);
}

/**根据portlet id 获取content内容**/
function getPortletContentByIds(record) {
  if (!record.id) return;
  getPortletContentById(record.id).then(res => {
    if (res.data) {
      const result = {
        ...res,
        content: JSON.parse(res.data.content),
        ...record
      };
      portalInfo.value = result;
      showDesignerModal.value = true;
    }
  });
}

/**打开添加弹窗**/
function handleOpenModal() {
  visible.value = false;
  portalName.value = ''; // 清空添加弹窗表单
  modalVisible.value = true;
}

/** 请求接口保存首页名称 **/
function handleOk() {
  if (portalName.value != '') {
    modalVisible.value = false;
    savePortalInfo({ portletName: portalName.value }).then(res => {
      if (res.data) {
        modalVisible.value = false;
        let result = {
          id: res.data,
          portletName: portalName.value,
          content: null
        };
        portalInfo.value = result;
        showDesignerModal.value = true;
        getPortalList(); //保存成功更新列表
        handleSetting(result);
        proxy.$message.success('保存成功');
      }
    });
  }
}

/**首页弹窗添加取消操作 **/
function handleCancel() {
  modalVisible.value = false;
}

function handeleCloseDesigner() {
  showDesignerModal.value = false;
}

/** 删除操作更新tabsDropRefName列表*/
function updatePortalList() {
  getPortalList();
}
/** 重新加载数据 */
function reloadData(portalId) {
  getPortalList();
  console.log('portalId', portalId);
  // 加时间戳便于更新dashbord
  if (portalId == radioValue.value) {
    const timeStamp = new Date().getTime();
    portalDesign.value = radioValue.value + '_' + timeStamp;
    appStore.SET_PORTAL_DESIGN(portalDesign.value);
  }
}
</script>

<style lang="less" scoped>
.ant-dropdown-link {
  padding: 0 16px;
}
:deep(.ant-dropdown-menu-item.tabs-drop-item) {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 320px;
  padding: 0;
  overflow: auto;
  border-bottom: 1px solid @border-color-split;
  &:hover {
    background: transparent;
  }
  span.ant-radio + * {
    padding: 0;
  }
}
:deep(.ant-radio-wrapper) {
  width: 180px;
  margin: 0 4px;
  padding: 4px 8px;
  border-radius: 4px;
  .check {
    margin-right: 4px;
    color: #fff;
    font-size: 1.2em;
    .svg-icon {
      vertical-align: -0.125em;
    }
  }
  .setting {
    margin: 0 4px 0 auto;
    color: #fff;

    .svg-icon {
      vertical-align: -0.125em;
    }
  }
  &:hover {
    background: @label-background;
    .check {
      color: @label-background;
    }
    .setting {
      color: @text-color-secondary;
    }
  }
  .ant-radio {
    display: none;
  }
  &::after {
    display: none;
    height: 0;
  }
}
.ant-radio-wrapper-checked {
  color: @primary-color;
  background: @primary-1;

  .check,
  .setting {
    color: @primary-color;
  }
  &:hover {
    background: @primary-1;
    .check {
      color: @primary-color;
    }
    .setting {
      color: @primary-color;
    }
  }
}
// .drop-item-plus {
//   padding: 4px 10px;
//   text-align: center;
//   // background-color: #fbfbfb;
//   color: @primary-color;
//   cursor: pointer;
// }
// .drop-item-plus-content {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
// }

// .drop-item-plus i {
//   margin-right: 8px;
// }

/*  首页设置配置 by mzy 2020-0528 end */
</style>
