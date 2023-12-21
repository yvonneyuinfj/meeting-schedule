<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产编号">
              <a-input
                v-model:value="queryForm.assetsCode"
                placeholder="请输入资产编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产名称">
              <a-input
                v-model:value="queryForm.assetsName"
                placeholder="请输入资产名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="资产类别名称">
              <a-input
                v-model:value="queryForm.assetClassName"
                placeholder="请输入资产类别名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产来源">
              <a-input
                v-model:value="queryForm.assetSource"
                placeholder="请输入资产来源"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产状态">
              <a-input
                v-model:value="queryForm.assetsStatus"
                placeholder="请输入资产状态"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产用途">
              <a-input
                v-model:value="queryForm.assetsUse"
                placeholder="请输入资产用途"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入账日期">
              <a-input
                v-model:value="queryForm.entryDate"
                placeholder="请输入入账日期"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产原值">
              <a-input
                v-model:value="queryForm.assetOriginalValue"
                placeholder="请输入资产原值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="累计折旧">
              <a-input
                v-model:value="queryForm.depreciationValue"
                placeholder="请输入累计折旧"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="折旧方法">
              <a-input
                v-model:value="queryForm.depreciationWay"
                placeholder="请输入折旧方法"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产数量">
              <a-input
                v-model:value="queryForm.assetNum"
                placeholder="请输入资产数量"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="使用年限">
              <a-input
                v-model:value="queryForm.useTime"
                placeholder="请输入使用年限"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产净值">
              <a-input
                v-model:value="queryForm.assetNetValue"
                placeholder="请输入资产净值"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="月折旧额">
              <a-input
                v-model:value="queryForm.monDepreciation"
                placeholder="请输入月折旧额"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="存放地点">
              <a-input
                v-model:value="queryForm.storageLocation"
                placeholder="请输入存放地点"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="部门名称">
              <a-input
                v-model:value="queryForm.deptName"
                placeholder="请输入部门名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="主管部门">
              <a-input
                v-model:value="queryForm.managerDeptId"
                placeholder="请输入主管部门"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="责任人">
              <a-input
                v-model:value="queryForm.responseUserId"
                placeholder="请输入责任人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入账时累计折旧">
              <a-input
                v-model:value="queryForm.firstDepreciationValue"
                placeholder="请输入入账时累计折旧"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="已提月份(起)">
              <a-date-picker
                v-model:value="queryForm.monthProposedBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择已提月份(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.monthProposedEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="已提月份(止)">
              <a-date-picker
                v-model:value="queryForm.monthProposedEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择已提月份(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.monthProposedBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="品牌型号">
              <a-input
                v-model:value="queryForm.brandModel"
                placeholder="请输入品牌型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="购置日期(起)">
              <a-date-picker
                v-model:value="queryForm.purchaseDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.purchaseDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="购置日期(止)">
              <a-date-picker
                v-model:value="queryForm.purchaseDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.purchaseDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="入账前当年折旧">
              <a-input
                v-model:value="queryForm.currentYearDepreciation"
                placeholder="请输入入账前当年折旧"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="新增当月计提">
              <a-input
                v-model:value="queryForm.newaCurrentmProvision"
                placeholder="请输入新增当月计提"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="其他">
              <a-input
                v-model:value="queryForm.other"
                placeholder="请输入其他"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="重置凭证号">
              <a-input
                v-model:value="queryForm.resetVoucherNo"
                placeholder="请输入重置凭证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="设备编号">
              <a-input
                v-model:value="queryForm.equipNo"
                placeholder="请输入设备编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出厂编号">
              <a-input
                v-model:value="queryForm.productionNo"
                placeholder="请输入出厂编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="凭证号">
              <a-input
                v-model:value="queryForm.voucherNo"
                placeholder="请输入凭证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="厂商">
              <a-input
                v-model:value="queryForm.factoryOwner"
                placeholder="请输入厂商"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="建设项目">
              <a-input
                v-model:value="queryForm.buildProject"
                placeholder="请输入建设项目"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="品牌">
              <a-input
                v-model:value="queryForm.brand"
                placeholder="请输入品牌"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="权属证号">
              <a-input
                v-model:value="queryForm.ownershipCertNo"
                placeholder="请输入权属证号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="采购合同号">
              <a-input
                v-model:value="queryForm.procureOrderNo"
                placeholder="请输入采购合同号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产密级">
              <a-input
                v-model:value="queryForm.assetSecretLevel"
                placeholder="请输入资产密级"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否军工关键设备">
              <a-input
                v-model:value="queryForm.ynMilitaryKeyEquip"
                placeholder="请输入是否军工关键设备"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="接收部门">
              <a-input
                v-model:value="queryForm.receiveDeptId"
                placeholder="请输入接收部门"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产类别">
              <a-input
                v-model:value="queryForm.assetClass"
                placeholder="请输入资产类别"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资金来源">
              <a-input
                v-model:value="queryForm.fundSource"
                placeholder="请输入资金来源"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="项目名称">
              <a-input
                v-model:value="queryForm.projectName"
                placeholder="请输入项目名称"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="经办人">
              <a-input
                v-model:value="queryForm.handlePersonId"
                placeholder="请输入经办人"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="设备大类">
              <a-input
                v-model:value="queryForm.equipClass"
                placeholder="请输入设备大类"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产规格">
              <a-input
                v-model:value="queryForm.assetSpec"
                placeholder="请输入资产规格"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产型号">
              <a-input
                v-model:value="queryForm.assetModel"
                placeholder="请输入资产型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产单价">
              <a-input
                v-model:value="queryForm.assetUnit"
                placeholder="请输入资产单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="发票号">
              <a-input
                v-model:value="queryForm.invoiceNo"
                placeholder="请输入发票号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出厂日期(起)">
              <a-date-picker
                v-model:value="queryForm.productionDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期(起)"
                :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.productionDateEnd)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="出厂日期(止)">
              <a-date-picker
                v-model:value="queryForm.productionDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期(止)"
                :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.productionDateBegin)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否为进口设备">
              <a-input
                v-model:value="queryForm.importedOrNot"
                placeholder="请输入是否为进口设备"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="资产分类">
              <a-input
                v-model:value="queryForm.assetType"
                placeholder="请输入资产分类"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="质保期">
              <a-input
                v-model:value="queryForm.warrantyPeriod"
                placeholder="请输入质保期"
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
    <!-- 树形表格 -->
    <div class="table-wrapper">
      <AvicTable
        ref="famInventory"
        class="treegrid"
        table-key="famInventory"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :pagination="false"
        :expand-row-by-click="true"
        lineField="attribute01"
        :indent-size="25"
        v-model:expanded-row-keys="expandedRowKeys"
        @handleRowSelection="handleRowSelection"
        @expand="handleExpand"
      >
