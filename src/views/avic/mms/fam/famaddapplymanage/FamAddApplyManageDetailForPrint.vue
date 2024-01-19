<template>
  <AvicModal :visible="true" title="打印页面" width="960px" height="520px" :centered="true" fullScreen="true"
    @cancel="closeModal">
    <a-spin :spinning="loading">
      <div id="printArea">
        <div class="formprint">
          <a-form ref="formRef" :model="form" v-bind="layout" class="form-excel-style">
            <a-row>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="applyNo" label="申请单号">
                  <a-input v-model:value="form.applyNo" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="capitalAssetName" label="固定资产名称">
                  <a-input v-model:value="form.capitalAssetName" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="capitalAssetDept" label="固定资产主管部门">
                  <!-- <AvicCommonSelect v-model:value="form.capitalAssetDept" type="deptSelect"
                  :defaultShowValue="form.capitalAssetDeptAlias" /> -->
                  <a-input v-model:value="form.capitalAssetDeptAlias" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="ynScientific" label="是否科研用">
                  <a-select v-model:value="form.ynScientific" :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children" :show-search="true" :allow-clear="true" :disabled="true">
                    <a-select-option v-for="item in ynScientificList" :key="item.sysLookupTlId" :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="budgetItemId" label="预算项目ID">
                  <a-input v-model:value="form.budgetItemId" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="budgetItemName" label="预算项目名称">
                  <a-input v-model:value="form.budgetItemName" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="budgetSubItem" label="预算分项">
                  <a-input v-model:value="form.budgetSubItem" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="budgetOrg" label="预算组织">
                  <a-input v-model:value="form.budgetOrg" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="purchaseNum" label="购置数量">
                  <a-input v-model:value="form.purchaseNum" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="budgetUnivalent" label="预算单价（元）">
                  <a-input v-model:value="form.budgetUnivalent" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="budgetTotal" label="预算总价（元）">
                  <a-input v-model:value="form.budgetTotal" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="ynReview" label="是否需要评审">
                  <a-select v-model:value="form.ynReview" :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children" :show-search="true" :allow-clear="true" :disabled="true">
                    <a-select-option v-for="item in ynReviewList" :key="item.sysLookupTlId" :value="item.lookupCode">
                      {{ item.lookupName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="tel" label="联系电话">
                  <a-input v-model:value="form.tel" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="qualityDate" label="需求日期">
                  <a-date-picker v-model:value="form.qualityDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                    :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="goodsLevel" label="物资等级">
                  <a-select v-model:value="form.goodsLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                    option-filter-prop="children" :show-search="true" :allow-clear="true" :disabled="true">
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
                  <a-textarea v-model:value="form.applyReason" :rows="2" :disabled="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col v-bind="colLayout.cols2">
                <a-form-item name="reqAndAdvise" label="要求及建议">
                  <a-textarea v-model:value="form.reqAndAdvise" :rows="2" :disabled="true" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col v-bind="colLayout.cols2">
                <a-form-item name="note" label="备注">
                  <a-textarea v-model:value="form.note" :rows="2" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="appllDeptId" label="申请部门">
                  <AvicCommonSelect v-model:value="form.appllDeptId" type="deptSelect" placeholder="请选择申请部门"
                    :defaultShowValue="form.appllDeptIdAlias" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="applyDate" label="申请时间">
                  <a-input v-model:value="form.applyDate" :disabled="true" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item name="title" label="标题">
                  <a-input v-model:value="form.title" :disabled="true" />
                </a-form-item>
              </a-col>
              <!-- <a-col v-bind="colLayout.cols2">
              <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
                <AvicUploader element-id="1" ref="uploadFile" label="上传附件" :form-id="form.id"
                  :bpm-instance-object="props.bpmInstanceObject" :form-secret-level="form.secretLevel"
                  :allow-download="true" table-name="FAM_ADD_APPLY_MANAGE" @afterUpload="afterUploadEvent" />
              </a-form-item>
            </a-col> -->
            </a-row>
          </a-form>
        </div>
      </div>
    </a-spin>
    <template #footer>
      <a-button type="primary" v-print="printObj">打印</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamAddApplyManageForm, emits } from './ts/FamAddApplyManageForm'; // 引入表单ts
const printObj = {
  id: 'printArea',
  popTitle: '资产新增', // 打印配置页上方标题
  extraHead: '', //最上方的头部文字，附加在head标签上的额外标签,使用逗号分隔
  preview: '', // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
  previewTitle: '', // 打印预览的标题（开启预览模式后出现）,
  previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
  zIndex: '', // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）
  previewBeforeOpenCallback() { }, //预览窗口打开之前的callback（开启预览模式调用）
  previewOpenCallback() { }, // 预览窗口打开之后的callback（开启预览模式调用）
  beforeEntryIframe() {
    const cells = document.querySelectorAll('.cell')
      ;[].slice.call(cells).forEach(item => {
        // 为了让表格中的内容自动换行，不需要的话可以删掉
        item.style.whiteSpace = 'pre-wrap'
      })
  },
  openCallback() {

  }, // 调用打印之后的回调事件
  closeCallback() { }, //关闭打印的回调事件（无法确定点击的是确认还是取消）
  url: '',
  standard: '',
  extraCss: '',

}
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
  loading,
  secretLevelList,
  uploadFile,
  afterUploadEvent,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  attachmentRequired,
  closeModal,
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
<style media="print">
/* 去掉页眉页脚 */
@page {
  size: auto;
  margin: 0mm;
}

/* 自定义样式*/
@media print {
  #printArea {
    position: relative;
    text-align: center;
    font-weight: 700;
    font-size: 100px;

    .formprint {
      width: 50%;
      position: relative;
      left: 23%;
      top: 25px;
      margin-bottom: 100px;
      margin-top: 100px;
    }
  }
}
</style>
