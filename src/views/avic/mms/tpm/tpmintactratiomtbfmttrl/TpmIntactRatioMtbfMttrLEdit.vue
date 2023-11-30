<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      v-if="showTable"
      ref="tpmIntactRatioMtbfMttrL"
      table-key="tpmIntactRatioMtbfMttrL"
      :height="300"
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
      :showTableSetting="false"
      :pageParameter="queryParam.pageParameter"
      :total="totalPage"
      :customRow="customRow"
      @change="handleTableChange"
    >
      <template v-if="!props.readOnly" #toolBarLeft>
        <a-space>
          <a-space>
            <a-button
              v-hasPermi="['tpmIntactRatioMtbfMttrL:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['tpmIntactRatioMtbfMttrL:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="
                event => {
                  handleDelete(selectedRowKeys, event);
                }
              "
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button
              v-if="props.mainId ? true : false"
              v-hasPermi="['tpmIntactRatioMtbfMttrL:import']"
              title="导入"
              type="primary"
              ghost
              @click="handleImport">
                  <template #icon>
                    <import-outlined />
                  </template>
                  导入
            </a-button>
          </a-space>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
           v-if="['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10', 'day11', 'day12', 'day13', 'day14', 'day15', 'day16', 'day17', 'day18', 'day19', 'day20', 'day21', 'day22', 'day23', 'day24', 'day25', 'day26', 'day27', 'day28', 'day29', 'day30', 'day31'].includes(
             column.dataIndex
           )"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input-number
                v-model:value="record[column.dataIndex]"
                :maxLength="16"
                :max="1"
                :min="0"
                style="width: 100%"
                placeholder="请输入"
                @change="calculateTotal(record)"
                :readonly="props.readOnly"
             >
              </a-input-number>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'secretLevel'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-select
                v-model:value="record.secretLevel"
                style="width: 100%"
                placeholder="请选择密级"
                @change="(value) => changeControlValue(value, record, 'secretLevel')"
                :readonly="props.readOnly"
              >
                <a-select-option
                  v-for="select in secretLevelList"
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
              {{ record['secretLevelName'] }}
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'equipmentCode'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.equipmentCode"
                @click="handleOpen(record)"
                :readonly="true"
                placeholder="请选择设备编号"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'equipmentName'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.equipmentName"
                :readonly="true"
                placeholder="请选择设备名称"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'equipmentStatusTotal'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input-number
                v-model:value="record.equipmentStatusTotal"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                style="width: 100%"
                :readonly="true"
                placeholder="请输入合计"
              >
              </a-input-number>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'equipmentRunTime'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.equipmentRunTime"
                placeholder="请输入设备运行时间（h）"
                @change="calculateMTBFOrMTTR(record)"
                :readonly="props.readOnly"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'repairTime'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.repairTime"
                placeholder="请输入设备故障修复时间（h）"
                @change="calculateMTBFOrMTTR(record)"
                :readonly="props.readOnly"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'failureNumber'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.failureNumber"
                placeholder="请输入设备故障次数"
                @change="calculateMTBFOrMTTR(record)"
                :readonly="props.readOnly"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'mtbf'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.mtbf"
                :readonly="true"
              >
              </a-input>
            </template>
          </AvicRowEdit>
          <AvicRowEdit
            v-else-if="column.dataIndex === 'mttr'"
            :record="record"
            :column="column.dataIndex"
          >
            <template #edit>
              <a-input
                v-model:value="record.mttr"
                :readonly="true"
              >
              </a-input>
            </template>
          </AvicRowEdit>
        <template v-else-if="column.dataIndex === 'action' && !props.readOnly">
          <a-button
            class="inner-btn"
            type="link"
            @click="
              event => {
                handleDelete([record.id], event);
              }
            "
          >
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
  </div>
    <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="模板导入"
      importUrl="/mms/tpm/tpmintactratiomtbfmttrls/importData/v1" downloadTemplateUrl="/mms/tpm/tpmintactratiomtbfmttrls/downloadTemplate/v1"
      @reloadData="getList" @close="showImportModal = false" />
  <!--选择设备弹窗-->
  <a-modal :visible="open" title="选择设备" @ok="handleOk" @cancel="handleCancel" width="80%" style="top: 20px">
    <div style="height: 400px;overflow: auto">
      <Tpm-Intact-Ratio-Mtbf-Mttr-l-select ref="tpmIntactRatioMtbfMttrLSelect">
      </Tpm-Intact-Ratio-Mtbf-Mttr-l-select>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import type { TpmIntactRatioMtbfMttrLDto } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrLApi'; // 引入模块DTO
