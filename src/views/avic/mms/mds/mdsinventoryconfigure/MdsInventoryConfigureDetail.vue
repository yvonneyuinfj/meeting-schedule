<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="balanceType" label="库房盘点方法">
              <a-select
                v-model:value="form.balanceType"
                :auto-focus="true"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in balanceTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planBalanceFlag" label="参与计划平衡标记 ^ 是否参与MRP计划平衡的标记:  Y --是;  N --不是">
              <a-input v-model:value="form.planBalanceFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundCalculateFlag" label="参与资金计算标记 ^ 是否参与成本资金计算的标记: Y --是;  N --不是">
              <a-input v-model:value="form.fundCalculateFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jitFlag" label="JIT库房标记 ^ Y --是; N --不是">
              <a-input v-model:value="form.jitFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseBalanceFlag" label="参与采购平衡标记 ^  N --不是; Y --是">
              <a-input v-model:value="form.purchaseBalanceFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="filterFlag" label="是否筛选 ^ N -不筛选;Y -筛选">
              <a-input v-model:value="form.filterFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="minusQtyFlag" label="是否允许有负库存 ^ N --否；Y --是">
              <a-input v-model:value="form.minusQtyFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="consignmentFlag" label="是否寄售库房 ^ N --否；Y --是">
              <a-input v-model:value="form.consignmentFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBalancing" label="盘点状态 ^ 0-未盘点；1-盘点中">
              <a-input v-model:value="form.ynBalancing" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInventoryMerge" label="库存台帐合并标记">
              <a-input v-model:value="form.ynInventoryMerge" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOilSealWarn" label="是否参与油封期预警">
              <a-input v-model:value="form.ynOilSealWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealWarnDays" label="油封期提前预警天数">
              <a-input v-model:value="form.oilSealWarnDays" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynRecheckWarn" label="是否参与复验期预警">
              <a-input v-model:value="form.ynRecheckWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckWarnDays" label="复验期提前预警天数">
              <a-input v-model:value="form.recheckWarnDays" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynEffectStockWarn" label="是否参与保管期预警">
              <a-input v-model:value="form.ynEffectStockWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectStockWarnDays" label="保管期提前预警天数">
              <a-input v-model:value="form.effectStockWarnDays" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBacklogWarn" label="是否参与积压预警">
              <a-input v-model:value="form.ynBacklogWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backlogWarnDays" label="积压提前预警天数">
              <a-input v-model:value="form.backlogWarnDays" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOverstockWarn" label="是否参与超储预警">
              <a-input v-model:value="form.ynOverstockWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="overstockWarnRatio" label="超储警戒系数%">
              <a-input v-model:value="form.overstockWarnRatio" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynLackWarn" label="是否参与缺货预警">
              <a-input v-model:value="form.ynLackWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lackWarnRatio" label="缺货警戒系数%">
              <a-input v-model:value="form.lackWarnRatio" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOrderPointWarn" label="是否参与订货点预警">
              <a-input v-model:value="form.ynOrderPointWarn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderPointWarnRatio" label="订货点警戒系数%">
              <a-input v-model:value="form.orderPointWarnRatio" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOutApprove" label="是否进行出库审批">
              <a-input v-model:value="form.ynOutApprove" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOutCheck" label="是否进行出库检验">
              <a-input v-model:value="form.ynOutCheck" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注 ^">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsAdmin" label="库房保管员">
              <a-input v-model:value="form.wmsAdmin" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
            <a-form-item name="settlementDay" label="结算时间(单位：天)">
              <a-input v-model:value="form.settlementDay" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementMoney" label="结算金额">
              <a-input v-model:value="form.settlementMoney" disabled />
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
import { useMdsInventoryConfigureForm, emits } from './ts/MdsInventoryConfigureForm'; // 引入表单ts
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
  balanceTypeList,
  secretLevelList,
  closeModal
} = useMdsInventoryConfigureForm({
  props: props,
  emit: emit
});
</script>


