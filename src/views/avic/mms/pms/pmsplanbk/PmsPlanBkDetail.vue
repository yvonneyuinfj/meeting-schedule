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
            <a-form-item name="secretLevel" label="密级">
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
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
            <a-form-item name="pmsTaskNo" label="采购任务编号">
              <a-input v-model:value="form.pmsTaskNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanNo" label="采购计划号">
              <a-input v-model:value="form.reqPlanNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanName" label="采购计划名称">
              <a-input v-model:value="form.reqPlanName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDeptId" label="主责单位">
              <AvicCommonSelect
                v-model:value="form.reqDeptId"
                type="deptSelect"
                :defaultShowValue="form.reqDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqUserId" label="设计员">
              <AvicCommonSelect
                v-model:value="form.reqUserId"
                type="userSelect"
                :defaultShowValue="form.reqUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerUserId" label="采购负责人">
              <AvicCommonSelect
                v-model:value="form.managerUserId"
                type="userSelect"
                :defaultShowValue="form.managerUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abutmentUserId" label="对接人">
              <AvicCommonSelect
                v-model:value="form.abutmentUserId"
                type="userSelect"
                :defaultShowValue="form.abutmentUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productServiceCategory" label="产品和服务类别">
              <a-input v-model:value="form.productServiceCategory" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureStage" label="采购阶段">
              <a-input v-model:value="form.procureStage" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productReqClassify" label="产品需求分类">
              <a-input v-model:value="form.productReqClassify" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productType" label="产品类型">
              <a-input v-model:value="form.productType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectTopicNumber" label="所属项目课题号">
              <a-input v-model:value="form.projectTopicNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请日期">
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetAmount" label="预算金额">
              <a-input v-model:value="form.budgetAmount" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptId" label="采购部门">
              <AvicCommonSelect
                v-model:value="form.procureDeptId"
                type="deptSelect"
                :defaultShowValue="form.procureDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureUserId" label="采购主管">
              <AvicCommonSelect
                v-model:value="form.procureUserId"
                type="userSelect"
                :defaultShowValue="form.procureUserIdAlias"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDate" label="交付日期">
              <a-date-picker
                v-model:value="form.deliveryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proposedSourcingMethod" label="拟寻源方式">
              <a-select
                v-model:value="form.proposedSourcingMethod"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in proposedSourcingMethodList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appointVendorId" label="指定供应商">
              <a-input v-model:value="form.appointVendorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techDocCompleteDate" label="技术文件完成日期">
              <a-date-picker
                v-model:value="form.techDocCompleteDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsRequireReceiveId" label="需求接收ID">
              <a-input v-model:value="form.pmsRequireReceiveId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDeptCode" label="采购需求部门编码">
              <a-input v-model:value="form.reqDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDeptName" label="采购需求部门名称">
              <a-input v-model:value="form.reqDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqUserCode" label="需求人编码">
              <a-input v-model:value="form.reqUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqUserName" label="需求人名称">
              <a-input v-model:value="form.reqUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerUserCode" label="项目主管编码">
              <a-input v-model:value="form.managerUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerUserName" label="项目主管名称">
              <a-input v-model:value="form.managerUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptCode" label="采购部门编码">
              <a-input v-model:value="form.procureDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptName" label="采购部门名称">
              <a-input v-model:value="form.procureDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureUserCode" label="采购主管编码">
              <a-input v-model:value="form.procureUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureUserName" label="采购主管名称">
              <a-input v-model:value="form.procureUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appointVendorCode" label="指定供应商编码">
              <a-input v-model:value="form.appointVendorCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appointVendorName" label="指定供应商名称">
              <a-input v-model:value="form.appointVendorName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqQty" label="数量">
              <a-input-number
                v-model:value="form.reqQty"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingCode" label="图号">
              <a-input v-model:value="form.drawingCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemId" label="物料ID">
              <a-input v-model:value="form.itemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemCode" label="物料编码">
              <a-input v-model:value="form.itemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemName" label="物料名称">
              <a-input v-model:value="form.itemName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsUseType" label="用途">
              <a-input v-model:value="form.pmsUseType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserId" label="计划员ID">
              <a-input v-model:value="form.planUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserCode" label="计划员编码">
              <a-input v-model:value="form.planUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserName" label="计划员名称">
              <a-input v-model:value="form.planUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planBasis" label="计划依据">
              <a-input v-model:value="form.planBasis" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="modelSpec" label="型号规格">
              <a-input v-model:value="form.modelSpec" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialLevel" label="物资等级">
              <a-input v-model:value="form.materialLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meteringUnit" label="计量单位">
              <a-input v-model:value="form.meteringUnit" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDate" label="需求日期">
              <a-date-picker
                v-model:value="form.reqDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="singleSourceReason" label="单一来源原因">
              <a-input v-model:value="form.singleSourceReason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyReason" label="申请原因">
              <a-input v-model:value="form.applyReason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mergeFlag" label="合并标识">
              <a-select
                v-model:value="form.mergeFlag"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in mergeFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abutmentUserCode" label="对接人编码">
              <a-input v-model:value="form.abutmentUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abutmentUserName" label="对接人名称">
              <a-input v-model:value="form.abutmentUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planStatus" label="计划状态">
              <a-select
                v-model:value="form.planStatus"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in planStatusList"
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
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsPlanMergeId" label="计划合并后的ID">
              <a-input v-model:value="form.pmsPlanMergeId" disabled />
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
import { usePmsPlanBkForm, emits } from './ts/PmsPlanBkForm'; // 引入表单ts
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
  secretLevelList,
  proposedSourcingMethodList,
  mergeFlagList,
  planStatusList,
  closeModal
} = usePmsPlanBkForm({
  props: props,
  emit: emit
});
</script>


