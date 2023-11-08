<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="800px"
    height="320px"
    :centered="true"
    :maskClosable="false"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="processType" label="类型" has-feedback>
              <a-select
                v-model:value="form.processType"
                option-filter-prop="children"
                allow-clear
                placeholder="请选择类型"
              >
                <a-select-option
                  v-for="item in processTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="form.processType == '0'">
            <a-form-item name="processName" label="流程名称" has-feedback>
              <a-input v-model:value="form.processIds" style="display: none" />
              <a-input
                v-model:value="form.processName"
                placeholder="请选择流程"
                @click="openDelegationScopeModal()"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="value" label="审批意见" has-feedback>
              <a-textarea
                v-model:value="form.value"
                :rows="2"
                placeholder="请输入审批意见"
                show-count
                :maxlength="30"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
    <DelegationScope
      @sendSelectedFlow="sendSelectedFlow"
      :parentItem="parentItem"
      v-if="showScopeModal"
      @close="showScopeModal = false"
    />
  </AvicModal>
</template>
<script lang="ts" setup>
import DelegationScope from '@/views/avic/bpm/bpmprocessdelegation/DelegationScope.vue';
import { insertOrUpdateApprovalOptionList } from '@/api/avic/system/UserSettingApi';
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
const emit = defineEmits(['close', 'reloadData', 'getUnreadCount']);
const formRef = ref<FormInstance>();
const { proxy }: any = getCurrentInstance();
let state = reactive({
  form: {
    processIds: '',
    processType: null,
    value: '',
    processName: ''
  },
  loading: false,
  showScopeModal: false,
  parentItem: {
    id: 0,
    modelId: '',
    modelName: '',
    workHandType: '',
    receptUserId: '',
    receptUserName: ''
  }
});
let { form, loading, showScopeModal, parentItem } = toRefs(state);
let layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const rules: Record<string, Rule[]> = {
    processType: [
      { required: true, message: '请选择类型！' },
      { max: 200, trigger: 'blur' }
    ],
    processName: [{ required: true, message: '请选择流程！', trigger: ['blur', 'change'] }],
    value: [{ required: true, message: '请输入审批意见！' }]
  },
  processTypeList = [
    {
      sysLookupTlId: '1',
      lookupCode: '1',
      lookupName: '全部'
    },
    {
      sysLookupTlId: '0',
      lookupCode: '0',
      lookupName: '自定义'
    }
  ];

const colLayout = proxy.$colLayout1; // 页面表单响应式布局对象

/**
 * 关闭窗口
 */
function closeModal() {
  emit('close');
}

/**
 * 保存
 */
function saveForm() {
  formRef.value.validate().then(() => {
    loading.value = true; // 按钮开启loading状态
    insertOrUpdateApprovalOptionList([form.value]).then((res: any) => {
      if (res.success) {
        saveLoadList();
        proxy.$message.success('保存成功！');
        // 保存成功后，记录提交成功次数
      } else {
        proxy.$message.error('保存失败！');
      }
    });
  });
}

/**
 * 保存成功后刷新数据
 */
function saveLoadList() {
  emit('reloadData', true); // 刷新表格
  emit('close');
}

/**
 * 拿到流程弹窗数据,渲染回自定义委托列表
 */
function sendSelectedFlow(params) {
  form.value.processName = params.data.modelNames;
  form.value.processIds = params.data.modelIds;
  formRef.value.validateFields(['processName']);
}
/**
 * 打开流程范围弹窗
 */
function openDelegationScopeModal() {
  showScopeModal.value = true;
}
</script>
