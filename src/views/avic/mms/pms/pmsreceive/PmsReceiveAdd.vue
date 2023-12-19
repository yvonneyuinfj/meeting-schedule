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
            <a-form-item name="secretLevel" label="密级 " has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 "
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
            <a-form-item name="billNo" label="到货登记号 " has-feedback>
              <a-input
                v-model:value="form.billNo"
                :maxLength="128"
                placeholder="请输入到货登记号 "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorName" label="供应商" has-feedback>
              <a-select
                v-model:value="form.mdsVendorId"
                @change="vendorChange"
                placeholder="请选择供应商"
              >
                <a-select-option
                  v-for="item in vendorList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.inventoryName }}
                </a-select-option>
              </a-select>
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
import {usePmsReceiveForm, emits} from './ts/PmsReceiveForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  vendorList: {
    type: Object,
    default: null
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
  saveForm,
  closeModal
} = usePmsReceiveForm({
  props: props,
  emit: emit
});

function vendorChange(inventoryId) {
  let inventory = toRaw(props.vendorList.find(i => i.id === inventoryId));
  form.value.mdsVendorName= inventory.inventoryName;
}

</script>
