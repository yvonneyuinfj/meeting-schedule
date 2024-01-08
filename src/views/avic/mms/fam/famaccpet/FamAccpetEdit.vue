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
        class="form-excel-style"
      >
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetApplyNo" label="验收申请单号" has-feedback>
              <a-input v-model:value="form.accpetApplyNo" disabled/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetType" label="验收类型" has-feedback>
              <a-select
                v-model:value="form.accpetType"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                @change="accpetTypeChange"
                placeholder="请选择验收类型"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="addAccpetNo" label="新增申请单号" has-feedback>
              <AvicModalSelect
                v-model:value="form.addAccpetNo"
                title="选择弹窗"
                placeholder="请选择弹窗"
                valueField="applyNo"
                showField="applyNo"
                :defaultShowValue="form.addAccpetNo"
                :selectComponent="FamAddApplySelectComponent"
                :isMultiSelection="false"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClass" label="资产属性" has-feedback>
              <a-select
                v-model:value="form.assetClass"
                :auto-focus="true"
                :disabled="form.accpetType === '1'"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
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
          <a-col v-bind="colLayout.cols2" v-if="!form.addAccpetNo && form.accpetType==='1'">
            <a-form-item name="addNote" label="不新增申请理由" has-feedback>
              <a-textarea
                v-model:value="form.addNote"
                :rows="2"
                placeholder="请输入拒绝理由"
                :maxLength="4000"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderName" label="合同名称" has-feedback>
              <a-input
                v-model:value="form.orderName"
                :maxLength="64"
                placeholder="请输入合同名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderNo" label="合同编号" has-feedback>
              <a-input v-model:value="form.orderNo" :maxLength="64" placeholder="请输入合同编号"/>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderValue" label="合同金额" has-feedback>
              <a-input-number
                v-model:value="form.orderValue"
                :max="999999999999"
                :min="-999999999999"
                :precision="2"
                :step="0.01"
                placeholder="请输入合同金额"
                style="width: 100%"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptId" label="采购部门名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.procureDeptId"
                type="deptSelect"
                placeholder="请选择采购部门名称"
                :defaultShowValue="form.procureDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetDate" label="验收日期" has-feedback>
              <a-date-picker
                v-model:value="form.accpetDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择验收日期"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
              <a-form-item name="managerDeptName" label="主管部门名称" has-feedback>
                <AvicCommonSelect v-model:value="form.managerDeptName" type="deptSelect" placeholder="请选择主管部门名称"
                  :defaultShowValue="form.managerDeptNameAlias" />
              </a-form-item>
            </a-col>
            <a-col v-bind="colLayout.cols">
              <a-form-item name="receiveDeptName" label="接收部门名称" has-feedback>
                <AvicCommonSelect v-model:value="form.receiveDeptName" type="deptSelect" placeholder="请选择接收部门名称"
                  :defaultShowValue="form.receiveDeptNameAlias" />
              </a-form-item>
            </a-col> -->

          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundSource" label="资金来源" has-feedback>
              <a-select
                v-model:value="form.fundSource"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
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
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item-->
          <!--              name="otherMatter"-->
          <!--              label="其他事项"-->
          <!--              has-feedback-->
          <!--            >-->
          <!--              <a-input-->
          <!--                v-model:value="form.otherMatter"-->
          <!--                :maxLength="32"-->
          <!--                placeholder="请输入其他事项"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="purchWay" label="购置方式" has-feedback>
              <a-select
                v-model:value="form.purchWay"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="projectName" label="项目名称" has-feedback>
              <a-input
                v-model:value="form.projectName"
                :maxLength="32"
                placeholder="请输入项目名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handlePersonId" label="经办人名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.handlePersonId"
                type="userSelect"
                placeholder="请选择经办人名称"
                :defaultShowValue="form.handlePersonIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="managerDeptId" label="主管部门名称" has-feedback>
              <a-select
                v-model:value="form.managerDeptId"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :disabled="deptDisabled"
                :allow-clear="true"
                placeholder="请选择主管部门"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDeptId" label="使用部门名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.receiveDeptId"
                type="deptSelect"
                placeholder="请选择使用部门名称"
                :defaultShowValue="form.receiveDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-if="form.accpetType === '1'">
            <a-form-item name="assetClasst" label="资产类别" has-feedback>
              <a-input v-model:value="form.assetClasstName" @click="assetClasstClick">
                <template #suffix>
                  <a-tooltip @click="assetClasstClick">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols"
                 v-if="showEquipmentType">
            <a-form-item name="equipmentType" label="设备类型" has-feedback>
              <a-select
                v-model:value="form.equipmentType"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
              >
                <a-select-option
                  v-for="item in filterEquipmentTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynArchived" label="是否归档案">
              <a-select
                v-model:value="form.ynArchived"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否归档案"
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
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否已拆除无线模块"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item v-if="form.accpetType === '2' "
                         name="overhaulRequireCode"
                         label="维修改造单号"
                         has-feedback
            >
              <a-input
                v-model:value="form.overhaulRequireCode"
                @click="overhaulRequireCodeClick"
                placeholder="请选择维修改造"
              >
                <template #suffix>
                  <a-tooltip title="Extra information">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)"/>
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item label="附件">
              <AvicUploader
                element-id="1"
                form-type="edit"
                ref="uploadFile"
                :allow-download="true"
                :allow-preview="true"
                :allow-delete="true"
                :allow-update-secret-level="true"
                :form-id="form.id"
                table-name="FAM_ACCPET"
                @afterUpload="afterUploadEvent"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <FamAccpetListEdit
          ref="famAccpetListEdit"
          :assetClasst="form.assetClasst"
          :assetClasstObj="assetClasstObj"
          :accpetType="accpetType"
          :asset-class="assetClass"
          :mainId="formId || form.id"
        />
      </a-form>
    </a-spin>
    <FamOverhaulRequireSelect v-if="maintPlanModal" ref="famOverhaulRequireSelect" :visible="maintPlanModal"
                              @getPlanNo="getPlanNo" @closeCancel="closeMaintPlan"/>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="保存" type="primary" :loading="loading" @click="saveAndStartProcess">
        推进流程
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
  <!-- 树节点 -->
  <a-modal :visible="assetClasstOpen" @cancel="handleCancel" :body-style="bodyStyle" @ok="handleSummit">
    <div style="height: 100%;overflow: scroll">
      <a-spin :spinning="treeLoading">
        <a-tree
          v-if="treeData && treeData.length > 0"
          v-model:expanded-keys="expandedKeys"
          :tree-data="treeData"
          :load-data="onLoadData"
          :show-icon="true"
          :show-line="true && { showLeafIcon: false }"
          :default-expand-all="true"
          @expand="handleExpand"
          @select="handleSelect"
        >
          <template #icon="{ expanded, dataRef }">
            <AvicIcon v-if="dataRef.isLeaf" svg="avic-file-fill" color="#3370ff"/>
            <AvicIcon v-if="!expanded && !dataRef.isLeaf" svg="avic-folder-3-fill" color="#ffb800"/>
            <AvicIcon
              v-if="expanded && !dataRef.isLeaf"
              svg="avic-folder-open-fill"
              color="#ffb800"
            />
          </template>
        </a-tree>
      </a-spin>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { useFamAccpetForm, emits } from './ts/FamAccpetForm'; // 引入表单ts
