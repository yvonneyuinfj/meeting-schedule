<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料表ID">
              <a-input v-model:value="form.mdsItemId" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsCode" label="资产编号">
              <a-input v-model:value="form.assetsCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号，编码规则：分类码+四位流水">
              <a-input v-model:value="form.equipmentCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentName" label="设备名称">
              <a-input v-model:value="form.equipmentName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentType" label="设备类型，通用代码：TPM_EQUIPMENT_TYPE^1特种设备 5 普通设备 10 办公自动化设备 15 视频监控、硬盘录像设备">
              <a-input v-model:value="form.equipmentType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="设备规格 ^">
              <a-input v-model:value="form.specs" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="model" label="设备型号">
              <a-input v-model:value="form.model" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="weight" label="设备重量（kg）">
              <a-input v-model:value="form.weight" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorId" label="供应商ID">
              <a-input v-model:value="form.mdsVendorId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorName" label="供应商名称【冗余设计】">
              <a-input v-model:value="form.mdsVendorName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryId" label="生产厂家ID">
              <a-input v-model:value="form.manufactureFactoryId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryName" label="生产厂家名称">
              <a-input v-model:value="form.manufactureFactoryName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryCountry" label="生产国别">
              <a-input v-model:value="form.manufactureFactoryCountry" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaveFactoryNo" label="出厂编号">
              <a-input v-model:value="form.leaveFactoryNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="leaveFactoryDate" label="出厂时间">
              <a-date-picker
                v-model:value="form.leaveFactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
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
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recordDate" label="入账时间">
              <a-date-picker
                v-model:value="form.recordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门ID">
              <a-input v-model:value="form.useDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门NAME">
              <a-input v-model:value="form.useDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qty" label="数量">
              <a-input v-model:value="form.qty" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitName" label="计量单位名称">
              <a-input v-model:value="form.mdsUnitName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserId" label="责任人ID">
              <a-input v-model:value="form.responseUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserName" label="责任人NAME">
              <a-input v-model:value="form.responseUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalValue" label="原值(元)">
              <a-input v-model:value="form.originalValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qaDate" label="质保日期">
              <a-date-picker
                v-model:value="form.qaDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abcdType" label="设备级别，ABCD分类，通用代码：TPM_ABCD_TYPE^ A重点设备B主要设备 C一般设备 D不重要设备">
              <a-input v-model:value="form.abcdType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseDate" label="购置日期">
              <a-date-picker
                v-model:value="form.purchaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageLocation" label="具体位置">
              <a-input v-model:value="form.storageLocation" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="machineComplexRate" label="机械复杂系数">
              <a-input v-model:value="form.machineComplexRate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="electricComplexRate" label="电气复杂系数">
              <a-input v-model:value="form.electricComplexRate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentPower" label="设备功率（kW）">
              <a-input v-model:value="form.equipmentPower" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="motorQty" label="电机台数">
              <a-input-number
                v-model:value="form.motorQty"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keyOnlyChildFlag" label="是否关键独生子，通用代码：YN_FLAG^ Y是，N否">
              <a-input v-model:value="form.keyOnlyChildFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plateNumber" label="车牌号">
              <a-input v-model:value="form.plateNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tankSize" label="油箱大小（L）">
              <a-input v-model:value="form.tankSize" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="verificationCycle" label="检定周期（月）">
              <a-input-number
                v-model:value="form.verificationCycle"
