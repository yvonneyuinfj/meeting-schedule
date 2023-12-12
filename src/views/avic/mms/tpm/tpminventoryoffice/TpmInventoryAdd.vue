 <template>
  <AvicModal
    :visible="true"
    title="添加"
    width="90%"
    height="640px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
        :colon="false"
        :rules="rules"
      >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentType" label="设备类型" has-feedback>
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
            <a-form-item name="tpmAssetClassId" label="设备大类" has-feedback>
              <AvicTreeSelect
                v-model:value="form.tpmAssetClassId"
                :parentId="form.tpmAssetClassId"
                :parentTitle="form.className"
                ref="treeSelectRef"
                baseUrl="/mms/tpm/tpmassetclasss"
                :allowSelectNonIsLeaf="false"
                @select="res => (form.className = res)"
                placeholder="请选择设备大类"
              ></AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetsCode" label="资产编号" has-feedback>
              <a-input
                v-model:value="form.assetsCode"
                :maxLength="128"
                placeholder="请输入资产编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentCode" label="设备编号" has-feedback>
              <a-input
                v-model:value="form.equipmentCode"
                :maxLength="128"
                placeholder="自动编号：四位设备大类CODE+三位流水号,需要唯一值校验"
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
            <a-form-item name="specs" label="设备规格">
              <a-input v-model:value="form.specs" :maxLength="128" placeholder="请输入设备规格" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="model" label="设备型号">
              <a-input v-model:value="form.model" :maxLength="128" placeholder="请输入设备型号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="responseUserId" label="责任人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.responseUserId"
                type="userSelect"
                placeholder="请选择责任人"
                :default-show-value="form.responseUserName"
                @callback="res => (form.responseUserName = res.names)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用部门" has-feedback>
              <AvicCommonSelect
                v-model:value="form.useDeptId"
                type="deptSelect"
                placeholder="请选择使用部门"
                :default-show-value="form.useDeptName"
                @callback="res => (form.useDeptName = res.names)"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentStatus" label="设备状态" has-feedback>
              <a-select
                v-model:value="form.equipmentStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择设备状态"
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
            <a-form-item name="recordDate" label="启用时间" has-feedback>
              <a-date-picker
                v-model:value="form.recordDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择启用时间"
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
            <a-form-item name="ipAddress" label="联网设备IP地址">
              <a-input
                v-model:value="form.ipAddress"
                :maxLength="64"
                placeholder="请输入联网设备IP地址"
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
            <a-form-item name="storageMediaCode" label="存储介质编号">
              <a-input
                v-model:value="form.storageMediaCode"
                :maxLength="64"
                placeholder="请输入存储介质编号"
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
            <a-form-item name="storageMediaName" label="存储介质名称">
              <a-input
                v-model:value="form.storageMediaName"
                :maxLength="64"
                placeholder="请输入存储介质名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="storageMediaSecretLevel" label="存储介质密级">
              <a-select
                v-model:value="form.storageMediaSecretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择存储介质密级"
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
            <a-form-item name="storageMediaStatus" label="存储介质使用状态">
              <a-select
                v-model:value="form.storageMediaStatus"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择存储介质使用状态"
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
            <a-form-item name="tpmAreaId" label="设备地理区域" has-feedback>
              <AvicTreeSelect
                v-model:value="form.tpmAreaId"
                ref="treeSelectRef"
                baseUrl="/mms/tpm/tpmareas"
                :allowSelectNonIsLeaf="false"
                :parentId="form.tpmAreaId"
                :parentTitle="form.areaName"
                @select="res => (form.areaName = res)"
                placeholder="请选择地理区域"
              ></AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="storageLocation" label="具体位置" has-feedback>
              <a-input
                v-model:value="form.storageLocation"
                :maxLength="512"
                placeholder="请输入具体位置"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="创建时间">
              <a-input :value="$dayjs().format('YYYY-MM-DD')" disabled />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols">
            <a-form-item label="创建人">
              <a-input v-model:value="form.attribute01" disabled />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols4">
            <a-form-item name="note" label="备注">
              <a-textarea
                v-model:value="form.note"
                :maxLength="512"
                placeholder="请输入备注"
                :rows="2"
              />
            </a-form-item>
          </a-col>

          <a-col v-bind="colLayout.cols4">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="add"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                :form-secret-level="form.secretLevel"
                table-name="TPM_INVENTORY"
                @afterUpload="afterUploadEvent"
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
const labelCol = reactive({ span: 6, offset: 0 });
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
  equipmentTypeList,
  abcdTypeList,
  keyOnlyChildFlagList,
  cncTypeList,
  equipmentStatusList,
  assetsStatusList,
  ynEntranceList,
  secretLevelList,
  ynMilitaryKeyEquipList,
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
  capitalSourceList,
  uploadFile,
  proxy,
  afterUploadEvent,
  saveForm,
  closeModal
} = useTpmInventoryForm({
  props: props,
  emit: emit
});
</script>