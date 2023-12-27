<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="申请单主表ID">
              <a-input
                v-model:value="queryForm.wmsInvOutBillId"
                placeholder="请输入申请单主表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="原始单据表ID">
              <a-input
                v-model:value="queryForm.originalOrderDetailId"
                placeholder="请输入原始单据表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="原始单据表名">
              <a-input
                v-model:value="queryForm.originalOrderTabName"
                placeholder="请输入原始单据表名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料ID">
              <a-input
                v-model:value="queryForm.mdsItemId"
                placeholder="请输入物料ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="台账ID">
              <a-input
                v-model:value="queryForm.wmsItemInventoryId"
                placeholder="请输入台账ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质量编号">
              <a-input
                v-model:value="queryForm.qualityCode"
                placeholder="请输入质量编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供方合格证号">
              <a-input
                v-model:value="queryForm.supplyCertificationNo"
                placeholder="请输入供方合格证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="炉号">
              <a-input
                v-model:value="queryForm.stoveNo"
                placeholder="请输入炉号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="批号/批次">
              <a-input
                v-model:value="queryForm.batchNo"
                placeholder="请输入批号/批次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="申请数量">
              <a-input
                v-model:value="queryForm.applyQty"
                placeholder="请输入申请数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库数量">
              <a-input
                v-model:value="queryForm.outQty"
                placeholder="请输入出库数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库登账人ID">
              <AvicCommonSelect
                v-model:value="queryForm.outUserId"
                type="userSelect"
                placeholder="请选择出库登账人ID"
                :defaultShowValue="queryForm.outUserIdAlias"
                @callback="
                  result => {
                    queryForm.outUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库登账人编码">
              <a-input
                v-model:value="queryForm.outUserCode"
                placeholder="请输入出库登账人编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库登账人姓名">
              <a-input
                v-model:value="queryForm.outUserName"
                placeholder="请输入出库登账人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库日期(起)">
              <a-date-picker
                v-model:value="queryForm.outDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出库日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.outDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库日期(止)">
              <a-date-picker
                v-model:value="queryForm.outDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出库日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.outDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收人ID">
              <AvicCommonSelect
                v-model:value="queryForm.recieveUserId"
                type="userSelect"
                placeholder="请选择接收人ID"
                :defaultShowValue="queryForm.recieveUserIdAlias"
                @callback="
                  result => {
                    queryForm.recieveUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收人编码">
              <a-input
                v-model:value="queryForm.recieveUserCode"
                placeholder="请输入接收人编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收人姓名">
              <a-input
                v-model:value="queryForm.recieveUserName"
                placeholder="请输入接收人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收日期(起)">
              <a-date-picker
                v-model:value="queryForm.recieveDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.recieveDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收日期(止)">
              <a-date-picker
                v-model:value="queryForm.recieveDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.recieveDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="拒绝原因">
              <a-input
                v-model:value="queryForm.refuseReason"
                placeholder="请输入拒绝原因"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注、批料备注">
              <a-input
                v-model:value="queryForm.note"
                placeholder="请输入备注、批料备注"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="单据状态">
              <a-input
                v-model:value="queryForm.outBillLStatus"
                placeholder="请输入单据状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="机型">
              <a-input
                v-model:value="queryForm.proMdsItemId"
                placeholder="请输入机型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="架次">
              <a-input
                v-model:value="queryForm.lotNo"
                placeholder="请输入架次"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="父件ID">
              <a-input
                v-model:value="queryForm.parentMdsItemId"
                placeholder="请输入父件ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划价">
              <a-input
                v-model:value="queryForm.plannedPrice"
                placeholder="请输入计划价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="派工号">
              <a-input
                v-model:value="queryForm.missionNo"
                placeholder="请输入派工号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供应商ID">
              <a-input
                v-model:value="queryForm.srmVendorId"
                placeholder="请输入供应商ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合格证ID">
              <a-input
                v-model:value="queryForm.qcCertificationId"
                placeholder="请输入合格证ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="合格证号">
              <a-input
                v-model:value="queryForm.certificationNo"
                placeholder="请输入合格证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="审批数量">
              <a-input
                v-model:value="queryForm.approveQty"
                placeholder="请输入审批数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="审批日期(起)">
              <a-date-picker
                v-model:value="queryForm.approveDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择审批日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.approveDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="审批日期(止)">
              <a-date-picker
                v-model:value="queryForm.approveDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择审批日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.approveDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="审批人ID">
              <AvicCommonSelect
                v-model:value="queryForm.approveUserId"
                type="userSelect"
                placeholder="请选择审批人ID"
                :defaultShowValue="queryForm.approveUserIdAlias"
                @callback="
                  result => {
                    queryForm.approveUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="审批人编码">
              <a-input
                v-model:value="queryForm.approveUserCode"
                placeholder="请输入审批人编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="审批人姓名">
              <a-input
                v-model:value="queryForm.approveUserName"
                placeholder="请输入审批人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="紧急放行标识">
              <a-input
                v-model:value="queryForm.urgentReleaseFlag"
                placeholder="请输入紧急放行标识"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="紧急放行单号">
              <a-input
                v-model:value="queryForm.urgentReleaseNo"
                placeholder="请输入紧急放行单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否关闭 ">
              <a-select
                v-model:value="queryForm.ynClose"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否关闭 "
              >
                <a-select-option
                  v-for="item in ynCloseList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关闭数量">
              <a-input
                v-model:value="queryForm.closeQty"
                placeholder="请输入关闭数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关闭日期(起)">
              <a-date-picker
                v-model:value="queryForm.closeDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择关闭日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.closeDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关闭日期(止)">
              <a-date-picker
                v-model:value="queryForm.closeDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择关闭日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.closeDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关闭人ID">
              <AvicCommonSelect
                v-model:value="queryForm.closeUserId"
                type="userSelect"
                placeholder="请选择关闭人ID"
                :defaultShowValue="queryForm.closeUserIdAlias"
                @callback="
                  result => {
                    queryForm.closeUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关闭人编码">
              <a-input
                v-model:value="queryForm.closeUserCode"
                placeholder="请输入关闭人编码"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关闭人姓名">
              <a-input
                v-model:value="queryForm.closeUserName"
                placeholder="请输入关闭人姓名"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item01"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item02"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item03"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item04"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item05"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item06"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item07"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item08"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item09"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item10"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item11"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item12"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item13"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item14"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item15"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item16"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item17"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item18"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item19"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="预留扩展字段">
              <a-input
                v-model:value="queryForm.item20"
                placeholder="请输入预留扩展字段"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库登账人所在部门ID">
              <AvicCommonSelect
                v-model:value="queryForm.outDeptId"
                type="deptSelect"
                placeholder="请选择出库登账人所在部门ID"
                :defaultShowValue="queryForm.outDeptIdAlias"
                @callback="
                  result => {
                    queryForm.outDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库登账人所在部门CODE">
              <a-input
                v-model:value="queryForm.outDeptCode"
                placeholder="请输入出库登账人所在部门CODE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库登账人所在部门NAME">
              <a-input
                v-model:value="queryForm.outDeptName"
                placeholder="请输入出库登账人所在部门NAME"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发票关联表ID【冗余字段】^用于是否关联发票">
              <a-input
                v-model:value="queryForm.pmsInvoiceAssonInvBillId"
                placeholder="请输入发票关联表ID【冗余字段】^用于是否关联发票"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否下料">
              <a-select
                v-model:value="queryForm.cuttingFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否下料"
              >
                <a-select-option
                  v-for="item in cuttingFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出库需求表ID">
              <a-input
                v-model:value="queryForm.momOutRequireId"
                placeholder="请输入出库需求表ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="余料数量">
              <a-input
                v-model:value="queryForm.surplusQty"
                placeholder="请输入余料数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="余料尺寸">
              <a-input
                v-model:value="queryForm.surplusSize"
                placeholder="请输入余料尺寸"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="紧急程度/发放进度">
              <a-input
                v-model:value="queryForm.urgentLevel"
                placeholder="请输入紧急程度/发放进度"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开放人ID">
              <AvicCommonSelect
                v-model:value="queryForm.planOpenUserId"
                type="userSelect"
                placeholder="请选择开放人ID"
                :defaultShowValue="queryForm.planOpenUserIdAlias"
                @callback="
                  result => {
                    queryForm.planOpenUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开放人CODE">
              <a-input
                v-model:value="queryForm.planOpenUserCode"
                placeholder="请输入开放人CODE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开放人NAME">
              <a-input
                v-model:value="queryForm.planOpenUserName"
                placeholder="请输入开放人NAME"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开放时间(起)">
              <a-date-picker
                v-model:value="queryForm.planOpenDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开放时间(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.planOpenDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开放时间(止)">
              <a-date-picker
                v-model:value="queryForm.planOpenDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开放时间(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.planOpenDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下料站点ID">
              <a-input
                v-model:value="queryForm.siteId"
                placeholder="请输入下料站点ID"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下料站点CODE">
              <a-input
                v-model:value="queryForm.siteCode"
                placeholder="请输入下料站点CODE"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="下料站点NAME">
              <a-input
                v-model:value="queryForm.siteName"
                placeholder="请输入下料站点NAME"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="需求日期(起)">
              <a-date-picker
                v-model:value="queryForm.requireDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择需求日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.requireDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="需求日期(止)">
              <a-date-picker
                v-model:value="queryForm.requireDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择需求日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.requireDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级">
              <a-select
                v-model:value="queryForm.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
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
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划类型">
              <a-input
                v-model:value="queryForm.planType"
                placeholder="请输入计划类型"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="派工单号">
              <a-input
                v-model:value="queryForm.dispatchListNo"
                placeholder="请输入派工单号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原申请物料id">
              <a-input
                v-model:value="queryForm.originalItemId"
                placeholder="请输入原申请物料id"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="代料/发放依据">
              <a-input
                v-model:value="queryForm.grantBasis"
                placeholder="请输入代料/发放依据"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否资源选择其它系统">
              <a-select
                v-model:value="queryForm.otherSysFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否资源选择其它系统"
              >
                <a-select-option
                  v-for="item in otherSysFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="工艺路线">
              <a-input
                v-model:value="queryForm.workLine"
                placeholder="请输入工艺路线"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否上机标识">
              <a-select
                v-model:value="queryForm.ynInstallFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否上机标识"
              >
                <a-select-option
                  v-for="item in ynInstallFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="偏离单编号">
              <a-input
                v-model:value="queryForm.deflectionBillno"
                placeholder="请输入偏离单编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="检斤数量">
              <a-input
                v-model:value="queryForm.checkKiloQty"
                placeholder="请输入检斤数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced" />
                  <down-outlined v-else />
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="wmsInvOutBillLSelect"
        table-key="wmsInvOutBillLSelect"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :show-table-setting="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入申请单主表ID或原始单据表ID"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { WmsInvOutBillLDto } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块DTO
import { listWmsInvOutBillLByPage } from '@/api/avic/mms/wms/WmsInvOutBillLApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const wmsInvOutBillLSelect = ref();
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '申请单主表ID',
    dataIndex: 'wmsInvOutBillId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原始单据表ID',
    dataIndex: 'originalOrderDetailId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原始单据表名',
    dataIndex: 'originalOrderTabName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料ID',
    dataIndex: 'mdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '台账ID',
    dataIndex: 'wmsItemInventoryId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质量编号',
    dataIndex: 'qualityCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供方合格证号',
    dataIndex: 'supplyCertificationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '炉号',
    dataIndex: 'stoveNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批号/批次',
    dataIndex: 'batchNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '申请数量',
    dataIndex: 'applyQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库数量',
    dataIndex: 'outQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人ID',
    dataIndex: 'outUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人编码',
    dataIndex: 'outUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人姓名',
    dataIndex: 'outUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库日期',
    dataIndex: 'outDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '接收人ID',
    dataIndex: 'recieveUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收人编码',
    dataIndex: 'recieveUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收人姓名',
    dataIndex: 'recieveUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收日期',
    dataIndex: 'recieveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '备注、批料备注',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '单据状态',
    dataIndex: 'outBillLStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '机型',
    dataIndex: 'proMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '架次',
    dataIndex: 'lotNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '父件ID',
    dataIndex: 'parentMdsItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '计划价',
    dataIndex: 'plannedPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工号',
    dataIndex: 'missionNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商ID',
    dataIndex: 'srmVendorId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证ID',
    dataIndex: 'qcCertificationId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '合格证号',
    dataIndex: 'certificationNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批数量',
    dataIndex: 'approveQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批日期',
    dataIndex: 'approveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '审批人ID',
    dataIndex: 'approveUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批人编码',
    dataIndex: 'approveUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '审批人姓名',
    dataIndex: 'approveUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急放行标识',
    dataIndex: 'urgentReleaseFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急放行单号',
    dataIndex: 'urgentReleaseNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否关闭 ',
    dataIndex: 'ynCloseName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '关闭数量',
    dataIndex: 'closeQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关闭日期',
    dataIndex: 'closeDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '关闭人ID',
    dataIndex: 'closeUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关闭人编码',
    dataIndex: 'closeUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关闭人姓名',
    dataIndex: 'closeUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item01',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item02',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item03',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item04',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item05',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item06',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item07',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item08',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item09',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item10',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item11',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item12',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item13',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item14',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item15',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item16',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item17',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item18',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item19',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '预留扩展字段',
    dataIndex: 'item20',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门ID',
    dataIndex: 'outDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门CODE',
    dataIndex: 'outDeptCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出库登账人所在部门NAME',
    dataIndex: 'outDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票关联表ID【冗余字段】^用于是否关联发票',
    dataIndex: 'pmsInvoiceAssonInvBillId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否下料',
    dataIndex: 'cuttingFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '出库需求表ID',
    dataIndex: 'momOutRequireId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '余料数量',
    dataIndex: 'surplusQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '余料尺寸',
    dataIndex: 'surplusSize',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '紧急程度/发放进度',
    dataIndex: 'urgentLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人ID',
    dataIndex: 'planOpenUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人CODE',
    dataIndex: 'planOpenUserCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放人NAME',
    dataIndex: 'planOpenUserName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '开放时间',
    dataIndex: 'planOpenDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '下料站点ID',
    dataIndex: 'siteId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下料站点CODE',
    dataIndex: 'siteCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '下料站点NAME',
    dataIndex: 'siteName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '需求日期',
    dataIndex: 'requireDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划类型',
    dataIndex: 'planType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '派工单号',
    dataIndex: 'dispatchListNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '原申请物料id',
    dataIndex: 'originalItemId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '代料/发放依据',
    dataIndex: 'grantBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否资源选择其它系统',
    dataIndex: 'otherSysFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '工艺路线',
    dataIndex: 'workLine',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否上机标识',
    dataIndex: 'ynInstallFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '偏离单编号',
    dataIndex: 'deflectionBillno',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '检斤数量',
    dataIndex: 'checkKiloQty',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    visible: false,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<WmsInvOutBillLDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const  totalPage = ref(0);
const ynCloseList = ref([]); // 是否关闭 通用代码
const cuttingFlagList = ref([]); // 是否下料通用代码
const secretLevelList = ref([]); // 密级通用代码
const otherSysFlagList = ref([]); // 是否资源选择其它系统通用代码
const ynInstallFlagList = ref([]); // 是否上机标识通用代码
const lookupParams = [
  { fieldName: 'ynClose', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'cuttingFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'otherSysFlag', lookUpType: 'YN_FLAG' },
  { fieldName: 'ynInstallFlag', lookUpType: 'PLATFORM_YES_NO_FLAG' }
 ];

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});
/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  listWmsInvOutBillLByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    ynCloseList.value = result.ynClose;
    cuttingFlagList.value = result.cuttingFlag;
    otherSysFlagList.value = result.otherSysFlag;
    ynInstallFlagList.value = result.ynInstallFlag;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    wmsInvOutBillId: value,
    originalOrderDetailId: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  // 传出选中项
  $emit('select', selectedRows.value);
}
/** 表格排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 行双击事件 */
function customRow (record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
</script>


