<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout" ref="formRef" :model="queryForm">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="计划编号">
              <a-input
                v-model:value="queryForm.billNo"
                placeholder="请输入计划编号"
                :allow-clear="true"
                @pressEnter="handleQuery"
              />
            </a-form-item>
          </a-col>
          <!--          <a-col v-bind="colLayout.cols">-->
          <!--            <a-form-item label="保养状态">-->
          <!--              <a-select-->
          <!--                  v-model:value="queryForm.maintenanceStatus"-->
          <!--                  :get-popup-container="triggerNode => triggerNode.parentNode"-->
          <!--                  option-filter-prop="children"-->
          <!--                  :show-search="true"-->
          <!--                  :allow-clear="true"-->
          <!--                  placeholder="请选择保养状态"-->
          <!--              >-->
          <!--                <a-select-option-->
          <!--                    v-for="item in maintenanceStatusList"-->
          <!--                    :key="item.sysLookupTlId"-->
          <!--                    :value="item.lookupCode"-->
          <!--                >-->
          <!--                  {{ item.lookupName }}-->
          <!--                </a-select-option>-->
          <!--              </a-select>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined/>
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined/>
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced"/>
                  <down-outlined v-else/>
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="tpmMaintPlan"
        table-key="tpmMaintPlan"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="list"
        :loading="loading"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <!--            <a-button-->
            <!--              v-hasPermi="['tpmMaintPlan:add']"-->
            <!--              title="添加"-->
            <!--              type="primary"-->
            <!--              @click="handleAdd"-->
            <!--            >-->
            <!--              <template #icon>-->
            <!--                <plus-outlined/>-->
            <!--              </template>-->
            <!--              添加-->
            <!--            </a-button>-->
            <a-button
              v-hasPermi="['tpmMaintPlan:save']"
              title="保存"
              type="primary"
              :loading="saveLoading"
              @click="handleSaveAll"
            >
              <template #icon>
                <save-outlined/>
              </template>
              保存
            </a-button>
            <a-button
              title="下达"
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleRelease(selectedRowKeys, event,'');
                }
              "
            >
              <template #icon>
              </template>
              下达
            </a-button>
            <!--            <a-button-->
            <!--              v-hasPermi="['tpmMaintPlan:del']"-->
            <!--              title="删除"-->
            <!--              danger-->
            <!--              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"-->
            <!--              :loading="delLoading"-->
            <!--              @click="-->
            <!--                event => {-->
            <!--                  handleDelete(selectedRowKeys, event,'');-->
            <!--                }-->
            <!--              "-->
            <!--            >-->
            <!--              <template #icon>-->
            <!--                <delete-outlined/>-->
            <!--              </template>-->
            <!--              删除-->
            <!--            </a-button>-->
          </a-space>
        </template>
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
            v-if="column.dataIndex === 'maintUserId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicCommonSelect
                v-model:value="record.maintUserId"
                :defaultShowValue="record.maintUserIdAlias"
                placeholder="请选择保养负责人"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'maintUserId')
                  }
                "
              />
            </template>
            <template #default>
              {{ record['maintUserIdAlias'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'goodConditionFlag'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.goodConditionFlag"
                style="width: 100%"
                placeholder="请选择完好标识"
                @change="(value)=>changeControlValue(value,record,'goodConditionFlag')"
              >
                <a-select-option
                  v-for="select in goodConditionFlagList"
                  :key="select.sysLookupTlId"
                  :value="select.lookupCode"
                  :title="select.lookupName"
                  :disabled="select.disabled === true"
                >
                  {{ select.lookupName }}
                </a-select-option>
              </a-select>
            </template>
            <template #default>
              <AvicDictTag
                :value="record.goodConditionFlagName"
                :options="goodConditionFlagList"
              />
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="['note','problemDescription','vendorName'].includes(
               column.dataIndex
              )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record[column.dataIndex]"
                :maxLength="256"
                @input="$forceUpdate()"
                style="width: 100%"
                placeholder="请输入"
                @blur="blurInput($event, record, column.dataIndex)"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'actrualMaintUserId'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <AvicCommonSelect
                v-model:value="record.actrualMaintUserId"
                :defaultShowValue="record.actrualMaintUserIdAlias"
                placeholder="请选择实际保养人"
                type="userSelect"
                @callback="
                  (value, _selectRows) => {
                    changeCommonSelect(value,record,'actrualMaintUserId')
                  }
                "
              />
            </template>
            <template #default>
              {{ record['actrualMaintUserIdAlias'] }}
            </template>
          </AvicRowEdit>
          <!--          <AvicRowEdit-->
          <!--              v-else-if="column.dataIndex === 'secretLevel'"-->
          <!--              :record="record"-->
          <!--              :column="column.dataIndex"-->
          <!--          >-->
          <!--            <template #edit>-->
          <!--              <a-select-->
          <!--                  v-model:value="record.secretLevel"-->
          <!--                  style="width: 100%"-->
          <!--                  placeholder="请选择密级"-->
          <!--                  @change="(value)=>changeControlValue(value,record,'secretLevel')"-->
          <!--              >-->
          <!--                <a-select-option-->
          <!--                    v-for="select in secretLevelList"-->
          <!--                    :key="select.sysLookupTlId"-->
          <!--                    :value="select.lookupCode"-->
          <!--                    :title="select.lookupName"-->
          <!--                    :disabled="select.disabled === true"-->
          <!--                >-->
          <!--                  {{ select.lookupName }}-->
          <!--                </a-select-option>-->
          <!--              </a-select>-->
          <!--            </template>-->
          <!--            <template #default>-->
          <!--              {{ record['secretLevelName'] }}-->
          <!--            </template>-->
          <!--          </AvicRowEdit>-->
          <AvicRowEdit
            v-else-if="column.dataIndex === 'maintConclusion'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.maintConclusion"
                style="width: 100%"
                placeholder="请选择保养结论"
                @change="(value)=>changeControlValue(value,record,'maintConclusion')"
              >
                <a-select-option
                  v-for="select in maintConclusionList"
                  :key="select.sysLookupTlId"
                  :value="select.lookupCode"
                  :title="select.lookupName"
                  :disabled="select.disabled === true"
                >
                  {{ select.lookupName }}
                </a-select-option>
              </a-select>
            </template>
            <template #default>
              <AvicDictTag
                :value="record.maintConclusionName"
                :options="maintConclusionList"
              />
            </template>
          </AvicRowEdit>
          <!--          <template v-else-if="column.dataIndex === 'action'">-->
          <!--            <a-button-->
          <!--                v-if="record.editable"-->
          <!--                type="link"-->
          <!--                class="inner-btn"-->
          <!--                :disable="editingId !== ''"-->
          <!--                @click.stop="handleSave(record)"-->
          <!--            >-->
          <!--              保存-->
          <!--            </a-button>-->
          <!--            <a-button-->
          <!--                v-else-->
          <!--                type="link"-->
          <!--                class="inner-btn"-->
          <!--                :disable="editingId !== ''"-->
          <!--                @click.stop="handleEdit(record)"-->
          <!--            >-->
          <!--              编辑-->
          <!--            </a-button>-->
          <!--            <a-button-->
          <!--                type="link"-->
          <!--                class="inner-btn"-->
          <!--                @click.stop="-->
          <!--                event => {-->
          <!--                  handleDelete([record.id], event, 'row');-->
          <!--                }-->
          <!--              "-->
          <!--            >-->
          <!--              删除-->
          <!--            </a-button>-->
          <!--          </template>-->
        </template>
      </AvicTable>
    </div>
    <avic-excel-import
      v-if="showImportModal"
      :formData="excelParams"
      title="导入"
      importUrl="/mms/tpm/tpmmaintplans/importData/v1"
      downloadTemplateUrl="/mms/tpm/tpmmaintplans/downloadTemplate/v1"
      @reloadData="getList"
      @close="showImportModal = false"
    ></avic-excel-import>
  </div>
</template>
<script lang="ts" setup>
import type { TpmMaintPlanDto } from '@/api/avic/mms/tpm/TpmMaintPlanReleaseApi'; // 引入模块DTO
import {
  listTpmMaintPlanByPage,
  saveTpmMaintPlan,
  delTpmMaintPlan,
  releaseTpmMaintPlan,
  exportExcel
} from '@/api/avic/mms/tpm/TpmMaintPlanReleaseApi';

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 调用布局公共方法
const columns = [
  {
    title: '计划编号',
    dataIndex: 'billNo',
    key: 'billNo',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养负责人',
    dataIndex: 'maintUserId',
    key: 'maintUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
  {
    title: '实际保养人',
    dataIndex: 'actrualMaintUserId',
    key: 'actrualMaintUserId',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
  {
    title: '外委专业厂家',
    dataIndex: 'vendorName',
    key: 'vendorName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '型号',
    dataIndex: 'model',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '设备规格',
    dataIndex: 'specs',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }, {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养项目',
    dataIndex: 'maintenanceItems',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养部位',
    dataIndex: 'maintenancePosition',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养依据',
    dataIndex: 'maintenanceBasis',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养内容',
    dataIndex: 'maintenanceContent',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '保养要求',
    dataIndex: 'maintenanceRequirement',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '上次保养日期',
    dataIndex: 'oldLastMaintenPlanDate',
    key: 'oldLastMaintenPlanDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养周期(月)',
    dataIndex: 'maintenanceCycle',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '小时数',
    dataIndex: 'maintenanceHours',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '是否自主维护',
    dataIndex: 'ynSelfMaintenanceName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '编制时间',
    dataIndex: 'editDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '计划保养日期',
    dataIndex: 'planMaintenanceDate',
    key: 'planMaintenanceDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养状态',
    dataIndex: 'maintenanceStatusName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
  // {
  //   title: '保养完成日期',
  //   dataIndex: 'maintenanceFinishDate',
  //   key: 'maintenanceFinishDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '下达日期',
  //   dataIndex: 'dispatchDate',
  //   key: 'dispatchDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '下达人',
  //   dataIndex: 'dispatchUserId',
  //   key: 'dispatchUserId',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '完好标识',
  //   dataIndex: 'goodConditionFlag',
  //   key: 'goodConditionFlag',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '保养计划类型',
  //   dataIndex: 'maintenPlanTypeName',
  //   key: 'maintenPlanType',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '驳回原因',
  //   dataIndex: 'backReason',
  //   key: 'backReason',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'left'
  // },
  // {
  //   title: '完工日期',
  //   dataIndex: 'completeDate',
  //   key: 'completeDate',
  //   ellipsis: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: 120,
  //   align: 'center',
  //   fixed: 'right'
  // }
];
const queryForm = ref<TpmMaintPlanDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const tpmMaintPlan = ref(null);
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmMaintPlan' }); // 导入Excel数据过滤参数
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false); // 表格loading状态
const saveLoading = ref(false); // 统一保存按钮loading 状态
const delLoading = ref(false); // 删除按钮loading状态
const totalPage = ref(0);
const maintenanceStatusList = ref([]); // 保养状态通用代码
const goodConditionFlagList = ref([]); // 完好标识通用代码
const maintenPlanTypeList = ref([]); // 保养计划类型通用代码
const secretLevelList = ref([]); // 密级通用代码
const maintConclusionList = ref([]); // 保养结论通用代码
const lookupParams = [
  { fieldName: 'maintenanceStatus', lookUpType: 'TPM_MAINTEN_STATUS' },
  { fieldName: 'goodConditionFlag', lookUpType: 'TPM_YN_FALG' },
  { fieldName: 'maintenPlanType', lookUpType: 'TPM_MAINTEN_PLAN_TYPE' },
  { fieldName: 'maintConclusion', lookUpType: 'TPM_MAINT_CONCLUSION' }
];
const validateRules = {
  maintUserId: [
    { required: true, message: '保养负责人列不能为空' }
  ],
  actrualMaintUserId: [
    { required: true, message: '实际保养人列不能为空' }
  ],
  vendorName: [
    { required: true, message: '外委专业厂家列不能为空' }
  ],
  maintConclusion: [
    { required: true, message: '保养结论列不能为空' }
  ]
}; // 必填列,便于保存和新增数据时校验
const editingId = ref(''); // 正在编辑中的数据

onMounted(() => {
  queryForm.value.maintenanceStatus = '5';
  queryParam.searchParams = { ...queryForm.value };
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listTpmMaintPlanByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      initialList.value = proxy.$lodash.cloneDeep(list.value);
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

/** 获取通用代码  */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    maintenanceStatusList.value = result.maintenanceStatus;
    goodConditionFlagList.value = result.goodConditionFlag;
    maintenPlanTypeList.value = result.maintenPlanType;
    maintConclusionList.value = result.maintConclusion;
  });
}

/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}

/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}

/** 高级查询 重置按钮操作  */
function resetQuery() {
  queryForm.value = {};
  queryForm.value.maintenanceStatus = '5';
  handleQuery();
}

/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {};
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    maintenanceCycle: '',
    editDate: null,
    planMaintenanceDate: null,
    maintenanceStatus: undefined,
    maintenanceFinishDate: null,
    maintUserId: '',
    actrualMaintUserId: '',
    dispatchDate: null,
    dispatchUserId: '',
    goodConditionFlag: '',
    oldLastMaintenPlanDate: null,
    billNo: '',
    maintenPlanType: undefined,
    backReason: '',
    completeDate: null,
    note: '',
    secretLevel: undefined,
    vendorName: '',
    maintConclusion: undefined,
    problemDescription: '',
    editable: true // true为编辑中, false为未编辑
  };
  editingId.value = item.id;
  let newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
  newData.unshift(item);
  list.value = newData;
}

