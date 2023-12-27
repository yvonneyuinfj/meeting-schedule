<template>
  <AvicModal :visible="true" title="详情" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="templetCode" label="模板编号">
              <a-input v-model:value="form.templetCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="templetName" label="模板名称">
              <a-input v-model:value="form.templetName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="templetType" label="模板格式 ">
              <a-select v-model:value="form.templetType" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in templetTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="templetClass" label="模板分类">
              <a-select v-model:value="form.templetClass" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in templetClassList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="templetVersion" label="模板版本号">
              <a-input v-model:value="form.templetVersion" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="mdsCategoryLvId" label="品类ID">
              <a-input v-model:value="form.mdsCategoryLvId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="mdsCategoryLvCode" label="品类编码">
              <a-input v-model:value="form.mdsCategoryLvCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="mdsCategoryLvName" label="品类名称">
              <a-input v-model:value="form.mdsCategoryLvName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secModelType" label="二级类型">
              <a-select v-model:value="form.secModelType" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in secModelTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contractClass" label="合同分类">
              <a-select v-model:value="form.contractClass" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in contractClassList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="standardContactFlag" label="是否标准模板">
              <a-select v-model:value="form.standardContactFlag"
                :get-popup-container="(triggerNode) => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in standardContactFlagList" :key="item.sysLookupTlId"
                  :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="templetDesc" label="模板描述">
              <a-textarea v-model:value="form.templetDesc" :rows="2" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsGpioTempletForm, emits } from './ts/MdsGpioTempletForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  loading,
  templetTypeList,
  templetClassList,
  secretLevelList,
  secModelTypeList,
  contractClassList,
  standardContactFlagList,
  closeModal
} = useMdsGpioTempletForm({
  props: props,
  emit: emit
});
</script>


