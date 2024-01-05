<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form
          v-bind="layout"
          ref="formRef"
          :model="queryForm"
      >
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
          <a-col
              v-bind="colLayout.cols"
              v-show="advanced"
          >
            <a-form-item label="资产属性">
              <a-select
                  v-model:value="queryForm.assetType"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择资产属性"
              >
                <a-select-option
                    v-for="item in assetTypeList"
                    :key="item.sysLookupTlId"
                    :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--          <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产来源">
                        <a-input
                          v-model:value="queryForm.assetSource"
                          placeholder="请输入资产来源"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产状态">
                        <a-select
                          v-model:value="queryForm.assetsStatus"
                          :get-popup-container="triggerNode => triggerNode.parentNode"
                          option-filter-prop="children"
                          :show-search="true"
                          :allow-clear="true"
                          placeholder="请选择资产状态"
                        >
                          <a-select-option
                            v-for="item in assetsStatusList"
                            :key="item.sysLookupTlId"
                            :value="item.lookupCode"
                          >
                            {{ item.lookupName }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产用途">
                        <a-input
                          v-model:value="queryForm.assetsUse"
                          placeholder="请输入资产用途"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="入账日期">
                        <a-input
                          v-model:value="queryForm.entryDate"
                          placeholder="请输入入账日期"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产原值">
                        <a-input
                          v-model:value="queryForm.assetOriginalValue"
                          placeholder="请输入资产原值"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="累计折旧">
                        <a-input
                          v-model:value="queryForm.depreciationValue"
                          placeholder="请输入累计折旧"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="折旧方法">
                        <a-input
                          v-model:value="queryForm.depreciationWay"
                          placeholder="请输入折旧方法"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产数量">
                        <a-input
                          v-model:value="queryForm.assetNum"
                          placeholder="请输入资产数量"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="使用年限">
                        <a-input
                          v-model:value="queryForm.useTime"
                          placeholder="请输入使用年限"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产净值">
                        <a-input
                          v-model:value="queryForm.assetNetValue"
                          placeholder="请输入资产净值"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="月折旧额">
                        <a-input
                          v-model:value="queryForm.monDepreciation"
                          placeholder="请输入月折旧额"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="存放地点">
                        <a-input
                          v-model:value="queryForm.storageLocation"
                          placeholder="请输入存放地点"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="部门名称">
                        <a-input
                          v-model:value="queryForm.deptName"
                          placeholder="请输入部门名称"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="责任人">
                        <AvicCommonSelect
                          v-model:value="queryForm.responseUserName"
                          type="userSelect"
                          placeholder="请选择责任人"
                          :defaultShowValue="queryForm.responseUserNameAlias"
                          @callback="
                            result => {
                              queryForm.responseUserNameAlias = result.names;
                            }
                          "
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="入账时累计折旧">
                        <a-input
                          v-model:value="queryForm.firstDepreciationValue"
                          placeholder="请输入入账时累计折旧"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
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
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
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
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="品牌型号">
                        <a-input
                          v-model:value="queryForm.brandModel"
                          placeholder="请输入品牌型号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
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
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
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
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="入账前当年折旧">
                        <a-input
                          v-model:value="queryForm.currentYearDepreciation"
                          placeholder="请输入入账前当年折旧"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="新增当月计提">
                        <a-input
                          v-model:value="queryForm.newaCurrentmProvision"
                          placeholder="请输入新增当月计提"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="其他">
                        <a-input
                          v-model:value="queryForm.other"
                          placeholder="请输入其他"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="重置凭证号">
                        <a-input
                          v-model:value="queryForm.resetVoucherNo"
                          placeholder="请输入重置凭证号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="设备编号">
                        <a-input
                          v-model:value="queryForm.equipNo"
                          placeholder="请输入设备编号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="出厂编号">
                        <a-input
                          v-model:value="queryForm.productionNo"
                          placeholder="请输入出厂编号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="凭证号">
                        <a-input
                          v-model:value="queryForm.voucherNo"
                          placeholder="请输入凭证号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="厂商">
                        <a-input
                          v-model:value="queryForm.factoryOwner"
                          placeholder="请输入厂商"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="建设项目">
                        <a-input
                          v-model:value="queryForm.buildProject"
                          placeholder="请输入建设项目"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="品牌">
                        <a-input
                          v-model:value="queryForm.brand"
                          placeholder="请输入品牌"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="权属证号">
                        <a-input
                          v-model:value="queryForm.ownershipCertNo"
                          placeholder="请输入权属证号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="采购合同号">
                        <a-input
                          v-model:value="queryForm.procureOrderNo"
                          placeholder="请输入采购合同号"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产密级">
                        <a-input
                          v-model:value="queryForm.assetSecretLevel"
                          placeholder="请输入资产密级"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="是否军工关键设备">
                        <a-select
                          v-model:value="queryForm.ynMilitaryKeyEquip"
                          :get-popup-container="triggerNode => triggerNode.parentNode"
                          option-filter-prop="children"
                          :show-search="true"
                          :allow-clear="true"
                          placeholder="请选择是否军工关键设备"
                        >
                          <a-select-option
                            v-for="item in ynMilitaryKeyEquipList"
                            :key="item.sysLookupTlId"
                            :value="item.lookupCode"
                          >
                            {{ item.lookupName }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="接收部门名称">
                        <AvicCommonSelect
                          v-model:value="queryForm.receiveDeptName"
                          type="deptSelect"
                          placeholder="请选择接收部门名称"
                          :defaultShowValue="queryForm.receiveDeptNameAlias"
                          @callback="
                            result => {
                              queryForm.receiveDeptNameAlias = result.names;
                            }
                          "
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资产类别">
                        <a-input
                          v-model:value="queryForm.assetClass"
                          placeholder="请输入资产类别"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col
                      v-bind="colLayout.cols"
                      v-show="advanced"
                    >
                      <a-form-item label="资金来源">
                        <a-input
                          v-model:value="queryForm.fundSource"
                          placeholder="请输入资金来源"
                          :allow-clear="true"
                          @pressEnter="handleQuery"
                        />
                      </a-form-item>
                    </a-col>-->
          <a-col
              v-bind="colLayout.cols"
              v-show="advanced"
          >
            <a-form-item label="项目名称">
              <a-input
                  v-model:value="queryForm.projectName"
                  placeholder="请输入项目名称"
                  :allow-clear="true"
                  @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="经办人名称">
              <AvicCommonSelect
                v-model:value="queryForm.handlePersonName"
                type="userSelect"
                placeholder="请选择经办人名称"
                :defaultShowValue="queryForm.handlePersonNameAlias"
                @callback="
                  result => {
                    queryForm.handlePersonNameAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="设备大类">
              <a-input
                v-model:value="queryForm.equipClass"
                placeholder="请输入设备大类"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="资产规格">
              <a-input
                v-model:value="queryForm.assetSpec"
                placeholder="请输入资产规格"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="资产型号">
              <a-input
                v-model:value="queryForm.assetModel"
                placeholder="请输入资产型号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="资产单价">
              <a-input
                v-model:value="queryForm.assetUnit"
                placeholder="请输入资产单价"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="发票号">
              <a-input
                v-model:value="queryForm.invoiceNo"
                placeholder="请输入发票号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
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
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
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
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="父资产编号">
              <a-input
                v-model:value="queryForm.parentAssetNo"
                placeholder="请输入父资产编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-bind="colLayout.cols"
            v-show="advanced"
          >
            <a-form-item label="是否为进口设备">
              <a-select
                v-model:value="queryForm.importedOrNot"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否为进口设备"
              >
                <a-select-option
                  v-for="item in importedOrNotList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col
              v-bind="colLayout.cols"
              style="margin-left: auto"
          >
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button
                    type="primary"
                    @click="handleQuery"
                >
                  <search-outlined/>
                  查询
                </a-button>
                <a-button
                    type="primary"
                    @click="resetQuery"
                    ghost
                >
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button
                    type="link"
                    @click="toggleAdvanced"
                    style="margin: 0"
                >
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced"/>
                  <down-outlined v-else/>
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
          ref="famInventory"
          table-key="famInventory"
          :columns="columns"
          :row-key="record => record.id"
          :data-source="list"
          :loading="loading"
          :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
          :pageParameter="queryParam.pageParameter"
          :total="totalPage"
          @change="handleTableChange"
          @refresh="getList"
      >
        <template
            #toolBarLeft
            v-if="!isAdd"
        >
          <a-space>
            <!-- <a-button
                v-hasPermi="['famInventory:add']"
                title="添加"
                type="primary"
                @click="handleAdd"
            >
              <template #icon>
                <plus-outlined/>
              </template>
              添加
            </a-button> -->
            <!-- <a-button
                v-hasPermi="['famInventory:del']"
                title="删除"
                danger
                :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
                :loading="delLoading"
                @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button> -->
            <a-button
                v-hasPermi="['famInventory:import']"
                title="导入"
                type="primary"
                ghost
                @click="handleImport"
            >
              <template #icon>
                <import-outlined/>
              </template>
              导入
            </a-button>
            <a-button
                v-hasPermi="['famInventory:export']"
                title="导出"
                type="primary"
                ghost
                @click="handleExport"
            >
              <template #icon>
                <export-outlined/>
              </template>
              导出
            </a-button>
            <!--            <a-button-->
            <!--              title="打印卡片"-->
            <!--              type="primary"-->
            <!--              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"-->
            <!--              @click="handlePrintCard(selectedRowKeys, '')"-->
            <!--            >-->
            <!--              打印卡片-->
            <!--            </a-button>-->
            <a-button
                title="同步浪潮折旧信息"
                type="primary"
            >
              <template #icon>
                <import-outlined/>
              </template>
              同步浪潮折旧信息
            </a-button>
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
              class="opt-btn-commonsearch"
              style="width: 200px"
              placeholder="请输入"
              :allow-clear="true"
              @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'assetsCode'">
            <a @click="handleDetail(record)">
              {{ record.assetsCode }}
            </a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <!-- <a-button
  type="link"
  class="inner-btn"
  @click.stop="handleEdit(record.id)">
编辑
</a-button>
<a-button
  v-hasPermi="['famInventory:del']"
  type="link"
  class="inner-btn"
  @click.stop="handleDelete([record.id], 'row')">
删除
</a-button> -->
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <fam-inventory-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <fam-inventory-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
    />
    <!-- 详情页面弹窗 -->
    <fam-inventory-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
    />
    <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="单表模板导入"
        importUrl="/mms/fam/faminventorys/importData/v1"
        downloadTemplateUrl="/mms/fam/faminventorys/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
    />
  </div>
</template>
<script lang="ts" setup>
import type { FamInventoryDto } from '@/api/avic/mms/fam/FamInventoryApi'; // 引入模块DTO
import { delFamInventory, exportExcel, listFamInventoryByPage } from '@/api/avic/mms/fam/FamInventoryApi'; // 引入模块API
import FamInventoryAdd from './FamInventoryAdd.vue'; // 引入添加页面组件
import FamInventoryEdit from './FamInventoryEdit.vue'; // 引入编辑页面组件
import FamInventoryDetail from './FamInventoryDetail.vue';
import { createMdsReportConditionByUserId, MdsReportConditionDto } from '@/api/avic/mms/mds/MdsReportConditionApi';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const $emit = defineEmits(['select', 'handleRowDblClick']);
const props = defineProps({
  isAdd: {
    type: Boolean,
    default: false
  },
  assetClass: {
    type: String,
    default: false
  }
});
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
    title: '资产编号',
    dataIndex: 'assetsCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产名称',
    dataIndex: 'assetsName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产类别名称',
    dataIndex: 'assetClassName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产来源',
    dataIndex: 'assetSource',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产状态',
    dataIndex: 'assetsStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产属性',
    dataIndex: 'assetTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '资产用途',
    dataIndex: 'assetsUse',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入账日期',
    dataIndex: 'entryDate',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产原值',
    dataIndex: 'assetOriginalValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '累计折旧',
    dataIndex: 'depreciationValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '折旧方法',
    dataIndex: 'depreciationWay',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产数量',
    dataIndex: 'assetNum',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用年限',
    dataIndex: 'useTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产净值',
    dataIndex: 'assetNetValue',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '月折旧额',
    dataIndex: 'monDepreciation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '存放地点',
    dataIndex: 'storageLocation',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '责任人',
    dataIndex: 'responseUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '入账时累计折旧',
    dataIndex: 'firstDepreciationValue',
    ellipsis: true,
    sorter: true,
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
    sorter: true,
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
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '新增当月计提',
    dataIndex: 'newaCurrentmProvision',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '其他',
    dataIndex: 'other',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '重置凭证号',
    dataIndex: 'resetVoucherNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '出厂编号',
    dataIndex: 'productionNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '凭证号',
    dataIndex: 'voucherNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '厂商',
    dataIndex: 'factoryOwner',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '建设项目',
    dataIndex: 'buildProject',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '权属证号',
    dataIndex: 'ownershipCertNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '采购合同号',
    dataIndex: 'procureOrderNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产密级',
    dataIndex: 'assetSecretLevel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否军工关键设备',
    dataIndex: 'ynMilitaryKeyEquipName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '接收部门名称',
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
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资金来源',
    dataIndex: 'fundSource',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '经办人名称',
    dataIndex: 'handlePersonNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备大类',
    dataIndex: 'equipClass',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产规格',
    dataIndex: 'assetSpec',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产型号',
    dataIndex: 'assetModel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '资产单价',
    dataIndex: 'assetUnit',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '发票号',
    dataIndex: 'invoiceNo',
    ellipsis: true,
    sorter: true,
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
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '是否为进口设备',
    dataIndex: 'importedOrNotName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '质保期',
    dataIndex: 'warrantyPeriod',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },

  // =================================================
  // =================================================
  // =================================================
  {
    title: '地理区域',
    dataIndex: 'geographicalAreaName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '开工时间',
    dataIndex: 'commencementTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '竣工时间',
    dataIndex: 'timeCompletion',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '所属土地',
    dataIndex: 'belongingLand',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不动产权证书',
    dataIndex: 'certificateTitle',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '不动产权证书面积',
    dataIndex: 'certificateTitleArea',
    ellipsis: true,
    minWidth: 150,
    resizable: true,
    align: 'center'
  },
  {
    title: '发证时间',
    dataIndex: 'issuanceTime',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '竣工备案书档案编号',
    dataIndex: 'recordNumber',
    ellipsis: true,
    minWidth: 150,
    resizable: true,
    align: 'center'
  },
  {
    title: '工程规划许可证',
    dataIndex: 'planningPermit',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '通知书',
    dataIndex: 'notice',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '附图档案编号',
    dataIndex: 'attachedFileNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否为科研厂房',
    dataIndex: 'isFactoryBuilding',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '进口设备国别',
    dataIndex: 'importedEquipment',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '车辆用途',
    dataIndex: 'vehicleUsageName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '车辆识别号',
    dataIndex: 'vehicleNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '车牌号',
    dataIndex: 'licensePlateNumber',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '排气量/ml',
    dataIndex: 'airDisplacement',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '发动机号',
    dataIndex: 'engineNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '使用位置',
    dataIndex: 'usePosition',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '建筑面积',
    dataIndex: 'floorspace',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '供应商',
    dataIndex: 'supplier',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '数据密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
];
const queryForm = ref<FamInventoryDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm.value
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'famInventory' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const selectedRows = ref([]); // 选中行集合
const totalPage = ref(0);
const secretLevelList = ref([]); // 数据密级通用代码
const assetsStatusList = ref([]); // 资产状态通用代码
const ynMilitaryKeyEquipList = ref([]); // 是否军工关键设备通用代码
const importedOrNotList = ref([]); // 是否为进口设备通用代码
const assetTypeList = ref([]); // 资产分类通用代码
const mdsReportConditionDto = ref<MdsReportConditionDto>({});
const lookupParams = [
  { fieldName: 'assetsStatus', lookUpType: 'FAM_ASSETS_STATUS' },
  { fieldName: 'ynMilitaryKeyEquip', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'importedOrNot', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'assetType', lookUpType: 'FAM_ASSET_TYPE' }
];

onMounted(() => {
  // 加载查询区所需通用代码
  getLookupList();
  if (props && props.assetClass === '1') {
    queryForm.value.assetType = props.assetClass;
    handleQuery();
  } else {
    // 加载表格数据
    getList();
  }
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = []; // 清空选中
  loading.value = true;
  switch (proxy.$getLoginUser().entityDeptCode) {
    case 'C150':
      break;
    case 'C410':
    case 'A220':
    case 'A140':
    case 'C450':
    case 'C310':
    case 'C350':
      queryParam.searchParams.receiveDeptId = proxy.$getLoginUser().entityDeptId;
      queryParam.searchParams.managerDeptId = proxy.$getLoginUser().entityDeptCode;
      break;
    default :
      queryParam.searchParams.receiveDeptId = proxy.$getLoginUser().entityDeptId;
      break;
  }
  listFamInventoryByPage(queryParam)
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

function handlePrintCard(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要打印的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要打印${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      mdsReportConditionDto.value.tableIdList = ids;
      const postData = proxy.$lodash.cloneDeep(mdsReportConditionDto.value);
      createMdsReportConditionByUserId(postData)
          .then(res => {
            if (res.success) {
              const url = 'http://192.168.1.144:8075/WebReport/ReportServer?reportlet=famInventory.cpt' + '&sysUserId=' + proxy.$getLoginUser().id;
              window.open(url, '_blank', '资产台账卡片');
            }
          })
          .catch((e) => {
            proxy.$message.error(e.message);
          });
    }
  });
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    assetsStatusList.value = result.assetsStatus;
    ynMilitaryKeyEquipList.value = result.ynMilitaryKeyEquip;
    importedOrNotList.value = result.importedOrNot;
    assetTypeList.value = result.assetType;
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
  const keyWord = {};
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}

/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}

/** 详细 */
function handleDetail(record) {
  formId.value = record.id;
  showDetailModal.value = true;
}

/** 导入 */
function handleImport() {
  showImportModal.value = true;
}

/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}

