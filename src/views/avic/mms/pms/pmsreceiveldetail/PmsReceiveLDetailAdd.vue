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
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 " has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 "
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
            <a-form-item name="mdsInventoryId" label="目的库房">
              <a-select
                v-model:value="form.mdsInventoryId"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                @change="inventoryChange"
                placeholder="请选择目的库房 "
              >
                <a-select-option
                  v-for="item in inventoryList"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.inventoryName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="stoveNo" label="炉号">
              <a-input
                v-model:value="form.stoveNo"
                :maxLength="1024"
                placeholder="请输入炉号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="batchNo" label="批号">
              <a-input
                v-model:value="form.batchNo"
                :maxLength="128"
                placeholder="请输入批号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemSerialNo" label="件号(产品编号)">
              <a-input
                v-model:value="form.itemSerialNo"
                :maxLength="128"
                placeholder="请输入件号(产品编号)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsItemCode" label="物料号">
              <a-input v-model:value="form.mdsItemCode" :maxLength="64" placeholder="请选择物料号" :readonly="true"
                       @click="proMdsItemOpen">
                <template #suffix>
                  <a-tooltip title="物料号">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiverUserName" label="待验员姓名">
              <AvicCommonSelect
                v-model:value="form.receiverUserId"
                :defaultShowValue="form.receiverUserName"
                placeholder="请选择待验员"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    userSelect(value)
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDate" label="登记日期">
              <a-date-picker
                v-model:value="form.receiveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择登记日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="reqQty" label="应到数量">
              <a-input
                v-model:value="form.reqQty"
                :maxLength="20"
                placeholder="请输入应到数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceSeq" label="序号">
              <a-input
                v-model:value="form.produceSeq"
                :maxLength="32"
                placeholder="请输入序号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="pmsReceiveQty" label="到货数量(采购)">
              <a-input-number
                v-model:value="form.pmsReceiveQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入到货数量(采购)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="invReceiveQty" label="到货数量(库存)">
              <a-input-number
                v-model:value="form.invReceiveQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入到货数量(库存)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="wasteQty" label="到货报废量">
              <a-input-number
                v-model:value="form.wasteQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入到货报废量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="itemQty" label="单件数量">
              <a-input-number
                v-model:value="form.itemQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入单件数量"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="materialQty" label="材料件数">
              <a-input-number
                v-model:value="form.materialQty"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入材料件数"
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
  <!--选择产品弹窗-->
  <a-modal :visible="openMdsItem" title="选择物料" @ok="handleOk2" @cancel="handleCancel2" width="80%" style="top: 20px">
    <div style="height: 400px;overflow: auto">
      <Mds-item-select ref="mdsItemSelect">
      </Mds-item-select>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {usePmsReceiveLDetailForm, emits} from './ts/PmsReceiveLDetailForm'; // 引入表单ts
import MdsItemSelect from "@/views/avic/mms/mds/mdsproject/MdsItemSelect.vue";

const mdsItemSelect = ref(null);
const openMdsItem = ref<boolean>(false);

const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
    type: String,
    default: ''
  },
  inventoryList: {
    type: Object,
    default: null
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
} = usePmsReceiveLDetailForm({
  props: props,
  emit: emit
});

function inventoryChange(inventoryId) {
  let inventory = toRaw(props.inventoryList.find(i => i.id === inventoryId));
  form.value.mdsInventoryName = inventory.inventoryName;
  form.value.mdsInventoryCode = inventory.inventoryCode;
}

function userSelect(value) {
  form.value.receiverUserName = value.names;
  form.value.receiverUserId = value.ids;
  form.value.receiverUserCode = value.ids;
}

function proMdsItemOpen() {
  openMdsItem.value = true;
}

const handleCancel2 = () => {
  openMdsItem.value = false;
};


const handleOk2 = () => {
  const info = mdsItemSelect.value.info;
  form.value.mdsItemId = info.id;
  form.value.mdsItemCode = info.itemCode;
  form.value.mdsItemName = info.itemName;
  openMdsItem.value = false;
};

</script>
