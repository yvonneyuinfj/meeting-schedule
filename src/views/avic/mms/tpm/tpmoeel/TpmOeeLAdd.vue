<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsCode" label="资产编号" has-feedback>
              <a-input v-model:value="form.assetsCode" :maxLength="64" :auto-focus="true" placeholder="请输入资产编号"
                       :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号" has-feedback>
              <a-input v-model:value="form.equipmentCode" :maxLength="64" :auto-focus="true"
                       placeholder="请选择设备编号"
                       :readonly="true" @click="handleOpen"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentName" label="设备名称" has-feedback>
              <a-input v-model:value="form.equipmentName" :maxLength="64" placeholder="请输入设备名称"
                       :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testMission" label="试验任务/件号" has-feedback>
              <a-input v-model:value="form.testMission" :maxLength="64" placeholder="请输入试验任务/件号"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="theoreticalExperimentTime" label="理论试验/加工时间">
              <a-input v-model:value="form.theoreticalExperimentTime" :maxLength="16"
                       placeholder="请输入理论试验/加工时间"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="totalTime" label="总时间（h）" has-feedback>
              <a-input v-model:value="form.totalTime" :maxLength="16" placeholder="请输入总时间（h）"
                       @change="calculateOEE"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planStopDurationTime" label="计划停机时间（h）" has-feedback>
              <a-input v-model:value="form.planStopDurationTime" :maxLength="16" placeholder="请输入计划停机时间（h）"
                       @change="calculateOEE"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workDurationTime" label="开动时间（h）" has-feedback>
              <a-input v-model:value="form.workDurationTime" :maxLength="16" placeholder="请输入开动时间（h）"
                       @change="calculateTestSuccessRateOrQualifiedProductRate"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="freeTime" label="空闲待工时间（h）" has-feedback>
              <a-input v-model:value="form.freeTime" :maxLength="16" placeholder="请输入空闲待工时间（h）"
                       @change="calculateOEE"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="adjustTime" label="准备调整时间（h）" has-feedback>
              <a-input v-model:value="form.adjustTime" :maxLength="16" placeholder="请输入准备调整时间（h）"
                       @change="calculateOEE"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stopDurationTime" label="故障停机时间（h）" has-feedback>
              <a-input v-model:value="form.stopDurationTime" :maxLength="16" placeholder="请输入故障停机时间（h）"
                       @change="calculateTestSuccessRateOrQualifiedProductRate"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stopDurationNumber" label="故障停机次数" has-feedback>
              <a-input v-model:value="form.stopDurationNumber" :maxLength="16" placeholder="请输入故障停机次数"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mtbf" label="平均故障间隔时间MTBF(h)" has-feedback>
              <a-input v-model:value="form.mtbf" :maxLength="16" placeholder="请输入平均故障间隔时间MTBF(h)"
                       :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mttr" label="平均故障停机时间MTTR(h)" has-feedback>
              <a-input v-model:value="form.mttr" :maxLength="16" placeholder="请输入平均故障停机时间MTTR(h)"
                       :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="passRate" label="试验成功率/合格品率" has-feedback>
              <a-input v-model:value="form.passRate" :maxLength="16" placeholder="请输入试验成功率/合格品率"
                       :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oee" label="OEE" has-feedback>
              <a-input v-model:value="form.oee" :maxLength="16" placeholder="请输入OEE" :disabled="true"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" :maxLength="512" placeholder="请输入备注"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                        option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
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
    <!--选择设备弹窗-->
    <a-modal :visible="open" title="选择设备" @ok="handleOk" @cancel="handleCancel" width="80%" style="top: 20px">
      <div style="height: 400px;overflow: auto">
        <Tpm-inventory-oee-l-select ref="tpmInventoryOeeLSelect">
        </Tpm-inventory-oee-l-select>
      </div>
    </a-modal>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmOeeLForm, emits } from './ts/TpmOeeLForm'; // 引入表单ts
import TpmInventoryOeeLSelect from './TpmInventorySelect.vue'; // 引入弹窗选择页
import { TpmIntactRatioMtbfMttrLDto, getSpecifyYearList } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrLApi'; // 引入模块API
import { useUserStore } from '@/store/user';
import { TpmIntactRatioMtbfMttrDto } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi';
import dayjs from 'dayjs';

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
    type: String,
    default: ''
  },
  reportDate: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const open = ref<boolean>(false);
