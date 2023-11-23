<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="1280px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetCode" label="资产编码">
              <a-input v-model:value="form.assetCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetName" label="资产名称">
              <a-input v-model:value="form.assetName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSecretLevel" label="资产密级">
              <a-input v-model:value="form.assetSecretLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipNo" label="设备编号">
              <a-input v-model:value="form.equipNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetModel" label="资产型号">
              <a-input v-model:value="form.assetModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetOriginalValue" label="资产原值（元）">
              <a-input v-model:value="form.assetOriginalValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseTime" label="购置时间">
              <a-date-picker
                v-model:value="form.purchaseTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetNetValue" label="资产净值">
              <a-input v-model:value="form.assetNetValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="factorySerialNumber" label="出厂序列号">
              <a-input v-model:value="form.factorySerialNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetSpec" label="资产规格">
              <a-input v-model:value="form.assetSpec" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classifiedMediaList" label="涉密存储介质清单">
              <a-input v-model:value="form.classifiedMediaList" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="attachmentToolList" label="配件、附件工具清单">
              <a-input v-model:value="form.attachmentToolList" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="scrapReason" label="报废原因">
              <a-input v-model:value="form.scrapReason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handleType" label="处置类型">
              <a-input v-model:value="form.handleType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lifeYear" label="使用年限">
              <a-input v-model:value="form.lifeYear" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧">
              <a-input v-model:value="form.depreciationValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="brandModel" label="品牌型号">
              <a-input v-model:value="form.brandModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="buildProject" label="建设项目">
              <a-input v-model:value="form.buildProject" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isAttend" label="是否上会">
              <a-select
                v-model:value="form.isAttend"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in isAttendList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="documentNumber" label="所内决策商会决议文号">
              <a-input v-model:value="form.documentNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="meetingDate" label="所内决策上会日期">
              <a-date-picker
                v-model:value="form.meetingDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportToGroup" label="是否已上报集团">
              <a-select
                v-model:value="form.reportToGroup"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in reportToGroupList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportingDate" label="上报集团日期">
              <a-date-picker
                v-model:value="form.reportingDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reportingFileNumber" label="上报集团文件号">
              <a-input v-model:value="form.reportingFileNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hasBeenApproved" label="集团是否已批复">
              <a-select
                v-model:value="form.hasBeenApproved"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in hasBeenApprovedList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="groupApprovalDocuments" label="集团批复文件">
              <a-input v-model:value="form.groupApprovalDocuments" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approvalTime" label="集团批复时间">
              <a-date-picker
                v-model:value="form.approvalTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isMilitaryIndustry" label="是否为军工关键设备">
              <a-select
                v-model:value="form.isMilitaryIndustry"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in isMilitaryIndustryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isIndustry" label="是否已上报科工局">
              <a-select
                v-model:value="form.isIndustry"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in isIndustryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approvedOrNot" label="科工局是否已批复">
              <a-select
                v-model:value="form.approvedOrNot"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in approvedOrNotList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="isScienceIndustry" label="科工局批复文号">
              <a-input v-model:value="form.isScienceIndustry" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="completedOrNot" label="是否完成">
              <a-select
                v-model:value="form.completedOrNot"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in completedOrNotList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="disposalVoucherNumber" label="处置收入凭证号">
              <a-input v-model:value="form.disposalVoucherNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="disposalIncome" label="处置收入（元）">
              <a-input v-model:value="form.disposalIncome" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="notess" label="备注">
              <a-input v-model:value="form.notess" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamScrapLedgerForm, emits } from './ts/FamScrapLedgerForm'; // 引入表单ts
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
  layout,
  colLayout,
  loading,
  secretLevelList,
  isAttendList,
  reportToGroupList,
  hasBeenApprovedList,
  isMilitaryIndustryList,
  isIndustryList,
  approvedOrNotList,
  completedOrNotList,
  closeModal
} = useFamScrapLedgerForm({
  props: props,
  emit: emit
});
</script>


