<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="800px"
    height="420px"
    :centered="true"
    :maskClosable="false"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout">
        <a-row>
          <a-col v-bind="colLayouts.cols">
            <a-form-item name="sysGroupName" label="群组名称" has-feedback>
              <a-input
                v-model:value="form.sysGroupName"
                placeholder="请输入群组名称"
                :disabled="disabled"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayouts.cols">
            <a-form-item name="orderBy" label="排序" has-feedback>
              <a-input
                v-model:value="form.orderBy"
                type="number"
                @change="onChange"
                placeholder="请输入排序"
                :disabled="disabled"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="群组成员" has-feedback>
              <AvicCommonSelect
                v-model:value="form.sysUserId"
                type="userSelect"
                select-model="multi"
                :defaultShowValue="form.sysUserName"
                placeholder="请选择群组成员"
                :disabled="disabled"
              />
            </a-form-item>
          </a-col> -->
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item label="分享成员" has-feedback>
              <AvicCommonSelect
                v-model:value="form.sharedUserId"
                :defaultShowValue="form.sharedUserName"
                type="userSelect"
                select-model="multi"
                placeholder="请选择分享成员"
                :disabled="disabled"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="群组描述" name="sysGroupDesc" has-feedback>
              <a-textarea
                v-model:value="form.sysGroupDesc"
                :rows="2"
                placeholder="请输入群组描述"
                :disabled="disabled"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button
        title="保存"
        type="primary"
        :disabled="disabled"
        :loading="loading"
        @click="saveForm"
      >
        保存
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import {
  insertOrUpdatePersonalGroupList,
  EditPersonalGroupUser
} from '@/api/avic/system/UserSettingApi';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
// import { useUserStore } from '@/store/user';
const emit = defineEmits(['close', 'reloadData', 'getUnreadCount']);
const props = defineProps({
  formId: {
    // 初始查询参数
    type: String,
    default: ''
  }
});
const { proxy }: any = getCurrentInstance();
// const userStore = useUserStore();
const formRef = ref<FormInstance>();
const colLayouts = proxy.$colLayout2; // 页面表单响应式布局对象
const colLayout = proxy.$colLayout1; // 页面表单响应式布局对象
let state = reactive({
  form: {
    sysGroupName: '',
    orderBy: '',
    // sysUserId: '',
    // sysUserName: '',
    // sharedUserId: '',
    // sharedUserName: '',
    sysGroupDesc: '',
    isShared: 'false'
  },
  loading: false
});
let { form, loading } = toRefs(state);
let layout = ref({
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
});
const rules: Record<string, Rule[]> = {
  sysGroupName: [
    { required: true, message: '请输入群组名称！' },
    { min: 0, max: 30, message: '最多可输入30个字符!', trigger: 'change' }
  ],
  orderBy: [
    { required: true, message: '请输入排序！' },
    { min: 0, max: 10, message: '最多可输入10个字符!', trigger: 'change' }
  ],
  sysGroupDesc: [{ min: 0, max: 50, message: '最多可输入50个字符!', trigger: 'change' }]
};

onMounted(() => {
  getPersonalGroupUser(props.formId);
});

const disabled = computed(() => {
  return form.value.isShared === 'true' ? true : false;
});

/**
 * 编辑详情页面加载数据
 * @param {String} id 行数据的id
 */
function getPersonalGroupUser(id) {
  loading.value = true;
  EditPersonalGroupUser(id)
    .then((res: any) => {
      if (res.success) {
        form.value = { ...res.data };
        loading.value = false;
      }
    })
    .catch(() => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}
/** 排序值效验 */
function onChange() {
  if (Number(form.value.orderBy) < 0) {
    form.value.orderBy = '0';
  }
}
/** 保存 */
function saveForm() {
  formRef.value.validate().then(() => {
    // const sharedUserId = form.value.sharedUserId.split(';');
    // if (sharedUserId.includes(userStore.currentUser.id)) {
    //   proxy.$message.warning('不能将自建群组分享给自己！');
    //   return;
    // }
    loading.value = true;
    insertOrUpdatePersonalGroupList([{ ...form.value }])
      .then((res: any) => {
        if (res.success) {
          saveLoadList();
          proxy.$message.success('保存成功！');
        } else {
          proxy.$message.error('保存失败！');
        }
      })
      .catch(err => {
        loading.value = false;
        proxy.$message.error(err.message);
      });
  });
}

/** 保存后刷新表格 */
function saveLoadList() {
  emit('reloadData', true);
  emit('close');
}

/** 关闭 */
function closeModal() {
  emit('close');
}
</script>
