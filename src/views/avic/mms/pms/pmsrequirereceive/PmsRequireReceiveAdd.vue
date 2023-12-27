<template>
  <AvicModal
      :centered="true"
      :visible="true"
      height="520px"
      title="添加"
      width="960px"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          layout="horizontal"
          v-bind="layout"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="密级" name="secretLevel">
              <a-select
                  v-model:value="form.secretLevel"
                  :allow-clear="true"
                  :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
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
            <a-form-item has-feedback label="采购计划号" name="reqPlanNo">
              <a-input
                  v-model:value="form.reqPlanNo"
                  :maxLength="64"
                  placeholder="请输入采购计划号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="采购计划名称" name="reqPlanName">
              <a-input
                  v-model:value="form.reqPlanName"
                  :maxLength="64"
                  placeholder="请输入采购计划名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="主责单位" name="reqDeptId">
              <AvicCommonSelect
                  v-model:value="form.reqDeptId"
                  placeholder="请选择主责单位"
                  type="deptSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求人" name="reqUserId">
              <AvicCommonSelect
                  v-model:value="form.reqUserId"
                  placeholder="请选择需求人"
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="采购负责人" name="managerUserId">
              <AvicCommonSelect
                  v-model:value="form.managerUserId"
                  placeholder="请选择采购负责人"
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="产品和服务类别" name="productServiceCategory">
              <a-select
                  v-model:value="form.productServiceCategory"
                  :allow-clear="true"
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
              <a-input
                  v-model:value="form.productReqClassify"
                  :maxLength="32"
                  placeholder="请输入产品需求分类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="计划类型" name="planType">
              <a-select
                  v-model:value="form.planType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择计划类型"
              >
                <a-select-option
                    v-for="item in planTypeList"
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
              <a-input
                  v-model:value="form.productType"
                  :maxLength="32"
                  placeholder="请输入产品类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="所属项目课题号" name="projectTopicNumber">
              <a-input
                  v-model:value="form.projectTopicNumber"
                  :maxLength="32"
                  placeholder="请输入所属项目课题号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="需求来源" name="sourceType">
              <a-select
                  v-model:value="form.sourceType"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择需求来源"
              >
                <a-select-option
                    v-for="item in sourceTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请日期" name="applyDate">
              <a-date-picker
                  v-model:value="form.applyDate"
                  format="YYYY-MM-DD"
                  placeholder="请选择申请日期"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="预算金额" name="budgetAmount">
              <a-input
                  v-model:value="form.budgetAmount"
                  :maxLength="20"
                  placeholder="请输入预算金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购部门" name="procureDeptId">
              <AvicCommonSelect
                  v-model:value="form.procureDeptId"
                  placeholder="请选择采购部门"
                  type="deptSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购主管" name="procureUserId">
              <AvicCommonSelect
                  v-model:value="form.procureUserId"
                  placeholder="请选择采购主管"
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="交付日期" name="deliveryDate">
              <a-date-picker
                  v-model:value="form.deliveryDate"
                  format="YYYY-MM-DD"
                  placeholder="请选择交付日期"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="拟寻源方式" name="proposedSourcingMethod">
              <a-select
                  v-model:value="form.proposedSourcingMethod"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
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
            <a-form-item label="指定供应商" name="appointVendorId">
              <a-input
                  v-model:value="form.appointVendorId"
                  :maxLength="64"
                  placeholder="请输入指定供应商"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="技术文件完成日期" name="techDocCompleteDate">
              <a-date-picker
                  v-model:value="form.techDocCompleteDate"
                  format="YYYY-MM-DD"
                  placeholder="请选择技术文件完成日期"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求编号" name="reqNo">
              <a-input
                  v-model:value="form.reqNo"
                  :maxLength="2"
                  placeholder="请输入需求编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购需求部门编码" name="reqDeptCode">
              <a-input
                  v-model:value="form.reqDeptCode"
                  :maxLength="4000"
                  placeholder="请输入采购需求部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购需求部门名称" name="reqDeptName">
              <a-input
                  v-model:value="form.reqDeptName"
                  :maxLength="4000"
                  placeholder="请输入采购需求部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求人编码" name="reqUserCode">
              <a-input
                  v-model:value="form.reqUserCode"
                  :maxLength="4000"
                  placeholder="请输入需求人编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求人名称" name="reqUserName">
              <a-input
                  v-model:value="form.reqUserName"
                  :maxLength="4000"
                  placeholder="请输入需求人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="项目主管编码" name="managerUserCode">
              <a-input
                  v-model:value="form.managerUserCode"
                  :maxLength="64"
                  placeholder="请输入项目主管编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="项目主管名称" name="managerUserName">
              <a-input
                  v-model:value="form.managerUserName"
                  :maxLength="64"
                  placeholder="请输入项目主管名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购阶段" name="procureStage">
              <a-select
                  v-model:value="form.procureStage"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择采购阶段"
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
              <a-input
                  v-model:value="form.procureDeptCode"
                  :maxLength="64"
                  placeholder="请输入采购部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购部门名称" name="procureDeptName">
              <a-input
                  v-model:value="form.procureDeptName"
                  :maxLength="64"
                  placeholder="请输入采购部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购主管编码" name="procureUserCode">
              <a-input
                  v-model:value="form.procureUserCode"
                  :maxLength="64"
                  placeholder="请输入采购主管编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="采购主管名称" name="procureUserName">
              <a-input
                  v-model:value="form.procureUserName"
                  :maxLength="64"
                  placeholder="请输入采购主管名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="指定供应商编码" name="appointVendorCode">
              <a-input
                  v-model:value="form.appointVendorCode"
                  :maxLength="64"
                  placeholder="请输入指定供应商编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="指定供应商名称" name="appointVendorName">
              <a-input
                  v-model:value="form.appointVendorName"
                  :maxLength="64"
                  placeholder="请输入指定供应商名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="数量" name="reqQty">
              <a-input-number
                  v-model:value="form.reqQty"
                  :max="999999999999"
                  :min="0"
                  :precision="0"
                  :step="1"
                  placeholder="请输入数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="图号" name="drawingCode">
              <a-input
                  v-model:value="form.drawingCode"
                  :maxLength="64"
                  placeholder="请输入图号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料ID" name="itemId">
              <a-input
                  v-model:value="form.itemId"
                  :maxLength="64"
                  placeholder="请输入物料ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料编码" name="itemCode">
              <a-input
                  v-model:value="form.itemCode"
                  :maxLength="64"
                  placeholder="请输入物料编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料名称" name="itemName">
              <a-input
                  v-model:value="form.itemName"
                  :maxLength="64"
                  placeholder="请输入物料名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="用途" name="pmsUseType">
              <a-input
                  v-model:value="form.pmsUseType"
                  :maxLength="64"
                  placeholder="请输入用途"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划员ID" name="planUserId">
              <AvicCommonSelect
                  v-model:value="form.planUserId"
                  placeholder="请选择计划员ID"
                  type="userSelect"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划员编码" name="planUserCode">
              <a-input
                  v-model:value="form.planUserCode"
                  :maxLength="64"
                  placeholder="请输入计划员编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划员名称" name="planUserName">
              <a-input
                  v-model:value="form.planUserName"
                  :maxLength="64"
                  placeholder="请输入计划员名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划依据" name="planBasis">
              <a-input
                  v-model:value="form.planBasis"
                  :maxLength="64"
                  placeholder="请输入计划依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="型号规格" name="modelSpec">
              <a-input
                  v-model:value="form.modelSpec"
                  :maxLength="64"
                  placeholder="请输入型号规格"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物资等级" name="materialLevel">
              <a-input
                  v-model:value="form.materialLevel"
                  :maxLength="64"
                  placeholder="请输入物资等级"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计量单位" name="meteringUnit">
              <a-input
                  v-model:value="form.meteringUnit"
                  :maxLength="64"
                  placeholder="请输入计量单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="需求日期" name="reqDate">
              <a-date-picker
                  v-model:value="form.reqDate"
                  format="YYYY-MM-DD"
                  placeholder="请选择需求日期"
                  value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="单一来源原因" name="singleSourceReason">
              <a-input
                  v-model:value="form.singleSourceReason"
                  :maxLength="64"
                  placeholder="请输入单一来源原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请原因" name="applyReason">
              <a-input
                  v-model:value="form.applyReason"
                  :maxLength="64"
                  placeholder="请输入申请原因"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item has-feedback label="需求状态" name="reqStatus">
              <a-select
                  v-model:value="form.reqStatus"
                  :allow-clear="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  :show-search="true"
                  option-filter-prop="children"
                  placeholder="请选择需求状态"
              >
                <a-select-option
                    v-for="item in reqStatusList"
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
      <a-button :loading="loading" title="保存" type="primary" @click="saveForm">保存</a-button>
      <a-button ghost title="返回" type="primary" @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { emits, usePmsRequireReceiveForm } from './ts/PmsRequireReceiveForm'; // 引入表单ts
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
  procureStageList,
  planTypeList,
  sourceTypeList,
  proposedSourcingMethodList,
  productServiceCategoryList,
  reqStatusList,
  saveForm,
  closeModal
} = usePmsRequireReceiveForm({
  props: props,
  emit: emit
});
</script>