import FamAccpetListEdit from '@/views/avic/mms/fam/famaccpetlist/FamAccpetListEdit.vue'; // 引入子表组件
import { setNodeSlots, getExpandedKeys } from '@/utils/tree-util'; // 引入树公共方法
import { getFamAssetClass, getTreeData } from '@/api/avic/mms/fam/FamAssetClassApi'; // 引入模块API
import FamOverhaulRequireSelect from '@/views/avic/mms/fam/famoverhaulrequire/FamOverhaulRequireSelect.vue'; // 引入弹窗选择页
import FamAddApplySelect from '@/views/avic/mms/fam/famaccpet/FamAddApplySelect.vue';

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

onMounted(() => {
  getTreeList();
});

const FamAddApplySelectComponent = FamAddApplySelect;
const { proxy } = getCurrentInstance();
const accpetType = ref();
const assetClass = ref();
const assetClasstOpen = ref<boolean>(false);
const treeLoading = ref(false);
const treeData = ref(null);
const expandedKeys = ref([]); //树节点validateRules
const defaultRootParentId = ref('-1');
const treeNodeId = ref();
const assetClasstObj = ref({});
const emit = defineEmits(emits);
const deptDisabled = ref(false);
const filterEquipmentTypeList = ref([]);
const maintPlanModal = ref<boolean>(false);

function accpetTypeChange(v) {
  accpetType.value = v;
}

function assetClassChange(v) {
  assetClass.value = v;
}

