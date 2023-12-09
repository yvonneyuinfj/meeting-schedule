<template>
  <AvicModal :visible="true" title="详情" width="960px" height="520px" :centered="true" @cancel="closeModal">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemCode" label="物料号 ">
              <a-input v-model:value="form.itemCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemName" label="物料名称 ">
              <a-input v-model:value="form.itemName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="drawingCode" label="图号">
              <a-input v-model:value="form.drawingCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemType" label="物料类型 ">
              <a-select v-model:value="form.itemType" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in itemTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sourceType" label="来源类型">
              <a-select v-model:value="form.sourceType" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in sourceTypeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitName" label="计量单位 ">
              <a-input v-model:value="form.mdsUnitName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keyFlag" label="关重件标记">
              <a-select v-model:value="form.keyFlag" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in keyFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注 ">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marque" label="牌号 ">
              <a-input v-model:value="form.marque" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="规格 ">
              <a-input v-model:value="form.specs" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techCondition" label="技术条件种类名称">
              <a-input v-model:value="form.techCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mainHrDeptId" label="主制部门">
              <AvicCommonSelect v-model:value="form.mainHrDeptId" type="deptSelect"
                :defaultShowValue="form.mainHrDeptIdAlias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemClassId" label="物料大类">
              <AvicTreeSelect v-model:value="form.mdsItemClassId" ref="treeSelectRef" :baseUrl="'/mms/mds/mdsitemclasss'"
                :parentId="parentId" :parentTitle="parentTitle" disabled>
              </AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryStatus" label="交货状态">
              <a-input v-model:value="form.deliveryStatus" :maxLength="128" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemRevision" label="版本号 ">
              <a-input v-model:value="form.itemRevision" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="appProductCode" label="适用产品">
              <a-select v-model:value="form.appProductCode" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in appProductCodeList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="plannedPrice" label="计划价 ">
              <a-input v-model:value="form.plannedPrice" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemStatus" label="物料状态 ">
              <a-select v-model:value="form.mdsItemStatus" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in mdsItemStatusList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="extendText" label="扩展属性合并显示文本 ">
              <a-input v-model:value="form.extendText" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ">
              <a-select v-model:value="form.secretLevel" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in secretLevelList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalItemCode" label="原始物料编码">
              <a-input v-model:value="form.originalItemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="extendItemCode" label="物料基础码">
              <a-input v-model:value="form.extendItemCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specialRequirements" label="特殊要求">
              <a-input v-model:value="form.specialRequirements" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="technicalStandardNo" label="技术标准号">
              <a-input v-model:value="form.technicalStandardNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jbbb" label="技标版本">
              <a-input v-model:value="form.jbbb" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jtm" label="集团码">
              <a-input v-model:value="form.jtm" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="makeCountry" label="制造国名称">
              <a-input v-model:value="form.makeCountry" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marqueCode" label="牌号代码">
              <a-input v-model:value="form.marqueCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryStatusCode" label="交货状态代码">
              <a-input v-model:value="form.deliveryStatusCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dataSource" label="数据来源">
              <a-select v-model:value="form.dataSource" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in dataSourceList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techConditionCode" label="技术条件代码">
              <a-input v-model:value="form.techConditionCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lcCode" label="浪潮代码">
              <a-input v-model:value="form.lcCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="additionalTechCondition" label="补充技术条件">
              <a-input v-model:value="form.additionalTechCondition" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliverySizeType" label="供货尺寸类别">
              <a-input v-model:value="form.deliverySizeType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="manufactor" label="承制单位">
              <a-input v-model:value="form.manufactor" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dzType" label="锻铸件类别">
              <a-input v-model:value="form.dzType" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="csb" label="超声波">
              <a-input v-model:value="form.csb" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="testamount" label="试料数量">
              <a-input v-model:value="form.testamount" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="keyLevel" label="关键件等级 ">
              <a-input v-model:value="form.keyLevel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynKeyMaterial" label="是否关键原材料">
              <a-select v-model:value="form.ynKeyMaterial" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyMaterialList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mpmId" label="民机对应项目ID">
              <a-input v-model:value="form.mpmId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fixedFlag" label="定倍尺标识">
              <a-input v-model:value="form.fixedFlag" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jbh" label="技标号">
              <a-input v-model:value="form.jbh" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jxdhbm" label="机型代号主数据编码">
              <a-input v-model:value="form.jxdhbm" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdmSpecs" label="规格数据">
              <a-input v-model:value="form.mdmSpecs" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynKeyZw" label="是否关键站位">
              <a-select v-model:value="form.ynKeyZw" :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="bzh" label="标准号">
              <a-input v-model:value="form.bzh" disabled />
            </a-form-item>
          </a-col>
          <!--新增字段-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemShortName" label="物料简称">
              <a-input v-model:value="form.itemShortName" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="barCode" label="条形码">
              <a-input v-model:value="form.barCode" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="productLine" label="产品线">
              <a-input v-model:value="form.productLine" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemDutyType" label="物料税类">
              <a-input v-model:value="form.itemDutyType" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="convertRate" label="换算率">
              <a-input v-model:value="form.convertRate" :maxLength="64" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="calculateUnit" label="辅计量单位">
              <a-input v-model:value="form.calculateUnit" :maxLength="64" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemUseClassify" label="物资用途分类">
              <a-input v-model:value="form.itemUseClassify" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialModal" label="材料形态">
              <a-input v-model:value="form.materialModal" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accordClassify" label="核算分类">
              <a-input v-model:value="form.accordClassify" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityGrade" label="质量等级">
              <a-input v-model:value="form.qualityGrade" :maxLength="64" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="importanceLevel" label="重要程度">
              <a-input v-model:value="form.importanceLevel" :maxLength="64" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceMaterial" label="生产材料">
              <a-input v-model:value="form.produceMaterial" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMainParts" label="是否主制件">
              <a-select v-model:value="form.ynMainParts" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynGeneralParts" label="是否通用件">
              <a-select v-model:value="form.ynGeneralParts" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynAttach" label="是否成附件">
              <a-select v-model:value="form.ynAttach" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynStandardParts" label="是否标准件">
              <a-select v-model:value="form.ynStandardParts" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynDecompose" label="是否可分解">
              <a-select v-model:value="form.ynDecompose" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynConsume" label="是否消耗件">
              <a-select v-model:value="form.ynConsume" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynVirtual" label="是否虚拟件">
              <a-select v-model:value="form.ynVirtual" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workTechnology" label="加工工艺">
              <a-input v-model:value="form.workTechnology" :maxLength="256" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sizeClassify" label="大小分类">
              <a-input v-model:value="form.sizeClassify" :maxLength="64" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynMaster" label="是否主机件">
              <a-select v-model:value="form.ynMaster" :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children" :show-search="true" :allow-clear="true" disabled>
                <a-select-option v-for="item in ynKeyZwList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="serialNo" label="流水号">
              <a-input v-model:value="form.serialNo" :maxLength="4" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemFlag" label="不传二级库标记">
              <a-input v-model:value="form.itemFlag" :maxLength="4" disabled />
            </a-form-item>
          </a-col>
          <!--新增字段-->
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader element-id="1" form-type="detail" :allow-add="false" :allow-download="true"
                :allow-preview="true" :form-id="form.id" />
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
import { useMdsItemForm, emits } from './ts/MdsItemForm'; // 引入表单ts
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
  closeModal
} = useMdsItemForm({
  props: props,
  emit: emit
});
</script>


