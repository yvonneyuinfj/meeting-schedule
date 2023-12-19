<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form :model="form" ref="formRef" layout="horizontal" :rules="rules" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionNo" label="代料单号" has-feedback>
              <a-input
                v-model:value="form.substitutionNo"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入代料单号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="billType" label="类型" has-feedback>
              <a-select
                v-model:value="form.billType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择类型"
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
            <a-form-item name="originalItemId" label="物料号">
              <a-input  v-model:value="form.originalItemIdAlias"  placeholder="请选择物料号"  @click="originalItemClick">
                <template #suffix>
                  <a-tooltip title="物料号">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionItemId" label="替代物料号" has-feedback>
              <a-input  v-model:value="form.substitutionItemIdAlias"  placeholder="请选择替代物料号"  @click="tdoriginalItemClick">
                <template #suffix>
                  <a-tooltip title="替代物料号">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemName" label="物料名称" has-feedback>
              <a-input
                v-model:value="form.itemName"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入物料名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdItemName" label="替代物料名称" has-feedback>
              <a-input
                v-model:value="form.tdItemName"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入替代物料名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="marque" label="物料牌号" has-feedback>
              <a-input
                v-model:value="form.marque"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入物料牌号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdMarque" label="替代物料牌号" has-feedback>
              <a-input
                v-model:value="form.tdMarque"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入替代物料牌号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="specs" label="物料规格" has-feedback>
              <a-input
                v-model:value="form.specs"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入物料规格"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdSpecs" label="替代物料规格" has-feedback>
              <a-input
                v-model:value="form.tdSpecs"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入替代物料规格"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="techCondition" label="物料技术条件" has-feedback>
              <a-input
                v-model:value="form.techCondition"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入物料技术条件"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdTechCondition" label="替代物料技术条件" has-feedback>
              <a-input
                v-model:value="form.tdTechCondition"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入替代物料技术条件"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsUnitName" label="计量单位" has-feedback>
              <a-input
                v-model:value="form.mdsUnitName"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入计量单位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tdMdsUnitName" label="替代计量单位" has-feedback>
              <a-input
                v-model:value="form.tdMdsUnitName"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入替代计量单位"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="substitutionType" label="代料关系" has-feedback>
              <a-select
                v-model:value="form.substitutionType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择代料关系"
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
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveType" label="生效控制类型" has-feedback>
              <a-select
                v-model:value="form.effectiveType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择生效类型"
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
            <a-form-item name="substitutionRate" label="代料系数">
              <a-input
                v-model:value="form.substitutionRate"
                :maxLength="20"
                placeholder="请输入代料系数"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveStrPara" label="生效起始">
              <a-input
                v-model:value="form.effectiveStrPara"
                :maxLength="100"
                placeholder="请输入生效起始"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectiveEndPara" label="生效截止">
              <a-input
                v-model:value="form.effectiveEndPara"
                :maxLength="128"
                placeholder="请输入生效截止"
              />
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
          <!-- <a-col v-bind="colLayout.cols">
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
          </a-col> -->
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="substitutionBasis" label="代料依据">
              <a-textarea
                v-model:value="form.substitutionBasis"
                :maxLength="4000"
                placeholder="请输入代料依据"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="note" label="备注">
              <a-textarea
                v-model:value="form.note"
                :maxLength="4000"
                placeholder="请输入备注"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <MdsSubstitutionLEdit ref="mdsSubstitutionLEdit"></MdsSubstitutionLEdit>
    </a-spin>
    <MdsItemSelect v-if="mdsItemModal" ref="mdsItemSelect" :visible="mdsItemModal"
      @closeCancel="closeItem" @getItemId="getItemId" />
    <MdsItemSelect v-if="tdmdsItemModal" ref="mdsItemSelect" :visible="tdmdsItemModal"
      @closeCancel="closeTdItem" @getTdItemId="getTdItemId" />
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsSubstitutionForm, emits } from './ts/MdsSubstitutionForm'; // 引入表单ts
import MdsSubstitutionLEdit from '@/views/avic/mms/mds/mdssubstitutionl/MdsSubstitutionLEdit.vue'; // 引入子表组件
import MdsItemSelect from '@/views/avic/mms/mds/mdssubstitution/MdsItemSelect.vue'; // 引入弹窗选择页
const mdsItemModal = ref<boolean>(false);// 是否展示库房弹窗
const tdmdsItemModal = ref<boolean>(false);// 是否展示库房弹窗
const mdsLocatorSelect = ref(null);
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
/** 物料弹窗 */
const originalItemClick = () => {
  mdsItemModal.value = true;
};
/** 关闭物料弹窗 */
const closeItem = () => {
  mdsItemModal.value = false;
};

/** 替代物料弹窗 */
const tdoriginalItemClick = () => {
  tdmdsItemModal.value = true;
};
/** 关闭替代物料弹窗 */
const closeTdItem = () => {
  tdmdsItemModal.value = false;
};
const getItemId = (v) => {
  form.value.originalItemId = v.id;
  form.value.originalItemIdAlias = v.itemCode;
  form.value.itemName = v.itemName;
  form.value.itemCode = v.itemCode;
  form.value.specs = v.specs;
  form.value.techCondition = v.techCondition;
  form.value.mdsUnitName = v.mdsUnitName;
  mdsItemModal.value = false;
};
const getTdItemId = (v) => {
  form.value.substitutionItemId = v.id;
  form.value.substitutionItemIdAlias = v.itemCode;
  form.value.tdItemName = v.itemName;
  form.value.tdItemCode = v.itemCode;
  form.value.tdSpecs = v.specs;
  form.value.tdTechCondition = v.techCondition;
  form.value.tdMdsUnitName = v.mdsUnitName;
  tdmdsItemModal.value = false;
};
</script>

