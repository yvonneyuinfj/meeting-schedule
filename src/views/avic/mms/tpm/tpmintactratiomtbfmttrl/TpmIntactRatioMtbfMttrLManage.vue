<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
          <AvicTable v-if="showTable" ref="tpmIntactRatioMtbfMttrL" table-key="tpmIntactRatioMtbfMttrL" :columns="columns"
            :row-key="record => record.id" :data-source="list" :loading="loading" :pageParameter="queryParam.pageParameter"
            :total="totalPage" :row-selection="{
              selectedRowKeys: selectedRowKeys,
              columnWidth: 40,
              onChange: onSelectChange,
              fixed: true
            }" :customRow="record => {
  return {
    Click: () => {
      handleRowSelection(record);
    }
  }
}
" @change="handleTableChange" @refresh="getList">
            <template #toolBarLeft>
              <a-space>
                <!-- <a-button title="添加" type="primary" @click="handleAdd">
                  <template #icon>
                    <plus-outlined />
                  </template>
                  添加
                </a-button> -->
                <a-button danger :type="selectedRowKeys.length == 0 ? 'default' : 'primary'" title="删除" :loading="delLoading"
                  @click="handleDelete(selectedRowKeys, '')">
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
                <a-button title="导入" type="primary" ghost @click="handleImport">
                  <template #icon>
                    <import-outlined />
                  </template>
                  导入
                </a-button>
              </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search class="opt-btn-commonsearch" style="width: 200px" placeholder="请输入设备编号或设备名称" :allow-clear="true"
                @search="handleKeyWordQuery" />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id' && index + 1 < list.length">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'title'">
                {{ record.title }}
              </template>
              <template v-if="column.dataIndex === 'action'">
                <a-button type="link" class="inner-btn" @click="handleDelete([record.id], 'row')">
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
        <!-- 添加页面弹窗 -->
        <TpmIntactRatioMtbfMttrLAdd v-if="showAddModal" ref="addModal" :mainId="mainId" @reloadData="getList"
          @close="showAddModal = false" />
        <!-- 编辑页面弹窗 -->
        <TpmIntactRatioMtbfMttrLEdit v-if="showEditModal" ref="editModal" :mainId="mainId" :form-id="formId"
          @reloadData="getList" @close="showEditModal = false" />
        <AvicExcelImport v-if="showImportModal" :formData="excelParams" title="单表模板导入"
          importUrl="/mms/tpm/tpmintactratiomtbfmttrls/importData/v1"
          downloadTemplateUrl="/mms/tpm/tpmintactratiomtbfmttrls/downloadTemplate/v1" @reloadData="getList"
          @close="showImportModal = false" />
      </div>
