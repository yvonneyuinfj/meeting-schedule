<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyNo" label="申请单号">
              <a-input v-model:value="form.applyNo" :maxLength="64" :auto-focus="true" placeholder="请输入申请单号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="capitalAssetName" label="固定资产名称">
              <a-input v-model:value="form.capitalAssetName" :maxLength="64" placeholder="请输入固定资产名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="capitalAssetDept" label="固定资产主管部门">
              <AvicCommonSelect v-model:value="form.capitalAssetDept" type="deptSelect" placeholder="请选择固定资产主管部门" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynScientific" label="是否科研用">
              <a-select v-model:value="form.ynScientific" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否科研用">
                <a-select-option v-for="item in ynScientificList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetItemId" label="预算项目ID">
              <a-input v-model:value="form.budgetItemId" :maxLength="64" placeholder="请输入预算项目ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetItemName" label="预算项目名称">
              <a-input v-model:value="form.budgetItemName" :maxLength="64" placeholder="请输入预算项目名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetSubItem" label="预算分项">
              <a-input v-model:value="form.budgetSubItem" :maxLength="64" placeholder="请输入预算分项" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetOrg" label="预算组织">
              <a-input v-model:value="form.budgetOrg" :maxLength="64" placeholder="请输入预算组织" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseNum" label="购置数量">
              <a-input v-model:value="form.purchaseNum" :maxLength="22" placeholder="请输入购置数量" @input="calculate" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetUnivalent" label="预算单价（元）">
              <a-input v-model:value="form.budgetUnivalent" :maxLength="22" placeholder="请输入预算单价（元）" @input="calculate" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="budgetTotal" label="预算总价（元）">
              <a-input v-model:value="form.budgetTotal" :maxLength="22" placeholder="请输入预算总价（元）" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynReview" label="是否需要评审">
              <a-select v-model:value="form.ynReview" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否需要评审">
                <a-select-option v-for="item in ynReviewList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tel" label="联系电话">
              <a-input v-model:value="form.tel" :maxLength="50" placeholder="请输入联系电话" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityDate" label="需求日期">
              <a-date-picker v-model:value="form.qualityDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择需求日期" :default-value="dayjs().format('YYYY-MM-DD')" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="goodsLevel" label="物资等级">
              <a-select v-model:value="form.goodsLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择物资等级">
                <a-select-option v-for="item in goodsLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="applyReason" label="申请理由">
              <a-textarea v-model:value="form.applyReason" :rows="2" :maxLength="4000" placeholder="请输入申请理由" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="reqAndAdvise" label="要求及建议">
              <a-textarea v-model:value="form.reqAndAdvise" :rows="2" :maxLength="4000" placeholder="请输入要求及建议" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="note" label="备注">
              <a-textarea v-model:value="form.note" :rows="2" :maxLength="4000" placeholder="请输入备注" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appllDeptId" label="申请部门">
              <AvicCommonSelect v-model:value="form.appllDeptId" type="deptSelect" placeholder="请选择申请部门"
                :defaultShowValue='proxy.$getLoginUser().deptName' disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请时间">
              <a-input v-model:value="form.applyDate" :maxLength="64" placeholder="请输入申请时间" disabled
                :default-value="dayjs().format('YYYY-MM-DD')" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="title" label="标题">
              <a-input v-model:value="form.title" :maxLength="200" placeholder="请输入标题" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="add" ref="uploadFile" :allow-download="true" :allow-preview="true"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                table-name="FAM_ADD_APPLY_MANAGE" @afterUpload="afterUploadEvent" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存并启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">保存并启动流程</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAddApplyManageForm, emits } from './ts/FamAddApplyManageForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  params: {
    type: Object,
    required: false,
    default: null
  },
  bpmOperatorRefresh: {
    type: Function
  }
});
const { proxy } = getCurrentInstance();
import dayjs from 'dayjs';
const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  ynScientificList,
  ynReviewList,
  goodsLevelList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  saveAndStartProcess,
  closeModal
} = useFamAddApplyManageForm({
  props: props,
  emit: emit
});
onMounted(() => {
  form.value.qualityDate = dayjs().format('YYYY-MM-DD');
  form.value.appllDeptId = proxy.$getLoginUser().deptId;
  form.value.applyDate = dayjs().format('YYYY-MM-DD');
});

function calculate() {
  form.value.budgetTotal = (form.value.budgetUnivalent || 0) * (form.value.purchaseNum || 0);
}
</script>
