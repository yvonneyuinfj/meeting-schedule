<template>
  <AvicModal
      :visible="true"
      title="详情"
      width="90%"
      height="580px"
      :centered="true"
      @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal" :colon="false">
        <a-row :gutter="16">
          <!-- 第一行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAssetClassId" label="设备大类" has-feedback>
              <AvicTreeSelect
                  v-model:value="form.tpmAssetClassId"
                  ref="treeSelectRef"
                  baseUrl="/mms/tpm/tpmassetclasss"
                  :allowSelectNonIsLeaf="false"
                  :parentId="form.tpmAssetClassId"
                  :parentTitle="form.className"
                  @select="getTreeNodeTitle($event, 'className')"
                  disabled
              ></AvicTreeSelect>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
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
            <a-form-item name="assetsCode" label="资产编号">
              <a-input
                  v-model:value="form.assetsCode"
                  :maxLength="128"
                  placeholder="请输入资产编号"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号" has-feedback>
              <a-input
                  v-model:value="form.equipmentCode"
                  :maxLength="128"
                  placeholder="自动编号：四位设备大类CODE+五位流水号"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentName" label="设备名称" has-feedback>
              <a-input
                  v-model:value="form.equipmentName"
                  :maxLength="128"
                  placeholder="请输入设备名称"
                  disabled
              />
            </a-form-item>
          </a-col>
          <!-- 第二行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="设备规格">
              <a-input v-model:value="form.specs" :maxLength="128" placeholder="请输入设备规格" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="model" label="设备型号">
              <a-input v-model:value="form.model" :maxLength="128" placeholder="请输入设备型号" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentType" label="设备类型">
              <a-select
                  v-model:value="form.equipmentType"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择设备类型"
                  disabled
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
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registrationCode" label="特种设备注册代码">
              <a-input
                  v-model:value="form.registrationCode"
                  :maxLength="64"
                  placeholder="请输入特种设备注册代码"
                  disabled
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
                  disabled
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
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryId" label="生产厂家ID">
              <a-input
                v-model:value="form.manufactureFactoryId"
                :maxLength="512"
                placeholder="请输入生产厂家ID"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryName" label="生产厂家">
              <a-input
                  v-model:value="form.manufactureFactoryName"
                  :maxLength="512"
                  placeholder="请输入生产厂家名称"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item
                name="mdsVendorName"
                label="供应商"
            >
              <a-input
                  v-model:value="form.mdsVendorName"
                  :maxLength="512"
                  placeholder="请输入供应商"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryCountry" label="厂家国别">
              <a-input
                  v-model:value="form.manufactureFactoryCountry"
                  :maxLength="32"
                  placeholder="请输入生产厂家国别"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaveFactoryNo" label="出厂编号">
              <a-input
                  v-model:value="form.leaveFactoryNo"
                  :maxLength="64"
                  placeholder="请输入出厂编号"
                  disabled
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
                  disabled
              />
            </a-form-item>
          </a-col>
          <!-- 第四行 -->

          <a-col v-bind="colLayout.cols">
            <a-form-item name="abcdType" label="设备级别" has-feedback>
              <a-select
                  v-model:value="form.abcdType"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择设备级别"
                  disabled
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
                  disabled
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
            <a-form-item name="responseUserId" label="责任人">
              <AvicCommonSelect
                  v-model:value="form.responseUserId"
                  type="userSelect"
                  placeholder="请选择责任人"
                  :default-show-value="form.responseUserName"
                  @callback="getSelectName($event, 'responseUserName')"
                  disabled
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
            <a-form-item name="purchaseDate" label="购置日期">
              <a-date-picker
                  v-model:value="form.purchaseDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择购置日期"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalValue" label="原值(元)">
              <a-input
                  v-model:value="form.originalValue"
                  :maxLength="20"
                  placeholder="请输入原值(元)"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="netValue" label="净值(元)">
              <a-input v-model:value="form.netValue" :maxLength="20" placeholder="请输入净值(元)" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧">
              <a-input
                  v-model:value="form.depreciationValue"
                  :maxLength="20"
                  placeholder="请输入累计折旧值"
                  disabled
              />
            </a-form-item>
          </a-col>

          <!-- 第六行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recordDate" label="启用时间">
              <a-date-picker
                  v-model:value="form.recordDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择启用时间"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="commissionDate" label="投产时间">
              <a-date-picker
                  v-model:value="form.commissionDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择投产时间"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qaDate" label="质保日期">
              <a-date-picker
                  v-model:value="form.qaDate"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择质保日期"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentManageDeptId" label="管理部门">
              <AvicCommonSelect
                  v-model:value="form.equipmentManageDeptId"
                  type="deptSelect"
                  placeholder="请选择管理部门"
                  :default-show-value="form.attribute02"
                  @callback="getSelectName($event, 'attribute02')"
                  disabled
              />
            </a-form-item>
          </a-col>

          <!-- 第七行 -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备">
              <a-select
                  v-model:value="form.ynMilitaryKeyEquip"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择是否军工关键设备"
                  disabled
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
          <a-col v-bind="colLayout.cols2" v-show="form.ynMilitaryKeyEquip==='Y'">
            <a-form-item name="militaryKeyEquipCode" label="军工关键设备专用代码" :labelCol="largeLabelCol">
              <a-input
                  v-model:value="form.militaryKeyEquipCode"
                  :maxLength="128"
                  placeholder="请输入军工关键设备专用代码"
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMajorAssets" label="是否军工重大专用资产" :labelCol="largeLabelCol">
              <a-select
                  v-model:value="form.ynMajorAssets"
                  :get-popup-container="triggerNode => triggerNode.parentNode"
                  option-filter-prop="children"
                  :show-search="true"
                  :allow-clear="true"
                  placeholder="请选择是否军工重大专用资产"
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
            <a-form-item name="tpmAreaId" label="设备地理区域">
              <AvicTreeSelect
                  v-model:value="form.tpmAreaId"
                  ref="treeSelectRef"
                  baseUrl="/mms/tpm/tpmareas"
                  :allowSelectNonIsLeaf="false"
                  :parentId="form.tpmAreaId"
                  :parentTitle="form.areaName"
                  @select="getTreeNodeTitle($event, 'areaName')"
                  disabled
              ></AvicTreeSelect>
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="areaName" label="区域名称">
              <a-input v-model:value="form.areaName" :maxLength="64" placeholder="请输入区域名称" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="storageLocation" label="存放地点">
              <a-input
                  v-model:value="form.storageLocation"
                  :maxLength="512"
                  placeholder="请输入存放地点"
                  disabled
              />
            </a-form-item>
          </a-col>

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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferRecord" label="调拨记录">
              <a-input
                  v-model:value="form.transferRecord"
                  :maxLength="512"
                  placeholder="请输入调拨记录"
                  disabled
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
                  disabled
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
              <a-input :value="$dayjs(form.creationDate).format('YYYY-MM-DD')" disabled/>
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
                  disabled
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
              <a-textarea v-model:value="form.note" :maxLength="512" placeholder="请输入备注" disabled/>
            </a-form-item>
          </a-col>

          <!-- 第十三行 -->
          <a-col v-bind="colLayout.cols4">
            <a-form-item label="附件">
              <AvicUploader
                  element-id="1"
                  form-type="detail"
                  :allow-add="false"
                  :allow-download="true"
                  :allow-preview="true"
                  :form-id="form.id"
              />
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
import { useTpmInventoryForm, emits } from './ts/TpmInventoryForm'; // 引入表单ts
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
  largeLabelCol,
  loading,
  equipmentTypeList,
  abcdTypeList,
  keyOnlyChildFlagList,
  cncTypeList,
  equipmentStatusList,
  assetsStatusList,
  ynEntranceList,
  capitalSourceList,
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
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal,
  getSelectName,
  getTreeNodeTitle
} = useTpmInventoryForm({
  props: props,
  emit: emit
});

</script>

