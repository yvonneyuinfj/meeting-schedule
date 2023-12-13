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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsTaskNo" label="采购任务编号" has-feedback>
              <avic-auto-code
                v-model:value="form.pmsTaskNo"
                ref="autoCode"
                code-type="PMS_TASK_NO"
                code-param="PMS_PLAN"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入采购任务编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mergeFlag" label="合并标识" has-feedback>
              <a-select
                v-model:value="form.mergeFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择合并标识"
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
            <a-form-item name="reqPlanNo" label="采购计划号" has-feedback>
              <a-input
                v-model:value="form.reqPlanNo"
                :maxLength="64"
                placeholder="请输入采购计划号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDeptId" label="主责单位">
              <AvicCommonSelect
                v-model:value="form.reqDeptId"
                type="deptSelect"
                placeholder="请选择主责单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqUserId" label="设计员">
              <AvicCommonSelect
                v-model:value="form.reqUserId"
                type="userSelect"
                placeholder="请选择设计员"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerUserId" label="采购负责人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.managerUserId"
                type="userSelect"
                placeholder="请选择采购负责人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abutmentUserId" label="对接人">
              <AvicCommonSelect
                v-model:value="form.abutmentUserId"
                type="userSelect"
                placeholder="请选择对接人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productServiceCategory" label="产品和服务类别">
              <a-input
                v-model:value="form.productServiceCategory"
                :maxLength="32"
                placeholder="请输入产品和服务类别"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productReqClassify" label="产品需求分类">
              <a-input
                v-model:value="form.productReqClassify"
                :maxLength="32"
                placeholder="请输入产品需求分类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productType" label="产品类型">
              <a-input
                v-model:value="form.productType"
                :maxLength="32"
                placeholder="请输入产品类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectTopicNumber" label="所属项目课题号">
              <a-input
                v-model:value="form.projectTopicNumber"
                :maxLength="32"
                placeholder="请输入所属项目课题号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请日期">
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetAmount" label="预算金额">
              <a-input
                v-model:value="form.budgetAmount"
                :maxLength="20"
                placeholder="请输入预算金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptId" label="采购部门">
              <AvicCommonSelect
                v-model:value="form.procureDeptId"
                type="deptSelect"
                placeholder="请选择采购部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureUserId" label="采购主管">
              <AvicCommonSelect
                v-model:value="form.procureUserId"
                type="userSelect"
                placeholder="请选择采购主管"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryDate" label="交付日期">
              <a-date-picker
                v-model:value="form.deliveryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择交付日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proposedSourcingMethod" label="拟寻源方式">
              <a-select
                v-model:value="form.proposedSourcingMethod"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择拟寻源方式"
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
              <a-input
                v-model:value="form.appointVendorId"
                :maxLength="64"
                placeholder="请输入指定供应商"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techDocCompleteDate" label="技术文件完成日期">
              <a-date-picker
                v-model:value="form.techDocCompleteDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择技术文件完成日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsRequireReceiveId" label="需求接收ID" has-feedback>
              <a-input
                v-model:value="form.pmsRequireReceiveId"
                :maxLength="64"
                placeholder="请输入需求接收ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqPlanName" label="采购计划名称" has-feedback>
              <a-input
                v-model:value="form.reqPlanName"
                :maxLength="64"
                placeholder="请输入采购计划名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDeptCode" label="采购需求部门编码">
              <a-input
                v-model:value="form.reqDeptCode"
                :maxLength="4000"
                placeholder="请输入采购需求部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDeptName" label="采购需求部门名称">
              <a-input
                v-model:value="form.reqDeptName"
                :maxLength="4000"
                placeholder="请输入采购需求部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqUserCode" label="需求人编码">
              <a-input
                v-model:value="form.reqUserCode"
                :maxLength="4000"
                placeholder="请输入需求人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqUserName" label="需求人名称">
              <a-input
                v-model:value="form.reqUserName"
                :maxLength="4000"
                placeholder="请输入需求人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerUserCode" label="项目主管编码" has-feedback>
              <a-input
                v-model:value="form.managerUserCode"
                :maxLength="64"
                placeholder="请输入项目主管编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerUserName" label="项目主管名称" has-feedback>
              <a-input
                v-model:value="form.managerUserName"
                :maxLength="64"
                placeholder="请输入项目主管名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureStage" label="采购阶段">
              <a-input
                v-model:value="form.procureStage"
                :maxLength="32"
                placeholder="请输入采购阶段"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptCode" label="采购部门编码">
              <a-input
                v-model:value="form.procureDeptCode"
                :maxLength="64"
                placeholder="请输入采购部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptName" label="采购部门名称">
              <a-input
                v-model:value="form.procureDeptName"
                :maxLength="64"
                placeholder="请输入采购部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureUserCode" label="采购主管编码">
              <a-input
                v-model:value="form.procureUserCode"
                :maxLength="64"
                placeholder="请输入采购主管编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureUserName" label="采购主管名称">
              <a-input
                v-model:value="form.procureUserName"
                :maxLength="64"
                placeholder="请输入采购主管名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appointVendorCode" label="指定供应商编码">
              <a-input
                v-model:value="form.appointVendorCode"
                :maxLength="64"
                placeholder="请输入指定供应商编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appointVendorName" label="指定供应商名称">
              <a-input
                v-model:value="form.appointVendorName"
                :maxLength="64"
                placeholder="请输入指定供应商名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqQty" label="数量">
              <a-input-number
                v-model:value="form.reqQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingCode" label="图号">
              <a-input
                v-model:value="form.drawingCode"
                :maxLength="64"
                placeholder="请输入图号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemId" label="物料ID">
              <a-input
                v-model:value="form.itemId"
                :maxLength="64"
                placeholder="请输入物料ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemCode" label="物料编码">
              <a-input
                v-model:value="form.itemCode"
                :maxLength="64"
                placeholder="请输入物料编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemName" label="物料名称">
              <a-input
                v-model:value="form.itemName"
                :maxLength="64"
                placeholder="请输入物料名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsUseType" label="用途">
              <a-input
                v-model:value="form.pmsUseType"
                :maxLength="64"
                placeholder="请输入用途"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserId" label="计划员ID">
              <a-input
                v-model:value="form.planUserId"
                :maxLength="64"
                placeholder="请输入计划员ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserCode" label="计划员编码">
              <a-input
                v-model:value="form.planUserCode"
                :maxLength="64"
                placeholder="请输入计划员编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planUserName" label="计划员名称">
              <a-input
                v-model:value="form.planUserName"
                :maxLength="64"
                placeholder="请输入计划员名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planBasis" label="计划依据">
              <a-input
                v-model:value="form.planBasis"
                :maxLength="64"
                placeholder="请输入计划依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="modelSpec" label="型号规格">
              <a-input
                v-model:value="form.modelSpec"
                :maxLength="64"
                placeholder="请输入型号规格"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialLevel" label="物资等级">
              <a-input
                v-model:value="form.materialLevel"
                :maxLength="64"
                placeholder="请输入物资等级"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meteringUnit" label="计量单位">
              <a-input
                v-model:value="form.meteringUnit"
                :maxLength="64"
                placeholder="请输入计量单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqDate" label="需求日期">
              <a-date-picker
                v-model:value="form.reqDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择需求日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="singleSourceReason" label="单一来源原因">
              <a-input
                v-model:value="form.singleSourceReason"
                :maxLength="64"
                placeholder="请输入单一来源原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyReason" label="申请原因">
              <a-input
                v-model:value="form.applyReason"
                :maxLength="64"
                placeholder="请输入申请原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abutmentUserCode" label="对接人编码">
              <a-input
                v-model:value="form.abutmentUserCode"
                :maxLength="64"
                placeholder="请输入对接人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abutmentUserName" label="对接人名称">
              <a-input
                v-model:value="form.abutmentUserName"
                :maxLength="64"
                placeholder="请输入对接人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planStatus" label="计划状态" has-feedback>
              <a-select
                v-model:value="form.planStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择计划状态"
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
              <a-input
                v-model:value="form.note"
                :maxLength="512"
                placeholder="请输入备注"
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
import { usePmsPlanForm, emits } from './ts/PmsPlanForm'; // 引入表单ts
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
  secretLevelList,
  mergeFlagList,
  proposedSourcingMethodList,
  planStatusList,
  autoCode,
  saveForm,
  closeModal
} = usePmsPlanForm({
  props: props,
  emit: emit
});
</script>

