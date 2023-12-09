<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectCode" label="项目编号" has-feedback>
              <a-input v-model:value="form.projectCode" :maxLength="64" :auto-focus="true" placeholder="请输入项目编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称" has-feedback>
              <a-input v-model:value="form.projectName" :maxLength="128" placeholder="请输入项目名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectDesc" label="项目描述">
              <a-input v-model:value="form.projectDesc" :maxLength="2048" placeholder="请输入项目描述" />
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
              <a-select v-model:value="form.projectSecretClass"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择项目密级">
                <a-select-option v-for="item in projectSecretClassList" :key="item.sysLookupTlId"
                  :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectStatus" label="项目状态" has-feedback>
              <a-select v-model:value="form.projectStatus" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择项目状态">
                <a-select-option v-for="item in projectStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectApprovalDate" label="立项日期" has-feedback>
              <a-date-picker v-model:value="form.projectApprovalDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择立项日期" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectManagerId" label="项目经理">
              <AvicCommonSelect v-model:value="form.projectManagerId" type="userSelect" placeholder="请选择项目经理" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="projectManagerCode" label="项目经理CODE">
              <a-input v-model:value="form.projectManagerCode" :maxLength="64" placeholder="请输入项目经理CODE" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="projectManagerName" label="项目经理NAME">
              <a-input v-model:value="form.projectManagerName" :maxLength="128" placeholder="请输入项目经理NAME" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responsibleDeptId" label="责任部门">
              <AvicCommonSelect v-model:value="form.responsibleDeptId" type="deptSelect" placeholder="请选择责任部门" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="responsibleDeptCode" label="责任部门CODE">
              <a-input v-model:value="form.responsibleDeptCode" :maxLength="128" placeholder="请输入责任部门CODE" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="responsibleDeptName" label="责任部门NAME">
              <a-input v-model:value="form.responsibleDeptName" :maxLength="128" placeholder="请输入责任部门NAME" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectResponsiblePerson" label="项目负责人">
              <AvicCommonSelect v-model:value="form.projectResponsiblePerson" type="userSelect" placeholder="请选择项目负责人" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectDuration" label="工期(天)">
              <a-input v-model:value="form.projectDuration" :maxLength="64" placeholder="请输入工期(天)" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planStartDate" label="项目计划开始时间">
              <a-date-picker v-model:value="form.planStartDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目计划开始时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planEndDate" label="项目计划结束时间">
              <a-date-picker v-model:value="form.planEndDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目计划结束时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actualStartDate" label="项目实际开始时间">
              <a-date-picker v-model:value="form.actualStartDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目实际开始时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="actualEndDate" label="项目实际结束时间">
              <a-date-picker v-model:value="form.actualEndDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择项目实际结束时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currencyType" label="币种">
              <a-select v-model:value="form.currencyType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择币种">
                <a-select-option v-for="item in currencyTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynProduction" label="是否实物生产" has-feedback>
              <a-select v-model:value="form.ynProduction" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否实物生产">
                <a-select-option v-for="item in ynProductionList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="industryType" label="项目所属行业">
              <a-select v-model:value="form.industryType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择项目所属行业">
                <a-select-option v-for="item in industryTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="businessArea" label="所属业务域">
              <a-select v-model:value="form.businessArea" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择所属业务域">
                <a-select-option v-for="item in businessAreaList" :key="item.sysLookupTlId" :value="item.lookupCode">
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
              <a-form-item name="mdsCustomerId" label="客户">
                <a-input v-model:value="form.mdsCustomerIdAlias" :maxLength="64" placeholder="请选择客户" :readonly="true"
                  @click="handleOpen">
                  <template #suffix>
                    <a-tooltip title="客户">
                      <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                    </a-tooltip>
                  </template></a-input>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="applyUserId" label="申请人">
                <AvicCommonSelect v-model:value="form.applyUserId" type="userSelect" placeholder="请选择申请人"
                  :defaultShowValue='proxy.$getLoginUser().name' disabled />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="applyUserCode" label="申请人编码">
                <a-input v-model:value="form.applyUserCode" :maxLength="64" placeholder="请输入申请人编码" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="applyUserName" label="申请人名称">
                <a-input v-model:value="form.applyUserName" :maxLength="64" placeholder="请输入申请人名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="applyedDeptId" label="申请部门">
                <AvicCommonSelect v-model:value="form.applyedDeptId" type="deptSelect" placeholder="请选择申请部门"
                  :defaultShowValue='proxy.$getLoginUser().deptName' disabled />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="applyedDeptCode" label="申请部门编码">
                <a-input v-model:value="form.applyedDeptCode" :maxLength="64" placeholder="请输入申请部门编码" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="applyedDeptName" label="申请部门名称">
                <a-input v-model:value="form.applyedDeptName" :maxLength="64" placeholder="请输入申请部门名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="balanceFlag" label="是否按项目号平衡">
                <a-select v-model:value="form.balanceFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否按项目号平衡">
                  <a-select-option v-for="item in balanceFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="proMdsItemId" label="产品">
                <a-input v-model:value="form.proMdsItemIdAlias" :maxLength="64" placeholder="请输入产品" :readonly="true"
                  @click="proMdsItemOpen">
                  <template #suffix>
                    <a-tooltip title="产品">
                      <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                    </a-tooltip>
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="validFlag" label="有效标识">
                <a-select v-model:value="form.validFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择有效标识">
                  <a-select-option v-for="item in validFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="remark" label="备注">
                <a-input v-model:value="form.remark" :maxLength="2048" placeholder="请输入备注" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="projectType" label="项目类型" has-feedback>
                <a-select v-model:value="form.projectType" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择项目类型">
                  <a-select-option v-for="item in projectTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="applicationType" label="应用类型" has-feedback>
                <a-select v-model:value="form.applicationType" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择应用类型">
                  <a-select-option v-for="item in applicationTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="applyDate" label="申请日期">
                <a-date-picker v-model:value="form.applyDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  placeholder="请选择申请日期" disabled :defaultValue="currentTime" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="cooperationDeptId" label="协作部门">
                <AvicCommonSelect v-model:value="form.cooperationDeptId" type="deptSelect" placeholder="请选择协作部门" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="cooperationDeptCode" label="协作部门CODE">
                <a-input v-model:value="form.cooperationDeptCode" :maxLength="128" placeholder="请输入协作部门CODE" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols" hidden>
              <a-form-item name="cooperationDeptName" label="协作部门NAME">
                <a-input v-model:value="form.cooperationDeptName" :maxLength="128" placeholder="请输入协作部门NAME" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="secretLevel" label="密级 " has-feedback>
                <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级 ">
                  <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols2">
              <a-form-item label="附件">
                <AvicUploader element-id="1" form-type="add" ref="uploadFile" :allow-download="true" :allow-preview="true"
                  :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                  :form-secret-level="form.secretLevel" table-name="MDS_PROJECT" @afterUpload="afterUploadEvent" />
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
      <!--选择产品弹窗-->
      <a-modal :visible="openMdsItem" title="选择产品" @ok="handleOk2" @cancel="handleCancel2" width="80%" style="top: 20px">
        <div style="height: 400px;overflow: auto">
          <Mds-item-select ref="mdsItemSelect">
          </Mds-item-select>
        </div>
      </a-modal>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsProjectForm, emits } from './ts/MdsProjectForm'; // 引入表单ts
