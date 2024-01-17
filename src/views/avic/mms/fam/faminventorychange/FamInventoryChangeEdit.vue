<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row :gutter="0">
          <!--         <a-col v-bind="colLayout.cols2">
                     <a-form-item name="secretLevel" label="数据密级" has-feedback>
                       <a-select
                         v-model:value="form.secretLevel"
                         :auto-focus="true"
                         :get-popup-container="triggerNode => triggerNode.parentNode"
                         option-filter-prop="children"
                         :show-search="true"
                         :allow-clear="true"
                         placeholder="请选择数据密级"
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
                   </a-col> -->
          <!--         <a-col v-bind="colLayout.cols2">
                     <a-form-item name="assetsCode" label="资产编号" has-feedback>
                       <a-input
                         v-model:value="form.assetsCode"
                         :maxLength="128"
                         placeholder="请输入资产编号"
                       />
                     </a-form-item>
                   </a-col>
                   <a-col v-bind="colLayout.cols2">
                     <a-form-item name="assetsName" label="资产名称" has-feedback>
                       <a-input
                         v-model:value="form.assetsName"
                         :maxLength="128"
                         placeholder="请输入资产名称"
                       />
                     </a-form-item>
                   </a-col>
                   <a-col v-bind="colLayout.cols2">
                     <a-form-item name="assetClassName" label="资产类别名称" has-feedback>
                       <a-input
                         v-model:value="form.assetClassName"
                         :maxLength="64"
                         placeholder="请输入资产类别名称"
                       />
                     </a-form-item>
                   </a-col> 
                   <a-col v-bind="colLayout.cols2">
                     <a-form-item name="assetSource" label="资产来源" has-feedback>
                       <a-input
                         v-model:value="form.assetSource"
                         :maxLength="64"
                         placeholder="请输入资产来源"
                       />
                     </a-form-item>
                   </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="changeApplyNo" label="申请单编号" has-feedback>
              <avic-auto-code
                v-model:value="form.changeApplyNo"
                ref="autoCode"
                code-type="FAM_CHANGE_NO"
                code-param="FAM_INVENTORY_CHANGE"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入申请单编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetsStatus" label="资产状态">
              <a-select
                v-model:value="form.assetsStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资产状态"
                :disabled="formDisable['assetsStatus']"
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
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetsUse" label="资产用途" has-feedback>
              <a-input
                v-model:value="form.assetsUse"
                :maxLength="64"
                placeholder="请输入资产用途"
                :disabled="formDisable['assetsUse']"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="entryDate" label="入账日期" has-feedback>-->
          <!--              <a-date-picker-->
          <!--                v-model:value="form.entryDate"-->
          <!--                format="YYYY-MM-DD"-->
          <!--                value-format="YYYY-MM-DD"-->
          <!--                placeholder="请选择入账日期"-->
          <!--                :disabled="formDisable.get('entryDate')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetOriginalValue" label="资产原值" has-feedback>
              <a-input-number
                v-model:value="form.assetOriginalValue"
                :max="999999999999"
                :min="-999999999999"
                :precision="2"
                :step="0.01"
                placeholder="请输入资产原值"
                style="width: 100%"
                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
                :disabled="formDisable['assetOriginalValue']"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="depreciationValue" label="累计折旧">
              <a-input-number
                v-model:value="form.depreciationValue"
                :max="999999999999"
                :min="-999999999999"
                :precision="2"
                :step="0.01"
                placeholder="请输入累计折旧"
                style="width: 100%"
                :disabled="formDisable['depreciationValue']"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="depreciationWay" label="折旧方法">
              <a-input
                v-model:value="form.depreciationWay"
                :maxLength="64"
                placeholder="请输入折旧方法"
                :disabled="formDisable['depreciationWay']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetNum" label="资产数量" has-feedback>
              <a-input-number
                v-model:value="form.assetNum"
                :max="999999999999"
                :min="-999999999999"
                placeholder="请输入资产数量"
                style="width: 100%"
                :disabled="formDisable['assetNum']"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="useTime" label="使用年限">
              <a-input
                v-model:value="form.useTime"
                :maxLength="16"
                placeholder="请输入使用年限"
                :disabled="formDisable['useTime']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetNetValue" label="资产净值" has-feedback>
              <a-input-number
                v-model:value="form.assetNetValue"
                :max="999999999999"
                :min="-999999999999"
                :precision="2"
                :step="0.01"
                placeholder="请输入资产净值"
                style="width: 100%"
                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
                :disabled="formDisable['assetNetValue']"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="monDepreciation" label="月折旧额" has-feedback>-->
          <!--              <a-input-number-->
          <!--                v-model:value="form.monDepreciation"-->
          <!--                :max="999999999999"-->
          <!--                :min="-999999999999"-->
          <!--                :precision="2"-->
          <!--                :step="0.01"-->
          <!--                placeholder="请输入月折旧额"-->
          <!--                style="width: 100%"-->
          <!--                :disabled="formDisable.get('monDepreciation')"-->
          <!--              ></a-input-number>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="storageLocation" label="存放地点" has-feedback>
              <a-input
                v-model:value="form.storageLocation"
                :maxLength="64"
                placeholder="请输入存放地点"
                :disabled="formDisable['storageLocation']"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="deptName" label="部门名称" has-feedback>-->
          <!--              <a-input-->
          <!--                v-model:value="form.deptName"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入部门名称"-->
          <!--                :disabled="formDisable.get('deptName')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="managerDeptId" label="主管部门">-->
          <!--              <AvicCommonSelect-->
          <!--                v-model:value="form.managerDeptId"-->
          <!--                type="deptSelect"-->
          <!--                placeholder="请选择主管部门"-->
          <!--                :disabled="formDisable.get('managerDeptId')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="responseUserId" label="责任人">
              <AvicCommonSelect
                v-model:value="form.responseUserId"
                type="userSelect"
                placeholder="请选择责任人"
                :defaultShowValue="form.responseUserIdAlias"
                disabled
              />
              <!--              :disabled="formDisable['responseUserId']"-->
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="firstDepreciationValue" label="入账时累计折旧">-->
          <!--              <a-input-number-->
          <!--                v-model:value="form.firstDepreciationValue"-->
          <!--                :max="999999999999"-->
          <!--                :min="-999999999999"-->
          <!--                :precision="2"-->
          <!--                :step="0.01"-->
          <!--                placeholder="请输入入账时累计折旧"-->
          <!--                style="width: 100%"-->
          <!--                :disabled="formDisable.get('firstDepreciationValue')"-->
          <!--              ></a-input-number>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="monthProposed" label="已提月份">
              <a-date-picker
                v-model:value="form.monthProposed"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择已提月份"
                :disabled="formDisable['monthProposed']"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="brandModel" label="品牌型号">-->
          <!--              <a-input-->
          <!--                v-model:value="form.brandModel"-->
          <!--                :maxLength="50"-->
          <!--                placeholder="请输入品牌型号"-->
          <!--                :disabled="formDisable.get('brandModel')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="purchaseDate" label="购置日期">-->
          <!--              <a-date-picker-->
          <!--                v-model:value="form.purchaseDate"-->
          <!--                format="YYYY-MM-DD"-->
          <!--                value-format="YYYY-MM-DD"-->
          <!--                placeholder="请选择购置日期"-->
          <!--                :disabled="formDisable.get('purchaseDate')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="currentYearDepreciation" label="入账前当年折旧">-->
          <!--              <a-input-number-->
          <!--                v-model:value="form.currentYearDepreciation"-->
          <!--                :max="999999999999"-->
          <!--                :min="-999999999999"-->
          <!--                :precision="2"-->
          <!--                :step="0.01"-->
          <!--                placeholder="请输入入账前当年折旧"-->
          <!--                style="width: 100%"-->
          <!--                :disabled="formDisable.get('currentYearDepreciation')"-->
          <!--              ></a-input-number>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="newaCurrentmProvision" label="新增当月计提">-->
          <!--              <a-input-->
          <!--                v-model:value="form.newaCurrentmProvision"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入新增当月计提"-->
          <!--                :disabled="formDisable.get('newaCurrentmProvision')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="other" label="其他">-->
          <!--              <a-input-->
          <!--                v-model:value="form.other"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入其他"-->
          <!--                :disabled="formDisable.get('other')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="resetVoucherNo" label="重置凭证号">-->
          <!--              <a-input-->
          <!--                v-model:value="form.resetVoucherNo"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入重置凭证号"-->
          <!--                :disabled="formDisable.get('resetVoucherNo')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">
                      <a-form-item name="equipNo" label="设备编号">
                        <a-input
                          v-model:value="form.equipNo"
                          :maxLength="128"
                          placeholder="请输入设备编号"
                        />
                      </a-form-item>
                    </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="productionNo" label="出厂编号">
              <a-input
                v-model:value="form.productionNo"
                :maxLength="64"
                placeholder="请输入出厂编号"
                :disabled="formDisable['productionNo']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="voucherNo" label="凭证号">
              <a-input
                v-model:value="form.voucherNo"
                :maxLength="128"
                placeholder="请输入凭证号"
                :disabled="formDisable['voucherNo']"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="producer" label="生产商">-->
          <!--              <a-input-->
          <!--                v-model:value="form.producer"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入厂商"-->
          <!--                :disabled="formDisable.get('producer')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="buildProject" label="建设项目">-->
          <!--              <a-input-->
          <!--                v-model:value="form.buildProject"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入建设项目"-->
          <!--                :disabled="formDisable.get('buildProject')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="brand" label="品牌">
              <a-input
                v-model:value="form.brand"
                :maxLength="64"
                placeholder="请输入品牌"
                :disabled="formDisable['brand']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="ownershipCertNo" label="权属证号">
              <a-input
                v-model:value="form.ownershipCertNo"
                :maxLength="64"
                placeholder="请输入权属证号"
                :disabled="formDisable['ownershipCertNo']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="factoryOwner" label="生产商">
              <a-input
                v-model:value="form.factoryOwner"
                :maxLength="64"
                placeholder="请输入生产商"
                :disabled="formDisable['factoryOwner']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="procureOrderNo" label="采购合同号">
              <a-input
                v-model:value="form.procureOrderNo"
                :maxLength="64"
                placeholder="请输入采购合同号"
                :disabled="formDisable['procureOrderNo']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetSecretLevel" label="资产密级">
              <a-select
                v-model:value="form.assetSecretLevel"
                style="width: 100%"
                placeholder="请选择"
                :disabled="formDisable['assetSecretLevel']"
                :get-popup-container="triggerNode => triggerNode.parentNode"
              >
                <a-select-option
                  v-for="select in assetSecretLevelList"
                  :key="select.sysLookupTlId"
                  :value="select.lookupCode"
                  :title="select.lookupName"
                  :disabled="select.disabled === true"
                >
                  {{ select.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备">
              <a-select
                v-model:value="form.ynMilitaryKeyEquip"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否军工关键设备"
                :disabled="formDisable['ynMilitaryKeyEquip']"
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
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="receiveDeptId" label="接收部门">-->
          <!--              <AvicCommonSelect-->
          <!--                v-model:value="form.receiveDeptId"-->
          <!--                type="deptSelect"-->
          <!--                placeholder="请选择接收部门"-->
          <!--                :disabled="formDisable['receiveDeptId')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetClass" label="资产类别">
              <a-input
                v-model:value="form.assetClassName"
                placeholder="请输入资产类别"
                @click="assetClasstClick"
                :disabled="formDisable['assetClass']"
              >
                <template #suffix>
                  <a-tooltip @click="assetClasstClick">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">-->
          <!--            <a-form-item name="fundSource" label="资金来源">-->
          <!--              <a-input-->
          <!--                v-model:value="form.fundSource"-->
          <!--                :maxLength="64"-->
          <!--                placeholder="请输入资金来源"-->
          <!--                :disabled="formDisable['fundSource')"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="projectName" label="项目名称">
              <a-input
                v-model:value="form.projectName"
                :maxLength="32"
                placeholder="请输入项目名称"
                :disabled="formDisable['projectName']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="handlePersonId" label="经办人">
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人"
                :disabled="formDisable['handlePersonId']"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">
                      <a-form-item name="equipClass" label="设备大类" has-feedback>
                        <a-input
                          v-model:value="form.equipClass"
                          :maxLength="32"
                          placeholder="请输入设备大类"
                        />
                      </a-form-item>
                    </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetSpec" label="资产规格" has-feedback>
              <a-input
                v-model:value="form.assetSpec"
                :maxLength="32"
                placeholder="请输入资产规格"
                :disabled="formDisable['assetSpec']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetModel" label="资产型号" has-feedback>
              <a-input
                v-model:value="form.assetModel"
                :maxLength="32"
                placeholder="请输入资产型号"
                :disabled="formDisable['assetModel']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetUnit" label="资产单价" has-feedback>
              <a-input-number
                v-model:value="form.assetUnit"
                :max="999999999999"
                :min="-999999999999"
                :precision="2"
                :step="0.01"
                placeholder="请输入资产单价"
                style="width: 100%"
                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
                :disabled="formDisable['assetUnit']"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="invoiceNo" label="发票号" has-feedback>
              <a-input
                v-model:value="form.invoiceNo"
                :maxLength="64"
                placeholder="请输入发票号"
                :disabled="formDisable['invoiceNo']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="productionDate" label="出厂日期" has-feedback>
              <a-date-picker
                v-model:value="form.productionDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期"
                :disabled="formDisable['productionDate']"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols2">
                      <a-form-item name="parentAssetNo" label="父资产编号" has-feedback>
                        <a-input
                          v-model:value="form.parentAssetNo"
                          :maxLength="32"
                          placeholder="请输入父资产编号"
                        />
                      </a-form-item>
                    </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="importedOrNot" label="是否为进口设备" has-feedback>
              <a-select
                v-model:value="form.importedOrNot"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否为进口设备"
                :disabled="formDisable['importedOrNot']"
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
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="assetType" label="资产分类" has-feedback>
              <a-select
                v-model:value="form.assetType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资产分类"
                :disabled="formDisable['assetType']"
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
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="warrantyPeriod" label="质保期" has-feedback>
              <a-date-picker
                v-model:value="form.warrantyPeriod"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保期"
                :disabled="formDisable['warrantyPeriod']"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="installLocation" label="安装地点" has-feedback>
              <a-input
                v-model:value="form.installLocation"
                :maxLength="64"
                placeholder="请输入安装地点"
                :disabled="formDisable['installLocation']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols4">
            <a-form-item
              name="changeReason"
              label="更改原因"
            >
              <a-textarea
                v-model:value="form.changeReason"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入更改原因"
                :disabled="formDisable['changeReason']"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <FamInventoryChangeListEdit ref="famInventoryChangeListEdit"/>
    </a-spin>
    <template #footer>
      <a-button v-if="showProcess" title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button v-else title="保存" type="primary" :loading="loading" @click="otherSaveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
  <!-- 树节点 -->
  <a-modal :visible="assetClasstOpen" @cancel="handleCancel" :body-style="bodyStyle" @ok="handleSummit">
    <div style="height: 100%;overflow: scroll">
      <a-spin :spinning="treeLoading">
        <a-tree
          v-if="treeData && treeData.length > 0"
          v-model:expanded-keys="expandedKeys"
          :tree-data="treeData"
          :load-data="onLoadData"
          :show-icon="true"
          :show-line="true && { showLeafIcon: false }"
          :default-expand-all="true"
          @expand="handleExpand"
          @select="handleSelect"
        >
          <template #icon="{ expanded, dataRef }">
            <AvicIcon v-if="dataRef.isLeaf" svg="avic-file-fill" color="#3370ff"/>
            <AvicIcon v-if="!expanded && !dataRef.isLeaf" svg="avic-folder-3-fill" color="#ffb800"/>
            <AvicIcon
              v-if="expanded && !dataRef.isLeaf"
              svg="avic-folder-open-fill"
              color="#ffb800"
            />
          </template>
        </a-tree>
      </a-spin>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { useFamInventoryChangeForm, emits } from './ts/FamInventoryChangeForm'; // 引入表单ts
import FamInventoryChangeListEdit from '@/views/avic/mms/fam/faminventorychangelist/FamInventoryChangeListEdit.vue';
import { getFamAssetClass, getTreeData } from '@/api/avic/mms/fam/FamAssetClassApi';
import { getExpandedKeys, setNodeSlots } from '@/utils/tree-util'; // 引入子表组件

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用
  params: {
    type: Object,
    required: false,
    default: null
  },
  // 启动流程后，刷新列表的回调函数
  bpmOperatorRefresh: {
    type: Function
  }
});
onMounted(() => {
  getTreeList();
});
const { proxy } = getCurrentInstance();
const emit = defineEmits(emits);
const treeNodeId = ref();
const assetClasstObj = ref({});
const assetClasstOpen = ref<boolean>(false);
const treeLoading = ref(false);
const defaultRootParentId = ref('-1');
const expandedKeys = ref([]); //树节点validateRules
const treeData = ref(null);
/** 资产类别弹窗 */
const assetClasstClick = () => {
  assetClasstOpen.value = true;
};

