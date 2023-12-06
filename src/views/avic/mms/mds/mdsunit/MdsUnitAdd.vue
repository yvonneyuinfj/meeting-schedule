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
            <a-form-item name="unitCode" label="计量单位代码" has-feedback>
              <a-input
                  v-model:value="form.unitCode"
                  :maxLength="20"
                  :auto-focus="true"
                  placeholder="请输入计量单位代码 如Cm,Km"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="unitDesc" label="计量单位说明">
              <a-input
                  v-model:value="form.unitDesc"
                  :maxLength="40"
                  placeholder="请输入计量单位说明 例如厘米，毫米"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="unitClass" label="计量单位大类" has-feedback>
              <a-select
                  v-model:value="form.unitClass"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择计量单位大类"
              >
                <a-select-option
                    v-for="item in unitClassList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="有效标识" has-feedback>
              <a-select
                  v-model:value="form.validFlag"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择有效标识"
              >
                <a-select-option
                    v-for="item in validFlagList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                  v-model:value="form.secretLevel"
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
import { useMdsUnitForm, emits } from './ts/MdsUnitForm'; // 引入表单ts
const props = defineProps( {
  formId: {
    type: String,
    default: ''
  }
} );
const emit = defineEmits( emits );
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  unitClassList,
  validFlagList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsUnitForm( {
  props: props,
  emit: emit
} );
</script>

