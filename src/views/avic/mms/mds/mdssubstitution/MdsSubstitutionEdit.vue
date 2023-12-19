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
      <a-form ref="formRef" :model="form" :rules="rules" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionNo" label="单号" has-feedback>
              <a-input
                v-model:value="form.substitutionNo"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billType" label="类型  ^0-长期代料，1-临时代料" has-feedback>
              <a-select
                v-model:value="form.billType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择类型  ^0-长期代料，1-临时代料"
              >
                <a-select-option
                  v-for="item in billTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionType" label="代料关系分类 ^ G-代料单，E-等效代料，S-规格代料" has-feedback>
              <a-select
                v-model:value="form.substitutionType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择代料关系分类 ^ G-代料单，E-等效代料，S-规格代料"
              >
                <a-select-option
                  v-for="item in substitutionTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="originalItemId" label="被替代物料ID ^ 等效代料时可以为空">
              <a-input
                v-model:value="form.originalItemId"
                :maxLength="64"
                placeholder="请输入被替代物料ID ^ 等效代料时可以为空"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionItemId" label="替代物料ID" has-feedback>
              <a-input
                v-model:value="form.substitutionItemId"
                :maxLength="64"
                placeholder="请输入替代物料ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveType" label="生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制" has-feedback>
              <a-select
                v-model:value="form.effectiveType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择生效类型 ^ B-按批次号控制生效； D-按有效日期控制生效，L-按架次控制生效，N-无控制"
              >
                <a-select-option
                  v-for="item in effectiveTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveStrPara" label="生效起始架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的起始参数。">
              <a-input
                v-model:value="form.effectiveStrPara"
                :maxLength="100"
                placeholder="请输入生效起始架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的起始参数。"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveEndPara" label="生效截止架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的截止参数。">
              <a-input
                v-model:value="form.effectiveEndPara"
                :maxLength="128"
                placeholder="请输入生效截止架次/批次号/日期 ^ 根据生效类型的选择，相应描述代料关系生效的截止参数。"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionRate" label="代料系数 ^ 同一制成品在使用替代后物料的单耗用量与使用替代前物料的单耗用量的比率，即替代后物料的单耗用量/替代前物料的单耗用量">
              <a-input
                v-model:value="form.substitutionRate"
                :maxLength="20"
                placeholder="请输入代料系数 ^ 同一制成品在使用替代后物料的单耗用量与使用替代前物料的单耗用量的比率，即替代后物料的单耗用量/替代前物料的单耗用量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="status" label="订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回" has-feedback>
              <a-select
                v-model:value="form.status"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择订单状态 ^ 0-编辑；5-审批中；10-审批通过；15-已退回"
              >
                <a-select-option
                  v-for="item in statusList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="是否有效 ^ 0-无效；1-有效" has-feedback>
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否有效 ^ 0-无效；1-有效"
              >
                <a-select-option
                  v-for="item in validFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserId" label="申请人的ID">
              <a-input
                v-model:value="form.applyUserId"
                :maxLength="64"
                placeholder="请输入申请人的ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserCode" label="员工编码">
              <a-input
                v-model:value="form.applyUserCode"
                :maxLength="120"
                placeholder="请输入员工编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyUserName" label="申请人姓名">
              <a-input
                v-model:value="form.applyUserName"
                :maxLength="120"
                placeholder="请输入申请人姓名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptId" label="申请部门ID">
              <a-input
                v-model:value="form.applyDeptId"
                :maxLength="64"
                placeholder="请输入申请部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptCode" label="申请部门编码">
              <a-input
                v-model:value="form.applyDeptCode"
                :maxLength="128"
                placeholder="请输入申请部门编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDeptName" label="申请部门名称">
              <a-input
                v-model:value="form.applyDeptName"
                :maxLength="512"
                placeholder="请输入申请部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="applyDate" label="申请时间">
              <a-date-picker
                v-model:value="form.applyDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择申请时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="4000"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionBasis" label="代料依据">
              <a-input
                v-model:value="form.substitutionBasis"
                :maxLength="4000"
                placeholder="请输入代料依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
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
        </a-row>
      </a-form>
      <MdsSubstitutionLEdit ref="mdsSubstitutionLEdit" :mainId="formId"></MdsSubstitutionLEdit>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsSubstitutionForm, emits } from './ts/MdsSubstitutionForm'; // 引入表单ts
import MdsSubstitutionLEdit from '@/views/avic/mms/mds/mdssubstitutionl/MdsSubstitutionLEdit.vue'; // 引入子表组件
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
  billTypeList,
  substitutionTypeList,
  effectiveTypeList,
  statusList,
  validFlagList,
  secretLevelList,
  saveForm,
  closeModal,
  mdsSubstitutionLEdit
} = useMdsSubstitutionForm({
  props: props,
  emit: emit
});
</script>