<!--        <template #toolBarLeft>-->
<!--          <a-space>-->
<!--            <a-button-->
<!--              type="primary"-->
<!--              title="添加"-->
<!--              @click="handleAdd(rootTree)"-->
<!--            >-->
<!--              <template #icon>-->
<!--                <plus-outlined />-->
<!--              </template>-->
<!--              添加-->
<!--            </a-button>-->
<!--          </a-space>-->
<!--        </template>-->
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            v-model:value="searchKeyWord"
            placeholder="请输入备注或ATTRIBUTE_01"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <!-- 显示字段 -->
          <template v-if="column.dataIndex === 'assetsCode'">
            <AvicIcon
              v-if="!record.expanded && record.treeLeaf == 'N'"
              svg="avic-folder-3-fill"
              color="#ffb800"
            />
            <AvicIcon
              v-if="record.expanded && record.treeLeaf == 'N'"
              svg="avic-folder-open-fill"
              color="#ffb800"
            />
            <avic-icon v-if="record.treeLeaf == 'Y'" svg="avic-file-fill" color="#3370ff" />
            <a
              href="javascript:;"
              class="table-detail-link"
              :title="record.demoTitle"
              @click.stop="handleDetail(record)"
            >
              {{ record.assetsCode }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleAdd(record)">
              添加
            </a-button>
            <a-button
              type="link"
              class="inner-btn"
              @click.stop="handleEdit(record)">
              编辑
            </a-button>
            <a-button
              v-hasPermi="['famInventory:del']"
              v-if="record.treeLeaf == 'Y'"
              type="link"
              class="inner-btn"
              @click.stop="handleDelete(record)">
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <FamInventoryAdd
      v-if="showAddModal"
      ref="addModal"
      :default-tree-level="treeLevel"
      :parent-id="parentNodeId"
      :parent-title="parentTitle"
      @reloadData="reloadData"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <FamInventoryEdit
      v-if="showEditModal"
      ref="editModal"
      :parent-id="parentNodeId"
      :parent-title="parentTitle"
      :form-id="formId"
      @reloadData="reloadData"
      @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <FamInventoryDetail
      v-if="showDetailModal"
      ref="detailModal"
      :parent-id="parentNodeId"
      :parent-title="parentTitle"
      :form-id="formId"
      @close="showDetailModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { FamInventoryDto } from '@/api/avic/mms/fam/FamInventoryTherrApi'; // 引入模块DTO
import { getFamInventoryNode, searchFamInventory, delFamInventory, expandFamInventory } from '@/api/avic/mms/fam/FamInventoryTherrApi'; // 引入模块API
import { expendNodeForTreegrid, getAllNodeForTreegrid, findNodeForTreegrid, deleteNodeForTreegrid, getExpandedKeys } from '@/utils/tree-util'; // 引入树公共方法
import FamInventoryAdd from './FamInventoryAdd.vue'; // 引入添加页面组件
import FamInventoryEdit from './FamInventoryEdit.vue'; // 引入编辑页面组件
import FamInventoryDetail from './FamInventoryDetail.vue'; // 引入详情页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '资产编号',
    dataIndex: 'assetsCode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetsName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产类别名称',
    dataIndex: 'assetClassName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产来源',
    dataIndex: 'assetSource',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产状态',
    dataIndex: 'assetsStatus',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产用途',
    dataIndex: 'assetsUse',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入账日期',
    dataIndex: 'entryDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '累计折旧',
    dataIndex: 'depreciationValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '折旧方法',
    dataIndex: 'depreciationWay',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产数量',
    dataIndex: 'assetNum',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用年限',
    dataIndex: 'useTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产净值',
    dataIndex: 'assetNetValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '月折旧额',
    dataIndex: 'monDepreciation',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'storageLocation',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '主管部门',
    dataIndex: 'managerDeptId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '责任人',
    dataIndex: 'responseUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入账时累计折旧',
    dataIndex: 'firstDepreciationValue',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '已提月份',
    dataIndex: 'monthProposed',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '品牌型号',
    dataIndex: 'brandModel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '购置日期',
    dataIndex: 'purchaseDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '入账前当年折旧',
    dataIndex: 'currentYearDepreciation',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '新增当月计提',
    dataIndex: 'newaCurrentmProvision',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '其他',
    dataIndex: 'other',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '重置凭证号',
    dataIndex: 'resetVoucherNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂编号',
    dataIndex: 'productionNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '凭证号',
    dataIndex: 'voucherNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厂商',
    dataIndex: 'factoryOwner',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建设项目',
    dataIndex: 'buildProject',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购合同号',
    dataIndex: 'procureOrderNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否军工关键设备',
    dataIndex: 'ynMilitaryKeyEquip',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '接收部门',
    dataIndex: 'receiveDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产类别',
    dataIndex: 'assetClass',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资金来源',
    dataIndex: 'fundSource',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人',
    dataIndex: 'handlePersonId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备大类',
    dataIndex: 'equipClass',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产单价',
    dataIndex: 'assetUnit',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂日期',
    dataIndex: 'productionDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '父资产编号',
    dataIndex: 'parentAssetNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否为进口设备',
    dataIndex: 'importedOrNot',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产分类',
    dataIndex: 'assetType',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 150,
    fixed: 'right'
  }
];
const queryForm = ref<FamInventoryDto>({}); // 高级查询对象
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中数据行集合
const loading = ref(false);
const searchKeyWord = ref(''); // keyword信息
const isSearchByKeyWord = ref(false); // keyword查询标识
const isAdvancedSearch = ref(false); // 高级查询标识
const expandedRowKeys = ref([]); // 展开数据集合
const rootTree = ref(null); // 树结构根节点
const parentNodeId = ref(''); // 添加节点的初始父节点
const parentTitle = ref(''); // 初始父节点名称
const treeLevel = ref(1);

