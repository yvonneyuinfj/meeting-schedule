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
          <a-col v-bind="colLayout.cols" hidden>
            <a-form-item name="parentMdsLocatorId" label="上级库位ID">
              <a-input v-model:value="form.parentMdsLocatorId">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentMdsLocatorIdAlias" label="上级库位NO">
              <a-input v-model:value="form.parentMdsLocatorNo" placeholder="选择上级库位"
                :maxLength="64" :auto-focus="true" @click="locatorClick">
                <template #suffix>
                  <a-tooltip title="库位">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsInventoryIdAlias" label="库房ID">
              <a-input  v-model:value="form.inventoryName"  placeholder="请选择库房"  @click="inventoryClick">
                <template #suffix>
                  <a-tooltip title="库房">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="locatorNo" label="库位号" has-feedback>
              <a-input
                v-model:value="form.locatorNo"
                :maxLength="512"
                placeholder="请输入库位号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="locatorType" label="库位类型" has-feedback>
              <a-select
                v-model:value="form.locatorType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择库位类型"
              >
                <a-select-option
                  v-for="item in locatorTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="locatorSize" label="库位尺寸">
              <a-input
                v-model:value="form.locatorSize"
                :maxLength="512"
                placeholder="请输入库位尺寸"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="locatorDesc" label="库位描述">
              <a-input
                v-model:value="form.locatorDesc"
                :maxLength="512"
                placeholder="请输入库位描述"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemId" label="物料ID ^">
              <a-input
                v-model:value="form.mdsItemId"
                :maxLength="64"
                placeholder="请输入物料ID ^"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="placeType" label="区域类型">
              <a-select
                v-model:value="form.placeType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择区域类型"
              >
                <a-select-option
                  v-for="item in placeTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input
                v-model:value="form.note"
                :maxLength="2048"
                placeholder="请输入备注 ^ 如干燥条件等"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="库位是否有效" has-feedback>
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择库位是否有效"
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
        </a-row>
      </a-form>
    </a-spin>
    <MdsLocatorSelect v-if="mdsLocatorModal" ref="mdsLocatorSelect" :visible="mdsLocatorModal"
      @closeCancel="closeLocator" @getLocatorId="getLocatorId" />
    <MdsInventorySelect v-if="mdsInventoryModal" ref="mdsInventorySelect" :visible="mdsInventoryModal"
      @closeCancel="closeInventory" @getInventoryId="getInventoryId" />
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsLocatorForm, emits } from './ts/MdsLocatorForm'; // 引入表单ts
import MdsLocatorSelect from '@/views/avic/mms/mds/mdslocator/MdsLocatorSelect.vue'; // 引入弹窗选择页
import MdsInventorySelect from '@/views/avic/mms/mds/mdsinventory/MdsInventorySelect.vue'; // 引入弹窗选择页
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const mdsLocatorModal = ref<boolean>(false);// 是否展示库房弹窗
const mdsInventoryModal = ref<boolean>(false);// 是否展示库房弹窗
const mdsLocatorSelect = ref(null);
const mdsInventorySelect = ref(null);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  locatorTypeList,
  placeTypeList,
  validFlagList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsLocatorForm({
  props: props,
  emit: emit
});
/** 库位弹窗 */
const locatorClick = () => {
  mdsLocatorModal.value = true;
};
/** 关闭库位弹窗 */
const closeLocator = () => {
  mdsLocatorModal.value = false;
};
/** 库房弹窗 */
const inventoryClick = () => {
  mdsInventoryModal.value = true;
};
/** 关闭库房弹窗 */
const closeInventory = () => {
  mdsInventoryModal.value = false;
};
const getLocatorId = (v) => {
  form.value.parentMdsLocatorId = v.id;
  form.value.parentMdsLocatorNo = v.locatorNo;
  mdsLocatorModal.value = false;
};
const getInventoryId = (v) => {
  form.value.mdsInventoryId = v.id;
  form.value.inventoryName = v.inventoryName;
  mdsInventoryModal.value = false;
};
</script>


