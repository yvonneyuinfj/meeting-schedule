<template>
  <AvicSplit horizontal>
    <AvicPane size="100">
      <div class="content-wrapper">
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
            ref="tpmMaintainReminder"
            table-key="tpmMaintainReminder"
            :columns="columns"
            :row-key="record => record.id"
            :data-source="list"
            :loading="loading"
            :pageParameter="queryParam.pageParameter"
            :total="totalPage"
            @refresh="getList"
            :custom-row="customRow"
          >
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'id'">
                {{
                  index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1)
                }}
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { TpmMaintainReminderDto } from '@/api/avic/mms/tpm/TpmMaintainReminderApi.js'; // 引入模块DTO
import { listTpmStandardByPage } from '@/api/avic/mms/tpm/TpmMaintainReminderApi.js'; // 引入模块API
import dayjs from 'dayjs';

const { proxy } = getCurrentInstance();
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center'
  },
  {
    title: '计划保养日期',
    dataIndex: 'planMaintenDate',
    ellipsis: true,
    sorter: false,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '上次保养日期',
    dataIndex: 'lastMaintenDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentCode',
    ellipsis: true,
    sorter: false,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
    ellipsis: true,
    sorter: false,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养项目',
    dataIndex: 'maintenanceItems',
    ellipsis: true,
    sorter: false,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养部位',
    dataIndex: 'maintenancePosition',
    ellipsis: true,
    sorter: false,
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
    align: 'center'
  },
  {
    title: '小时数',
    dataIndex: 'maintenanceHours',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    ellipsis: true,
    sorter: false,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '保养负责人',
    dataIndex: 'techUserIdAlias',
    ellipsis: true,
    sorter: false,
    minWidth: 120,
    resizable: true,
    align: 'center'
  }
];
const queryForm = ref<TpmMaintainReminderDto>({
  useDeptId: proxy.$getLoginUser().entityDeptId
});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: queryForm,
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const list = ref([]); // 表格数据集合
const loading = ref(false);
const totalPage = ref(0);

onMounted(() => {
  // 加载表格数据
  getList();
});

/** 查询数据  */
function getList() {
  loading.value = true;
  listTpmStandardByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}

const customRow = (record, index) => {
  const newDate = dayjs(new Date());
  const timeDifference = newDate.diff(record.planMaintenDate, 'day');
  if (timeDifference >= 7) {
    // return { style: { background: 'salmon',color:'azure' } };
    return { style: { background: `rgba(${231}, ${78}, ${85}, ${0.7})`,color:'#fff' } };
  } else {
    return {};
  }
};
</script>