onMounted(() => {
  // 加载表格数据
  getRootNode();
});

/** 加载树表格数据  */
function getRootNode() {
  rootTree.value = null;
  loading.value = true;
  const expandLevel = 2;
  list.value = [];
  expandedRowKeys.value = [];
  getFamInventoryNode(expandLevel, '-1')
    .then(res => {
      console.log(res);
      if (res.success && res.data.length === 1) {
        rootTree.value = res.data[0];
        list.value = res.data[0].children;
        getExpandedKeys(list.value, expandLevel, expandedRowKeys.value);
        loading.value = false;
      } else {
        proxy.$message.error('初始化根节点失败！');
        loading.value = false;
      }
    })
    .catch(() => {
      console.error('获取根节点失败！');
      loading.value = false;
    });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  // 查询区内容全部为空时不进行查询操作
  if (proxy.$checkJsonIsAllBlank(queryForm.value)) {
    proxy.$message.warning('请输入查询条件！');
    return;
  }
  loading.value = true;
  isSearchByKeyWord.value = false;
  isAdvancedSearch.value = true;
  // 高级查询数据处理
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  searchTreegrid(null);
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {};
  getRootNode();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑  */
function handleKeyWordQuery() {
  loading.value = true;
  isSearchByKeyWord.value = true;
  isAdvancedSearch.value = false;
  let value = searchKeyWord.value.trim();
  if (value.length) {
    const keyWord = {
      note: value,
      attribute01: value
    };
    queryParam.keyWord = JSON.stringify(keyWord);
    searchTreegrid(null);
  } else {
    isSearchByKeyWord.value = false;
    getRootNode();
  }
}
/** 添加 */
function handleAdd(parentTree) {
  treeLevel.value = parentTree.treeLevel;
  parentTitle.value = parentTree.attribute01;
  parentNodeId.value = parentTree.id;
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(row) {
  // 编辑节点
  parentNodeId.value = row.parentId;
  const parentNodes = findNodeForTreegrid(list.value, 'id', row.parentId);
  const parentNode = parentNodes.length == 1 ? parentNodes[0] : null;
  if (parentNode == null || parentNode.length == 0) {
    parentTitle.value = '根节点';
  } else {
    parentTitle.value = parentNode.attribute01;
  }
  formId.value = row.id;
  showEditModal.value = true;
}
/** 详情 */
function handleDetail(row) {
  parentNodeId.value = row.parentId;
  const parentNodes = findNodeForTreegrid(list.value, 'id', row.parentId);
  const parentNode = parentNodes.length == 1 ? parentNodes[0] : null;

  if (parentNode == null || parentNode.length == 0) {
    parentTitle.value = '根节点';
  } else {
    parentTitle.value = parentNode.attribute01;
  }
  formId.value = row.id;
  showDetailModal.value = true;
}
/** 删除 */
function handleDelete(treeNode) {
  proxy.$confirm({
    title: '确认要删除选择的数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      delFamInventory(treeNode.id)
        .then(res => {
          if (res.success) {
            // 匹配第一层节点并删除
            if (treeNode.treeLevel == 2) {
              let beforeLength = list.value.length;
              list.value = list.value.filter(item => item.id !== treeNode.id);
              if (beforeLength != list.value.length) {
                loading.value = false;
                return;
              }
            } else {
              // 递归删除
              deleteNodeForTreegrid(list.value, treeNode);
            }
            proxy.$message.success('删除成功！'); // 提示成功
          }
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}
/** 添加、编辑、删除、配置权限后默认展开至已修改项 */
function setExpandedRowKeys(treeId) {
  const nodes = findNodeForTreegrid(list.value, 'id', treeId);
  const node = nodes.length == 1 ? nodes[0] : null;
  if (!node) {
    expandedRowKeys.value = [];
  } else {
    let rowKeys = node.treePath.split('/');
    'Y' == node.treeLeaf || !node.children ? rowKeys.pop() : rowKeys;
    expandedRowKeys.value = rowKeys;
  }
}
/** 搜索树 */
function searchTreegrid(expandTreeId) {
  list.value = [];
  expandedRowKeys.value = [];

  searchFamInventory(queryParam)
    .then(res => {
      if (res.success) {
        list.value = res.data[0].children || [];
        //查询后展开全部节点
        expandedRowKeys.value = getAllNodeForTreegrid(list.value, 'id');
        if (proxy.$objIsNotBlank(expandTreeId)) {
          setExpandedRowKeys(expandTreeId);
        }
      } else {
        list.value = [];
      }
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      loading.value = false;
    });
}
/** 重载数据 */
function reloadData(expandTreeId) {
  loading.value = true;
  if (isSearchByKeyWord.value) {
    let value = searchKeyWord.value.trim();
    const keyWord = {
      note: value,
      attribute01: value
    };
    queryParam.keyWord = JSON.stringify(keyWord);
    searchTreegrid(expandTreeId);
  } else if (isAdvancedSearch.value) {
    // 高级查询数据处理
    queryParam.searchParams = queryForm.value;
    queryParam.keyWord = '';
    searchTreegrid(expandTreeId);
  } else {
    expandFamInventory(expandTreeId)
      .then(res => {
        if (res.success && res.data && res.data.length) {
          rootTree.value = res.data[0];
          list.value = res.data[0].children || [];
          setExpandedRowKeys(expandTreeId);
        } else {
          list.value = [];
        }
        loading.value = false;
      })
      .catch(() => {
        list.value = [];
        loading.value = false;
      });
  }
}
/** 展开父级 */
function handleExpand(expanded, record) {
  record.expanded = expanded;
  if (expanded) {
    if (record.treeLeaf == 'N' && (!record.children || !record.children.length)) {
      loading.value = true;

      getFamInventoryNode(1, `${record.id}`)
        .then(res => {
          if (res.success) {
            expendNodeForTreegrid(list.value, record.id, res.data);
            expandedRowKeys.value.push(record.id);
          }
          loading.value = false;
        })
        .catch(() => {
          list.value = [];
        });
    } else {
      expandedRowKeys.value.push(record.id);
    }
  } else {
    expandedRowKeys.value = expandedRowKeys.value.filter(item => item != record.id);
  }
}
/** 记录选中项 */
function handleRowSelection(obj) {
  if (obj.selectedRowKeys) {
    selectedRowKeys.value = obj.selectedRowKeys;
  }
  if (obj.selectedRows) {
    selectedRows.value = obj.selectedRows;
  }
}
</script>
