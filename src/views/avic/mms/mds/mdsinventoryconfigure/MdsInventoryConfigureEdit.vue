<template>
  <AvicModal :visible="true" title="编辑" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="balanceType" label="库房盘点方法" has-feedback>
              <a-select v-model:value="form.balanceType" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择库房盘点方法">
                <a-select-option v-for="item in balanceTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planBalanceFlag" label="参与计划平衡标记" has-feedback>
              <a-select v-model:value="form.planBalanceFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择参与计划平衡标记">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundCalculateFlag" label="参与资金计算标记" has-feedback>
              <a-select v-model:value="form.fundCalculateFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择参与资金计算标记">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jitFlag" label="JIT库房标记" has-feedback>
              <a-select v-model:value="form.jitFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择JIT库房标记">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseBalanceFlag" label="参与采购平衡标记" has-feedback>
              <a-select v-model:value="form.purchaseBalanceFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择参与采购平衡标记">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="filterFlag" label="是否筛选" has-feedback>
              <a-select v-model:value="form.filterFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否筛选">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="minusQtyFlag" label="是否允许有负库存" has-feedback>
              <a-select v-model:value="form.minusQtyFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否允许有负库存">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="consignmentFlag" label="是否寄售库房" has-feedback>
              <a-select v-model:value="form.consignmentFlag" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否寄售库房">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select> </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynBalancing" label="盘点状态">
              <a-input v-model:value="form.ynBalancing" :maxLength="4" placeholder="请输入盘点状态" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInventoryMerge" label="库存台帐合并标记" has-feedback>
              <a-select v-model:value="form.ynInventoryMerge" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择库存台帐合并标记">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynOilSealWarn" label="是否参与油封期预警">
              <a-input v-model:value="form.ynOilSealWarn" :maxLength="4" placeholder="请输入是否参与油封期预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="oilSealWarnDays" label="油封期提前预警天数">
              <a-input v-model:value="form.oilSealWarnDays" :maxLength="20" placeholder="请输入油封期提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynRecheckWarn" label="是否参与复验期预警">
              <a-input v-model:value="form.ynRecheckWarn" :maxLength="4" placeholder="请输入是否参与复验期预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="recheckWarnDays" label="复验期提前预警天数">
              <a-input v-model:value="form.recheckWarnDays" :maxLength="20" placeholder="请输入复验期提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynEffectStockWarn" label="是否参与保管期预警">
              <a-input v-model:value="form.ynEffectStockWarn" :maxLength="4" placeholder="请输入是否参与保管期预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="effectStockWarnDays" label="保管期提前预警天数">
              <a-input v-model:value="form.effectStockWarnDays" :maxLength="20" placeholder="请输入保管期提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynBacklogWarn" label="是否参与积压预警">
              <a-input v-model:value="form.ynBacklogWarn" :maxLength="4" placeholder="请输入是否参与积压预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="backlogWarnDays" label="积压提前预警天数">
              <a-input v-model:value="form.backlogWarnDays" :maxLength="20" placeholder="请输入积压提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynOverstockWarn" label="是否参与超储预警">
              <a-input v-model:value="form.ynOverstockWarn" :maxLength="4" placeholder="请输入是否参与超储预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="overstockWarnRatio" label="超储警戒系数%">
              <a-input v-model:value="form.overstockWarnRatio" :maxLength="20" placeholder="请输入超储警戒系数%" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynLackWarn" label="是否参与缺货预警">
              <a-input v-model:value="form.ynLackWarn" :maxLength="4" placeholder="请输入是否参与缺货预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="lackWarnRatio" label="缺货警戒系数%">
              <a-input v-model:value="form.lackWarnRatio" :maxLength="20" placeholder="请输入缺货警戒系数%" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynOrderPointWarn" label="是否参与订货点预警">
              <a-input v-model:value="form.ynOrderPointWarn" :maxLength="4" placeholder="请输入是否参与订货点预警" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="orderPointWarnRatio" label="订货点警戒系数%">
              <a-input v-model:value="form.orderPointWarnRatio" :maxLength="20" placeholder="请输入订货点警戒系数%" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynOutApprove" label="是否进行出库审批" has-feedback>
              <a-input v-model:value="form.ynOutApprove" :maxLength="4" placeholder="请输入是否进行出库审批" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="ynOutCheck" label="是否进行出库检验" has-feedback>
              <a-input v-model:value="form.ynOutCheck" :maxLength="4" placeholder="请输入是否进行出库检验" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="note" label="备注 ^">
              <a-input v-model:value="form.note" :maxLength="2048" placeholder="请输入备注 ^" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="wmsAdmin" label="库房保管员">
              <a-input v-model:value="form.wmsAdmin" :maxLength="128" placeholder="请输入库房保管员" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementDay" label="结算时间(单位：天)">
              <a-input v-model:value="form.settlementDay" :maxLength="20" placeholder="请输入结算时间(单位：天)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="settlementMoney" label="结算金额">
              <a-input v-model:value="form.settlementMoney" :maxLength="20" placeholder="请输入结算金额" />
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
  rules,
  layout,
  colLayout,
  loading,
  balanceTypeList,
  yNFlagList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsInventoryConfigureForm({
  props: props,
  emit: emit
});
</script>