/** 关闭类别树弹窗 */
function handleCancel() {
  assetClasstOpen.value = false;
}

/** 异步加载树节点 */
async function onLoadData(treeNode) {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    getTreeData(1, treeNode.dataRef.id).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      treeData.value = [...treeData.value];
      resolve();
    });
  });
}

/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

/** 树选中事件 */
function handleSelect(keys: string[], node) {
  treeNodeId.value = node.node.id;
}

/** 查询数据 */
function getTreeList() {
  treeLoading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  getTreeData(expandLevel, defaultRootParentId.value).then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    treeLoading.value = false;
  });
}


/** 提交类别 */
function handleSummit() {
  getFamAssetClass(treeNodeId.value)
    .then(async res => {
        if (res.success) {
          if (res.data.treeLeaf === 'Y') {
            assetClasstObj.value = res.data;
            form.value.assetClasst = res.data.classCode;
            form.value.assetClassName = res.data.className;
            // 设置主管部门默认值
            if (['7', '3', '2', '8'].includes(form.value.assetClasst.charAt(0))) {
              form.value.managerDeptId = 'C410';
            }
            assetClasstOpen.value = false;
          } else {
            proxy.$message.warning('该数据不属于末级节点请重新选择！');
          }
        }
      }
    )
    .catch(error => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}

const showProcess = computed(() => {
  return ['C410', 'A220', 'A140', 'C450', 'C310', 'C350'].includes(proxy.$getLoginUser().entityDeptCode) ? true :
    proxy.$getLoginUser().entityDeptCode === 'C150' ? false : form.value.responseUserId ? true : false;
});

const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  assetSecretLevelList,
  loading,
  formDisable,
  otherSaveForm,
  assetsStatusList,
  ynMilitaryKeyEquipList,
  bodyStyle,
  importedOrNotList,
  assetTypeList,
  saveForm,
  closeModal,
  famInventoryChangeListEdit
} = useFamInventoryChangeForm({
  props: props,
  emit: emit
});
</script>
