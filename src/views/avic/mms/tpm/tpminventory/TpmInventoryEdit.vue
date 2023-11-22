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
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
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
            <a-form-item name="assetsCode" label="资产编号">
              <a-input
                v-model:value="form.assetsCode"
                :maxLength="128"
                placeholder="请输入资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号，编码规则：分类码+四位流水" has-feedback>
              <a-input
                v-model:value="form.equipmentCode"
                :maxLength="128"
                placeholder="请输入设备编号，编码规则：分类码+四位流水"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentType" label="设备类型，通用代码：TPM_EQUIPMENT_TYPE^1特种设备 5 普通设备 10 办公自动化设备 15 视频监控、硬盘录像设备">
              <a-input
                v-model:value="form.equipmentType"
                :maxLength="2"
                placeholder="请输入设备类型，通用代码：TPM_EQUIPMENT_TYPE^1特种设备 5 普通设备 10 办公自动化设备 15 视频监控、硬盘录像设备"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="设备规格 ^">
              <a-input
                v-model:value="form.specs"
                :maxLength="128"
                placeholder="请输入设备规格 ^"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="model" label="设备型号">
              <a-input
                v-model:value="form.model"
                :maxLength="128"
                placeholder="请输入设备型号"
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
            <a-form-item name="manufactureFactoryId" label="生产厂家ID">
              <a-input
                v-model:value="form.manufactureFactoryId"
                :maxLength="512"
                placeholder="请输入生产厂家ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryName" label="生产厂家名称">
              <a-input
                v-model:value="form.manufactureFactoryName"
                :maxLength="512"
                placeholder="请输入生产厂家名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactureFactoryCountry" label="生产国别">
              <a-input
                v-model:value="form.manufactureFactoryCountry"
                :maxLength="32"
                placeholder="请输入生产国别"
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
            <a-form-item name="leaveFactoryDate" label="出厂时间">
              <a-date-picker
                v-model:value="form.leaveFactoryDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出厂时间"
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
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recordDate" label="入账时间">
              <a-date-picker
                v-model:value="form.recordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择入账时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门ID">
              <a-input
                v-model:value="form.useDeptId"
                :maxLength="64"
                placeholder="请输入使用部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用部门NAME">
              <a-input
                v-model:value="form.useDeptName"
                :maxLength="128"
                placeholder="请输入使用部门NAME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qty" label="数量" has-feedback>
              <a-input
                v-model:value="form.qty"
                :maxLength="16"
                placeholder="请输入数量"
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
            <a-form-item name="responseUserId" label="责任人ID">
              <a-input
                v-model:value="form.responseUserId"
                :maxLength="64"
                placeholder="请输入责任人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserName" label="责任人NAME">
              <a-input
                v-model:value="form.responseUserName"
                :maxLength="64"
                placeholder="请输入责任人NAME"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalValue" label="原值(元)">
              <a-input
                v-model:value="form.originalValue"
                :maxLength="20"
                placeholder="请输入原值(元)"
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
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="abcdType" label="设备级别，ABCD分类，通用代码：TPM_ABCD_TYPE^ A重点设备B主要设备 C一般设备 D不重要设备" has-feedback>
              <a-input
                v-model:value="form.abcdType"
                :maxLength="32"
                placeholder="请输入设备级别，ABCD分类，通用代码：TPM_ABCD_TYPE^ A重点设备B主要设备 C一般设备 D不重要设备"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchaseDate" label="购置日期">
              <a-date-picker
                v-model:value="form.purchaseDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择购置日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageLocation" label="具体位置">
              <a-input
                v-model:value="form.storageLocation"
                :maxLength="512"
                placeholder="请输入具体位置"
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
            <a-form-item name="keyOnlyChildFlag" label="是否关键独生子，通用代码：YN_FLAG^ Y是，N否">
              <a-input
                v-model:value="form.keyOnlyChildFlag"
                :maxLength="2"
                placeholder="请输入是否关键独生子，通用代码：YN_FLAG^ Y是，N否"
              />
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
            <a-form-item name="capitalSource" label="资金来源">
              <a-input
                v-model:value="form.capitalSource"
                :maxLength="2"
                placeholder="请输入资金来源"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cncType" label="数控分类，通用代码：TPM_CNC_TYPE，1数控车床 5数控铣床及数控镗铣床 10数控加工中心 15数控坐标磨床 20数控电火花机床 25数控弯管机 30其它数控">
              <a-input
                v-model:value="form.cncType"
                :maxLength="2"
                placeholder="请输入数控分类，通用代码：TPM_CNC_TYPE，1数控车床 5数控铣床及数控镗铣床 10数控加工中心 15数控坐标磨床 20数控电火花机床 25数控弯管机 30其它数控"
              />
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
            <a-form-item name="equipmentStatus" label="设备状态，通用代码：TPM_EQUIPMENT_STATUS^1在用 5限用 10待修 15 待修 20封存 25调试 30禁用">
              <a-input
                v-model:value="form.equipmentStatus"
                :maxLength="2"
                placeholder="请输入设备状态，通用代码：TPM_EQUIPMENT_STATUS^1在用 5限用 10待修 15 待修 20封存 25调试 30禁用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsStatus" label="资产状态，通用代码：TPM_ASSETS_STATUS^^1在用 5租借 10闲置 15封存 20积压 25待报废 30报废 35拆除 40处置 45降级 50作废 默认在用">
              <a-input
                v-model:value="form.assetsStatus"
                :maxLength="2"
                placeholder="请输入资产状态，通用代码：TPM_ASSETS_STATUS^^1在用 5租借 10闲置 15封存 20积压 25待报废 30报废 35拆除 40处置 45降级 50作废 默认在用"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynEntrance" label="是否进口">
              <a-input
                v-model:value="form.ynEntrance"
                :maxLength="2"
                placeholder="请输入是否进口"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAssetClassId" label="资产大类表ID">
              <a-input
                v-model:value="form.tpmAssetClassId"
                :maxLength="64"
                placeholder="请输入资产大类表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="资产大类名称">
              <a-input
                v-model:value="form.className"
                :maxLength="64"
                placeholder="请输入资产大类名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classCode" label="资产大类编码">
              <a-input
                v-model:value="form.classCode"
                :maxLength="64"
                placeholder="请输入资产大类编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="512"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="数据密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
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
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="netValue" label="净值(元)">
              <a-input
                v-model:value="form.netValue"
                :maxLength="20"
                placeholder="请输入净值(元)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depreciationValue" label="累计折旧值">
              <a-input
                v-model:value="form.depreciationValue"
                :maxLength="20"
                placeholder="请输入累计折旧值"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMilitaryKeyEquip" label="是否军工关键设备，通用代码：YN_FLAG^ Y是，N否">
              <a-input
                v-model:value="form.ynMilitaryKeyEquip"
                :maxLength="2"
                placeholder="请输入是否军工关键设备，通用代码：YN_FLAG^ Y是，N否"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reason" label="原因，可以是各种原因，作废原因、报废原因、拆除原因等">
              <a-input
                v-model:value="form.reason"
                :maxLength="4000"
                placeholder="请输入原因，可以是各种原因，作废原因、报废原因、拆除原因等"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tpmAreaId" label="设备区域表ID">
              <a-input
                v-model:value="form.tpmAreaId"
                :maxLength="64"
                placeholder="请输入设备区域表ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="areaName" label="区域名称">
              <a-input
                v-model:value="form.areaName"
                :maxLength="64"
                placeholder="请输入区域名称"
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
            <a-form-item name="ynFixed" label="是转固，通用代码：YN_FLAG^ Y是，N否">
              <a-input
                v-model:value="form.ynFixed"
                :maxLength="2"
                placeholder="请输入是转固，通用代码：YN_FLAG^ Y是，N否"
              />
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
            <a-form-item name="assetType" label="资产类别，通用代码：TPM_ASSET_TYPE^1土地、2设备、3运输工具、4房屋及建筑物、5投资性房地产、6土地使用权、7计算机软件">
              <a-input
                v-model:value="form.assetType"
                :maxLength="2"
                placeholder="请输入资产类别，通用代码：TPM_ASSET_TYPE^1土地、2设备、3运输工具、4房屋及建筑物、5投资性房地产、6土地使用权、7计算机软件"
              />
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
            <a-form-item name="assetsUse" label="资产用途，通用代码：TPM_ASSETS_USE^1科研用、2生产用、3试验用、4办公用、5经营用、6其他">
              <a-input
                v-model:value="form.assetsUse"
                :maxLength="2"
                placeholder="请输入资产用途，通用代码：TPM_ASSETS_USE^1科研用、2生产用、3试验用、4办公用、5经营用、6其他"
              />
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
              <a-input
                v-model:value="form.vinNo"
                :maxLength="128"
                placeholder="请输入车架号"
              />
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
              <a-input
                v-model:value="form.orderNo"
                :maxLength="128"
                placeholder="请输入订单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invoiceNo" label="发票号">
              <a-input
                v-model:value="form.invoiceNo"
                :maxLength="128"
                placeholder="请输入发票号"
              />
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
            <a-form-item name="equipmentNo" label="对应试验器">
              <a-input
                v-model:value="form.equipmentNo"
                :maxLength="128"
                placeholder="请输入对应试验器"
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
            <a-form-item name="transferProjectType" label="移交项目类别，通用代码：TPM_TRANSFER_PROJECT_TYPE^1购置、2科研、3自制">
              <a-input
                v-model:value="form.transferProjectType"
                :maxLength="2"
                placeholder="请输入移交项目类别，通用代码：TPM_TRANSFER_PROJECT_TYPE^1购置、2科研、3自制"
              />
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
            <a-form-item name="ynMaintain" label="是否保养，通用代码：YN_FLAG^ Y是，N否">
              <a-input
                v-model:value="form.ynMaintain"
                :maxLength="2"
                placeholder="请输入是否保养，通用代码：YN_FLAG^ Y是，N否"
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
            <a-form-item name="ynTransferRecord" label="是否调拨 通用代码：YN_FLAG^ Y是，N否">
              <a-input
                v-model:value="form.ynTransferRecord"
                :maxLength="2"
                placeholder="请输入是否调拨 通用代码：YN_FLAG^ Y是，N否"
              />
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
            <a-form-item name="equipmentManageDeptId" label="设备分管单位ID">
              <a-input
                v-model:value="form.equipmentManageDeptId"
                :maxLength="64"
                placeholder="请输入设备分管单位ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentUse" label="用途，通用代码：TPM_EQUIPMENT_USE^">
              <a-input
                v-model:value="form.equipmentUse"
                :maxLength="2"
                placeholder="请输入用途，通用代码：TPM_EQUIPMENT_USE^"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="militaryKeyEquipCode" label="军工关键设备专用代码">
              <a-input
                v-model:value="form.militaryKeyEquipCode"
                :maxLength="128"
                placeholder="请输入军工关键设备专用代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBottleneckEquipment" label="是否瓶颈设备，通用代码：YN_FALG^Y是,N否">
              <a-input
                v-model:value="form.ynBottleneckEquipment"
                :maxLength="2"
                placeholder="请输入是否瓶颈设备，通用代码：YN_FALG^Y是,N否"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="energyEfficiency" label="能效，通用代码：TPM_ENERGY_EFFICIENCY^1 I ,2 II , 3 III">
              <a-input
                v-model:value="form.energyEfficiency"
                :maxLength="2"
                placeholder="请输入能效，通用代码：TPM_ENERGY_EFFICIENCY^1 I ,2 II , 3 III"
              />
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registrationCode" label="注册代码">
              <a-input
                v-model:value="form.registrationCode"
                :maxLength="64"
                placeholder="请输入注册代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAnnualInspection" label="是否年检，通用代码：YN_FALG^Y是,N否">
              <a-input
                v-model:value="form.ynAnnualInspection"
                :maxLength="2"
                placeholder="请输入是否年检，通用代码：YN_FALG^Y是,N否"
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
  loading,
  secretLevelList,
  saveForm,
  closeModal
} = useTpmInventoryForm({
  props: props,
  emit: emit
});
</script>