import { listTpmIntactRatioMtbfMttrLByPage, getSpecifyYearList } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrLApi'; // 引入模块API
import TpmIntactRatioMtbfMttrLSelect from './TpmInventorySelect.vue'; // 引入弹窗选择页
import { TpmIntactRatioMtbfMttrDto } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi';
import { useUserStore } from '@/store/user';
import dayjs from 'dayjs';

const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  reportDate: {
    type: String,
    default: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  }
});
const { proxy } = getCurrentInstance();
const userInfo = useUserStore().userInfo;
let columns = ref([]);
const columns1 = [
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    key: 'equipmentCode',
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
    title: '设备名称',
    dataIndex: 'equipmentName',
    key: 'equipmentName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  }
] as any[];
const columns2 = [
  {
    title: '1日',
    dataIndex: 'day1',
    key: 'day1',
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
    title: '2日',
    dataIndex: 'day2',
    key: 'day2',
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
    title: '3日',
    dataIndex: 'day3',
    key: 'day3',
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
    title: '4日',
    dataIndex: 'day4',
    key: 'day4',
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
    title: '5日',
    dataIndex: 'day5',
    key: 'day5',
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
    title: '6日',
    dataIndex: 'day6',
    key: 'day6',
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
    title: '7日',
    dataIndex: 'day7',
    key: 'day7',
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
    title: '8日',
    dataIndex: 'day8',
    key: 'day8',
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
    title: '9日',
    dataIndex: 'day9',
    key: 'day9',
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
    title: '10日',
    dataIndex: 'day10',
    key: 'day10',
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
    title: '11日',
    dataIndex: 'day11',
    key: 'day11',
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
    title: '12日',
    dataIndex: 'day12',
    key: 'day12',
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
    title: '13日',
    dataIndex: 'day13',
    key: 'day13',
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
    title: '14日',
    dataIndex: 'day14',
    key: 'day14',
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
    title: '15日',
    dataIndex: 'day15',
    key: 'day15',
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
    title: '16日',
    dataIndex: 'day16',
    key: 'day16',
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
    title: '17日',
    dataIndex: 'day17',
    key: 'day17',
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
    title: '18日',
    dataIndex: 'day18',
    key: 'day18',
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
    title: '19日',
    dataIndex: 'day19',
    key: 'day19',
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
    title: '20日',
    dataIndex: 'day20',
    key: 'day20',
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
    title: '21日',
    dataIndex: 'day21',
    key: 'day21',
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
    title: '22日',
    dataIndex: 'day22',
    key: 'day22',
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
    title: '23日',
    dataIndex: 'day23',
    key: 'day23',
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
    title: '24日',
    dataIndex: 'day24',
    key: 'day24',
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
    title: '25日',
    dataIndex: 'day25',
    key: 'day25',
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
    title: '26日',
    dataIndex: 'day26',
    key: 'day26',
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
    title: '27日',
    dataIndex: 'day27',
    key: 'day27',
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
    title: '28日',
    dataIndex: 'day28',
    key: 'day28',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  }
] as any[];
const columns3 = [
  {
    title: '29日',
    dataIndex: 'day29',
    key: 'day92',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  }
] as any[];
const columns4 = [
  {
    title: '30日',
    dataIndex: 'day30',
    key: 'day30',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  }
] as any[];
const columns5 = [
  {
    title: '31日',
    dataIndex: 'day31',
    key: 'day31',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'left'
  }
] as any[];
const columns6 = [
  {
    title: '合计',
    dataIndex: 'equipmentStatusTotal',
    key: 'equipmentStatusTotal',
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
    title: '设备运行时间（h）',
    dataIndex: 'equipmentRunTime',
    key: 'equipmentRunTime',
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
    title: '设备故障修复时间（h）',
    dataIndex: 'repairTime',
    key: 'repairTime',
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
    title: '设备故障次数',
    dataIndex: 'failureNumber',
    key: 'failureNumber',
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
    title: 'MTBF',
    dataIndex: 'mtbf',
    key: 'mtbf',
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
    title: 'MTTR',
    dataIndex: 'mttr',
    key: 'mttr',
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
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    },
    align: 'center'
  }
] as any[];
const queryForm = ref<TpmIntactRatioMtbfMttrLDto>({});
const form = ref<TpmIntactRatioMtbfMttrDto>({});
const subForm = ref<TpmIntactRatioMtbfMttrLDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const tpmIntactRatioMtbfMttrL = ref(null);
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'tpmIntactRatioMtbfMttrL', tpmIntactRatioMtbfMttrId: '' });
const validateRules = {
  tpmInventoryId: [
    { required: true, message: '设备台账ID列不能为空' }
  ],
  equipmentCode: [
    { required: true, message: '设备编号列不能为空' }
  ],
  equipmentName: [
    { required: true, message: '设备名称列不能为空' }
  ],
  equipmentStatusTotal: [
    { required: true, message: '合计列不能为空' }
  ],
  equipmentRunTime: [
    { required: true, message: '设备运行时间（h）列不能为空' }
  ],
  repairTime: [
    { required: true, message: '设备故障修复时间（h）列不能为空' }
  ],
  failureNumber: [
    { required: true, message: '设备故障次数列不能为空' }
  ],
  mtbf: [
    { required: true, message: 'MTBF列不能为空' }
  ],
  mttr: [
    { required: true, message: 'MTTR列不能为空' }
  ],
  secretLevel: [
    { required: true, message: '密级列不能为空' }
  ]
}; // 必填列,便于保存和新增数据时校验
const deletedData = ref([]); // 前台删除数据的记录
const open = ref<boolean>(false);
const tpmIntactRatioMtbfMttrLSelect = ref(null);
const currentRecord = ref<TpmIntactRatioMtbfMttrLDto>({});
const currentMonth = ref();
const showTable = ref<boolean>(false);

