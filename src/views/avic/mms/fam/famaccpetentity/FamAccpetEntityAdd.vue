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
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" class="form-excel-style">
        <a-row :gutter="0">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetApplyNo" label="验收申请单号" has-feedback>
              <avic-auto-code
                v-model:value="form.accpetApplyNo"
                ref="autoCode"
                code-type="FAM_BILL_NO"
                code-param="FAM_ACCPET"
                :allow-clear="true"
                :disabled="false"
                placeholder="请输入验收申请单号"
              />
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
                @change="annualChange"
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
              <a-input v-model:value="form.orderNo" :maxLength="64" placeholder="请输入合同编号" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderValue" label="合同金额" has-feedback>
              <a-input
                v-model:value="form.orderValue"
                :maxLength="16"
                placeholder="请输入合同金额"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="procureDeptName" label="采购部门名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.procureDeptName"
                type="deptSelect"
                placeholder="请选择采购部门名称"
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
              <AvicCommonSelect v-model:value="form.managerDeptName" type="deptSelect" placeholder="请选择主管部门名称" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receiveDeptName" label="接收部门名称" has-feedback>
              <AvicCommonSelect v-model:value="form.receiveDeptName" type="deptSelect" placeholder="请选择接收部门名称" />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClass" label="资产属性" has-feedback>
              <a-select
                v-model:value="form.assetClass"
                disabled
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择验收类型"
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fundSource" label="资金来源" has-feedback>
              <a-select
                v-model:value="form.fundSource"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择资金来源"
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
          <!--            <a-form-item name="otherMatter" label="其他事项" has-feedback>-->
          <!--              <a-input-->
          <!--                  v-model:value="form.otherMatter"-->
          <!--                  :maxLength="32"-->
          <!--                  placeholder="请输入其他事项"-->
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
                placeholder="请选择购置方式"
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
            <a-form-item name="handlePersonName" label="经办人名称" has-feedback>
              <AvicCommonSelect
                v-model:value="form.handlePersonName"
                type="userSelect"
                :defaultShowValue="form.handlePersonNameAlias"
                placeholder="请选择经办人名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="assetClasst" label="资产类别" has-feedback>
              <a-input
                v-model:value="form.assetClasst"
                placeholder="请输入资产类别"
                @click="assetClasstClick"
              >
                <template #suffix>
                  <a-tooltip title="Extra information">
                    <ApartmentOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="equipmentType" label="设备类型" has-feedback>
              <a-select
                v-model:value="form.equipmentType"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择设备类型"
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
            <a-form-item   v-if="annual === '2' "
                           name="overhaulRequireCode"
                           label="维修改造单号"
                           has-feedback
            >
              <!--         <a-input v-if="annual === '2'"
                                v-model:value="form.overhaulRequireCode"
                                :maxLength="32"
                                placeholder="请输入选择维修改造"
                       /> -->
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
                form-type="add"
                ref="uploadFile"
                save-type="Disk"
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
        <FamAccpetListEntityEdit
          ref="famAccpetListEntityEdit"
          :isLand="isLand"
          :assetClasstObj="assetClasstObj"
          :accpetType="accpetType"
          :asset-class="assetClass"
          :mainId="formId || form.id"
        />
      </a-form>
      <FamOverhaulRequireSelect v-if="maintPlanModal" ref="famOverhaulRequireSelect" :visible="maintPlanModal"
                                @getPlanNo="getPlanNo" @closeCancel="closeMaintPlan"/>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="addForm">保存</a-button>
      <a-button title="启动流程" type="primary" :loading="loading" @click="saveAndStartProcess">
        启动流程
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
  <!-- 树节点 -->
  <a-modal :visible="assetClasstOpen" @cancel="handleCancel" @ok="handleSummit">
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
          <AvicIcon v-if="dataRef.isLeaf" svg="avic-file-fill" color="#3370ff" />
          <AvicIcon v-if="!expanded && !dataRef.isLeaf" svg="avic-folder-3-fill" color="#ffb800" />
          <AvicIcon
            v-if="expanded && !dataRef.isLeaf"
            svg="avic-folder-open-fill"
            color="#ffb800"
          />
        </template>
      </a-tree>
    </a-spin>
  </a-modal>