/** 编辑 */
function handleEdit(record) {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  const newData = [...list.value];
  editingId.value = record.id;
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}

/** 保存 */
function handleSave(record) {
  let target = proxy.$lodash.cloneDeep(record);
  // 单数据校验
  if (!validateRecordData([target])) {
    return;
  }
  // 保存前数据处理
  for (let key in target) {
    // 多选控件的数据，数组转化为字符串，
    if (Array.isArray(target[key])) {
      target[key] = target[key].join(',');
    }
  }
  editingId.value = '';
  saveTpmMaintPlan([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
}

/** 批量保存 */
function handleSaveAll() {
  // 规避正在保存时连续点击
  if (saveLoading.value) return;
  // 开始处理数据
  saveLoading.value = true;
  // 获取改变和新增的数据
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && changedData.length == 0) {
    proxy.$message.warning('请先修改数据！');
    saveLoading.value = false;
  } else if (changedData && validateRecordData(changedData)) {
    saveTpmMaintPlan(changedData).then(res => {
      if (res.success) {
        getList();
        proxy.$message.success('保存成功！');
        saveLoading.value = false;
      } else {
        proxy.$message.error('保存失败！');
        saveLoading.value = false;
      }
    })
      .catch(() => {
        saveLoading.value = false;
      });
  } else {
    saveLoading.value = false;
  }
}

/** 导入 */
function handleImport() {
  showImportModal.value = true;
}

/** 导出 */
function handleExport() {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}

/** 删除 */
function handleDelete(ids, e, type) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      // 获取所有非新增的数据，执行后台删除逻辑，新增的数据直接界面删除
      const deleteIds = ids.filter(id => id.indexOf('newLine') == -1);
      if (deleteIds.length > 0) {
        return delTpmMaintPlan(deleteIds)
          .then(() => {
            removeRecordByIds(ids);
          })
          .catch(() => {
            delLoading.value = false;
          });
      } else {
        removeRecordByIds(ids);
      }
    }
  });
}