// 非只读状态添加操作列
if (!props.readOnly) {
  columns.value.push({
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center'
  });
}
onMounted(() => {
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();

});

function getTable() {
  showTable.value = false;

  currentMonth.value = new Date(new Date(props.reportDate).getFullYear(), new Date(props.reportDate).getMonth() + 1, 0).getDate();
  switch (currentMonth.value) {
    case 28:
      columns.value = [...columns1, ...columns2, ...columns6];
      break;
    case 29:
      columns.value = [...columns1, ...columns2, ...columns3, ...columns6];
      break;
    case 30:
      columns.value = [...columns1, ...columns2, ...columns3, ...columns4, ...columns6];
      break;
    case 31:
      columns.value = [...columns1, ...columns2, ...columns3, ...columns4, ...columns5, ...columns6];
      break;

    default:
      break;
  }

  setTimeout(() => {
    showTable.value = true;
  }, 500);
}

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.tpmIntactRatioMtbfMttrId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listTpmIntactRatioMtbfMttrLByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;

      for (let index = 0; index < list.value.length; index++) {
        const element = list.value[index];
        const equipmentStatus = element.equipmentStatus.split(',');
        element.day1 = equipmentStatus[0];
        element.day2 = equipmentStatus[1];
        element.day3 = equipmentStatus[2];
        element.day4 = equipmentStatus[3];
        element.day5 = equipmentStatus[4];
        element.day6 = equipmentStatus[5];
        element.day7 = equipmentStatus[6];
        element.day8 = equipmentStatus[7];
        element.day9 = equipmentStatus[8];
        element.day10 = equipmentStatus[9];
        element.day11 = equipmentStatus[10];
        element.day12 = equipmentStatus[11];
        element.day13 = equipmentStatus[12];
        element.day14 = equipmentStatus[13];
        element.day15 = equipmentStatus[14];
        element.day16 = equipmentStatus[15];
        element.day17 = equipmentStatus[16];
        element.day18 = equipmentStatus[17];
        element.day19 = equipmentStatus[18];
        element.day20 = equipmentStatus[19];
        element.day21 = equipmentStatus[20];
        element.day22 = equipmentStatus[21];
        element.day23 = equipmentStatus[22];
        element.day24 = equipmentStatus[23];
        element.day25 = equipmentStatus[24];
        element.day26 = equipmentStatus[25];
        element.day27 = equipmentStatus[26];
        element.day28 = equipmentStatus[27];
        element.day29 = equipmentStatus[28];
        element.day30 = equipmentStatus[29];
        element.day31 = equipmentStatus[30];
      }

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
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 获取修改的数据 */
function getChangedData() {
  deletedData.value.forEach(item => {
    item['operationType_'] = 'delete';
  });
  const changedData = proxy.$getChangeRecords(list, initialList);
  return deletedData.value.concat(changedData);
}