</template>
<script lang="ts" setup>
import { useFamAccpetForm, emits } from './ts/FamAccpetEntityForm'; // 引入表单ts
import FamAccpetListEntityEdit from '@/views/avic/mms/fam/famaccpetlistentity/FamAccpetListEntityEdit.vue';
import { getFamAssetClass, getTreeData } from '@/api/avic/mms/fam/FamAssetClassApi';
import { getExpandedKeys, setNodeSlots } from '@/utils/tree-util'; // 引入子表组件
import FamOverhaulRequireSelect from '@/views/avic/mms/fam/famoverhaulrequire/FamOverhaulRequireSelect.vue'; // 引入弹窗选择页

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
  form.value.handlePersonName = proxy.$getLoginUser().id;
  form.value.handlePersonNameAlias = proxy.$getLoginUser().name;
  form.value.assetClass = '2'
});
const famOverhaulRequireSelect = ref(null);
const { proxy } = getCurrentInstance();
const accpetType = ref();
const assetClass = ref();
const maintPlanModal = ref<boolean>(false);
const annual = ref();
const assetClasstOpen = ref<boolean>(false);
const treeLoading = ref(false);
const treeData = ref(null);
const expandedKeys = ref([]); //树节点validateRules
const defaultRootParentId = ref('-1');
const treeNodeId = ref();
const isLand = ref(false); //是否为土地及房屋
const assetClasstObj = ref();
const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  secretLevelList,
  saveAndStartProcess,
  assetTypeList,
  accpetTypeList,
  purchWayList,
  fundSourceList,
  uploadFile,
  afterUploadEvent,
  equipmentTypeList,
  autoCode,
  closeModal,
  addForm,
  famAccpetListEntityEdit
} = useFamAccpetForm({
  props: props,
  emit: emit
});

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

/** 关闭类别树弹窗 */
function handleCancel() {
  assetClasstOpen.value = false;
}

/** 点击维修计划 */
const overhaulRequireCodeClick = () => {
  maintPlanModal.value = true;
};
/** 关闭年度弹窗 */
const closeMaintPlan = () => {
  maintPlanModal.value = false;
};

/** 提交类别 */
function handleSummit() {
  getFamAssetClass(treeNodeId.value)
    .then(async res => {
      if (res.success) {
        if (res.data.treeLeaf === 'Y') {
          const parentId = getParentId();
          console.log(getParentId())
          isLand.value = res.data.treePath.split('/').includes(parentId);
          console.log(isLand.value)
          assetClasstObj.value = res.data;
          form.value.assetClasst = res.data.classCode;
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

/** 树节点展开事件 */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

const annualChange = (v) => {
  annual.value = v;
};
const getPlanNo = (v) => {
  form.value.overhaulRequireCode = v.billNo;
  form.value.overhaulRequireId =  v.id;
  if(v.maintCategory ==='1'){
    proxy.$message.warning(' 请选择改造申请！');
  }

  maintPlanModal.value = false;
};

/** 树选中事件 */
function handleSelect(keys: string[], node) {
  treeNodeId.value = node.node.id;
}

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

/** 获取土地及房屋的id */
function getParentId() {
  let id = '';
  treeData.value[0].children.map(item => {
    console.log(item)
    if (item.title === '土地房屋') {
      id = item.id;
    }
  });
  return id;
}

/** 资产类别弹窗 */
const assetClasstClick = () => {
  assetClasstOpen.value = true;
};

watch(
  () => form.value.accpetType,
  newV => {
    console.log(form.value);
    accpetType.value = newV;
  }
);

watch(
  () => form.value.assetClass,
  newV => {
    assetClass.value = newV;
  }
);
</script>