</template>
<script lang="ts" setup>
//import { delTpmIntactRatioMtbfMttr } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrApi';
import { delTpmIntactRatioMtbfMttrL, listTpmIntactRatioMtbfMttrLByPage } from '@/api/avic/mms/tpm/TpmIntactRatioMtbfMttrLApi';
import dayjs from 'dayjs'; // 引入模块API
import TpmIntactRatioMtbfMttrLAdd from './TpmIntactRatioMtbfMttrLAdd.vue'; // 引入添加页面组件
import TpmIntactRatioMtbfMttrLEdit from './TpmIntactRatioMtbfMttrLEdit.vue'; // 引入编辑页面组件
import { $ } from 'dom7';
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const formId = ref(''); // 当前行数据id
const excelParams = ref({ tableName: 'tpmIntactRatioMtbfMttrL', tpmIntactRatioMtbfMttrId: '' });
const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  reportDate: {
    type: String,
    default: ''
  }
});
/** 添加 */
function handleAdd() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 导入 */
function handleImport() {
  if (props.mainId == '') {
    proxy.$message.warning('请选择一条主数据');
    return;
  }
  excelParams.value.tpmIntactRatioMtbfMttrId = props.mainId;
  showImportModal.value = true;
}
/* 子表删除 */
function handleDelete(ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delTpmIntactRatioMtbfMttrL(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          delLoading.value = false;
        })
        .catch(() => {
          delLoading.value = false;
        });
    }
  });
}
let columns = ref([]);
const columns1 = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'center',
    customRender: ({ index }) => {
      if (index === list.value.length - 1) {
        return {
          props: {
            colSpan: 3
          }
        };
      }
    }
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const columns2 = [
  {
    title: '1日',
    dataIndex: 'day1',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '2日',
    dataIndex: 'day2',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '3日',
    dataIndex: 'day3',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '4日',
    dataIndex: 'day4',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '5日',
    dataIndex: 'day5',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '6日',
    dataIndex: 'day6',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '7日',
    dataIndex: 'day7',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '8日',
    dataIndex: 'day8',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '9日',
    dataIndex: 'day9',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '10日',
    dataIndex: 'day10',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '11日',
    dataIndex: 'day11',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '12日',
    dataIndex: 'day12',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '13日',
    dataIndex: 'day13',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '14日',
    dataIndex: 'day14',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '15日',
    dataIndex: 'day15',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '16日',
    dataIndex: 'day16',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '17日',
    dataIndex: 'day17',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '18日',
    dataIndex: 'day18',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '19日',
    dataIndex: 'day19',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '20日',
    dataIndex: 'day20',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '21日',
    dataIndex: 'day21',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '22日',
    dataIndex: 'day22',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '23日',
    dataIndex: 'day23',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '24日',
    dataIndex: 'day24',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '25日',
    dataIndex: 'day25',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '26日',
    dataIndex: 'day26',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '27日',
    dataIndex: 'day27',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '28日',
    dataIndex: 'day28',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const columns3 = [
  {
    title: '29日',
    dataIndex: 'day29',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const columns4 = [
  {
    title: '30日',
    dataIndex: 'day30',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const columns5 = [
  {
    title: '31日',
    dataIndex: 'day31',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
] as any[];
const columns6 = [
  {
    title: '合计',
    dataIndex: 'equipmentStatusTotal',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备运行时间（h）',
    dataIndex: 'equipmentRunTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备故障修复时间（h）',
    dataIndex: 'repairTime',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '设备故障次数',
    dataIndex: 'failureNumber',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: 'MTBF',
    dataIndex: 'mtbf',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: 'MTTR',
    dataIndex: 'mttr',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  }
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   ellipsis: true,
  //   sorter: true,
  //   minWidth: 120,
  //   resizable: true,
  //   align: 'center'
  // }
] as any[];
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    tpmIntactRatioMtbfMttrId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const list = ref([]); // 表格数据集合
const selectedRows = ref([]); // 选中行集合
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const showTable = ref<boolean>(true);
const reportDate = ref(dayjs(new Date()));
// 非只读状态添加操作列
// if (props.mainId) {
//   columns.value.push({
//     title: '操作',
//     dataIndex: 'action',
//     key: 'action',
//     width: 120,
//     fixed: 'right',
//     align: 'center'
//   });
// }


onMounted(() => {
  columns.value = [...columns1, ...columns6];
  // 加载表格数据
  getList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

function getTable() {
  showTable.value = false;
  switch (reportDate.value.daysInMonth()) {
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
      columns.value = [...columns1, ...columns6];
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
  queryParam.searchParams.tpmIntactRatioMtbfMttrId = props.mainId ? props.mainId : '-1';
  listTpmIntactRatioMtbfMttrLByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;

      let arr = [];
      for (let i = 0; i < reportDate.value.daysInMonth(); i++) {
        arr.push(0);
      }

      for (let index = 0; index < list.value.length; index++) {
        const element = list.value[index];
        const equipmentStatus = element.equipmentStatus.split(',');

        for (let i = 0; i < equipmentStatus.length; i++) {
          const status = equipmentStatus[i];
          arr[i] = parseFloat(arr[i]) + parseFloat(status);
        }

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

      list.value.push({
        id: '日完好设备合计',
        day1: arr[0],
        day2: arr[1],
        day3: arr[2],
        day4: arr[3],
        day5: arr[4],
        day6: arr[5],
        day7: arr[6],
        day8: arr[7],
        day9: arr[8],
        day10: arr[9],
        day11: arr[10],
        day12: arr[11],
        day13: arr[12],
        day14: arr[13],
        day15: arr[14],
        day16: arr[15],
        day17: arr[16],
        day18: arr[17],
        day19: arr[18],
        day20: arr[19],
        day21: arr[20],
        day22: arr[21],
        day23: arr[22],
        day24: arr[23],
        day25: arr[24],
        day26: arr[25],
        day27: arr[26],
        day28: arr[27],
        day29: arr[28],
        day30: arr[29],
        day31: arr[30]
      });
      loading.value = false;
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

/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = { equipmentCode: value, equipmentName: value };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}

/** 子表删除 */
// function handleDelete(ids, type) {
//   if (ids.length == 0) {
//     proxy.$message.warning('请选择要删除的数据！');
//     return;
//   }
//   proxy.$confirm({
//     title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
//     okText: '确定',
//     cancelText: '取消',
//     onOk: () => {
//       delLoading.value = true;
//       delTpmIntactRatioMtbfMttrL(ids)
//         .then(res => {
//           if (res.success) {
//             proxy.$message.success('删除成功！');
//             // 清空选中
//             selectedRowKeys.value = [];
//             selectedRows.value = [];
//             getList();
//           }
//           delLoading.value = false;
//         })
//         .catch(() => {
//           delLoading.value = false;
//         });
//     }
//   });
// }
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

/** 表格行选中 */
function handleRowSelection(record) {
  let selectIds = [...selectedRowKeys.value];
  // 多选
  if (!selectIds.includes(record.id)) {
    // 选中
    selectedRowKeys.value.push(record.id);
  } else {
    // 取消选中
    selectedRowKeys.value = selectedRowKeys.value.filter(item => item != record.id);
  }
}

watch(
  () => props.mainId,
  newVal => {
    if (newVal) {
      reportDate.value = dayjs(props.reportDate);
      getTable();
      getList(); // 查询表格数据
    } else {
      selectedRowKeys.value = []; // 清空选中
      selectedRows.value = [];
      list.value = [];
      totalPage.value = 0;
    }
  },
  { immediate: true }
);
defineExpose({
  list
})
</script>