const tpmInventoryOeeLSelect = ref(null);
const { proxy } = getCurrentInstance();
const userInfo = useUserStore().userInfo;
const mainForm = ref<TpmIntactRatioMtbfMttrDto>({});
const subForm = ref<TpmIntactRatioMtbfMttrLDto>({});

const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  saveForm,
  closeModal
} = useTpmOeeLForm({
  props: props,
  emit: emit
});

/** 计算试验成功率/合格品率 */
function calculateTestSuccessRateOrQualifiedProductRate() {
  const workDurationTime = parseFloat(form.value.workDurationTime);
  const stopDurationTime = parseFloat(form.value.stopDurationTime);
  if (workDurationTime <= 0 || stopDurationTime <= 0) {
    return false;
  }
  const passRate = (workDurationTime - stopDurationTime) / workDurationTime * 100;
  if (!isNaN(passRate)) {
    form.value.passRate = passRate.toFixed(1).toString();
  }
  calculateOEE();
}

/** 计算OEE */
function calculateOEE() {
  // 开动时间
  const workDurationTime = parseFloat(form.value.workDurationTime);
  // 故障停机时间
  const stopDurationTime = parseFloat(form.value.stopDurationTime);
  // 总时间
  const totalTime = parseFloat(form.value.totalTime);
  // 计划停机时间
  const planStopDurationTime = parseFloat(form.value.planStopDurationTime);
  // 空闲待工时间
  const freeTime = parseFloat(form.value.freeTime);
  // 准备调整时间
  const adjustTime = parseFloat(form.value.adjustTime);

  if (workDurationTime <= 0 || stopDurationTime <= 0 || totalTime < 0 || planStopDurationTime < 0 || freeTime < 0 || adjustTime < 0) {
    return false;
  }
  const OEE = ((workDurationTime - stopDurationTime) / workDurationTime) * workDurationTime / (totalTime - planStopDurationTime - freeTime - adjustTime) * 100;
  if (!isNaN(OEE)) {
    form.value.oee = OEE.toFixed(1).toString();
  }
}

/** 选择设备 */
function handleOpen() {
  open.value = true;
}

const handleCancel = () => {
  open.value = false;
};

const handleOk = () => {
  const info = tpmInventoryOeeLSelect.value.info;
  form.value.assetsCode = info[0].assetsCode;
  form.value.tpmInventoryId = info[0].id;
  form.value.equipmentCode = info[0].equipmentCode;
  form.value.equipmentName = info[0].equipmentName;
  calculateMTBFOrMTTR();
  open.value = false;
};

function calculateMTBFOrMTTR() {
  let equipmentRunTime = 0;
  let repairTime = 0;
  let failureNumber = 0;
  let mtbf = 0;
  let mttr = 0;

  mainForm.value.reportDeptId = userInfo.deptId;
  const reportDate = dayjs(props.reportDate);
  mainForm.value.reportDateBegin = dayjs().year(reportDate.year()).startOf('year');
  mainForm.value.reportDateEnd = dayjs().year(reportDate.year()).month(reportDate.month()).endOf('month').format('YYYY-MM-DD');
  mainForm.value.orgIdentity = userInfo.orgId;

  subForm.value.equipmentCode = form.value.equipmentCode;

  const postForm = proxy.$lodash.cloneDeep(mainForm.value);
  const postSubForm = proxy.$lodash.cloneDeep(subForm.value);

  getSpecifyYearList(postForm, postSubForm)
      .then(res => {
        if (res.success) {
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            repairTime = repairTime + parseFloat(element.repairTime);
            equipmentRunTime = equipmentRunTime + parseFloat(element.equipmentRunTime);
            failureNumber = failureNumber + parseFloat(element.failureNumber);
          }

          mtbf = equipmentRunTime / failureNumber;
          mttr = repairTime / failureNumber;

          if (!isNaN(mtbf)) {
            form.value.mtbf = mtbf.toFixed(1).toString();
          }

          if (!isNaN(mttr)) {
            form.value.mttr = mttr.toFixed(1).toString();
          }
        }
      })
      .catch(() => {
      });
}
</script>

