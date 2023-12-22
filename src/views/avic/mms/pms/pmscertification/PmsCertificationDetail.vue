<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      class="form-excel-style"
     >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
              v-model:value="form.secretLevel"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('secretLevel')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('qualifiedQty')">
          <a-form-item name="qualifiedQty" label="合格品数量" :rules="fieldRequired('qualifiedQty')" has-feedback>
            <a-input-number
              v-model:value="form.qualifiedQty"
              :min="0"
              :max="999999999999"
              :precision="0"
              :step="1"
              :disabled="fieldDisabled('qualifiedQty')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('checkResult')">
          <a-form-item name="checkResult" label="检验结论" :rules="fieldRequired('checkResult')" has-feedback>
            <a-select
              v-model:value="form.checkResult"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('checkResult')"
            >
              <a-select-option
                v-for="item in checkResultList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('unqualifiedQty')">
          <a-form-item name="unqualifiedQty" label="不合格品数量" :rules="fieldRequired('unqualifiedQty')" has-feedback>
            <a-input-number
              v-model:value="form.unqualifiedQty"
              :min="0"
              :max="999999999999"
              :precision="0"
              :step="1"
              :disabled="fieldDisabled('unqualifiedQty')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('checkLossQty')">
          <a-form-item name="checkLossQty" label="检验损耗数量" :rules="fieldRequired('checkLossQty')" has-feedback>
            <a-input-number
              v-model:value="form.checkLossQty"
              :min="0"
              :max="999999999999"
              :precision="0"
              :step="1"
              :disabled="fieldDisabled('checkLossQty')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('checkerUserId')">
          <a-form-item name="checkerUserId" label="检验人" :rules="fieldRequired('checkerUserId')" has-feedback>
            <AvicCommonSelect
              v-model:value="form.checkerUserId"
              type="userSelect"
              :defaultShowValue="form.checkerUserIdAlias"
              :disabled="fieldDisabled('checkerUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('checkDate')">
          <a-form-item name="checkDate" label="检验日期 " :rules="fieldRequired('checkDate')" has-feedback>
            <a-date-picker
              v-model:value="form.checkDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('checkDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('entrustResult')">
          <a-form-item name="entrustResult" label="理化试验结论" :rules="fieldRequired('entrustResult')" has-feedback>
            <a-input
              v-model:value="form.entrustResult"
              :disabled="fieldDisabled('entrustResult')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('losslessResult')">
          <a-form-item name="losslessResult" label="无损检测结论" :rules="fieldRequired('losslessResult')" has-feedback>
            <a-input
              v-model:value="form.losslessResult"
              :disabled="fieldDisabled('losslessResult')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('notes')">
          <a-form-item name="notes" label="备注" :rules="fieldRequired('notes')" has-feedback>
            <a-input
              v-model:value="form.notes"
              :disabled="fieldDisabled('notes')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { usePmsCertificationForm, emits } from './ts/PmsCertificationForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  secretLevelList,
  checkResultList,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = usePmsCertificationForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>