/** 关闭类别树弹窗 */
function handleCancel() {
  assetClasstOpen.value = false;
}

/** 异步加载树节点 */
async function onLoadData(treeNode) {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    getTreeData(1, treeNode.dataRef.id).then(response => {
      setNodeSlots(response.data);
      treeNode.dataRef.children = response.data;
      treeData.value = [...treeData.value];
      resolve();
    });
  });
}

/** 树选中事件 */
function handleSelect(keys: string[], node) {
  treeNodeId.value = node.node.id;
}

const showEquipmentType = computed(() => {
  if (form.value.assetClasst && filterEquipmentTypeList.value.length > 0) {
    console.log(form.value.assetClasst.charAt(0));
    if (['7', '3', '2'].includes(form.value.assetClasst.charAt(0))) {
      return true;
    }
    if (['8'].includes(form.value.assetClasst.charAt(0)) && form.value.managerDeptId === 'C410') {
      return true;
    }
    return false;
  }
});


/** 点击维修计划 */
const overhaulRequireCodeClick = () => {
  maintPlanModal.value = true;
};

/** 关闭年度弹窗 */
const closeMaintPlan = () => {
  maintPlanModal.value = false;
};

const getPlanNo = (v) => {
  form.value.overhaulRequireCode = v.billNo;
  form.value.overhaulRequireId = v.id;
  // if (v.maintCategory === '1') {
  //   proxy.$message.warning(' 请选择改造申请！');
  // }

  maintPlanModal.value = false;
};


/** 查询数据 */
function getTreeList() {
  treeLoading.value = true;
  const expandLevel = 2;
  treeData.value = [];
  expandedKeys.value = [];
  getTreeData(expandLevel, defaultRootParentId.value).then(response => {
    setNodeSlots(response.data);
    getExpandedKeys(response.data, expandLevel, expandedKeys.value);
    treeData.value = response.data;
    treeLoading.value = false;
  });
}

/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

/** 获取土地及房屋的id */
function getParentId() {
  let id = '';
  treeData.value[0].children.map(item => {
    if (item.title === '土地及房屋') {
      id = item.id;
    }
  });
  return id;
}

/** 提交类别 */
function handleSummit() {
  getFamAssetClass(treeNodeId.value)
    .then(async res => {
      if (res.success) {
        if (res.data.treeLeaf === 'Y') {
          assetClasstObj.value = res.data;
          form.value.assetClasst = res.data.classCode;
          form.value.assetClasstName = res.data.className;
          if (['7', '3', '2', '8'].includes(form.value.assetClasst.charAt(0))) {
            form.value.managerDeptId = 'C410';
          }
          assetClasstOpen.value = false;
        } else {
          proxy.$message.warning('该数据不属于末级节点请重新选择！');
        }
      }
    })
    .catch(error => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}


const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  assetTypeList,
  equipmentTypeList,
  loading,
  secretLevelList,
  accpetTypeList,
  purchWayList,
  fundSourceList,
  managerDeptIdList,
  uploadFile,
  bodyStyle,
  afterUploadEvent,
  ynArchivedList,
  ynDemolishedList,
  saveForm,
  saveAndStartProcess,
  closeModal,
  famAccpetListEdit
} = useFamAccpetForm({
  props: props,
  emit: emit
});

/** 资产类别弹窗 */
const assetClasstClick = () => {
  assetClasstOpen.value = true;
};

watch(
  () => form.value.accpetType,
  newV => {
    accpetType.value = newV;
    if (newV === '1') form.value.assetClass = '1';
  }
);

watch(
  () => form.value.assetClass,
  newV => {
    assetClass.value = newV;
  }
);

watch(
  () => form.value.assetClasst,
  newV => {
    if (['7', '3', '2'].includes(newV.charAt(0))) {
      filterEquipmentTypeList.value = equipmentTypeList.value.filter(item =>
        item.lookupName !== '办公自动化设备' && item.lookupName !== '视频监控、硬盘录像设备');
      form.value.equipmentType = '';
      deptDisabled.value = true;
    } else {
      if (['8'].includes(newV.charAt(0))) {
        filterEquipmentTypeList.value = equipmentTypeList.value.filter(item =>
          item.lookupName === '办公自动化设备' || item.lookupName === '视频监控、硬盘录像设备');
        form.value.equipmentType = '';
      } else {
        filterEquipmentTypeList.value = [];
      }
      deptDisabled.value = false;
    }
  }
);
</script>
