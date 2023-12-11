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
            <a-form-item name="invTransactTypeCode" label="库存事务处理类型" has-feedback>
              <a-input
                v-model:value="form.invTransactTypeCode"
                :maxLength="8"
                :auto-focus="true"
                placeholder="请输入库存事务处理类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invTransactTypeDesc" label="库存事务类型说明">
              <a-input
                v-model:value="form.invTransactTypeDesc"
                :maxLength="1024"
                placeholder="请输入库存事务类型说明"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="operationSource" label="操作来源" has-feedback>
              <a-select
                v-model:value="form.operationSource"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择操作来源"
              >
                <a-select-option
                  v-for="item in operationSourceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="operationType" label="操作类型" has-feedback>
              <a-select
                v-model:value="form.operationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择操作类型"
              >
                <a-select-option
                  v-for="item in operationTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keepAccountFlag" label="是否登帐" has-feedback>
              <a-select
                v-model:value="form.keepAccountFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否登帐"
              >
                <a-select-option
                  v-for="item in keepAccountFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="changeInvQtyFlag" label="库房总数量变化标记" has-feedback>
              <a-select
                v-model:value="form.changeInvQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择库房总数量变化标记"
              >
                <a-select-option
                  v-for="item in changeInvQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="changeSumupInQtyFlag" label="累计入库量变化标记">
              <a-select
                v-model:value="form.changeSumupInQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择累计入库量变化标记"
              >
                <a-select-option
                  v-for="item in changeSumupInQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="changeSumupOutQtyFlag" label="累计出库量变化标记">
              <a-select
                v-model:value="form.changeSumupOutQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择累计出库量变化标记"
              >
                <a-select-option
                  v-for="item in changeSumupOutQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="changeAllocatedQtyFlag" label="已分配量变化标记">
              <a-select
                v-model:value="form.changeAllocatedQtyFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择已分配量变化标记"
              >
                <a-select-option
                  v-for="item in changeAllocatedQtyFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="prefixCode" label="单据前缀" has-feedback>
              <a-input
                v-model:value="form.prefixCode"
                :maxLength="8"
                placeholder="请输入单据前缀"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportName" label="单据报表名称">
              <a-input
                v-model:value="form.reportName"
                :maxLength="60"
                placeholder="请输入单据报表名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOutApprove" label="是否进行出库审批" has-feedback>
              <a-select
                v-model:value="form.ynOutApprove"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否进行出库审批"
              >
                <a-select-option
                  v-for="item in ynOutApproveList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOutCheck" label="是否进行出库检验" has-feedback>
              <a-select
                v-model:value="form.ynOutCheck"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否进行出库检验"
              >
                <a-select-option
                  v-for="item in ynOutCheckList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="有效标记" has-feedback>
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择有效标记"
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
            <a-form-item name="ynEnableChoose" label="是否允许选择">
              <a-input
                v-model:value="form.ynEnableChoose"
                :maxLength="4"
                placeholder="请输入是否允许选择"
              />
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAudit" label="是否进行稽核【SFERP新增】">
              <a-input
                v-model:value="form.ynAudit"
                :maxLength="4"
                placeholder="请输入是否进行稽核【SFERP新增】"
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
import { useMdsInventoryTransactionForm, emits } from './ts/MdsInventoryTransactionForm'; // 引入表单ts
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
  operationSourceList,
  operationTypeList,
  keepAccountFlagList,
  changeInvQtyFlagList,
  changeSumupInQtyFlagList,
  changeSumupOutQtyFlagList,
  changeAllocatedQtyFlagList,
  ynOutApproveList,
  ynOutCheckList,
  validFlagList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsInventoryTransactionForm({
  props: props,
  emit: emit
});
</script>

