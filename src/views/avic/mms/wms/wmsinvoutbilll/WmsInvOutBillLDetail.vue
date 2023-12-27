<template>
  <AvicModal :visible="true" title="详情" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsInvOutBillId" label="申请单主表ID">
              <a-input v-model:value="form.wmsInvOutBillId" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalOrderDetailId" label="原始单据表ID">
              <a-input v-model:value="form.originalOrderDetailId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalOrderTabName" label="原始单据表名">
              <a-input v-model:value="form.originalOrderTabName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料ID">
              <a-input v-model:value="form.mdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsItemInventoryId" label="台账ID">
              <a-input v-model:value="form.wmsItemInventoryId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号">
              <a-input v-model:value="form.qualityCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplyCertificationNo" label="供方合格证号">
              <a-input v-model:value="form.supplyCertificationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stoveNo" label="炉号">
              <a-input v-model:value="form.stoveNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNo" label="批号/批次">
              <a-input v-model:value="form.batchNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyQty" label="申请数量">
              <a-input v-model:value="form.applyQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outQty" label="出库数量">
              <a-input v-model:value="form.outQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outUserId" label="出库登账人ID">
              <AvicCommonSelect v-model:value="form.outUserId" type="userSelect" :defaultShowValue="form.outUserIdAlias"
                disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outUserCode" label="出库登账人编码">
              <a-input v-model:value="form.outUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outUserName" label="出库登账人姓名">
              <a-input v-model:value="form.outUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDate" label="出库日期">
              <a-date-picker v-model:value="form.outDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserId" label="接收人ID">
              <AvicCommonSelect v-model:value="form.recieveUserId" type="userSelect"
                :defaultShowValue="form.recieveUserIdAlias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserCode" label="接收人编码">
              <a-input v-model:value="form.recieveUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserName" label="接收人姓名">
              <a-input v-model:value="form.recieveUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveDate" label="接收日期">
              <a-date-picker v-model:value="form.recieveDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="refuseReason" label="拒绝原因">
              <a-input v-model:value="form.refuseReason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注、批料备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outBillLStatus" label="单据状态">
              <a-select v-model:value="form.outBillLStatus" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择单据状态" disabled>
                <a-select-option v-for="item in outBillLStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemId" label="机型">
              <a-input v-model:value="form.proMdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lotNo" label="架次">
              <a-input v-model:value="form.lotNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsItemId" label="父件ID">
              <a-input v-model:value="form.parentMdsItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价">
              <a-input v-model:value="form.plannedPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="missionNo" label="派工号">
              <a-input v-model:value="form.missionNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorId" label="供应商ID">
              <a-input v-model:value="form.srmVendorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCertificationId" label="合格证ID">
              <a-input v-model:value="form.qcCertificationId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationNo" label="合格证号">
              <a-input v-model:value="form.certificationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveQty" label="审批数量">
              <a-input v-model:value="form.approveQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveDate" label="审批日期">
              <a-date-picker v-model:value="form.approveDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveUserId" label="审批人ID">
              <AvicCommonSelect v-model:value="form.approveUserId" type="userSelect"
                :defaultShowValue="form.approveUserIdAlias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveUserCode" label="审批人编码">
              <a-input v-model:value="form.approveUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveUserName" label="审批人姓名">
              <a-input v-model:value="form.approveUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseFlag" label="紧急放行标识">
              <a-input v-model:value="form.urgentReleaseFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseNo" label="紧急放行单号">
              <a-input v-model:value="form.urgentReleaseNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynClose" label="是否关闭 ">
              <a-select v-model:value="form.ynClose" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynCloseList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeQty" label="关闭数量">
              <a-input v-model:value="form.closeQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeDate" label="关闭日期">
              <a-date-picker v-model:value="form.closeDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeUserId" label="关闭人ID">
              <AvicCommonSelect v-model:value="form.closeUserId" type="userSelect"
                :defaultShowValue="form.closeUserIdAlias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeUserCode" label="关闭人编码">
              <a-input v-model:value="form.closeUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeUserName" label="关闭人姓名">
              <a-input v-model:value="form.closeUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item01" label="预留扩展字段">
              <a-input v-model:value="form.item01" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item02" label="预留扩展字段">
              <a-input v-model:value="form.item02" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item03" label="预留扩展字段">
              <a-input v-model:value="form.item03" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item04" label="预留扩展字段">
              <a-input v-model:value="form.item04" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item05" label="预留扩展字段">
              <a-input v-model:value="form.item05" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item06" label="预留扩展字段">
              <a-input v-model:value="form.item06" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item07" label="预留扩展字段">
              <a-input v-model:value="form.item07" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item08" label="预留扩展字段">
              <a-input v-model:value="form.item08" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item09" label="预留扩展字段">
              <a-input v-model:value="form.item09" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item10" label="预留扩展字段">
              <a-input v-model:value="form.item10" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item11" label="预留扩展字段">
              <a-input v-model:value="form.item11" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item12" label="预留扩展字段">
              <a-input v-model:value="form.item12" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item13" label="预留扩展字段">
              <a-input v-model:value="form.item13" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item14" label="预留扩展字段">
              <a-input v-model:value="form.item14" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item15" label="预留扩展字段">
              <a-input v-model:value="form.item15" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item16" label="预留扩展字段">
              <a-input v-model:value="form.item16" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item17" label="预留扩展字段">
              <a-input v-model:value="form.item17" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item18" label="预留扩展字段">
              <a-input v-model:value="form.item18" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item19" label="预留扩展字段">
              <a-input v-model:value="form.item19" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item20" label="预留扩展字段">
              <a-input v-model:value="form.item20" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDeptId" label="出库登账人所在部门ID">
              <AvicCommonSelect v-model:value="form.outDeptId" type="deptSelect" :defaultShowValue="form.outDeptIdAlias"
                disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDeptCode" label="出库登账人所在部门CODE">
              <a-input v-model:value="form.outDeptCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDeptName" label="出库登账人所在部门NAME">
              <a-input v-model:value="form.outDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsInvoiceAssonInvBillId" label="发票关联表ID【冗余字段】^用于是否关联发票">
              <a-input v-model:value="form.pmsInvoiceAssonInvBillId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cuttingFlag" label="是否下料">
              <a-select v-model:value="form.cuttingFlag" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in cuttingFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="momOutRequireId" label="出库需求表ID">
              <a-input v-model:value="form.momOutRequireId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="surplusQty" label="余料数量">
              <a-input v-model:value="form.surplusQty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="surplusSize" label="余料尺寸">
              <a-input v-model:value="form.surplusSize" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentLevel" label="紧急程度/发放进度">
              <a-input v-model:value="form.urgentLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenUserId" label="开放人ID">
              <AvicCommonSelect v-model:value="form.planOpenUserId" type="userSelect"
                :defaultShowValue="form.planOpenUserIdAlias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenUserCode" label="开放人CODE">
              <a-input v-model:value="form.planOpenUserCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenUserName" label="开放人NAME">
              <a-input v-model:value="form.planOpenUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenDate" label="开放时间">
              <a-date-picker v-model:value="form.planOpenDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="siteId" label="下料站点ID">
              <a-input v-model:value="form.siteId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="siteCode" label="下料站点CODE">
              <a-input v-model:value="form.siteCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="siteName" label="下料站点NAME">
              <a-input v-model:value="form.siteName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="requireDate" label="需求日期">
              <a-date-picker v-model:value="form.requireDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planType" label="计划类型">
              <a-input v-model:value="form.planType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dispatchListNo" label="派工单号">
              <a-input v-model:value="form.dispatchListNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalItemId" label="原申请物料id">
              <a-input v-model:value="form.originalItemId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="grantBasis" label="代料/发放依据">
              <a-input v-model:value="form.grantBasis" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="otherSysFlag" label="是否资源选择其它系统">
              <a-select v-model:value="form.otherSysFlag" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in otherSysFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workLine" label="工艺路线">
              <a-input v-model:value="form.workLine" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInstallFlag" label="是否上机标识">
              <a-select v-model:value="form.ynInstallFlag" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynInstallFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deflectionBillno" label="偏离单编号">
              <a-input v-model:value="form.deflectionBillno" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkKiloQty" label="检斤数量">
              <a-input v-model:value="form.checkKiloQty" disabled />
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
import { useWmsInvOutBillLForm, emits } from './ts/WmsInvOutBillLForm'; // 引入表单ts
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
  ynCloseList,
  cuttingFlagList,
  secretLevelList,
  otherSysFlagList,
  ynInstallFlagList,
  closeModal,
  outBillLStatusList
} = useWmsInvOutBillLForm({
  props: props,
  emit: emit
});
</script>