/** 获取表格的数据 */
function getListData() {
  return list;
}

/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    tpmInventoryId: '',
    equipmentCode: '',
    equipmentName: '',
    equipmentStatusTotal: '',
    equipmentRunTime: '',
    repairTime: '',
    failureNumber: '',
    mtbf: '',
    mttr: '',
    monthMtbf: '',
    monthMttr: '',
    equipmentStatus: '',
    note: '',
    secretLevel: undefined,
    editable: true // true为编辑中, false为未编辑
  };
  const newData = [...list.value];
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
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}

/** 删除处理逻辑*/
function handleDelete(ids, e) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  let newData = [...list.value];
  let deletedItems = [];
  for (let i = 0; i < ids.length; i++) {
    if (ids[i].indexOf('newLine') == -1) {
      // 缓存删除的后台数据
      deletedItems.push(newData.find(item => item['id'] == ids[i]));
    }
    newData = newData.filter(item => item['id'] !== ids[i]);
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  selectedRows.value = [];
  // 前台刷新表格
  list.value = newData;
  deletedData.value = deletedData.value.concat(deletedItems);
}

/** 行点击事件 */
function customRow(record) {
  if (!props.readOnly) {
    return {
      onClick: () => {
        handleEdit(record);
      }
    };
  } else {
    return {
      onClick: () => {
        false;
      }
    };
  }
}
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/**控件变更事件 */
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, tpmIntactRatioMtbfMttrL);
    if (!flag) {
      break;
    }
  }
  return flag;
}
/** 校验并执行回调函数*/
function validate(callback) {
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && validateRecordData(changedData)) {
    // 校验通过
    if (callback) {
      callback(true);
    }
  } else {
    // 校验未通过
    if (callback) {
      callback(false);
    }
  }
}
defineExpose({
  validate,
  getChangedData,
  getListData
});
/** 导入 */
function handleImport() {
  excelParams.value.tpmIntactRatioMtbfMttrId = props.mainId;
  showImportModal.value = true;
}

/** 选择设备 */
function handleOpen(record) {
  open.value = true;
  currentRecord.value = record;
}

const handleCancel = () => {
  open.value = false;
};

const handleOk = () => {
  const info = tpmIntactRatioMtbfMttrLSelect.value.info;
  currentRecord.value.tpmInventoryId = info[0].id;
  currentRecord.value.equipmentCode = info[0].equipmentCode;
  currentRecord.value.equipmentName = info[0].equipmentName;
  open.value = false;
};

function calculateMTBFOrMTTR(record) {
  let equipmentRunTime = isNaN(parseFloat(record.equipmentRunTime)) ? 0 : parseFloat(record.equipmentRunTime);
  let repairTime = isNaN(parseFloat(record.repairTime)) ? 0 : parseFloat(record.repairTime);
  let failureNumber = isNaN(parseFloat(record.failureNumber)) ? 0 : parseFloat(record.failureNumber);
  let mtbf = equipmentRunTime / failureNumber;
  let mttr = repairTime / failureNumber;

  if (!isNaN(mtbf)) {
    record.monthMtbf = mtbf.toFixed(1).toString();
  }
  if (!isNaN(mttr)) {
    record.monthMttr = mttr.toFixed(1).toString();
  }

  form.value.reportDeptId = userInfo.deptId;
  const firstDayOfYear = new Date(new Date(props.reportDate).getFullYear(), 0, 1);
  form.value.reportDateBegin = dayjs(firstDayOfYear);
  const days = new Date(new Date(props.reportDate).getFullYear(), new Date(props.reportDate).getMonth() + 1, 0).getDate() + 1;
  form.value.reportDateEnd = dayjs(props.reportDate.toString() + "-" + days.toString());
  form.value.orgIdentity = userInfo.orgId;

  subForm.value.equipmentCode = record.equipmentCode;

  const postForm = proxy.$lodash.cloneDeep(form.value);
  const postSubForm = proxy.$lodash.cloneDeep(subForm.value);

  getSpecifyYearList(postForm, postSubForm)
    .then(res => {
      if (res.success) {
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          repairTime = repairTime + parseFloat(element.repairTime);
          equipmentRunTime = equipmentRunTime + parseFloat(element.equipmentRunTime);
          failureNumber = failureNumber + parseFloat(element.failureNumber);
        }

        mtbf = equipmentRunTime / failureNumber;
        mttr = repairTime / failureNumber;

        if (!isNaN(mtbf)) {
          record.mtbf = mtbf.toFixed(1).toString();
        }

        if (!isNaN(mttr)) {
          record.mttr = mttr.toFixed(1).toString();
        }
      }
    })
    .catch(() => {
    });
}

