<template>
  <div>
    <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyNo')">
          <a-form-item name="applyNo" label="申请单号" :rules="fieldRequired('applyNo')" has-feedback>
            <a-input v-model:value="form.applyNo" :auto-focus="true" :disabled="fieldDisabled('applyNo')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('capitalAssetName')">
          <a-form-item name="capitalAssetName" label="固定资产名称" :rules="fieldRequired('capitalAssetName')" has-feedback>
            <a-input v-model:value="form.capitalAssetName" :disabled="fieldDisabled('capitalAssetName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('capitalAssetDept')">
          <a-form-item name="capitalAssetDept" label="固定资产主管部门" :rules="fieldRequired('capitalAssetDept')" has-feedback>
            <AvicCommonSelect v-model:value="form.capitalAssetDept" type="deptSelect"
              :defaultShowValue="form.capitalAssetDeptAlias" :disabled="fieldDisabled('capitalAssetDept')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('ynScientific')">
          <a-form-item name="ynScientific" label="是否科研用" :rules="fieldRequired('ynScientific')" has-feedback>
            <a-select v-model:value="form.ynScientific" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('ynScientific')">
              <a-select-option v-for="item in ynScientificList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetItemId')">
          <a-form-item name="budgetItemId" label="预算项目ID" :rules="fieldRequired('budgetItemId')" has-feedback>
            <a-input v-model:value="form.budgetItemId" :disabled="fieldDisabled('budgetItemId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetItemName')">
          <a-form-item name="budgetItemName" label="预算项目名称" :rules="fieldRequired('budgetItemName')" has-feedback>
            <a-input v-model:value="form.budgetItemName" :disabled="fieldDisabled('budgetItemName')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetSubItem')">
          <a-form-item name="budgetSubItem" label="预算分项" :rules="fieldRequired('budgetSubItem')" has-feedback>
            <a-input v-model:value="form.budgetSubItem" :disabled="fieldDisabled('budgetSubItem')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetOrg')">
          <a-form-item name="budgetOrg" label="预算组织" :rules="fieldRequired('budgetOrg')" has-feedback>
            <a-input v-model:value="form.budgetOrg" :disabled="fieldDisabled('budgetOrg')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('purchaseNum')">
          <a-form-item name="purchaseNum" label="购置数量" :rules="fieldRequired('purchaseNum')" has-feedback>
            <a-input v-model:value="form.purchaseNum" :disabled="fieldDisabled('purchaseNum')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetUnivalent')">
          <a-form-item name="budgetUnivalent" label="预算单价（元）" :rules="fieldRequired('budgetUnivalent')" has-feedback>
            <a-input v-model:value="form.budgetUnivalent" :disabled="fieldDisabled('budgetUnivalent')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('budgetTotal')">
          <a-form-item name="budgetTotal" label="预算总价（元）" :rules="fieldRequired('budgetTotal')" has-feedback>
            <a-input v-model:value="form.budgetTotal" :disabled="fieldDisabled('budgetTotal')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('ynReview')">
          <a-form-item name="ynReview" label="是否需要评审" :rules="fieldRequired('ynReview')" has-feedback>
            <a-select v-model:value="form.ynReview" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true" :disabled="fieldDisabled('ynReview')">
              <a-select-option v-for="item in ynReviewList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('tel')">
          <a-form-item name="tel" label="联系电话" :rules="fieldRequired('tel')" has-feedback>
            <a-input v-model:value="form.tel" :disabled="fieldDisabled('tel')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('qualityDate')">
          <a-form-item name="qualityDate" label="需求日期" :rules="fieldRequired('qualityDate')" has-feedback>
            <a-date-picker v-model:value="form.qualityDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('qualityDate')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('goodsLevel')">
          <a-form-item name="goodsLevel" label="物资等级" :rules="fieldRequired('goodsLevel')" has-feedback>
            <a-select v-model:value="form.goodsLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children" :show-search="true" :allow-clear="true"
              :disabled="fieldDisabled('goodsLevel')" placeholder="请选择物资等级">
              <a-select-option v-for="item in goodsLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('applyReason')">
          <a-form-item name="applyReason" label="申请理由" :rules="fieldRequired('applyReason')" has-feedback>
            <a-textarea v-model:value="form.applyReason" :rows="2" :disabled="fieldDisabled('applyReason')" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('reqAndAdvise')">
          <a-form-item name="reqAndAdvise" label="要求及建议" :rules="fieldRequired('reqAndAdvise')" has-feedback>
            <a-textarea v-model:value="form.reqAndAdvise" :rows="2" :disabled="fieldDisabled('reqAndAdvise')" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="colLayout.cols2" v-if="fieldVisible('note')">
          <a-form-item name="note" label="备注" :rules="fieldRequired('note')" has-feedback>
            <a-textarea v-model:value="form.note" :rows="2" :disabled="fieldDisabled('note')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('appllDeptId')">
          <a-form-item name="appllDeptId" label="申请部门" :rules="fieldRequired('appllDeptId')" has-feedback>
            <AvicCommonSelect v-model:value="form.appllDeptId" type="deptSelect" placeholder="请选择申请部门"
              :defaultShowValue="form.appllDeptIdAlias" :disabled="fieldDisabled('appllDeptId')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('applyDate')">
          <a-form-item name="applyDate" label="申请时间" :rules="fieldRequired('applyDate')" has-feedback>
            <a-input v-model:value="form.applyDate" :disabled="fieldDisabled('applyDate')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('title')">
          <a-form-item name="title" label="标题" :rules="fieldRequired('title')" has-feedback>
            <a-input v-model:value="form.title" :disabled="fieldDisabled('title')" />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader element-id="1" ref="uploadFile" label="上传附件" :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject" :form-secret-level="form.secretLevel" :allow-download="true"
              table-name="FAM_ADD_APPLY_MANAGE" @afterUpload="afterUploadEvent" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
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
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  ynScientificList,
  ynReviewList,
  goodsLevelList,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamAddApplyManageForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>