function handleRelease(ids, e, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要下达的数据！');
    return;
  }
  // for (let item in ids) {
  //   let target = proxy.$lodash.cloneDeep(list.value.filter(i => i.id === ids[item])[0]);
  //   if (!validateRecordData([target])) {
  //     return;
  //   }
  // }
  proxy.$confirm({
    title: `确认要下达${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      releaseTpmMaintPlan(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('下达成功！');
            getList();
          }
          delLoading.value = false;
        }).catch(() => {
        delLoading.value = false;
      });
    }
  });
}

/** 删除操作后更新list */
function removeRecordByIds(deleteIds) {
  let newData = [...list.value];
  let updateList = [...list.value];
  let delUpdateData = [];
  for (let i = 0; i < deleteIds.length; i++) {
    newData = newData.filter(item => item['id'] !== deleteIds[i]);
    delUpdateData = updateList.filter(
      item => item['id'] == deleteIds[i] && item['operationType_'] != 'insert'
    );
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  // 前台刷新表格
  list.value = newData;
  // 提示成功
  proxy.$message.success('删除成功！');
  delLoading.value = false;
  if (list.value.length == 0) {
    // 当前页数据被清空
    let currentPage = 1;
    if (queryParam.pageParameter.page > 1) {
      currentPage = queryParam.pageParameter.page - 1;
    }
    queryParam.pageParameter.page = currentPage;
    getList();
  } else {
    // 当前页数据没有全部删除时分页总条数为原total-删除数据中心非添加数据个数
    totalPage.value = totalPage.value - delUpdateData.length;
  }
}

/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}

/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}

/** 控件变更事件  */
function changeControlValue(values, record, column) {
  let labels = [];
  if (Array.isArray(values)) {
    // 多选处理
    for (let i = 0; i < values.length; i++) {
      // 从对应的通用代码中查询对应的label
      const target = proxy[column + 'List'].find(item => values[i] === item.lookupCode);
      labels.push(target.lookupName);
    }
  } else {
    // 单选处理
    const target = proxy[column + 'List'].find(item => values === item.lookupCode);
    labels.push(target.lookupName);
  }
  if (record) {
    record[column + 'Name'] = labels.join(',');
  }
}

/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}

/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, tpmMaintPlan);
    if (!flag) {
      break;
    }
  }
  return flag;
}

/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}

/** 表头排序 */
function handleTableChange(pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
</script>

