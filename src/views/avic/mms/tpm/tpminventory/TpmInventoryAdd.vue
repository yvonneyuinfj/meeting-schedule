<template>
  <AvicModal
    :visible="true"
    title="添加设备台账"
    width="90%"
    height="580px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal" :colon="false" :rules="rules">
        <a-row :gutter="16">
          <!-- 第一行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAssetClassId" label="设备大类" has-feedback>
              <AvicTreeSelect
                v-model:value="form.tpmAssetClassId"
                :parentId="form.tpmAssetClassId"
                :parentTitle="form.className"
                ref="treeSelectRef"
                baseUrl="/mms/tpm/tpmassetclasss"
                :allowSelectNonIsLeaf="false"
                @select="getTreeNodeTitle($event, 'className')"
                @change="getTreeChangeId"
                placeholder="请选择设备大类"
              ></AvicTreeSelect>
            </a-form-item>
          </a-col>
          <!--
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="设备大类名称">
              <a-input
                v-model:value="form.className"
                :maxLength="64"
                placeholder="选择设备大类后自动写入"
                disabled
              />
            </a-form-item>
          </a-col>
          
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classCode" label="设备大类编码">
              <a-input
                v-model:value="form.classCode"
                :maxLength="64"
                placeholder="选择设备大类后自动写入"
                disabled
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsCode" label="资产编号" has-feedback>
              <a-input
                v-model:value="form.assetsCode"
                :maxLength="128"
                placeholder="请输入资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号" has-feedback>
              <a-input
                v-model:value="form.equipmentCode"
                :maxLength="128"
                  placeholder="自动编号：四位设备大类CODE+五位流水号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentName" label="设备名称" has-feedback>
              <a-input
                v-model:value="form.equipmentName"
                :maxLength="128"
                placeholder="请输入设备名称"
              />
            </a-form-item>
          </a-col>
          <!-- 第二行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="设备规格" :rules="rules.specs">
              <a-input v-model:value="form.specs" :maxLength="128" placeholder="请输入设备规格"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="model" label="设备型号">
              <a-input v-model:value="form.model" :maxLength="128" placeholder="请输入设备型号"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentType" label="设备类型" has-feedback>
              <a-select
                v-model:value="form.equipmentType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择设备类型"
              >
                <a-select-option
                  v-for="item in equipmentTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentNo" label="对应试验器">
              <a-input
                v-model:value="form.equipmentNo"
                :maxLength="128"
                placeholder="请输入对应试验器"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registrationCode" label="特种设备注册代码">
              <a-input
                v-model:value="form.registrationCode"
                :maxLength="64"
                placeholder="请输入特种设备注册代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAnnualInspection" label="是否年检">
              <a-select
                v-model:value="form.ynAnnualInspection"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否年检"
              >
                <a-select-option
                  v-for="item in ynAnnualInspectionList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- 第三行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="manufactureFactoryName"
              label="生产厂家"
              :rules="rules_manufactureFactoryName"
            >
              <a-input
                v-model:value="form.manufactureFactoryName"
                :maxLength="512"
                placeholder="请输入生产厂家名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="mdsVendorName"
              label="供应商"
              :rules="rules_mdsVendorName"
            >
              <a-input
                v-model:value="form.mdsVendorName"
                :maxLength="512"
                placeholder="请输入供应商"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="manufactureFactoryCountry"
              :rules="rules_manufactureFactoryCountry"
              label="厂家国别"
            >
              <a-input
                v-model:value="form.manufactureFactoryCountry"
                :maxLength="32"
                placeholder="请输入生产厂家国别"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaveFactoryNo" label="出厂编号">
              <a-input
                v-model:value="form.leaveFactoryNo"
                :maxLength="64"
                placeholder="请输入出厂编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaveFactoryDate" label="出厂日期">
              <a-date-picker
                v-model:value="form.leaveFactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂日期"
              />
            </a-form-item>
          </a-col>
          <!-- 第四行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abcdType" label="设备级别" :rules="rules_abcdType" has-feedback>
              <a-select
                v-model:value="form.abcdType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择设备级别"
              >
                <a-select-option
                  v-for="item in abcdTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门" has-feedback>
              <AvicCommonSelect
                v-model:value="form.useDeptId"
                type="deptSelect"
                placeholder="请选择使用部门"
                :default-show-value="form.useDeptName"
                @callback="getSelectName($event, 'useDeptName')"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门NAME">
              <a-input
                v-model:value="form.useDeptName"
                :maxLength="128"
                placeholder="选择使用部门后自动写入"
                disabled
              />
            </a-form-item>
          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="responseUserId"
              label="责任人"
              :rules="rules_responseUserId"
              has-feedback
            >
              <AvicCommonSelect
                v-model:value="form.responseUserId"
                type="userSelect"
                placeholder="请选择责任人"
                :default-show-value="form.responseUserName"
                @callback="getSelectName($event, 'responseUserName')"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserName" label="责任人NAME">
              <a-input
                v-model:value="form.responseUserName"
                :maxLength="64"
                placeholder="请输入责任人NAME"
                disabled
              />
            </a-form-item>
          </a-col> -->

          <!-- 第五行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseDate" label="购置日期" has-feedback>
              <a-date-picker
                v-model:value="form.purchaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="originalValue"
              label="原值(元)"
              :rules="rules_originalValue"
              has-feedback
            >
              <a-input
                v-model:value="form.originalValue"
                :maxLength="20"
                placeholder="请输入原值(元)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="netValue" label="净值(元)" has-feedback>
              <a-input v-model:value="form.netValue" :maxLength="20" placeholder="请输入净值(元)"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧" has-feedback>
              <a-input
                v-model:value="form.depreciationValue"
                :maxLength="20"
                placeholder="请输入累计折旧值"
              />
            </a-form-item>
          </a-col>

          <!-- 第六行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recordDate" label="启用时间" :rules="rules_recordDate" has-feedback>
              <a-date-picker
                v-model:value="form.recordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择启用时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="commissionDate" label="投产时间" has-feedback>
              <a-date-picker
                v-model:value="form.commissionDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择投产时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qaDate" label="质保日期" has-feedback>
              <a-date-picker
                v-model:value="form.qaDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择质保日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item
              name="equipmentManageDeptId"
              label="管理部门"
              :rules="rules_equipmentManageDeptId"
              has-feedback
            >
              <AvicCommonSelect
                v-model:value="form.equipmentManageDeptId"
                type="deptSelect"
                placeholder="请选择管理部门"
                :default-show-value="form.attribute02"
                @callback="getSelectName($event, 'attribute02')"
              />
            </a-form-item>
          </a-col>

          <!-- 第七行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备" has-feedback>
              <a-select
                v-model:value="form.ynMilitaryKeyEquip"
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
          <a-col v-bind="colLayout.cols2" v-show="form.ynMilitaryKeyEquip==='1'">
            <a-form-item
              name="militaryKeyEquipCode"
              label="军工关键设备专用代码"
              :labelCol="labelCol"
            >
              <a-input
                v-model:value="form.militaryKeyEquipCode"
                :maxLength="128"
                placeholder="请输入专用代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMajorAssets" label="是否军工重大专用资产" has-feedback>
              <a-select
                v-model:value="form.ynMajorAssets"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否军工重大专用资产"
              >
                <a-select-option
                  v-for="item in ynMajorAssetsList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBottleneckEquipment" label="是否瓶颈设备">
              <a-select
                v-model:value="form.ynBottleneckEquipment"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否瓶颈设备"
              >
                <a-select-option
                  v-for="item in ynBottleneckEquipmentList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="energyEfficiency" label="能效">
              <a-select
                v-model:value="form.energyEfficiency"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择能效"
              >
                <a-select-option
                  v-for="item in energyEfficiencyList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- 第八行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="capitalSource" label="资金来源">
              <a-select
                v-model:value="form.capitalSource"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资金来源"
              >
                <a-select-option
                  v-for="item in capitalSourceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentStatus" label="设备状态">
              <a-select
                v-model:value="form.equipmentStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择设备状态"
              >
                <a-select-option
                  v-for="item in equipmentStatusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAreaId" label="设备地理区域" has-feedback>
              <AvicTreeSelect
                v-model:value="form.tpmAreaId"
                ref="treeSelectRef"
                baseUrl="/mms/tpm/tpmareas"
                :allowSelectNonIsLeaf="false"
                :parentId="form.tpmAreaId"
                :parentTitle="form.areaName"
                @select="getTreeNodeTitle($event, 'areaName')"
                placeholder="请选择地理区域"
              ></AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="storageLocation" label="具体位置">
              <a-input
                v-model:value="form.storageLocation"
                :maxLength="512"
                placeholder="请输入具体位置"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="areaName" label="区域名称">
              <a-input v-model:value="form.areaName" :maxLength="64" placeholder="请输入区域名称" />
            </a-form-item>
          </a-col> -->

          <!-- 第九行 -->


          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMaintain" label="是否保养">
              <a-select
                v-model:value="form.ynMaintain"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否保养"
              >
                <a-select-option
                  v-for="item in ynMaintainList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynEntrance" label="是否进口">
              <a-select
                v-model:value="form.ynEntrance"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否进口"
              >
                <a-select-option
                  v-for="item in ynEntranceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- 第十行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynTransferRecord" label="是否调拨">
              <a-select
                v-model:value="form.ynTransferRecord"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否调拨"
              >
                <a-select-option
                  v-for="item in ynTransferRecordList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferRecordDate" label="调拨时间">
              <a-date-picker
                v-model:value="form.transferRecordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择调拨时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferRecord" label="调拨记录">
              <a-input
                v-model:value="form.transferRecord"
                :maxLength="512"
                placeholder="请输入调拨记录"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wasteDate" label="报废日期">
              <a-date-picker
                v-model:value="form.wasteDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择报废日期"
              />
            </a-form-item>
          </a-col>

          <!-- 第十一行 -->
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="qty" label="数量" has-feedback>
              <a-input-number
                v-model:value="form.qty"
                :min="1"
                :defaultValue="1"
                placeholder="请输入数量"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item label="创建时间">
              <a-input :value="$dayjs().format('YYYY-MM-DD')" disabled/>
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item label="创建人">
              <a-input v-model:value="form.attribute01" disabled/>
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
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

          <!-- 第十二行 -->
          <a-col v-bind="colLayout.cols4">
            <a-form-item name="note" label="备注">
              <a-textarea v-model:value="form.note" :maxLength="512" placeholder="请输入备注"/>
            </a-form-item>
          </a-col>

          <!-- 第十三行 -->
          <a-col v-bind="colLayout.cols4">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="add"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                table-name="TPM_INVENTORY"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料表ID">
              <a-input
                v-model:value="form.mdsItemId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入物料表ID"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="weight" label="设备重量（kg）">
              <a-input
                v-model:value="form.weight"
                :maxLength="16"
                placeholder="请输入设备重量（kg）"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorId" label="供应商ID">
              <a-input
                v-model:value="form.mdsVendorId"
                :maxLength="64"
                placeholder="请输入供应商ID"
              />
            </a-form-item>
          </a-col>
          
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorName" label="供应商名称【冗余设计】">
              <a-input
                v-model:value="form.mdsVendorName"
                :maxLength="128"
                placeholder="请输入供应商名称【冗余设计】"
              />
            </a-form-item>
          </a-col>


          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitName" label="计量单位名称">
              <a-input
                v-model:value="form.mdsUnitName"
                :maxLength="32"
                placeholder="请输入计量单位名称"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="machineComplexRate" label="机械复杂系数">
              <a-input
                v-model:value="form.machineComplexRate"
                :maxLength="16"
                placeholder="请输入机械复杂系数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="electricComplexRate" label="电气复杂系数">
              <a-input
                v-model:value="form.electricComplexRate"
                :maxLength="16"
                placeholder="请输入电气复杂系数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentPower" label="设备功率（kW）">
              <a-input
                v-model:value="form.equipmentPower"
                :maxLength="16"
                placeholder="请输入设备功率（kW）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="motorQty" label="电机台数">
              <a-input-number
                v-model:value="form.motorQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入电机台数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keyOnlyChildFlag" label="是否关键独生子">
              <a-select
                v-model:value="form.keyOnlyChildFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否关键独生子"
              >
                <a-select-option
                  v-for="item in keyOnlyChildFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plateNumber" label="车牌号">
              <a-input
                v-model:value="form.plateNumber"
                :maxLength="32"
                placeholder="请输入车牌号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tankSize" label="油箱大小（L）">
              <a-input
                v-model:value="form.tankSize"
                :maxLength="20"
                placeholder="请输入油箱大小（L）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="verificationCycle" label="检定周期（月）">
              <a-input-number
                v-model:value="form.verificationCycle"
                :min="0"
                :max="9999999999"
                :precision="0"
                :step="1"
                placeholder="请输入检定周期（月）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lastVerificationDate" label="上次检定日期">
              <a-date-picker
                v-model:value="form.lastVerificationDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择上次检定日期"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="cncType" label="数控分类">
              <a-select
                v-model:value="form.cncType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择数控分类"
              >
                <a-select-option
                  v-for="item in cncTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cncCtrlSystem" label="数控控制系统">
              <a-input
                v-model:value="form.cncCtrlSystem"
                :maxLength="128"
                placeholder="请输入数控控制系统"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsStatus" label="资产状态">
              <a-select
                v-model:value="form.assetsStatus"
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
        </a-row>

        <a-row></a-row>
        <a-row>
          <a-col v-bind="colLayout.cols4">
            <a-form-item name="reason" label="原因，可以是各种原因，作废原因、报废原因、拆除原因等">
              <a-input
                v-model:value="form.reason"
                :maxLength="4000"
                placeholder="请输入原因，可以是各种原因，作废原因、报废原因、拆除原因等"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynFixed" label="是转固，通用代码：YN_FLAG^ Y是，N否">
              <a-select
                v-model:value="form.ynFixed"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是转固，通用代码：YN_FLAG^ Y是，N否"
              >
                <a-select-option
                  v-for="item in ynFixedList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限">
              <a-input-number
                v-model:value="form.useTime"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入使用年限"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkDeptName" label="检定单位">
              <a-input
                v-model:value="form.checkDeptName"
                :maxLength="64"
                placeholder="请输入检定单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentForeignName" label="设备外文名称">
              <a-input
                v-model:value="form.equipmentForeignName"
                :maxLength="64"
                placeholder="请输入设备外文名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetType" label="资产类别">
              <a-select
                v-model:value="form.assetType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资产类别"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetManageUserId" label="资产分管人员ID">
              <a-input
                v-model:value="form.assetManageUserId"
                :maxLength="64"
                placeholder="请输入资产分管人员ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetManageUserName" label="资产分管人员名称">
              <a-input
                v-model:value="form.assetManageUserName"
                :maxLength="64"
                placeholder="请输入资产分管人员名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsUse" label="资产用途">
              <a-select
                v-model:value="form.assetsUse"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资产用途"
              >
                <a-select-option
                  v-for="item in assetsUseList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="otherCost" label="安装运杂费">
              <a-input
                v-model:value="form.otherCost"
                :maxLength="20"
                placeholder="请输入安装运杂费"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="voucherNo" label="财务凭证号">
              <a-input
                v-model:value="form.voucherNo"
                :maxLength="128"
                placeholder="请输入财务凭证号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fuelType" label="燃料种类">
              <a-input
                v-model:value="form.fuelType"
                :maxLength="128"
                placeholder="请输入燃料种类"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outlineSize" label="外廓尺寸">
              <a-input
                v-model:value="form.outlineSize"
                :maxLength="128"
                placeholder="请输入外廓尺寸"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="carColor" label="车身颜色">
              <a-input
                v-model:value="form.carColor"
                :maxLength="128"
                placeholder="请输入车身颜色"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vinNo" label="车架号">
              <a-input v-model:value="form.vinNo" :maxLength="128" placeholder="请输入车架号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineNo" label="发动机号码">
              <a-input
                v-model:value="form.engineNo"
                :maxLength="128"
                placeholder="请输入发动机号码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineModel" label="发动机型号">
              <a-input
                v-model:value="form.engineModel"
                :maxLength="128"
                placeholder="请输入发动机型号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="订单号">
              <a-input v-model:value="form.orderNo" :maxLength="128" placeholder="请输入订单号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号">
              <a-input v-model:value="form.invoiceNo" :maxLength="128" placeholder="请输入发票号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="documentNo" label="批复文号">
              <a-input
                v-model:value="form.documentNo"
                :maxLength="128"
                placeholder="请输入批复文号"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="registrationNo" label="登记号">
              <a-input
                v-model:value="form.registrationNo"
                :maxLength="64"
                placeholder="请输入登记号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="acceptanceDate" label="验收日期">
              <a-date-picker
                v-model:value="form.acceptanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentPerformance" label="设备性能/主要技术指标">
              <a-input
                v-model:value="form.equipmentPerformance"
                :maxLength="128"
                placeholder="请输入设备性能/主要技术指标"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="technicalInfo" label="技术资料">
              <a-input
                v-model:value="form.technicalInfo"
                :maxLength="128"
                placeholder="请输入技术资料"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="carryCargo" label="载货（吨）">
              <a-input
                v-model:value="form.carryCargo"
                :maxLength="20"
                placeholder="请输入载货（吨）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="passengersNum" label="载人数量">
              <a-input-number
                v-model:value="form.passengersNum"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入载人数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferProjectType" label="移交项目类别">
              <a-select
                v-model:value="form.transferProjectType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择移交项目类别"
              >
                <a-select-option
                  v-for="item in transferProjectTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmTransferFixedBillId" label="移交转固表ID">
              <a-input
                v-model:value="form.tpmTransferFixedBillId"
                :maxLength="64"
                placeholder="请输入移交转固表ID"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetManageDeptId" label="资产分管单位ID">
              <a-input
                v-model:value="form.assetManageDeptId"
                :maxLength="64"
                placeholder="请输入资产分管单位ID"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentUse" label="用途">
              <a-select
                v-model:value="form.equipmentUse"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择用途"
              >
                <a-select-option
                  v-for="item in equipmentUseList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentSerialNumber" label="设备序列号">
              <a-input
                v-model:value="form.equipmentSerialNumber"
                :maxLength="64"
                placeholder="请输入设备序列号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hdSerialNumber" label="硬盘序列号">
              <a-input
                v-model:value="form.hdSerialNumber"
                :maxLength="64"
                placeholder="请输入硬盘序列号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="systemInstallDate" label="操作系统安装时间">
              <a-date-picker
                v-model:value="form.systemInstallDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择操作系统安装时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageType" label="存储介质类型">
              <a-input
                v-model:value="form.storageType"
                :maxLength="64"
                placeholder="请输入存储介质类型"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaSerialNumber" label="存储介质序列号">
              <a-input
                v-model:value="form.storageMediaSerialNumber"
                :maxLength="64"
                placeholder="请输入存储介质序列号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaCode" label="存储介质编号">
              <a-input
                v-model:value="form.storageMediaCode"
                :maxLength="64"
                placeholder="请输入存储介质编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaName" label="存储介质名称">
              <a-input
                v-model:value="form.storageMediaName"
                :maxLength="64"
                placeholder="请输入存储介质名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ipAddress" label="联网设备IP地址">
              <a-input
                v-model:value="form.ipAddress"
                :maxLength="64"
                placeholder="请输入联网设备IP地址"
              />
            </a-form-item>
          </a-col>

-->
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
import { useTpmInventoryForm, emits } from './ts/TpmInventoryForm'; // 引入表单ts
const labelCol = reactive({ span: 6, offset: 0 });
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
  equipmentTypeList,
  abcdTypeList,
  keyOnlyChildFlagList,
  cncTypeList,
  equipmentStatusList,
  assetsStatusList,
  ynEntranceList,
  secretLevelList,
  ynMilitaryKeyEquipList,
  ynMajorAssetsList,
  ynFixedList,
  assetTypeList,
  assetsUseList,
  transferProjectTypeList,
  ynMaintainList,
  ynTransferRecordList,
  equipmentUseList,
  ynBottleneckEquipmentList,
  energyEfficiencyList,
  ynAnnualInspectionList,
  capitalSourceList,
  uploadFile,
  proxy,
  afterUploadEvent,
  saveForm,
  closeModal,
  getSelectName,
  getTreeNodeTitle,
  getTreeChangeId
} = useTpmInventoryForm({
  props: props,
  emit: emit
});

</script>
