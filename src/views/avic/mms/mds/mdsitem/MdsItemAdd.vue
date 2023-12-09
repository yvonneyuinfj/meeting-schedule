<template>
  <AvicModal :visible="true" title="添加" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemCode" label="物料号 " has-feedback>
              <a-input v-model:value="form.itemCode" :maxLength="256" :auto-focus="true" placeholder="请输入物料号 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemName" label="物料名称 " has-feedback>
              <a-input v-model:value="form.itemName" :maxLength="256" placeholder="请输入物料名称 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingCode" label="图号">
              <a-input v-model:value="form.drawingCode" :maxLength="128" placeholder="请输入图号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemType" label="物料类型 " has-feedback>
              <a-select v-model:value="form.itemType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择物料类型 ">
                <a-select-option v-for="item in itemTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sourceType" label="来源类型">
              <a-select v-model:value="form.sourceType" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择来源类型">
                <a-select-option v-for="item in sourceTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="mdsUnitId" label="计量单位 " has-feedback>
              <a-input v-model:value="form.mdsUnitId" :maxLength="64" placeholder="请输入计量单位 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitName" label="计量单位 " has-feedback>
              <a-input v-model:value="form.mdsUnitName" :maxLength="64" placeholder="请输入计量单位 "
                @click="mdsUnitSelectClick">
                <template #suffix>
                  <a-tooltip title="计量单位">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keyFlag" label="关重件标记">
              <a-select v-model:value="form.keyFlag" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择关重件标记">
                <a-select-option v-for="item in keyFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注 ">
              <a-input v-model:value="form.note" :maxLength="2048" placeholder="请输入备注 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marque" label="牌号 ">
              <a-input v-model:value="form.marque" :maxLength="512" placeholder="请输入牌号 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="规格 ">
              <a-input v-model:value="form.specs" :maxLength="2048" placeholder="请输入规格 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techCondition" label="技术条件种类名称">
              <a-input v-model:value="form.techCondition" :maxLength="512" placeholder="请输入技术条件种类名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mainHrDeptId" label="主制部门">
              <AvicCommonSelect v-model:value="form.mainHrDeptId" type="deptSelect" placeholder="请选择主制部门" />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemClassId" label="物料大类">
              <a-input v-model:value="form.mdsItemClassId" :maxLength="64" placeholder="请输入物料大类" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="mdsItemClassId" label="物料大类 " has-feedback>
              <a-input v-model:value="form.mdsItemClassId" :maxLength="64" placeholder="请输入物料大类 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <!-- <a-form-item name="mdsItemClassId" label="物料大类" has-feedback>
              <a-input v-model:value="form.mdsItemClassId" :maxLength="64" placeholder="请输入物料大类 "
                @click="mdsUnitSelectClick">
                <template #suffix>
                  <a-tooltip title="物料大类">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item> -->
            <a-form-item name="mdsItemClassId" label="物料大类">
              <AvicTreeSelect v-model:value="form.mdsItemClassId" ref="treeSelectRef" :baseUrl="'/mms/mds/mdsitemclasss'"
                :parentId="parentId" :parentTitle="parentTitle" placeholder="请输入物料大类">
              </AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryStatus" label="交货状态">
              <a-input v-model:value="form.deliveryStatus" :maxLength="128" placeholder="请输入交货状态" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemRevision" label="版本号 ">
              <a-input v-model:value="form.itemRevision" :maxLength="16" placeholder="请输入版本号 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appProductCode" label="适用产品">
              <a-select v-model:value="form.appProductCode" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择适用产品">
                <a-select-option v-for="item in appProductCodeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价 ">
              <a-input v-model:value="form.plannedPrice" :maxLength="20" placeholder="请输入计划价 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemStatus" label="物料状态 ">
              <a-select v-model:value="form.mdsItemStatus" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择物料状态 ">
                <a-select-option v-for="item in mdsItemStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="extendText" label="扩展属性合并显示文本 ">
              <a-input v-model:value="form.extendText" :maxLength="1024" placeholder="请输入扩展属性合并显示文本 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 " has-feedback>
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择密级 ">
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalItemCode" label="原始物料编码">
              <a-input v-model:value="form.originalItemCode" :maxLength="64" placeholder="请输入原始物料编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="extendItemCode" label="物料基础码">
              <a-input v-model:value="form.extendItemCode" :maxLength="128" placeholder="请输入物料基础码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specialRequirements" label="特殊要求">
              <a-input v-model:value="form.specialRequirements" :maxLength="255" placeholder="请输入特殊要求" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="technicalStandardNo" label="技术标准号">
              <a-input v-model:value="form.technicalStandardNo" :maxLength="2000" placeholder="请输入技术标准号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jbbb" label="技标版本">
              <a-input v-model:value="form.jbbb" :maxLength="200" placeholder="请输入技标版本" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jtm" label="集团码">
              <a-input v-model:value="form.jtm" :maxLength="200" placeholder="请输入集团码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="makeCountry" label="制造国名称">
              <a-input v-model:value="form.makeCountry" :maxLength="200" placeholder="请输入制造国名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marqueCode" label="牌号代码">
              <a-input v-model:value="form.marqueCode" :maxLength="200" placeholder="请输入牌号代码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryStatusCode" label="交货状态代码">
              <a-input v-model:value="form.deliveryStatusCode" :maxLength="200" placeholder="请输入交货状态代码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dataSource" label="数据来源">
              <a-select v-model:value="form.dataSource" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择数据来源">
                <a-select-option v-for="item in dataSourceList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techConditionCode" label="技术条件代码">
              <a-input v-model:value="form.techConditionCode" :maxLength="200" placeholder="请输入技术条件代码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lcCode" label="浪潮代码">
              <a-input v-model:value="form.lcCode" :maxLength="500" placeholder="请输入浪潮代码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="additionalTechCondition" label="补充技术条件">
              <a-input v-model:value="form.additionalTechCondition" :maxLength="2048" placeholder="请输入补充技术条件" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliverySizeType" label="供货尺寸类别">
              <a-input v-model:value="form.deliverySizeType" :maxLength="2" placeholder="请输入供货尺寸类别" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactor" label="承制单位">
              <a-input v-model:value="form.manufactor" :maxLength="128" placeholder="请输入承制单位" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dzType" label="锻铸件类别">
              <a-input v-model:value="form.dzType" :maxLength="50" placeholder="请输入锻铸件类别" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="csb" label="超声波">
              <a-input v-model:value="form.csb" :maxLength="512" placeholder="请输入超声波" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testamount" label="试料数量">
              <a-input v-model:value="form.testamount" :maxLength="512" placeholder="请输入试料数量" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keyLevel" label="关键件等级 ">
              <a-input v-model:value="form.keyLevel" :maxLength="4" placeholder="请输入关键件等级 " />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynKeyMaterial" label="是否关键原材料">
              <a-select v-model:value="form.ynKeyMaterial" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否关键原材料">
                <a-select-option v-for="item in ynKeyMaterialList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mpmId" label="民机对应项目ID">
              <a-input v-model:value="form.mpmId" :maxLength="50" placeholder="请输入民机对应项目ID" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fixedFlag" label="定倍尺标识">
              <a-input v-model:value="form.fixedFlag" :maxLength="4" placeholder="请输入定倍尺标识" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jbh" label="技标号">
              <a-input v-model:value="form.jbh" :maxLength="256" placeholder="请输入技标号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jxdhbm" label="机型代号主数据编码">
              <a-input v-model:value="form.jxdhbm" :maxLength="50" placeholder="请输入机型代号主数据编码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdmSpecs" label="规格数据">
              <a-input v-model:value="form.mdmSpecs" :maxLength="2048" placeholder="请输入规格数据" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynKeyZw" label="是否关键站位">
              <a-select v-model:value="form.ynKeyZw" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否关键站位">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="bzh" label="标准号">
              <a-input v-model:value="form.bzh" :maxLength="256" placeholder="请输入标准号" />
            </a-form-item>
          </a-col>
          <!--新增字段-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemShortName" label="物料简称">
              <a-input v-model:value="form.itemShortName" :maxLength="256" placeholder="请输入物料简称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="barCode" label="条形码">
              <a-input v-model:value="form.barCode" :maxLength="256" placeholder="请输入条形码" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productLine" label="产品线">
              <a-input v-model:value="form.productLine" :maxLength="256" placeholder="请输入产品线" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemDutyType" label="物料税类">
              <a-input v-model:value="form.itemDutyType" :maxLength="256" placeholder="请输入物料税类" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="convertRate" label="换算率">
              <a-input v-model:value="form.convertRate" :maxLength="64" placeholder="请输入换算率" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="calculateUnit" label="辅计量单位">
              <a-input v-model:value="form.calculateUnit" :maxLength="64" placeholder="请输入辅计量单位" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemUseClassify" label="物资用途分类">
              <a-input v-model:value="form.itemUseClassify" :maxLength="256" placeholder="请输入物资用途分类" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialModal" label="材料形态">
              <a-input v-model:value="form.materialModal" :maxLength="256" placeholder="请输入材料形态" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accordClassify" label="核算分类">
              <a-input v-model:value="form.accordClassify" :maxLength="256" placeholder="请输入核算分类" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityGrade" label="质量等级">
              <a-input v-model:value="form.qualityGrade" :maxLength="64" placeholder="请输入质量等级" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="importanceLevel" label="重要程度">
              <a-input v-model:value="form.importanceLevel" :maxLength="64" placeholder="请输入重要程度" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceMaterial" label="生产材料">
              <a-input v-model:value="form.produceMaterial" :maxLength="256" placeholder="请输入生产材料" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMainParts" label="是否主制件">
              <a-select v-model:value="form.ynMainParts" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否主制件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynGeneralParts" label="是否通用件">
              <a-select v-model:value="form.ynGeneralParts" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否通用件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAttach" label="是否成附件">
              <a-select v-model:value="form.ynAttach" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否成附件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynStandardParts" label="是否标准件">
              <a-select v-model:value="form.ynStandardParts" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否标准件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynDecompose" label="是否可分解">
              <a-select v-model:value="form.ynDecompose" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否可分解">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynConsume" label="是否消耗件">
              <a-select v-model:value="form.ynConsume" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否消耗件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynVirtual" label="是否虚拟件">
              <a-select v-model:value="form.ynVirtual" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否虚拟件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workTechnology" label="加工工艺">
                <a-input v-model:value="form.workTechnology" :maxLength="256" placeholder="请输入加工工艺" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="sizeClassify" label="大小分类">
                <a-input v-model:value="form.sizeClassify" :maxLength="64" placeholder="请输入大小分类" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMaster" label="是否主机件">
              <a-select v-model:value="form.ynMaster" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" placeholder="请选择是否主机件">
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="serialNo" label="流水号">
              <a-input v-model:value="form.serialNo" :maxLength="4" placeholder="请输入流水号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemFlag" label="不传二级库标记">
              <a-input v-model:value="form.itemFlag" :maxLength="4" placeholder="请输入不传二级库标记" />
            </a-form-item>
          </a-col>
          <!--新增字段-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="add" ref="uploadFile" :allow-download="true" :allow-preview="true"
                :allow-delete="true" :allow-update-secret-level="true" :form-id="form.id"
                :form-secret-level="form.secretLevel" table-name="MDS_ITEM" @afterUpload="afterUploadEvent" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <MdsUnitSelect v-if="mdsUnitModal" ref="mdsUnitSelect" :visible="mdsUnitModal" @closeCancel="closeUnit"
      @getUnitId="getUnitId" />
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsItemForm, emits } from './ts/MdsItemForm'; // 引入表单ts
import MdsUnitSelect from '@/views/avic/mms/mds/mdsunit/MdsUnitSelect.vue'; // 引入计量单位弹窗选择页
/** 计量单位弹窗 */
const mdsUnitSelectClick = () => {
  mdsUnitModal.value = true;
};
/** 关闭计量单位弹窗 */
const closeUnit = () => {
  mdsUnitModal.value = false;
};
const getUnitId = (v) => {
  form.value.mdsUnitId = v.id;
  form.value.mdsUnitName = v.unitCode;
  mdsUnitModal.value = false;
};
const mdsUnitModal = ref<boolean>(false);// 是否展示计量单位弹窗弹窗
const mdsUnitSelect = ref(null);
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    default: ''
  },
  parentTitle: {
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
  itemTypeList,
  sourceTypeList,
  keyFlagList,
  appProductCodeList,
  mdsItemStatusList,
  secretLevelList,
  dataSourceList,
  ynKeyMaterialList,
  ynKeyZwList,
  uploadFile,
  afterUploadEvent,
  saveForm,
  closeModal
} = useMdsItemForm({
  props: props,
  emit: emit
});
</script>

