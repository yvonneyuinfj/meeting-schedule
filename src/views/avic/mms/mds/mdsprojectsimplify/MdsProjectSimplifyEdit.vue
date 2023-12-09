<template>
  <AvicModal
    :visible="true"
    title="编辑"
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
            <a-form-item name="projectCode" label="项目编号" has-feedback>
              <a-input
                v-model:value="form.projectCode"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入项目编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称" has-feedback>
              <a-input
                v-model:value="form.projectName"
                :maxLength="128"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectDesc" label="项目描述">
              <a-input
                v-model:value="form.projectDesc"
                :maxLength="2048"
                placeholder="请输入项目描述"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectGrade" label="项目等级" has-feedback>
              <a-select v-model:value="form.projectGrade" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择项目等级">
                <a-select-option v-for="item in projectGradeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectSecretClass" label="项目密级" has-feedback>
              <a-select
                v-model:value="form.projectSecretClass"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择项目密级"
              >
                <a-select-option
                  v-for="item in projectSecretClassList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectStatus" label="项目状态" has-feedback>
              <a-select
                v-model:value="form.projectStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择项目状态"
              >
                <a-select-option
                  v-for="item in projectStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectApprovalDate" label="立项日期" has-feedback>
              <a-date-picker
                v-model:value="form.projectApprovalDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择立项日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectManagerId" label="项目经理">
              <AvicCommonSelect
                v-model:value="form.projectManagerId"
                type="userSelect"
                placeholder="请选择项目经理"
                :defaultShowValue="form.projectManagerIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responsibleDeptId" label="责任部门">
              <AvicCommonSelect
                v-model:value="form.responsibleDeptId"
                type="deptSelect"
                placeholder="请选择责任部门"
                :defaultShowValue="form.responsibleDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectResponsiblePerson" label="项目负责人">
              <AvicCommonSelect
                v-model:value="form.projectResponsiblePerson"
                type="userSelect"
                placeholder="请选择项目负责人"
                :defaultShowValue="form.projectResponsiblePersonAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectDuration" label="工期(天)">
              <a-input
                v-model:value="form.projectDuration"
                :maxLength="64"
                placeholder="请输入工期(天)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planStartDate" label="项目计划开始时间">
              <a-date-picker
                v-model:value="form.planStartDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择项目计划开始时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planEndDate" label="项目计划结束时间">
              <a-date-picker
                v-model:value="form.planEndDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择项目计划结束时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actualStartDate" label="项目实际开始时间">
              <a-date-picker
                v-model:value="form.actualStartDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择项目实际开始时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actualEndDate" label="项目实际结束时间">
              <a-date-picker
                v-model:value="form.actualEndDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择项目实际结束时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currencyType" label="币种">
              <a-select
                v-model:value="form.currencyType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择币种"
              >
                <a-select-option
                  v-for="item in currencyTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsProjectSimplifyId" label="上级项目ID">
              <a-input
                v-model:value="form.parentMdsProjectSimplifyId"
                :maxLength="64"
                placeholder="请输入上级项目ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynProduction" label="是否实物生产" has-feedback>
              <a-select
                v-model:value="form.ynProduction"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否实物生产"
              >
                <a-select-option
                  v-for="item in ynProductionList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="industryType" label="项目所属行业">
              <a-select
                v-model:value="form.industryType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择项目所属行业"
              >
                <a-select-option
                  v-for="item in industryTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="businessArea" label="所属业务域">
              <a-select
                v-model:value="form.businessArea"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择所属业务域"
              >
                <a-select-option
                  v-for="item in businessAreaList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCustomerTypeId" label="客户类型">
              <a-select v-model:value="form.mdsCustomerTypeId"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请输入客户类型">
                <a-select-option v-for="item in mdsCustomerTypeList" :key="item.id" :value="item.id">
                  {{ item.typeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCustomerIdName" label="客户ID">
              <a-input
                v-model:value="form.mdsCustomerIdName"
                :maxLength="64"
                placeholder="请输入客户ID"
                :readonly="true"
                @click="handleOpen"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserId" label="申请人">
              <AvicCommonSelect
                v-model:value="form.applyUserId"
                type="userSelect"
                placeholder="请选择申请人"
                :defaultShowValue="form.applyUserIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyedDeptId" label="申请部门">
              <AvicCommonSelect
                v-model:value="form.applyedDeptId"
                type="deptSelect"
                placeholder="请选择申请部门"
                :defaultShowValue="form.applyedDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="balanceFlag" label="是否按项目号平衡">
              <a-select
                v-model:value="form.balanceFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否按项目号平衡"
              >
                <a-select-option
                  v-for="item in balanceFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemId" label="产品ID">
              <a-input
                v-model:value="form.proMdsItemId"
                :maxLength="64"
                placeholder="请输入产品ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="有效标识">
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
            <a-form-item name="remark" label="备注">
              <a-input
                v-model:value="form.remark"
                :maxLength="2048"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectType" label="项目类型" has-feedback>
              <a-select
                v-model:value="form.projectType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择项目类型"
              >
                <a-select-option
                  v-for="item in projectTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applicationType" label="应用类型" has-feedback>
              <a-select
                v-model:value="form.applicationType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择应用类型"
              >
                <a-select-option
                  v-for="item in applicationTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
            <a-form-item name="cooperationDeptId" label="协作部门">
              <AvicCommonSelect
                v-model:value="form.cooperationDeptId"
                type="deptSelect"
                placeholder="请选择协作部门"
                :defaultShowValue="form.cooperationDeptIdAlias"
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
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
    <!--选择客户弹窗-->
    <a-modal :visible="open" title="选择客户" @ok="handleOk" @cancel="handleCancel" width="80%" style="top: 20px">
      <div style="height: 400px;overflow: auto">
        <Mds-customer-select ref="mdsCustomerSelect">
        </Mds-customer-select>
      </div>
    </a-modal>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsProjectSimplifyForm, emits } from './ts/MdsProjectSimplifyForm'; // 引入表单ts
import MdsCustomerSelect from './MdsCustomerSelect.vue'; // 引入弹窗选择页
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const open = ref<boolean>(false);
const mdsCustomerSelect = ref(null);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  projectSecretClassList,
  projectStatusList,
  currencyTypeList,
  ynProductionList,
  industryTypeList,
  businessAreaList,
  balanceFlagList,
  validFlagList,
  projectTypeList,
  applicationTypeList,
  secretLevelList,
  saveForm,
  closeModal,
  mdsCustomerTypeList,
  projectGradeList
} = useMdsProjectSimplifyForm({
  props: props,
  emit: emit
});

/** 选择客户 */
function handleOpen() {
  open.value = true;
}

const handleCancel = () => {
  open.value = false;
};

const handleOk = () => {
  const info = mdsCustomerSelect.value.info;
  form.value.mdsCustomerId = info.id;
  form.value.mdsCustomerIdName = info.customerName;
  open.value = false;
};
</script>

