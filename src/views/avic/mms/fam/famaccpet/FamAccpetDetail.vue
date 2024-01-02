<template>
  <div>
    <a-form
      ref="formRef"
      :model="form"
      v-bind="layout"
      layout="horizontal"
      class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetApplyNo')">
          <a-form-item
            name="accpetApplyNo"
            label="验收申请单号"
            :rules="fieldRequired('accpetApplyNo')"
            has-feedback
          >
            <!-- <AvicAutoCode
                v-model:value="form.accpetApplyNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_ACCPET"
                :allow-clear="true"
                :disabled="fieldDisabled('accpetApplyNo')"
                placeholder="请输入验收申请单号"
              /> -->
            <a-input
              v-model:value="form.accpetApplyNo"
              :disabled="fieldDisabled('accpetApplyNo')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetType')">
          <a-form-item
            name="accpetType"
            label="验收类型"
            :rules="fieldRequired('accpetType')"
            has-feedback
          >
            <a-select
              v-model:value="form.accpetType"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              :disabled="fieldDisabled('accpetType')"
            >
              <a-select-option
                v-for="item in accpetTypeList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orderName')">
          <a-form-item
            name="orderName"
            label="合同名称"
            :rules="fieldRequired('orderName')"
            has-feedback
          >
            <a-input v-model:value="form.orderName" :disabled="fieldDisabled('orderName')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orderNo')">
          <a-form-item
            name="orderNo"
            label="合同编号"
            :rules="fieldRequired('orderNo')"
            has-feedback
          >
            <a-input v-model:value="form.orderNo" :disabled="fieldDisabled('orderNo')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('orderValue')">
          <a-form-item
            name="orderValue"
            label="合同金额"
            :rules="fieldRequired('orderValue')"
            has-feedback
          >
            <a-input v-model:value="form.orderValue" :disabled="fieldDisabled('orderValue')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('procureDeptId')">
          <a-form-item
            name="procureDeptId"
            label="采购部门名称"
            :rules="fieldRequired('procureDeptId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.procureDeptId"
              type="deptSelect"
              :defaultShowValue="form.procureDeptIdAlias"
              :disabled="fieldDisabled('procureDeptId')"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('accpetDate')">
          <a-form-item
            name="accpetDate"
            label="验收日期"
            :rules="fieldRequired('accpetDate')"
            has-feedback
          >
            <a-date-picker
              v-model:value="form.accpetDate"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :disabled="fieldDisabled('accpetDate')"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptName')">
            <a-form-item name="managerDeptName" label="主管部门名称" :rules="fieldRequired('managerDeptName')" has-feedback>
              <AvicCommonSelect v-model:value="form.managerDeptName" type="deptSelect"
                :defaultShowValue="form.managerDeptNameAlias" :disabled="fieldDisabled('managerDeptName')" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="fieldVisible('receiveDeptName')">
            <a-form-item name="receiveDeptName" label="接收部门名称" :rules="fieldRequired('receiveDeptName')" has-feedback>
              <AvicCommonSelect v-model:value="form.receiveDeptName" type="deptSelect"
                :defaultShowValue="form.receiveDeptNameAlias" :disabled="fieldDisabled('receiveDeptName')" />
            </a-form-item>
          </a-col> -->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('assetClass')">
          <a-form-item
            name="assetClass"
            label="资产属性"
            :rules="fieldRequired('assetClass')"
            has-feedback
          >
            <a-select
              v-model:value="form.assetClass"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              placeholder="请选择验收类型"
              :disabled="fieldDisabled('assetClass')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('fundSource')">
          <a-form-item
            name="fundSource"
            label="资金来源"
            :rules="fieldRequired('fundSource')"
            has-feedback
          >
            <a-select
              v-model:value="form.fundSource"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              placeholder="请选择验收类型"
              :disabled="fieldDisabled('fundSource')"
            >
              <a-select-option
                v-for="item in fundSourceList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!--        <a-col-->
        <!--          v-bind="colLayout.cols"-->
        <!--          v-if="fieldVisible('otherMatter')"-->
        <!--        >-->
        <!--          <a-form-item-->
        <!--            name="otherMatter"-->
        <!--            label="其他事项"-->
        <!--            :rules="fieldRequired('otherMatter')"-->
        <!--            has-feedback-->
        <!--          >-->
        <!--            <a-input-->
        <!--              v-model:value="form.otherMatter"-->
        <!--              :disabled="fieldDisabled('otherMatter')"-->
        <!--            />-->
        <!--          </a-form-item>-->
        <!--        </a-col>-->
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('purchWay')">
          <a-form-item
            name="purchWay"
            label="购置方式"
            :rules="fieldRequired('purchWay')"
            has-feedback
          >
            <a-select
              v-model:value="form.purchWay"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              placeholder="请选择验收类型"
              :disabled="fieldDisabled('purchWay')"
            >
              <a-select-option
                v-for="item in purchWayList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
              >
                {{ item.lookupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('projectName')">
          <a-form-item
            name="projectName"
            label="项目名称"
            :rules="fieldRequired('projectName')"
            has-feedback
          >
            <a-input v-model:value="form.projectName" :disabled="fieldDisabled('projectName')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('handlePersonId')">
          <a-form-item
            name="handlePersonId"
            label="经办人名称"
            :rules="fieldRequired('handlePersonId')"
            has-feedback
          >
            <AvicCommonSelect
              v-model:value="form.handlePersonId"
              type="userSelect"
              :defaultShowValue="form.handlePersonIdAlias"
              :disabled="fieldDisabled('handlePersonId')"
            />
          </a-form-item>
        </a-col>
       <a-col v-bind="colLayout.cols" v-if="fieldVisible('managerDeptId')">
            <a-form-item name="managerDeptId" label="主管部门名称" :rules="fieldRequired('managerDeptId')" has-feedback>
              <a-select
                v-model:value="form.managerDeptId"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择主管部门名称"
                :disabled="fieldDisabled('managerDeptId')"
              >
                <a-select-option
                  v-for="item in managerDeptIdList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="fieldVisible('receiveDeptId')">
            <a-form-item name="receiveDeptId" label="使用部门名称" :rules="fieldRequired('receiveDeptId')" has-feedback>
              <AvicCommonSelect
                v-model:value="form.receiveDeptId"
                type="deptSelect"
                :defaultShowValue="form.receiveDeptIdAlias"
                :disabled="fieldDisabled('receiveDeptId')"
              />
            </a-form-item>
          </a-col>
        <a-col v-bind="colLayout.cols">
                    <a-form-item name="ynArchived" label="是否归档案">
                      <a-select
                        v-model:value="form.ynArchived"
                        :get-popup-container="(triggerNode) => triggerNode.parentNode"
                        option-filter-prop="children"
                        :show-search="true"
                        :allow-clear="true"
                        disabled
                      >
                        <a-select-option
                          v-for="item in ynArchivedList"
                          :key="item.sysLookupTlId"
                          :value="item.lookupCode"
                        >
                          {{ item.lookupName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col v-bind="colLayout.cols">
                    <a-form-item name="ynDemolished" label="是否已拆除无线模块">
                      <a-select
                        v-model:value="form.ynDemolished"
                        :get-popup-container="(triggerNode) => triggerNode.parentNode"
                        option-filter-prop="children"
                        :show-search="true"
                        :allow-clear="true"
                        disabled
                      >
                        <a-select-option
                          v-for="item in ynDemolishedList"
                          :key="item.sysLookupTlId"
                          :value="item.lookupCode"
                        >
                          {{ item.lookupName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
        <a-col v-bind="colLayout.cols" v-if="form.accpetType === '1' && fieldVisible('assetClasst')">
          <a-form-item
            name="assetClasst"
            label="资产类别"
            :rules="fieldRequired('assetClasst')"
            has-feedback
          >
            <a-input v-model:value="form.assetClasstName" :disabled="fieldDisabled('assetClasst')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols"
               v-if="form.assetClasst &&  !(['1', '4', '6', '8'].includes(form.assetClasst.charAt(0))) && fieldVisible('equipmentType')"
        >
          <a-form-item
            name="equipmentType"
            label="设备类型"
            :rules="fieldRequired('equipmentType')"
            has-feedback
          >
            <a-select
              v-model:value="form.equipmentType"
              :auto-focus="true"
              :get-popup-container="triggerNode => triggerNode.parentNode"
              option-filter-prop="children"
              :show-search="true"
              :allow-clear="true"
              placeholder="请选择设备类型"
              :disabled="fieldDisabled('equipmentType')"
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
        <a-col v-bind="colLayout.cols" v-if="fieldVisible('overhaulRequireCode') && form.accpetType === '2'">
          <a-form-item
            name="overhaulRequireCode"
            label="维修改造单号"
            :rules="fieldRequired('overhaulRequireCode')"
            has-feedback
          >
            <a-input v-model:value="form.overhaulRequireCode" :disabled="fieldDisabled('overhaulRequireCode')"/>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="上传附件" type="attachment" :rules="attachmentRequired('uploadFile')">
            <AvicUploader
              element-id="1"
              ref="uploadFile"
              label="上传附件"
              :form-id="form.id"
              :bpm-instance-object="props.bpmInstanceObject"
              :form-secret-level="form.secretLevel"
              :allow-download="true"
              table-name="FAM_ACCPET"
              @afterUpload="afterUploadEvent"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <FamAccpetListEdit
      v-if="fieldVisible('FAM_ACCPET_LIST')"
      :assetClasst="form.assetClasst"
      ref="famAccpetListEdit"
      :mainId="formId || form.id"
      :bpmInstanceObject="bpmInstanceObject"
      read-only="true"
      :bpmParams="bpmParams"
      :accpetType="form.accpetType"
      :equipmentType="form.equipmentType"
    />
    <!--子表按钮的流程解析，用于权限控制-->
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="addSubTableButton"
      label="添加"
      title="添加"
      style="display: none"
    >
      添加
    </a-button>
    <a-button
      class="eform_subtable_bpm_button_auth table-handle-button"
      for="deleteSubTableButton"
      label="删除"
      title="删除"
      style="display: none"
    >
      删除
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { useFamAccpetForm, emits } from './ts/FamAccpetForm'; // 引入表单ts
import FamAccpetListEdit from '@/views/avic/mms/fam/famaccpetlist/FamAccpetListEdit.vue'; // 引入子表组件

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
const emit = defineEmits(emits);
const {
  form,
  formRef,
  bpmParams,
  layout,
  colLayout,
  managerDeptIdList,
  secretLevelList,
  assetTypeList,
  accpetTypeList,
  bodyStyle,
  uploadFile,
  afterUploadEvent,
  attachmentRequired,
  autoCode,
  purchWayList,
  fundSourceList,
  famAccpetListEdit,
  equipmentTypeList,
  fieldVisible,
  fieldDisabled,
  fieldRequired,
  saveForm,
  ynArchivedList,
  ynDemolishedList,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
} = useFamAccpetForm({
  props: props,
  emit: emit
});
defineExpose({
  saveForm,
  saveAndStartProcess,
  beforeClickBpmButtons,
  afterClickBpmButtons
});
</script>
