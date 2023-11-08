<template>
  <AvicModal
    :visible="showModal"
    class="relative-process-modal"
    :title="modalTitle"
    :body-style="{ padding: '0' }"
    :footer="null"
    width="960px"
    height="580px"
    @cancel="closeModal"
  >
    <div class="table-wrapper">
      <AvicTable
        ref="avicTable"
        :columns="columns"
        :row-key="record => record.dbId"
        :data-source="processList"
        :loading="loading"
        :pagination="false"
        :row-selection="{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          fixed: true
        }"
        :showTableSetting="false"
      >
        <template class="toolBarLeft" style="flex: 1" #toolBarLeft>
          <a-space>
            <a-button type="primary" title="添加" @click="handleAdd">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys)"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
          </a-space>
        </template>
        <template class="toolBarRight" style="text-align: right" #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入相关流程名称"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a href="javascript:;" class="table-detail-link" @click.stop="toFlowDetail(record)">
              {{ record.title || record.name }}
            </a>
          </template>
        </template>
      </AvicTable>
    </div>
    <relation-process-modal
      v-if="showRelationProcessModal"
      :procinst-dbid="procinstDbid"
      @close="showRelationProcessModal = false"
      @saveSuccess="saveRelationProcessSuccess"
    />
    <avic-bpm-detail-list />
  </AvicModal>
</template>

<script lang="ts">
export default defineComponent({
  name: 'RelativeProcessList',
  components: {
    RelationProcessModal,
    AvicBpmDetailList
  }
});
</script>

<script lang="ts" setup>
import { httpAction } from '@/api/avic/bpm/FlowUtilApi'; //引入模块Action
import RelationProcessModal from './RelationProcessModal.vue'; //引入流程详情页Model框组件
import AvicBpmDetailList from '../../bpm-detail-list'; //引入流程详情页组件
import bpmUtils from '../../../../bpmutils/FlowUtils'; //引入流程相关配置及方法
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';

const columns = ref<any>([
  {
    title: '关联流程名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    scopedSlots: { customRender: 'name' },
    width: '20%'
  },
  {
    title: '申请时间',
    dataIndex: 'time',
    align: 'center',
    width: 170,
    customRender: obj => {
      return obj.text ? proxy.$dateFormat(obj.text) : '';
    }
  },
  {
    title: '状态',
    ellipsis: true,
    align: 'center',
    dataIndex: 'businessState',
    customRender: obj => {
      if (obj.text == 'active') {
        return '流转中';
      } else if (obj.text == 'ended') {
        return '已完成';
      } else if (obj.text == 'start') {
        return '拟稿中';
      } else {
        return obj.text;
      }
    }
  },
  {
    title: '处理人',
    align: 'center',
    dataIndex: 'assigneeName'
  },
  {
    title: '维护人',
    align: 'center',
    dataIndex: 'attribute01'
  },
  {
    title: '维护时间',
    align: 'center',
    dataIndex: 'attribute02',
    width: '20%'
  }
]);
const modalTitle = ref<string>('相关流程'); //弹框标题
const showModal = ref<boolean>(true); //是否展示弹窗
const showRelationProcessModal = ref<boolean>(false); //是否展示添加相关流程弹窗
const loadingProcess = ref<boolean>(true); //是否获取表格数据
const delLoading = ref<boolean>(false); //是否删除数据
const keyword = ref<string>(''); //获取表格数据字段
const processList = ref([]); //表格数据源
const selectedRowKeys = ref([]); //选中数据主键集合
const loading = ref<boolean>(false); // 表格loading状态
const props = defineProps(['procinstDbid']);
const { proxy } = getCurrentInstance();
const emit = defineEmits(['close']);
const httpConfig = {
  getRelativeProcess: {
    url: bpmUtils.baseurl + '/business/related/relatedData/v1',
    method: 'post'
  },
  saveRelativeProcess: {
    url: bpmUtils.baseurl + '/business/related/relatedSaveData/v1',
    method: 'post'
  },
  deleteRelativeProcess: {
    url: bpmUtils.baseurl + '/business/related/relatedDelData/v1',
    method: 'post'
  }
};

onMounted(() => {
  loadData();
});
const isShowDelete = computed(() => {
  return selectedRowKeys.value.length > 0;
});
/** 获取表格数据 */
function loadData() {
  loadingProcess.value = true;
  selectedRowKeys.value = [];
  let param = { data: keyword.value, pid: props.procinstDbid };
  httpAction(httpConfig.getRelativeProcess.url, param, httpConfig.getRelativeProcess.method)
    .then((response: any) => {
      if (response.success) {
        processList.value = response.data.rows;
      }
    })
    .finally(() => {
      loadingProcess.value = false;
    })
    .catch(() => {});
}
/** 点击添加按钮打开添加相关流程模态框 */
function handleAdd() {
  showRelationProcessModal.value = true;
}
/** 添加流程 */
function saveRelationProcessSuccess() {
  showRelationProcessModal.value = false;
  proxy.$message.success('添加相关流程成功');
  loadData();
}
/** 删除数据 */
function handleDelete(ids) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: '确认要删除选择的数据吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      let param = {
        ids: selectedRowKeys.value.toString()
      };
      httpAction(
        httpConfig.deleteRelativeProcess.url,
        param,
        httpConfig.deleteRelativeProcess.method
      )
        .then((res: any) => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            loadData();
          }
          delLoading.value = false;
        })
        .catch(() => {
          delLoading.value = false;
          loadData();
        });
    }
  });
}
/** 勾选复选框时触发 */
function onSelectChange(_selectedRowKeys: string[]) {
  selectedRowKeys.value = _selectedRowKeys;
}
/** 快速查询 */
function handleKeyWordQuery(value: string) {
  keyword.value = value;
  loadData();
}
/** 关闭模态框 */
function closeModal() {
  emit('close');
}
/** 跳转流程详情页 */
function toFlowDetail(row) {
  if (row.entryId2) {
    flowUtils
      .detailByOptions({
        formId: row.entryId2
      })
      .catch(() => {
        proxy.$message.error('打开流程详情失败!');
      });
  }
}
</script>

<style lang="less">
.relative-process-modal {
  .modal-action {
    width: 100%;
    height: 40px;

    .action-buttons {
      float: left;
      .action-button {
        margin-right: 12px;
      }
    }
    .action-search {
      float: right;
    }
  }
  .modal-content {
    .ant-table-header {
      overflow: hidden;
    }
  }
}
</style>
