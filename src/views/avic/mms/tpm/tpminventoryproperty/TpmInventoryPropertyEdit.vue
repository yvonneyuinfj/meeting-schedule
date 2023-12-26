<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="980px"
    height="350px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal" :colon="false">
        <a-row :gutter="16">
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="serialNo" label="序号">
              <a-input
                v-model:value="form.serialNo"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入序号"
              />
            </a-form-item> 
          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="propertyName" label="属性名称">
              <a-input
                v-model:value="form.propertyName"
                :maxLength="1024"
                placeholder="请输入属性名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="propertyContent" label="属性内容">
              <a-input
                v-model:value="form.propertyContent"
                :maxLength="2048"
                placeholder="请输入属性内容"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="数据密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择数据密级"
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
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="note" label="备注">
              <a-textarea v-model:value="form.note" :maxLength="256" placeholder="请输入备注" :rows="3"/>
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
import { useTpmInventoryPropertyForm, emits } from './ts/TpmInventoryPropertyForm'; // 引入表单ts
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
const { form, formRef, rules, layout, colLayout, loading, secretLevelList, saveForm, closeModal } =
  useTpmInventoryPropertyForm({
    props: props,
    emit: emit
  });
</script>

