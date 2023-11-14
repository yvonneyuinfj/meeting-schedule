<template>
  <AvicModal :visible="true" title="添加" width="1280px" height="520px" :centered="true" @cancel="closeModal">
    <div>
      <a-spin :spinning="loading">
        <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
          <a-row :gutter="16">
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetClassName" label="资产类别名称" has-feedback>
                <a-input v-model:value="form.assetClassName" :maxLength="64" placeholder="请输入资产类别名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetsCode" label="资产编号" has-feedback>
                <a-input v-model:value="form.assetsCode" :maxLength="128" placeholder="请输入资产编号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetsName" label="资产名称" has-feedback>
                <a-input v-model:value="form.assetsName" :maxLength="128" placeholder="请输入资产名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="equipClass" label="设备大类" has-feedback>
                <a-input v-model:value="form.equipClass" :maxLength="32" placeholder="请输入设备大类" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="equipNo" label="设备编号">
                <a-input v-model:value="form.equipNo" :maxLength="128" placeholder="请输入设备编号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="deptName" label="使用部门" has-feedback>
                <a-input v-model:value="form.deptName" :maxLength="64" placeholder="请输入使用部门" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetsStatus" label="资产状态">
                <a-select v-model:value="form.assetsStatus" :get-popup-container="triggerNode => triggerNode.parentNode"
                          option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择资产状态">
                  <a-select-option v-for="item in assetsStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="entryDate" label="入账日期" has-feedback>
                <a-input v-model:value="form.entryDate" :maxLength="64" placeholder="请输入入账日期" />
              </a-form-item>
            </a-col>
