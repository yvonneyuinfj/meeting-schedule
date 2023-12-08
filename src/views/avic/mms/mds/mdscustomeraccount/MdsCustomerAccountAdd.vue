<template>
  <AvicModal
    :visible="true"
    title="添加"
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
            <a-form-item name="taxRegNo" label="纳税登记号" has-feedback>
              <a-input
                v-model:value="form.taxRegNo"
                :maxLength="64"
                placeholder="请输入纳税登记号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="bank" label="开户行" has-feedback>
              <a-input
                v-model:value="form.bank"
                :maxLength="512"
                placeholder="请输入开户行"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="bankName" label="开户行名称" has-feedback>
              <a-input
                v-model:value="form.bankName"
                :maxLength="1024"
                placeholder="请输入开户行名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accountNo" label="银行帐号" has-feedback>
              <a-input
                v-model:value="form.accountNo"
                :maxLength="128"
                placeholder="请输入银行帐号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accountName" label="账户名称" has-feedback>
              <a-input
                v-model:value="form.accountName"
                :maxLength="512"
                placeholder="请输入账户名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accountAttribute" label="账户性质" has-feedback>
              <a-select
                v-model:value="form.accountAttribute"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择账户性质"
              >
                <a-select-option
                  v-for="item in accountAttributeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accountAddress" label="开户行地址" has-feedback>
              <a-input
                v-model:value="form.accountAddress"
                :maxLength="1024"
                placeholder="请输入开户行地址"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynDefaul" label="默认账户">
              <a-select
                v-model:value="form.ynDefaul"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择默认账户"
              >
                <a-select-option
                  v-for="item in ynDefaulList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="3000"
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
import { useMdsCustomerAccountForm, emits } from './ts/MdsCustomerAccountForm'; // 引入表单ts
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
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  accountAttributeList,
  ynDefaulList,
  saveForm,
  closeModal
} = useMdsCustomerAccountForm({
  props: props,
  emit: emit
});
</script>