/** 删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delFamInventory(ids)
          .then(res => {
            if (res.success) {
              proxy.$message.success('删除成功！');
              getList();
            }
            delLoading.value = false;
          })
          .catch(() => {
            delLoading.value = false;
          });
    }
  });
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;

  $emit('select', selectedRows.value);
}

/** 表格排序 */
function handleTableChange(pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

/**
 *  批量添加返回勾选数据
 */

const selectedRow = (code) => {
  let rows = [];
  let canGo = true;
  if (props.assetClass !== '2') {
    selectedRows.value.map(item => {
      rows.push({
        ...item,
        operationType_: 'inside'
      });
    });
  } else {
    selectedRows.value.reduce((pre, cur, index) => {
      if (pre === cur.assetClass.charAt(0)) {
        rows.push({
          ...cur,
          operationType_: 'inside'
        });
      } else if (!(['1', '4', '6', '8'].includes(pre)) && !(['1', '4', '6', '8'].includes(cur.assetClass.charAt(0)))) {
        rows.push({
          ...cur,
          operationType_: 'inside'
        });
      } else {
        canGo = false;
      }
      return cur.assetClass.charAt(0);
    }, code || selectedRows.value[0].assetClass.charAt(0));
  }
  if (canGo) {
    return rows;
  } else {
    proxy.$message.warning('请选择相同的资产类别');
  }
};

watch(
    () => props.assetClass,
    newV => {
      if (newV === '1') {
        queryForm.value.assetType = props.assetClass;
        handleQuery();
      } else {
        queryForm.value.assetType = null;
        handleQuery();
      }
    }
);

defineExpose({
  selectedRow
});
</script>
