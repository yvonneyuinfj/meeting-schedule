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
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invThreePeriodCode" label="库存三期代码" has-feedback>
              <a-input
                v-model:value="form.invThreePeriodCode"
                :maxLength="64"
                placeholder="请输入库存三期代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckDateCalType" label="复验日期计算类型" has-feedback>
              <a-select
                v-model:value="form.recheckDateCalType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择复验日期计算类型"
                @change="changeDisabled"
              >
                <a-select-option
                  v-for="item in recheckDateCalTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="basicEffectStockPeriod" label="基本有效贮存期(天)">
              <a-input-number
                v-model:value="form.basicEffectStockPeriod"
                :min="0"
                :max="9999999999"
                :precision="0"
                :step="1"
                placeholder="请输入基本有效贮存期(天)"
                :disabled="nonFixed"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckPeriod" label="固定复验期(天)">
              <a-input-number
                v-model:value="form.recheckPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入固定复验期(天)"
                :disabled="nonFixed"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectStockPeriod" label="有效贮存期(天)">
              <a-input-number
                v-model:value="form.effectStockPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入有效贮存期(天)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealPeriod" label="油封期(天)">
              <a-input-number
                v-model:value="form.oilSealPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入油封期(天)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="firstRecheckPeriod" label="第一次复验延长期(天)">
              <a-input-number
                v-model:value="form.firstRecheckPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入第一次复验延长期(天)"
                :disabled="fixed"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secondRecheckPeriod" label="第二次复验延长期(天)">
              <a-input-number
                v-model:value="form.secondRecheckPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入第二次复验延长期(天)"
                :disabled="fixed"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="thirdRecheckPeriod" label="第三次复验延长期(天)">
              <a-input-number
                v-model:value="form.thirdRecheckPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入第三次复验延长期(天)"
                :disabled="fixed"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fourthRecheckPeriod" label="第四次复验延长期(天)">
              <a-input-number
                v-model:value="form.fourthRecheckPeriod"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入第四次复验延长期(天)"
                :disabled="fixed"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="是否有效" has-feedback>
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否有效"
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
import { useMdsInvThreePeriodForm, emits } from './ts/MdsInvThreePeriodForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const fixed = ref(false);
const nonFixed = ref(false);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  recheckDateCalTypeList,
  validFlagList,
  saveForm,
  closeModal
} = useMdsInvThreePeriodForm({
  props: props,
  emit: emit
});

onMounted(() => {
  changeDisabled();
});

function changeDisabled() {
  if (form.value.recheckDateCalType === '1') {
    fixed.value = true;
    nonFixed.value = false;
    form.value.firstRecheckPeriod = parseFloat('');
    form.value.secondRecheckPeriod = parseFloat('');
    form.value.thirdRecheckPeriod = parseFloat('');
    form.value.fourthRecheckPeriod = parseFloat('');
  } else if (form.value.recheckDateCalType === '2') {
    fixed.value = false;
    nonFixed.value = true;
    form.value.basicEffectStockPeriod = parseFloat('');
    form.value.recheckPeriod = parseFloat('');
  }
}
</script>

