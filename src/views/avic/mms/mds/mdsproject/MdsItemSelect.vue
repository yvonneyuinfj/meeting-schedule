<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料号 ">
              <a-input v-model:value="queryForm.itemCode" placeholder="请输入物料号 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="物料名称 ">
              <a-input v-model:value="queryForm.itemName" placeholder="请输入物料名称 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="图号">
              <a-input v-model:value="queryForm.drawingCode" placeholder="请输入图号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料类型 ">
              <a-select v-model:value="queryForm.itemType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择物料类型 ">
                <a-select-option v-for="item in itemTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="来源类型">
              <a-select v-model:value="queryForm.sourceType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择来源类型">
                <a-select-option v-for="item in sourceTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计量单位 ">
              <a-input v-model:value="queryForm.mdsUnitId" placeholder="请输入计量单位 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关重件标记">
              <a-select v-model:value="queryForm.keyFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择关重件标记">
                <a-select-option v-for="item in keyFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="备注 ">
              <a-input v-model:value="queryForm.note" placeholder="请输入备注 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="牌号 ">
              <a-input v-model:value="queryForm.marque" placeholder="请输入牌号 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="规格 ">
              <a-input v-model:value="queryForm.specs" placeholder="请输入规格 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术条件种类名称">
              <a-input v-model:value="queryForm.techCondition" placeholder="请输入技术条件种类名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="主制部门">
              <AvicCommonSelect v-model:value="queryForm.mainHrDeptId" type="deptSelect" placeholder="请选择主制部门"
                :defaultShowValue="queryForm.mainHrDeptIdAlias" @callback="
                  result => {
                    queryForm.mainHrDeptIdAlias = result.names;
                  }
                " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料大类">
              <a-input v-model:value="queryForm.mdsItemClassId" placeholder="请输入物料大类" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="交货状态">
              <a-input v-model:value="queryForm.deliveryStatus" placeholder="请输入交货状态" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="版本号 ">
              <a-input v-model:value="queryForm.itemRevision" placeholder="请输入版本号 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="适用产品">
              <a-select v-model:value="queryForm.appProductCode"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择适用产品">
                <a-select-option v-for="item in appProductCodeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="计划价 ">
              <a-input v-model:value="queryForm.plannedPrice" placeholder="请输入计划价 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料状态 ">
              <a-select v-model:value="queryForm.mdsItemStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择物料状态 ">
                <a-select-option v-for="item in mdsItemStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="扩展属性合并显示文本 ">
              <a-input v-model:value="queryForm.extendText" placeholder="请输入扩展属性合并显示文本 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级 ">
              <a-select v-model:value="queryForm.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级 ">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="原始物料编码">
              <a-input v-model:value="queryForm.originalItemCode" placeholder="请输入原始物料编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="物料基础码">
              <a-input v-model:value="queryForm.extendItemCode" placeholder="请输入物料基础码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="特殊要求">
              <a-input v-model:value="queryForm.specialRequirements" placeholder="请输入特殊要求" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术标准号">
              <a-input v-model:value="queryForm.technicalStandardNo" placeholder="请输入技术标准号" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技标版本">
              <a-input v-model:value="queryForm.jbbb" placeholder="请输入技标版本" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="集团码">
              <a-input v-model:value="queryForm.jtm" placeholder="请输入集团码" :allow-clear="true" @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="制造国名称">
              <a-input v-model:value="queryForm.makeCountry" placeholder="请输入制造国名称" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="牌号代码">
              <a-input v-model:value="queryForm.marqueCode" placeholder="请输入牌号代码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="交货状态代码">
              <a-input v-model:value="queryForm.deliveryStatusCode" placeholder="请输入交货状态代码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="数据来源">
              <a-select v-model:value="queryForm.dataSource" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择数据来源">
                <a-select-option v-for="item in dataSourceList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技术条件代码">
              <a-input v-model:value="queryForm.techConditionCode" placeholder="请输入技术条件代码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="浪潮代码">
              <a-input v-model:value="queryForm.lcCode" placeholder="请输入浪潮代码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="补充技术条件">
              <a-input v-model:value="queryForm.additionalTechCondition" placeholder="请输入补充技术条件" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="供货尺寸类别">
              <a-input v-model:value="queryForm.deliverySizeType" placeholder="请输入供货尺寸类别" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="承制单位">
              <a-input v-model:value="queryForm.manufactor" placeholder="请输入承制单位" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="锻铸件类别">
              <a-input v-model:value="queryForm.dzType" placeholder="请输入锻铸件类别" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="超声波">
              <a-input v-model:value="queryForm.csb" placeholder="请输入超声波" :allow-clear="true" @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="试料数量">
              <a-input v-model:value="queryForm.testamount" placeholder="请输入试料数量" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="关键件等级 ">
              <a-input v-model:value="queryForm.keyLevel" placeholder="请输入关键件等级 " :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否关键原材料">
              <a-select v-model:value="queryForm.ynKeyMaterial"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否关键原材料">
                <a-select-option v-for="item in ynKeyMaterialList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="民机对应项目ID">
              <a-input v-model:value="queryForm.mpmId" placeholder="请输入民机对应项目ID" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="定倍尺标识">
              <a-input v-model:value="queryForm.fixedFlag" placeholder="请输入定倍尺标识" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="技标号">
              <a-input v-model:value="queryForm.jbh" placeholder="请输入技标号" :allow-clear="true" @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="机型代号主数据编码">
              <a-input v-model:value="queryForm.jxdhbm" placeholder="请输入机型代号主数据编码" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="规格数据">
              <a-input v-model:value="queryForm.mdmSpecs" placeholder="请输入规格数据" :allow-clear="true"
                @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="是否关键站位">
              <a-select v-model:value="queryForm.ynKeyZw" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否关键站位">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="标准号">
              <a-input v-model:value="queryForm.bzh" placeholder="请输入标准号" :allow-clear="true" @pressEnter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
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
      <AvicTable ref="mdsItemSelect" table-key="mdsItemSelect" :columns="columns" :row-key="record => record.id"
        :data-source="list" :loading="loading" :show-table-setting="false" :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }" :pageParameter="queryParam.pageParameter" :total="totalPage" :customRow="customRow"
        @change="handleTableChange" @refresh="getList">
        <template #toolBarRight>
          <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入物料号 或物料名称 "
            :allow-clear="true" @search="handleKeyWordQuery" />
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
import type { MdsItemDto } from '@/api/avic/mms/mds/MdsItemApi'; // 引入模块DTO
import { listMdsItemByPage } from '@/api/avic/mms/mds/MdsItemApi'; // 引入模块API
const $emit = defineEmits(['select', 'handleRowDblClick']);
const mdsItemSelect = ref();
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
    title: '物料号 ',
    dataIndex: 'itemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料名称 ',
    dataIndex: 'itemName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '图号',
    dataIndex: 'drawingCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料类型 ',
    dataIndex: 'itemTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '来源类型',
    dataIndex: 'sourceTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计量单位 ',
    dataIndex: 'mdsUnitId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关重件标记',
    dataIndex: 'keyFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '备注 ',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '牌号 ',
    dataIndex: 'marque',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '规格 ',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术条件种类名称',
    dataIndex: 'techCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '主制部门',
    dataIndex: 'mainHrDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料大类',
    dataIndex: 'mdsItemClassId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交货状态',
    dataIndex: 'deliveryStatus',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '版本号 ',
    dataIndex: 'itemRevision',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '适用产品',
    dataIndex: 'appProductCodeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划价 ',
    dataIndex: 'plannedPrice',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料状态 ',
    dataIndex: 'mdsItemStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '扩展属性合并显示文本 ',
    dataIndex: 'extendText',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级 ',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '原始物料编码',
    dataIndex: 'originalItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '物料基础码',
    dataIndex: 'extendItemCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '特殊要求',
    dataIndex: 'specialRequirements',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技术标准号',
    dataIndex: 'technicalStandardNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技标版本',
    dataIndex: 'jbbb',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '集团码',
    dataIndex: 'jtm',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '制造国名称',
    dataIndex: 'makeCountry',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '牌号代码',
    dataIndex: 'marqueCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '交货状态代码',
    dataIndex: 'deliveryStatusCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '数据来源',
    dataIndex: 'dataSourceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '技术条件代码',
    dataIndex: 'techConditionCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '浪潮代码',
    dataIndex: 'lcCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '补充技术条件',
    dataIndex: 'additionalTechCondition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供货尺寸类别',
    dataIndex: 'deliverySizeType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '承制单位',
    dataIndex: 'manufactor',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '锻铸件类别',
    dataIndex: 'dzType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '超声波',
    dataIndex: 'csb',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '试料数量',
    dataIndex: 'testamount',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '关键件等级 ',
    dataIndex: 'keyLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否关键原材料',
    dataIndex: 'ynKeyMaterialName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '民机对应项目ID',
    dataIndex: 'mpmId',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '定倍尺标识',
    dataIndex: 'fixedFlag',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '技标号',
    dataIndex: 'jbh',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '机型代号主数据编码',
    dataIndex: 'jxdhbm',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '规格数据',
    dataIndex: 'mdmSpecs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否关键站位',
    dataIndex: 'ynKeyZwName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '标准号',
    dataIndex: 'bzh',
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
const queryForm = ref<MdsItemDto>({});
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
const totalPage = ref(0);
const itemTypeList = ref([]); // 物料类型 通用代码
const sourceTypeList = ref([]); // 来源类型通用代码
const keyFlagList = ref([]); // 关重件标记通用代码
const appProductCodeList = ref([]); // 适用产品通用代码
const mdsItemStatusList = ref([]); // 物料状态 通用代码
const secretLevelList = ref([]); // 密级 通用代码
const dataSourceList = ref([]); // 数据来源通用代码
const ynKeyMaterialList = ref([]); // 是否关键原材料通用代码
const ynKeyZwList = ref([]); // 是否关键站位通用代码
const info = ref();
const lookupParams = [
  { fieldName: 'itemType', lookUpType: 'MDS_ITEM_TYPE' },
  { fieldName: 'sourceType', lookUpType: 'SOURCE_TYPE: ' },
  { fieldName: 'keyFlag', lookUpType: 'KEY_FLAG' },
  { fieldName: 'appProductCode', lookUpType: 'PPM_MILITARY_CIVILIAN_AIRPLANE' },
  { fieldName: 'mdsItemStatus', lookUpType: 'MDS_ITEM_STATUS' },
  { fieldName: 'dataSource', lookUpType: 'MDS_ITEM_DATASOURCE ' },
  { fieldName: 'ynKeyMaterial', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'ynKeyZw', lookUpType: 'PLATFORM_YES_NO_FLAG' }
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
  listMdsItemByPage(queryParam)
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
    itemTypeList.value = result.itemType;
    sourceTypeList.value = result.sourceType;
    keyFlagList.value = result.keyFlag;
    appProductCodeList.value = result.appProductCode;
    mdsItemStatusList.value = result.mdsItemStatus;
    dataSourceList.value = result.dataSource;
    ynKeyMaterialList.value = result.ynKeyMaterial;
    ynKeyZwList.value = result.ynKeyZw;
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
    itemCode: value,
    itemName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
  info.value = rows[0];
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
function customRow(record) {
  return {
    on: {
      dblclick: (event, record, index) => {
        $emit('handleRowDblClick', [record]);
      }
    }
  };
}
defineExpose({
  info
});
</script>

