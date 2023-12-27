<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="详情"
      width="960px"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
          ref="formRef"
          :model="form"
          layout="horizontal"
          v-bind="layout"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="密级" name="secretLevel">
              <a-select
                  v-model:value="form.secretLevel"
                  :allow-clear="true"
                  :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  disabled
                  option-filter-prop="children"
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
            <a-form-item label="采购任务编号" name="pmsTaskNo">
              <a-input v-model:value="form.pmsTaskNo" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="合并标识" name="mergeFlag">
              <a-select
                  v-model:value="form.mergeFlag"
                  :allow-clear="true"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  :show-search="true"
                  disabled
                  option-filter-prop="children"
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
            <a-form-item label="采购计划号" name="reqPlanNo">
              <a-input v-model:value="form.reqPlanNo" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="主责单位" name="reqDeptId">
              <AvicCommonSelect
                  v-model:value="form.reqDeptId"
                  :defaultShowValue="form.reqDeptIdAlias"
                  disabled
                  type="deptSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="设计员" name="reqUserId">
              <AvicCommonSelect
                  v-model:value="form.reqUserId"
                  :defaultShowValue="form.reqUserIdAlias"
                  disabled
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购负责人" name="managerUserId">
              <AvicCommonSelect
                  v-model:value="form.managerUserId"
                  :defaultShowValue="form.managerUserIdAlias"
                  disabled
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="对接人" name="abutmentUserId">
              <AvicCommonSelect
                  v-model:value="form.abutmentUserId"
                  :defaultShowValue="form.abutmentUserIdAlias"
                  disabled
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品和服务类别" name="productServiceCategory">
              <a-select
                  v-model:value="form.productServiceCategory"
                  :allow-clear="true"
                  :disabled="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品和服务类别"
              >
                <a-select-option
                    v-for="item in productServiceCategoryList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品需求分类" name="productReqClassify">
              <a-select
                  v-model:value="form.productReqClassify"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品需求分类"
                  :disabled="true"
              >
                <a-select-option
                    v-for="item in productReqClassifyList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品类型" name="productType">
              <a-select
                  v-model:value="form.productType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择产品类型"
                  :disabled="true"
              >
                <a-select-option
                    v-for="item in productTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="所属项目课题号" name="projectTopicNumber">
              <a-input v-model:value="form.projectTopicNumber" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请日期" name="applyDate">
              <a-date-picker
                  v-model:value="form.applyDate"
                  disabled
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="预算金额" name="budgetAmount">
              <a-input v-model:value="form.budgetAmount" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购部门" name="procureDeptId">
              <AvicCommonSelect
                  v-model:value="form.procureDeptId"
                  :defaultShowValue="form.procureDeptIdAlias"
                  disabled
                  type="deptSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购主管" name="procureUserId">
              <AvicCommonSelect
                  v-model:value="form.procureUserId"
                  :defaultShowValue="form.procureUserIdAlias"
                  disabled
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="交付日期" name="deliveryDate">
              <a-date-picker
                  v-model:value="form.deliveryDate"
                  disabled
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="拟寻源方式" name="proposedSourcingMethod">
              <a-select
                  v-model:value="form.proposedSourcingMethod"
                  :allow-clear="true"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  :show-search="true"
                  disabled
                  option-filter-prop="children"
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
            <a-form-item label="指定供应商" name="appointVendorId">
              <a-input v-model:value="form.appointVendorId" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="技术文件完成日期" name="techDocCompleteDate">
              <a-date-picker
                  v-model:value="form.techDocCompleteDate"
                  disabled
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求接收ID" name="pmsRequireReceiveId">
              <a-input v-model:value="form.pmsRequireReceiveId" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购计划名称" name="reqPlanName">
              <a-input v-model:value="form.reqPlanName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购需求部门编码" name="reqDeptCode">
              <a-input v-model:value="form.reqDeptCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购需求部门名称" name="reqDeptName">
              <a-input v-model:value="form.reqDeptName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求人编码" name="reqUserCode">
              <a-input v-model:value="form.reqUserCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求人名称" name="reqUserName">
              <a-input v-model:value="form.reqUserName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目主管编码" name="managerUserCode">
              <a-input v-model:value="form.managerUserCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="项目主管名称" name="managerUserName">
              <a-input v-model:value="form.managerUserName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购阶段" name="procureStage">
              <a-select
                  v-model:value="form.procureStage"
                  :allow-clear="true"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  :show-search="true"
                  disabled
                  option-filter-prop="children"
              >
                <a-select-option
                    v-for="item in procureStageList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购部门编码" name="procureDeptCode">
              <a-input v-model:value="form.procureDeptCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购部门名称" name="procureDeptName">
              <a-input v-model:value="form.procureDeptName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购主管编码" name="procureUserCode">
              <a-input v-model:value="form.procureUserCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购主管名称" name="procureUserName">
              <a-input v-model:value="form.procureUserName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="指定供应商编码" name="appointVendorCode">
              <a-input v-model:value="form.appointVendorCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="指定供应商名称" name="appointVendorName">
              <a-input v-model:value="form.appointVendorName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="数量" name="reqQty">
              <a-input-number
                  v-model:value="form.reqQty"
                  :max="999999999999"
                  :precision="0"
                  :step="1"
                  disabled
                  min="0"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="图号" name="drawingCode">
              <a-input v-model:value="form.drawingCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料ID" name="itemId">
              <a-input v-model:value="form.itemId" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料编码" name="itemCode">
              <a-input v-model:value="form.itemCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料名称" name="itemName">
              <a-input v-model:value="form.itemName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="用途" name="pmsUseType">
              <a-input v-model:value="form.pmsUseType" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划员ID" name="planUserId">
              <a-input v-model:value="form.planUserId" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划员编码" name="planUserCode">
              <a-input v-model:value="form.planUserCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划员名称" name="planUserName">
              <a-input v-model:value="form.planUserName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划依据" name="planBasis">
              <a-input v-model:value="form.planBasis" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="型号规格" name="modelSpec">
              <a-input v-model:value="form.modelSpec" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物资等级" name="materialLevel">
              <a-input v-model:value="form.materialLevel" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计量单位" name="meteringUnit">
              <a-input v-model:value="form.meteringUnit" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求日期" name="reqDate">
              <a-date-picker
                  v-model:value="form.reqDate"
                  disabled
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单一来源原因" name="singleSourceReason">
              <a-input v-model:value="form.singleSourceReason" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请原因" name="applyReason">
              <a-input v-model:value="form.applyReason" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="对接人编码" name="abutmentUserCode">
              <a-input v-model:value="form.abutmentUserCode" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="对接人名称" name="abutmentUserName">
              <a-input v-model:value="form.abutmentUserName" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划状态" name="planStatus">
              <a-select
                  v-model:value="form.planStatus"
                  :allow-clear="true"
                  :get-popup-container="(triggerNode) => triggerNode.parentNode"
                  :show-search="true"
                  disabled
                  option-filter-prop="children"
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
            <a-form-item label="备注" name="note">
              <a-input v-model:value="form.note" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { emits, usePmsPlanForm } from './ts/PmsPlanForm'; // 引入表单ts
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
  procureStageList,
  mergeFlagList,
  proposedSourcingMethodList,
  productServiceCategoryList,
  productTypeList,
  productReqClassifyList,
  planStatusList,
  closeModal
} = usePmsPlanForm({
  props: props,
  emit: emit
});
</script>