<!--            主管部门-->
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetSpec" label="资产规格" has-feedback>
                <a-input v-model:value="form.assetSpec" :maxLength="32" placeholder="请输入资产规格" />
              </a-form-item>
            </a-col>

            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetOriginalValue" label="资产原值" has-feedback>
                <a-input v-model:value="form.assetOriginalValue" :maxLength="64" placeholder="请输入资产原值" />
              </a-form-item>
            </a-col>

            <a-col v-bind="colLayout.cols">
              <a-form-item name="depreciationValue" label="资产累计折旧">
                <a-input v-model:value="form.depreciationValue" :maxLength="20" placeholder="请输入资产累计折旧" />
              </a-form-item>
            </a-col>

            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetNetValue" label="资产净值" has-feedback>
                <a-input v-model:value="form.assetNetValue" :maxLength="16" placeholder="请输入资产净值" />
              </a-form-item>
            </a-col>

            <a-col v-bind="colLayout.cols">
              <a-form-item name="secretLevel" label="数据密级" has-feedback>
                <a-select v-model:value="form.secretLevel" :auto-focus="true"
                  :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                  :show-search="true" :allow-clear="true" placeholder="请选择数据密级">
                  <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>


            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetSource" label="资产来源" has-feedback>
                <a-input v-model:value="form.assetSource" :maxLength="64" placeholder="请输入资产来源" />
              </a-form-item>
            </a-col>

            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetsUse" label="资产用途" has-feedback>
                <a-input v-model:value="form.assetsUse" :maxLength="64" placeholder="请输入资产用途" />
              </a-form-item>
            </a-col>



            <a-col v-bind="colLayout.cols">
              <a-form-item name="depreciationWay" label="折旧方法">
                <a-input v-model:value="form.depreciationWay" :maxLength="64" placeholder="请输入折旧方法" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetNum" label="资产数量" has-feedback>
                <a-input v-model:value="form.assetNum" :maxLength="16" placeholder="请输入资产数量" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="useTime" label="使用年限">
                <a-input v-model:value="form.useTime" :maxLength="16" placeholder="请输入使用年限" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="storageLocation" label="存放地点">
                <a-input v-model:value="form.storageLocation" :maxLength="16" placeholder="请输入存放地点" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="monDepreciation" label="月折旧额" has-feedback>
                <a-input v-model:value="form.monDepreciation" :maxLength="16" placeholder="请输入月折旧额" />
              </a-form-item>
            </a-col>


            <a-col v-bind="colLayout.cols">
              <a-form-item name="responseUserName" label="责任人">
                <AvicCommonSelect v-model:value="form.responseUserName" type="userSelect" placeholder="请选择责任人NAME" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="firstDepreciationValue" label="入账时累计折旧">
                <a-input v-model:value="form.firstDepreciationValue" :maxLength="20" placeholder="请输入入账时累计折旧" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="monthProposed" label="已提月份">
                <a-date-picker v-model:value="form.monthProposed" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  placeholder="请选择已提月份" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="brandModel" label="品牌型号">
                <a-input v-model:value="form.brandModel" :maxLength="50" placeholder="请输入品牌型号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="purchaseDate" label="购置日期">
                <a-date-picker v-model:value="form.purchaseDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  placeholder="请选择购置日期" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="currentYearDepreciation" label="入账前当年折旧">
                <a-input v-model:value="form.currentYearDepreciation" :maxLength="16" placeholder="请输入入账前当年折旧" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="newaCurrentmProvision" label="新增当月计提">
                <a-input v-model:value="form.newaCurrentmProvision" :maxLength="64" placeholder="请输入新增当月计提" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="other" label="其他">
                <a-input v-model:value="form.other" :maxLength="64" placeholder="请输入其他" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="resetVoucherNo" label="重置凭证号">
                <a-input v-model:value="form.resetVoucherNo" :maxLength="64" placeholder="请输入重置凭证号" />
              </a-form-item>
            </a-col>

            <a-col v-bind="colLayout.cols">
              <a-form-item name="productionNo" label="出厂编号">
                <a-input v-model:value="form.productionNo" :maxLength="64" placeholder="请输入出厂编号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="voucherNo" label="凭证号">
                <a-input v-model:value="form.voucherNo" :maxLength="128" placeholder="请输入凭证号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="factoryOwner" label="厂商">
                <a-input v-model:value="form.factoryOwner" :maxLength="64" placeholder="请输入厂商" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="buildProject" label="建设项目">
                <a-input v-model:value="form.buildProject" :maxLength="64" placeholder="请输入建设项目" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="brand" label="品牌">
                <a-input v-model:value="form.brand" :maxLength="64" placeholder="请输入品牌" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="ownershipCertNo" label="权属证号">
                <a-input v-model:value="form.ownershipCertNo" :maxLength="64" placeholder="请输入权属证号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="procureOrderNo" label="采购合同号">
                <a-input v-model:value="form.procureOrderNo" :maxLength="64" placeholder="请输入采购合同号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetSecretLevel" label="资产密级">
                <a-input v-model:value="form.assetSecretLevel" :maxLength="64" placeholder="请输入资产密级" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备">
                <a-select v-model:value="form.ynMilitaryKeyEquip"
                  :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                  :show-search="true" :allow-clear="true" placeholder="请选择是否军工关键设备">
                  <a-select-option v-for="item in ynMilitaryKeyEquipList" :key="item.sysLookupTlId"
                    :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="receiveDeptName" label="接收部门名称">
                <AvicCommonSelect v-model:value="form.receiveDeptName" type="deptSelect" placeholder="请选择接收部门名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="managerDeptName" label="管理部门">
                <AvicCommonSelect v-model:value="form.managerDeptName" type="deptSelect" placeholder="请选择管理部门" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetClass" label="资产类别">
                <a-input v-model:value="form.assetClass" :maxLength="64" placeholder="请输入资产类别" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="fundSource" label="资金来源">
                <a-input v-model:value="form.fundSource" :maxLength="64" placeholder="请输入资金来源" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="projectName" label="项目名称">
                <a-input v-model:value="form.projectName" :maxLength="32" placeholder="请输入项目名称" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="handlePersonName" label="经办人名称" has-feedback>
                <AvicCommonSelect v-model:value="form.handlePersonName" type="userSelect" placeholder="请选择经办人名称" />
              </a-form-item>
            </a-col>


            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetModel" label="资产型号" has-feedback>
                <a-input v-model:value="form.assetModel" :maxLength="32" placeholder="请输入资产型号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetUnit" label="资产单价" has-feedback>
                <a-input v-model:value="form.assetUnit" :maxLength="16" placeholder="请输入资产单价" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="invoiceNo" label="发票号" has-feedback>
                <a-input v-model:value="form.invoiceNo" :maxLength="64" placeholder="请输入发票号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="productionDate" label="出厂日期" has-feedback>
                <a-date-picker v-model:value="form.productionDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                  placeholder="请选择出厂日期" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="parentAssetNo" label="父资产编号" has-feedback>
                <a-input v-model:value="form.parentAssetNo" :maxLength="32" placeholder="请输入父资产编号" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="importedOrNot" label="是否为进口设备" has-feedback>
                <a-select v-model:value="form.importedOrNot" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否为进口设备">
                  <a-select-option v-for="item in importedOrNotList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="assetType" label="资产分类" has-feedback>
                <a-select v-model:value="form.assetType" :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择资产分类">
                  <a-select-option v-for="item in assetTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                    {{ item.lookupName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="warrantyPeriod" label="质保期" has-feedback>
                <a-input v-model:value="form.warrantyPeriod" :maxLength="64" placeholder="请输入质保期" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
    </div>
    <div style="display:flex;">
      <div v-for="item in famTabs" :class="tab === item.id ? 'active' : 'unActive'" style="margin:0 20px 10px 0"
        @click="famTabsClick(item.id)">{{
          item.label }}</div>
    </div>
    <AvicTable ref="famInventory" table-key="famInventory" :columns="columns" :row-key="record => record.id"
      :data-source="data" :loading="loading" :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }" :pageParameter="queryParam.pageParameter" :total="totalPage" @refresh="getList">
    </AvicTable>

    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useFamInventoryForm, emits } from './ts/FamInventoryForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const data = ref([]);
const tab = ref(0);
const famTabs = ref([
  {
    label: '资产变更记录',
    id: 0
  },
  {
    label: '资产改造信息',
    id: 1
  },
  {
    label: '资产出租/出借信息',
    id: 2
  },
  {
    label: '资产调配信息',
    id: 3
  },
  {
    label: '资产封存/启封信息',
    id: 4
  },
  {
    label: '附属台账信息',
    id: 5
  }
]);
const columns = [
  {
    name: '流程状态',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '更改单号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '更改内容',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '更改原因',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: '申请人',
    key: 'action'
  },
  {
    title: '申请日期',
    key: 'action'
  },
  {
    title: '联系电话',
    key: 'action'
  },
  {
    title: '密级',
    key: 'action'
  }
];
const selectedRowKeys = ref([]); // 选中数据主键集合
const totalPage = ref(0);
const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  assetsStatusList,
  ynMilitaryKeyEquipList,
  importedOrNotList,
  assetTypeList,
  saveForm,
  closeModal
} = useFamInventoryForm({
  props: props,
  emit: emit
});

/** 勾选复选框时触发 */
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
}
/** 获取列表 */
function getList() {

}

/** 资产列表tab点击 */
function famTabsClick(id) {
  tab.value = id;
  getList();
}
</script>
<style scope lang="less">
.active {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}

.unActive {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #1D2129;
  border-color: #C9CDD4;
  background: #fff;

  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }
}
</style>