import MdsCustomerSelect from './MdsCustomerSelect.vue'; // 引入弹窗选择页
import MdsItemSelect from './MdsItemSelect.vue'; // 引入产品弹窗选择页
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const open = ref<boolean>(false);
const mdsCustomerSelect = ref(null);
const openMdsItem = ref<boolean>(false);
const mdsItemSelect = ref(null);
/** 选择客户 */
function handleOpen() {
  open.value = true;
}
/** 选择产品 */
function proMdsItemOpen() {
  openMdsItem.value = true;
}

const handleCancel = () => {
  open.value = false;
};
const handleCancel2 = () => {
  openMdsItem.value = false;
};

const handleOk = () => {
  const info = mdsCustomerSelect.value.info;
  form.value.mdsCustomerId = info.id;
  form.value.mdsCustomerIdAlias = info.customerName;
  open.value = false;
};

const handleOk2 = () => {
  const info = mdsItemSelect.value.info;
  form.value.proMdsItemId = info.id;
  form.value.proMdsItemIdAlias = info.itemName;
  openMdsItem.value = false;
};
import dayjs from 'dayjs';
const currentTime = ref(dayjs().format('YYYY-MM-DD'));
const emit = defineEmits(emits);
const { proxy } = getCurrentInstance();
onMounted(() => {
  form.value.applyDate = currentTime;
  form.value.applyUserId = proxy.$getLoginUser().id;
  form.value.applyUserCode = proxy.$getLoginUser().no;
  form.value.applyUserName = proxy.$getLoginUser.name;
  form.value.applyedDeptId = proxy.$getLoginUser().deptId;
  form.value.applyedDeptCode = proxy.$getLoginUser().deptName;
  form.value.applyedDeptName = proxy.$getLoginUser().deptName;
});
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  projectGradeList,
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
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  mdsCustomerTypeList
} = useMdsProjectForm({
  props: props,
  emit: emit
});
</script>

