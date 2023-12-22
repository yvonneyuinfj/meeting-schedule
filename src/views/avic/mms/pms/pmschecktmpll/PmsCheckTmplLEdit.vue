<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsCheckItemId" label="检验项目">
              <AvicModalSelect
                v-model:value="form.pmsCheckItemId"
                title="选择检验项目"
                placeholder="请选择检验项目"
                valueField="id"
                showField="checkItemName"
                :selectComponent="pmsCheckItemSelectComponent"
                :defaultShowValue="form.pmsCheckItemIdAlias"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="chkUserId" label="检验人">
              <AvicCommonSelect
                v-model:value="form.chkUserId"
                type="userSelect"
                placeholder="请选择检验人"
                :defaultShowValue="form.chkUserIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="chkDeptId" label="检验部门">
              <AvicCommonSelect
                v-model:value="form.chkDeptId"
                type="deptSelect"
                placeholder="请选择检验部门"
                :defaultShowValue="form.chkDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkLevel" label="检验标准">
              <a-input
                v-model:value="form.checkLevel"
                :maxLength="1024"
                placeholder="请输入检验标准"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isKeyItem" label="是否关键项目">
              <a-select
                v-model:value="form.isKeyItem"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否关键项目"
              >
                <a-select-option
                  v-for="item in isKeyItemList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              name="remark"
              label="备注"
            >
              <a-textarea
                v-model:value="form.remark"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入备注"
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
  </AvicModal>
</template>
<script lang="ts" setup>
import { usePmsCheckTmplLForm, emits } from './ts/PmsCheckTmplLForm'; // 引入表单ts
import pmsCheckItemSelect from '@/views/avic/mms/pms/pmscheckitem/PmsCheckItemSelect.vue'; // 引入弹窗选择页
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
    type: String,
    default: ''
  }

});
const emit = defineEmits(emits);
const pmsCheckItemSelectComponent= pmsCheckItemSelect;// 自定义选择
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  isKeyItemList,
  saveForm,
  closeModal
} = usePmsCheckTmplLForm({
  props: props,
  emit: emit
});
</script>