min="0"
                :max="9999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lastVerificationDate" label="上次检定日期">
              <a-date-picker
                v-model:value="form.lastVerificationDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="capitalSource" label="资金来源">
              <a-input v-model:value="form.capitalSource" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cncType" label="数控分类，通用代码：TPM_CNC_TYPE，1数控车床 5数控铣床及数控镗铣床 10数控加工中心 15数控坐标磨床 20数控电火花机床 25数控弯管机 30其它数控">
              <a-input v-model:value="form.cncType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cncCtrlSystem" label="数控控制系统">
              <a-input v-model:value="form.cncCtrlSystem" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentStatus" label="设备状态，通用代码：TPM_EQUIPMENT_STATUS^1在用 5限用 10待修 15 待修 20封存 25调试 30禁用">
              <a-input v-model:value="form.equipmentStatus" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsStatus" label="资产状态，通用代码：TPM_ASSETS_STATUS^^1在用 5租借 10闲置 15封存 20积压 25待报废 30报废 35拆除 40处置 45降级 50作废 默认在用">
              <a-input v-model:value="form.assetsStatus" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynEntrance" label="是否进口">
              <a-input v-model:value="form.ynEntrance" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wasteDate" label="报废日期">
              <a-date-picker
                v-model:value="form.wasteDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAssetClassId" label="资产大类表ID">
              <a-input v-model:value="form.tpmAssetClassId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="资产大类名称">
              <a-input v-model:value="form.className" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classCode" label="资产大类编码">
              <a-input v-model:value="form.classCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="数据密级">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="netValue" label="净值(元)">
              <a-input v-model:value="form.netValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧值">
              <a-input v-model:value="form.depreciationValue" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备，通用代码：YN_FLAG^ Y是，N否">
              <a-input v-model:value="form.ynMilitaryKeyEquip" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reason" label="原因，可以是各种原因，作废原因、报废原因、拆除原因等">
              <a-input v-model:value="form.reason" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAreaId" label="设备区域表ID">
              <a-input v-model:value="form.tpmAreaId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="areaName" label="区域名称">
              <a-input v-model:value="form.areaName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferRecord" label="调拨记录">
              <a-input v-model:value="form.transferRecord" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynFixed" label="是转固，通用代码：YN_FLAG^ Y是，N否">
              <a-input v-model:value="form.ynFixed" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useTime" label="使用年限">
              <a-input-number
                v-model:value="form.useTime"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="checkDeptName" label="检定单位">
              <a-input v-model:value="form.checkDeptName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentForeignName" label="设备外文名称">
              <a-input v-model:value="form.equipmentForeignName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetType" label="资产类别，通用代码：TPM_ASSET_TYPE^1土地、2设备、3运输工具、4房屋及建筑物、5投资性房地产、6土地使用权、7计算机软件">
              <a-input v-model:value="form.assetType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetManageUserId" label="资产分管人员ID">
              <a-input v-model:value="form.assetManageUserId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetManageUserName" label="资产分管人员名称">
              <a-input v-model:value="form.assetManageUserName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsUse" label="资产用途，通用代码：TPM_ASSETS_USE^1科研用、2生产用、3试验用、4办公用、5经营用、6其他">
              <a-input v-model:value="form.assetsUse" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="otherCost" label="安装运杂费">
              <a-input v-model:value="form.otherCost" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="voucherNo" label="财务凭证号">
              <a-input v-model:value="form.voucherNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fuelType" label="燃料种类">
              <a-input v-model:value="form.fuelType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="outlineSize" label="外廓尺寸">
              <a-input v-model:value="form.outlineSize" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="carColor" label="车身颜色">
              <a-input v-model:value="form.carColor" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vinNo" label="车架号">
              <a-input v-model:value="form.vinNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineNo" label="发动机号码">
              <a-input v-model:value="form.engineNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="engineModel" label="发动机型号">
              <a-input v-model:value="form.engineModel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="订单号">
              <a-input v-model:value="form.orderNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号">
              <a-input v-model:value="form.invoiceNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="documentNo" label="批复文号">
              <a-input v-model:value="form.documentNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentNo" label="对应试验器">
              <a-input v-model:value="form.equipmentNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registrationNo" label="登记号">
              <a-input v-model:value="form.registrationNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="acceptanceDate" label="验收日期">
              <a-date-picker
                v-model:value="form.acceptanceDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentPerformance" label="设备性能/主要技术指标">
              <a-input v-model:value="form.equipmentPerformance" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="technicalInfo" label="技术资料">
              <a-input v-model:value="form.technicalInfo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="carryCargo" label="载货（吨）">
              <a-input v-model:value="form.carryCargo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="passengersNum" label="载人数量">
              <a-input-number
                v-model:value="form.passengersNum"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferProjectType" label="移交项目类别，通用代码：TPM_TRANSFER_PROJECT_TYPE^1购置、2科研、3自制">
              <a-input v-model:value="form.transferProjectType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmTransferFixedBillId" label="移交转固表ID">
              <a-input v-model:value="form.tpmTransferFixedBillId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMaintain" label="是否保养，通用代码：YN_FLAG^ Y是，N否">
              <a-input v-model:value="form.ynMaintain" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetManageDeptId" label="资产分管单位ID">
              <a-input v-model:value="form.assetManageDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynTransferRecord" label="是否调拨 通用代码：YN_FLAG^ Y是，N否">
              <a-input v-model:value="form.ynTransferRecord" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="transferRecordDate" label="调拨时间">
              <a-date-picker
                v-model:value="form.transferRecordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentManageDeptId" label="设备分管单位ID">
              <a-input v-model:value="form.equipmentManageDeptId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentUse" label="用途，通用代码：TPM_EQUIPMENT_USE^">
              <a-input v-model:value="form.equipmentUse" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="militaryKeyEquipCode" label="军工关键设备专用代码">
              <a-input v-model:value="form.militaryKeyEquipCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBottleneckEquipment" label="是否瓶颈设备，通用代码：YN_FALG^Y是,N否">
              <a-input v-model:value="form.ynBottleneckEquipment" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="energyEfficiency" label="能效，通用代码：TPM_ENERGY_EFFICIENCY^1 I ,2 II , 3 III">
              <a-input v-model:value="form.energyEfficiency" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentSerialNumber" label="设备序列号">
              <a-input v-model:value="form.equipmentSerialNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="hdSerialNumber" label="硬盘序列号">
              <a-input v-model:value="form.hdSerialNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="systemInstallDate" label="操作系统安装时间">
              <a-date-picker
                v-model:value="form.systemInstallDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageType" label="存储介质类型">
              <a-input v-model:value="form.storageType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaSerialNumber" label="存储介质序列号">
              <a-input v-model:value="form.storageMediaSerialNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaCode" label="存储介质编号">
              <a-input v-model:value="form.storageMediaCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaName" label="存储介质名称">
              <a-input v-model:value="form.storageMediaName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ipAddress" label="联网设备IP地址">
              <a-input v-model:value="form.ipAddress" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registrationCode" label="注册代码">
              <a-input v-model:value="form.registrationCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAnnualInspection" label="是否年检，通用代码：YN_FALG^Y是,N否">
              <a-input v-model:value="form.ynAnnualInspection" disabled />
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
  layout,
  colLayout,
  loading,
  secretLevelList,
  closeModal
} = useTpmInventoryForm({
  props: props,
  emit: emit
});
</script>