function calculateTotal(record) {

  let total = 0;
  for (let index = 0; index < currentMonth.value; index++) {
    switch (index) {
      case 0:
        record.day1 == '1' ? total++ : total = total;
        break;
      case 1:
        record.day2 == '1' ? total++ : total = total;
        break;
      case 2:
        record.day3 == '1' ? total++ : total = total;
        break;
      case 3:
        record.day4 == '1' ? total++ : total = total;
        break;
      case 4:
        record.day5 == '1' ? total++ : total = total;
        break;
      case 5:
        record.day6 == '1' ? total++ : total = total;
        break;
      case 6:
        record.day7 == '1' ? total++ : total = total;
        break;
      case 7:
        record.day8 == '1' ? total++ : total = total;
        break;
      case 8:
        record.day9 == '1' ? total++ : total = total;
        break;
      case 9:
        record.day10 == '1' ? total++ : total = total;
        break;
      case 10:
        record.day11 == '1' ? total++ : total = total;
        break;
      case 11:
        record.day12 == '1' ? total++ : total = total;
        break;
      case 12:
        record.day13 == '1' ? total++ : total = total;
        break;
      case 13:
        record.day14 == '1' ? total++ : total = total;
        break;
      case 14:
        record.day15 == '1' ? total++ : total = total;
        break;
      case 15:
        record.day16 == '1' ? total++ : total = total;
        break;
      case 16:
        record.day17 == '1' ? total++ : total = total;
        break;
      case 17:
        record.day18 == '1' ? total++ : total = total;
        break;
      case 18:
        record.day19 == '1' ? total++ : total = total;
        break;
      case 19:
        record.day20 == '1' ? total++ : total = total;
        break;
      case 20:
        record.day21 == '1' ? total++ : total = total;
        break;
      case 21:
        record.day22 == '1' ? total++ : total = total;
        break;
      case 22:
        record.day23 == '1' ? total++ : total = total;
        break;
      case 23:
        record.day24 == '1' ? total++ : total = total;
        break;
      case 24:
        record.day25 == '1' ? total++ : total = total;
        break;
      case 25:
        record.day26 == '1' ? total++ : total = total;
        break;
      case 26:
        record.day27 == '1' ? total++ : total = total;
        break;
      case 27:
        record.day28 == '1' ? total++ : total = total;
        break;
      case 28:
        record.day29 == '1' ? total++ : total = total;
        break;
      case 29:
        record.day30 == '1' ? total++ : total = total;
        break;
      case 30:
        record.day31 == '1' ? total++ : total = total;
        break;
      default:
        break;
    }

  }
  record.equipmentStatusTotal = total.toString();
  let equipmentStatus = [];
  equipmentStatus.push(record.day1);
  equipmentStatus.push(record.day2);
  equipmentStatus.push(record.day3);
  equipmentStatus.push(record.day4);
  equipmentStatus.push(record.day5);
  equipmentStatus.push(record.day6);
  equipmentStatus.push(record.day7);
  equipmentStatus.push(record.day8);
  equipmentStatus.push(record.day9);
  equipmentStatus.push(record.day10);
  equipmentStatus.push(record.day11);
  equipmentStatus.push(record.day12);
  equipmentStatus.push(record.day13);
  equipmentStatus.push(record.day14);
  equipmentStatus.push(record.day15);
  equipmentStatus.push(record.day16);
  equipmentStatus.push(record.day17);
  equipmentStatus.push(record.day18);
  equipmentStatus.push(record.day19);
  equipmentStatus.push(record.day20);
  equipmentStatus.push(record.day21);
  equipmentStatus.push(record.day22);
  equipmentStatus.push(record.day23);
  equipmentStatus.push(record.day24);
  equipmentStatus.push(record.day25);
  equipmentStatus.push(record.day26);
  equipmentStatus.push(record.day27);
  equipmentStatus.push(record.day28);
  equipmentStatus.push(record.day29);
  equipmentStatus.push(record.day30);
  equipmentStatus.push(record.day31);
  record.equipmentStatus = equipmentStatus.toString();

}

watch(
  () => props.reportDate,
  newV => {
    getTable();
  }
);
</script>



