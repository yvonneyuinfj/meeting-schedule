<template>
        <AvicModal :visible="true" title="添加" width="1000px" height="520px" :centered="true" @cancel="closeModal">
          <a-spin :spinning="loading">
            <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
              <a-row>
                <a-col v-bind="colLayout.cols">
                  <a-form-item name="reportDate" label="申报月份" has-feedback>
                    <a-date-picker v-model:value="form.reportDate" :auto-focus="true" format="YYYY-MM" value-format="YYYY-MM"
                      placeholder="请选择申报月份" picker=month />
                  </a-form-item>
                </a-col>
                <a-col v-bind="colLayout.cols">
                  <a-form-item label="" :label-col="{ background: '#fff', border: 'none' }" has-feedback>
                    <a-input :disabled="true" :maxLength="512" default-value="B类及以上设备完好率、MTBF、MTTR上报"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col v-bind="colLayout.cols">
                  <a-form-item name="reportDeptId" label="填报部门" has-feedback>
                    <AvicCommonSelect v-model:value="form.reportDeptId" type="deptSelect" placeholder="请选择填报部门" :disabled="true"
                      :defaultShowValue="form.reportDeptName" />
                  </a-form-item>
                </a-col>
                <a-col v-bind="colLayout.cols">
                  <a-form-item name="applyUserId" label="填报人" has-feedback>
                    <AvicCommonSelect v-model:value="form.applyUserId" type="userSelect" placeholder="请选择填报人" :disabled="true"
                      :defaultShowValue="form.applyUserName" />
                  </a-form-item>
                </a-col>
                <a-col v-bind="colLayout.cols">
                  <a-form-item name="applyDate" label="填报日期" has-feedback>
                    <a-date-picker v-model:value="form.applyDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                      placeholder="请选择填报日期" :disabled="true" />
                  </a-form-item>
                </a-col>
                <a-col v-bind="colLayout.cols">
                  <a-form-item name="equipmentIntegrityRate" label="设备完好率(%)">
                    <a-input v-model:value="form.equipmentIntegrityRate" :maxLength="16" placeholder="请输入设备完好率(%)"
                      :disabled="true" />
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
            <div style="margin: 0">
              <p style="margin: 0">1、B类及以上设备是指A类、B类设备。</p>
              <p style="margin: 0">2、设备完好填“1”不完好填“0”。</p>
              <p style="margin: 0">3、改造期超过一个月的设备，不列入设备完好率统计。</p>
              <p style="margin: 0">4、闲置设备不列入设备完好率统计。</p>
              <p style="margin: 0">5、完好率=Σ日完好设备（）/月份天数（）/设备总台数（）×100%。</p>
              <p style="margin: 0">6、故障平均时间=年内设备运行时间（）/年内故障次数（）。</p>
              <p style="margin: 0">7、故障平均修复时间=年内设备故障修复时间（）/年内故障总数（）。</p>
              <p style="margin: 0">8、示例：某设备工作80h后发生故障，修复后工作60h又发生故障，再修复后又工作70h发生故障，则设备在这段时期内设备平均故障间隔期（MTBF）=（80h+60h+70h）/3=70h。
              </p>
            </div>
            <!-- <TpmIntactRatioMtbfMttrLEdit ref="tpmIntactRatioMtbfMttrLEdit" :reportDate="reportDate"
                                   :readOnly="props.readOnly"/> -->
          </a-spin>
          <template #footer>
            <!-- <a-button title="保存并启动流程" v-if="startLoading" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程
      </a-button> -->
            <a-button title="保存" v-if="saveLoading" type="primary" :loading="loading" @click="saveFormMain">保存
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useTpmIntactRatioMtbfMttrForm, emits } from './ts/TpmIntactRatioMtbfMttrForm'; // 引入表单ts
// import TpmIntactRatioMtbfMttrLEdit from '@/views/avic/mms/tpm/tpmintactratiomtbfmttrl/TpmIntactRatioMtbfMttrLEdit.vue';

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
  },
  // 保存并启动流程
  startLoading: {
    type: Boolean,
    default: false
  },
  // 保存并返回
  saveLoading: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(emits);
const reportDate = ref();
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  closeModal,
  saveForm,
  saveFormMain
} = useTpmIntactRatioMtbfMttrForm({
  props: props,
  emit: emit
});

watch(
  () => form.value.reportDate,
  newV => {
    reportDate.value = newV;
  },
  { immediate: true }
);
</script>
