<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsInvOutBillId" label="申请单主表ID" has-feedback>
              <a-input v-model:value="form.wmsInvOutBillId" :maxLength="64" :auto-focus="true" placeholder="请输入申请单主表ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalOrderDetailId" label="原始单据表ID">
              <a-input v-model:value="form.originalOrderDetailId" :maxLength="64" placeholder="请输入原始单据表ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalOrderTabName" label="原始单据表名">
              <a-input v-model:value="form.originalOrderTabName" :maxLength="128" placeholder="请输入原始单据表名" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料ID">
              <a-input v-model:value="form.mdsItemId" :maxLength="64" placeholder="请输入物料ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wmsItemInventoryId" label="台账ID">
              <a-input v-model:value="form.wmsItemInventoryId" :maxLength="64" placeholder="请输入台账ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCode" label="质量编号">
              <a-input v-model:value="form.qualityCode" :maxLength="64" placeholder="请输入质量编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplyCertificationNo" label="供方合格证号">
              <a-input v-model:value="form.supplyCertificationNo" :maxLength="128" placeholder="请输入供方合格证号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stoveNo" label="炉号">
              <a-input v-model:value="form.stoveNo" :maxLength="1024" placeholder="请输入炉号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNo" label="批号/批次">
              <a-input v-model:value="form.batchNo" :maxLength="64" placeholder="请输入批号/批次" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyQty" label="申请数量">
              <a-input v-model:value="form.applyQty" :maxLength="20" placeholder="请输入申请数量" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outQty" label="出库数量">
              <a-input v-model:value="form.outQty" :maxLength="20" placeholder="请输入出库数量" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outUserId" label="出库登账人ID">
              <AvicCommonSelect v-model:value="form.outUserId" type="userSelect" placeholder="请选择出库登账人ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outUserCode" label="出库登账人编码">
              <a-input v-model:value="form.outUserCode" :maxLength="64" placeholder="请输入出库登账人编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outUserName" label="出库登账人姓名">
              <a-input v-model:value="form.outUserName" :maxLength="64" placeholder="请输入出库登账人姓名" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDate" label="出库日期">
              <a-date-picker v-model:value="form.outDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择出库日期" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserId" label="接收人ID">
              <AvicCommonSelect v-model:value="form.recieveUserId" type="userSelect" placeholder="请选择接收人ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserCode" label="接收人编码">
              <a-input v-model:value="form.recieveUserCode" :maxLength="64" placeholder="请输入接收人编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveUserName" label="接收人姓名">
              <a-input v-model:value="form.recieveUserName" :maxLength="64" placeholder="请输入接收人姓名" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recieveDate" label="接收日期">
              <a-date-picker v-model:value="form.recieveDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择接收日期" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="refuseReason" label="拒绝原因">
              <a-input v-model:value="form.refuseReason" :maxLength="2048" placeholder="请输入拒绝原因" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注、批料备注">
              <a-input v-model:value="form.note" :maxLength="2048" placeholder="请输入备注、批料备注" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outBillLStatus" label="单据状态" has-feedback>
              <a-select v-model:value="form.outBillLStatus" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择单据状态">
                <a-select-option v-for="item in outBillLStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="proMdsItemId" label="机型">
              <a-input v-model:value="form.proMdsItemId" :maxLength="64" placeholder="请输入机型" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lotNo" label="架次">
              <a-input v-model:value="form.lotNo" :maxLength="64" placeholder="请输入架次" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsItemId" label="父件ID">
              <a-input v-model:value="form.parentMdsItemId" :maxLength="64" placeholder="请输入父件ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价">
              <a-input v-model:value="form.plannedPrice" :maxLength="20" placeholder="请输入计划价" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="missionNo" label="派工号">
              <a-input v-model:value="form.missionNo" :maxLength="256" placeholder="请输入派工号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="srmVendorId" label="供应商ID">
              <a-input v-model:value="form.srmVendorId" :maxLength="64" placeholder="请输入供应商ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qcCertificationId" label="合格证ID">
              <a-input v-model:value="form.qcCertificationId" :maxLength="64" placeholder="请输入合格证ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificationNo" label="合格证号">
              <a-input v-model:value="form.certificationNo" :maxLength="128" placeholder="请输入合格证号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveQty" label="审批数量">
              <a-input v-model:value="form.approveQty" :maxLength="20" placeholder="请输入审批数量" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveDate" label="审批日期">
              <a-date-picker v-model:value="form.approveDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择审批日期" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveUserId" label="审批人ID">
              <AvicCommonSelect v-model:value="form.approveUserId" type="userSelect" placeholder="请选择审批人ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveUserCode" label="审批人编码">
              <a-input v-model:value="form.approveUserCode" :maxLength="64" placeholder="请输入审批人编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approveUserName" label="审批人姓名">
              <a-input v-model:value="form.approveUserName" :maxLength="128" placeholder="请输入审批人姓名" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseFlag" label="紧急放行标识">
              <a-input v-model:value="form.urgentReleaseFlag" :maxLength="2" placeholder="请输入紧急放行标识" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentReleaseNo" label="紧急放行单号">
              <a-input v-model:value="form.urgentReleaseNo" :maxLength="128" placeholder="请输入紧急放行单号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynClose" label="是否关闭 ">
              <a-select v-model:value="form.ynClose" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否关闭 ">
                <a-select-option v-for="item in ynCloseList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeQty" label="关闭数量">
              <a-input v-model:value="form.closeQty" :maxLength="20" placeholder="请输入关闭数量" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeDate" label="关闭日期">
              <a-date-picker v-model:value="form.closeDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择关闭日期" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeUserId" label="关闭人ID">
              <AvicCommonSelect v-model:value="form.closeUserId" type="userSelect" placeholder="请选择关闭人ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeUserCode" label="关闭人编码">
              <a-input v-model:value="form.closeUserCode" :maxLength="64" placeholder="请输入关闭人编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="closeUserName" label="关闭人姓名">
              <a-input v-model:value="form.closeUserName" :maxLength="128" placeholder="请输入关闭人姓名" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item01" label="预留扩展字段">
              <a-input v-model:value="form.item01" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item02" label="预留扩展字段">
              <a-input v-model:value="form.item02" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item03" label="预留扩展字段">
              <a-input v-model:value="form.item03" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item04" label="预留扩展字段">
              <a-input v-model:value="form.item04" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item05" label="预留扩展字段">
              <a-input v-model:value="form.item05" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item06" label="预留扩展字段">
              <a-input v-model:value="form.item06" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item07" label="预留扩展字段">
              <a-input v-model:value="form.item07" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item08" label="预留扩展字段">
              <a-input v-model:value="form.item08" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item09" label="预留扩展字段">
              <a-input v-model:value="form.item09" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item10" label="预留扩展字段">
              <a-input v-model:value="form.item10" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item11" label="预留扩展字段">
              <a-input v-model:value="form.item11" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item12" label="预留扩展字段">
              <a-input v-model:value="form.item12" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item13" label="预留扩展字段">
              <a-input v-model:value="form.item13" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item14" label="预留扩展字段">
              <a-input v-model:value="form.item14" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item15" label="预留扩展字段">
              <a-input v-model:value="form.item15" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item16" label="预留扩展字段">
              <a-input v-model:value="form.item16" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item17" label="预留扩展字段">
              <a-input v-model:value="form.item17" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item18" label="预留扩展字段">
              <a-input v-model:value="form.item18" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item19" label="预留扩展字段">
              <a-input v-model:value="form.item19" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="item20" label="预留扩展字段">
              <a-input v-model:value="form.item20" :maxLength="256" placeholder="请输入预留扩展字段" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDeptId" label="出库登账人所在部门ID">
              <AvicCommonSelect v-model:value="form.outDeptId" type="deptSelect" placeholder="请选择出库登账人所在部门ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDeptCode" label="出库登账人所在部门CODE">
              <a-input v-model:value="form.outDeptCode" :maxLength="64" placeholder="请输入出库登账人所在部门CODE" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outDeptName" label="出库登账人所在部门NAME">
              <a-input v-model:value="form.outDeptName" :maxLength="128" placeholder="请输入出库登账人所在部门NAME" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsInvoiceAssonInvBillId" label="发票关联表ID【冗余字段】^用于是否关联发票">
              <a-input v-model:value="form.pmsInvoiceAssonInvBillId" :maxLength="64"
                placeholder="请输入发票关联表ID【冗余字段】^用于是否关联发票" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cuttingFlag" label="是否下料">
              <a-select v-model:value="form.cuttingFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否下料">
                <a-select-option v-for="item in cuttingFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="momOutRequireId" label="出库需求表ID">
              <a-input v-model:value="form.momOutRequireId" :maxLength="64" placeholder="请输入出库需求表ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="surplusQty" label="余料数量">
              <a-input v-model:value="form.surplusQty" :maxLength="20" placeholder="请输入余料数量" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="surplusSize" label="余料尺寸">
              <a-input v-model:value="form.surplusSize" :maxLength="128" placeholder="请输入余料尺寸" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="urgentLevel" label="紧急程度/发放进度">
              <a-input v-model:value="form.urgentLevel" :maxLength="4" placeholder="请输入紧急程度/发放进度" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenUserId" label="开放人ID">
              <AvicCommonSelect v-model:value="form.planOpenUserId" type="userSelect" placeholder="请选择开放人ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenUserCode" label="开放人CODE">
              <a-input v-model:value="form.planOpenUserCode" :maxLength="128" placeholder="请输入开放人CODE" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenUserName" label="开放人NAME">
              <a-input v-model:value="form.planOpenUserName" :maxLength="128" placeholder="请输入开放人NAME" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planOpenDate" label="开放时间">
              <a-date-picker v-model:value="form.planOpenDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择开放时间" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="siteId" label="下料站点ID">
              <a-input v-model:value="form.siteId" :maxLength="32" placeholder="请输入下料站点ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="siteCode" label="下料站点CODE">
              <a-input v-model:value="form.siteCode" :maxLength="64" placeholder="请输入下料站点CODE" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="siteName" label="下料站点NAME">
              <a-input v-model:value="form.siteName" :maxLength="64" placeholder="请输入下料站点NAME" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="requireDate" label="需求日期">
              <a-date-picker v-model:value="form.requireDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                placeholder="请选择需求日期" />
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="planType" label="计划类型">
              <a-input v-model:value="form.planType" :maxLength="2" placeholder="请输入计划类型" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dispatchListNo" label="派工单号">
              <a-input v-model:value="form.dispatchListNo" :maxLength="128" placeholder="请输入派工单号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalItemId" label="原申请物料id">
              <a-input v-model:value="form.originalItemId" :maxLength="64" placeholder="请输入原申请物料id" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="grantBasis" label="代料/发放依据">
              <a-input v-model:value="form.grantBasis" :maxLength="1024" placeholder="请输入代料/发放依据" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="otherSysFlag" label="是否资源选择其它系统">
              <a-select v-model:value="form.otherSysFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否资源选择其它系统">
                <a-select-option v-for="item in otherSysFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workLine" label="工艺路线">
              <a-input v-model:value="form.workLine" :maxLength="32" placeholder="请输入工艺路线" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInstallFlag" label="是否上机标识">
              <a-select v-model:value="form.ynInstallFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否上机标识">
                <a-select-option v-for="item in ynInstallFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deflectionBillno" label="偏离单编号">
              <a-input v-model:value="form.deflectionBillno" :maxLength="128" placeholder="请输入偏离单编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkKiloQty" label="检斤数量">
              <a-input v-model:value="form.checkKiloQty" :maxLength="20" placeholder="请输入检斤数量" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
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
  rules,
  layout,
  colLayout,
  loading,
  ynCloseList,
  cuttingFlagList,
  secretLevelList,
  otherSysFlagList,
  ynInstallFlagList,
  saveForm,
  closeModal,
  outBillLStatusList
} = useWmsInvOutBillLForm({
  props: props,
  emit: emit
});
</script>
