<template>
  <div>
    <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
        class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reportDate')">
          <a-form-item name="reportDate" label="申报月份" :rules="fieldRequired('reportDate')" has-feedback>
            <a-date-picker
                v-model:value="form.reportDate"
                :auto-focus="true"
                format="YYYY-MM"
                value-format="YYYY-MM"
                :disabled="fieldDisabled('reportDate')"
                picker=month
                @change="reportDateChange"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('reportDeptId')">
          <a-form-item name="reportDeptId" label="填报部门" :rules="fieldRequired('reportDeptId')" has-feedback>
            <AvicCommonSelect
                v-model:value="form.reportDeptId"
                type="deptSelect"
                :defaultShowValue="form.reportDeptIdAlias"
                :disabled="fieldDisabled('reportDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyUserId')">
          <a-form-item name="applyUserId" label="填报人" :rules="fieldRequired('applyUserId')" has-feedback>
            <AvicCommonSelect
                v-model:value="form.applyUserId"
                type="userSelect"
                :defaultShowValue="form.applyUserIdAlias"
                :disabled="fieldDisabled('applyUserId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="填报日期" :rules="fieldRequired('applyDate')" has-feedback>
            <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabled="fieldDisabled('applyDate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('equipmentIntegrityRate')">
          <a-form-item name="equipmentIntegrityRate" label="设备完好率(%)"
                       :rules="fieldRequired('equipmentIntegrityRate')" has-feedback>
            <a-input
                v-model:value="form.equipmentIntegrityRate"
                :disabled="fieldDisabled('equipmentIntegrityRate')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('secretLevel')">
          <a-form-item name="secretLevel" label="密级" :rules="fieldRequired('secretLevel')" has-feedback>
            <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                :disabled="fieldDisabled('secretLevel')"
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
    <div style="margin: 0">
      <p style="margin: 0">1、B类及以上设备是指A类、B类设备。</p>
      <p style="margin: 0">2、设备完好填“1”不完好填“0”。</p>
      <p style="margin: 0">3、改造期超过一个月的设备，不列入设备完好率统计。</p>
      <p style="margin: 0">4、闲置设备不列入设备完好率统计。</p>
      <p style="margin: 0">5、完好率=Σ日完好设备（）/月份天数（）/设备总台数（）×100%。</p>
      <p style="margin: 0">6、故障平均时间=年内设备运行时间（）/年内故障次数（）。</p>
      <p style="margin: 0">7、故障平均修复时间=年内设备故障修复时间（）/年内故障总数（）。</p>
      <p style="margin: 0">8、示例：某设备工作80h后发生故障，修复后工作60h又发生故障，再修复后又工作70h发生故障，则设备在这段时期内设备平均故障间隔期（MTBF）=（80h+60h+70h）/3=70h。</p>
    </div>
          <TpmIntactRatioMtbfMttrLDetailManage
        v-if="fieldVisible('TPM_INTACT_RATIO_MTBF_MTTR_L')"
        ref="tpmIntactRatioMtbfMttrLEdit"
        :mainId="formId || form.id"
        :reportDate="reportDate"
        :readOnly="true"
        :bpmInstanceObject="bpmInstanceObject"
        :bpmParams="bpmParams"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
        class="eform_subtable_bpm_button_auth table-handle-button"
        for="addSubTableButton"
        label="添加"
        title="添加"
        style="display: none"
    >
      添加
    </a-button>
    <a-button
        class="eform_subtable_bpm_button_auth table-handle-button"
        for="deleteSubTableButton"
        label="删除"
        title="删除"
        style="display: none"
    >
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useTpmIntactRatioMtbfMttrForm, emits } from './ts/TpmIntactRatioMtbfMttrForm'; // 引入表单ts
import TpmIntactRatioMtbfMttrLDetailManage from '@/views/avic/mms/tpm/tpmintactratiomtbfmttrl/TpmIntactRatioMtbfMttrLDetailManage.vue'; // 引入子表组件

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(emits);
const reportDate = ref();
const {
  form,
  formRef,
  bpmParams,
  layout,
  colLayout,
  secretLevelList,
  tpmIntactRatioMtbfMttrLEdit,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useTpmIntactRatioMtbfMttrForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});

function reportDateChange(v) {
  reportDate.value = v;
}

watch(
  () => form.value.reportDate,
  newV => {
    reportDate.value = newV;
  },
  { immediate: true }
);
</script>


