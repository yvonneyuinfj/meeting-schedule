<template>
  <div class="content-wrapper">
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="portletConfig"
        table-key="portletConfig"
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
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
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
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
          </a-space>
        </template>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'id'">
            {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" class="inner-btn" @click="handleEdit(record.id)">编辑</a-button>
            <a-button type="link" class="inner-btn" @click="handleSettingOrView(record, 'setting')">
              设计
            </a-button>
            <a-button type="link" class="inner-btn" @click="handleSettingOrView(record, 'view')">
              预览
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
    <!-- 添加页面弹窗 -->
    <PortletConfigAdd
      v-if="showAddModal"
      ref="addModal"
      @openDesignModal="openDesignModal"
      @reloadData="getList"
      @close="showAddModal = false"
    />
    <!-- 编辑页面弹窗 -->
    <PortletConfigEdit
      v-if="showEditModal"
      ref="editModal"
      :form-id="formId"
      @reloadData="getList"
      @close="showEditModal = false"
    />
    <portal-designer-modal
      v-if="showDesignerModal"
      ref="portalDesignRefName"
      :portalInfo="portalInfo"
      @closeModal="handeleCloseDesigner"
      @updatePortalList="getList"
      @reloadData="getList"
    />
    <AvicModal
      title="预览"
      :visible="previewVisible"
      :fullScreen="true"
      :adjustSize="false"
      :body-style="{ background: '#F1F3F9' }"
      :footer="null"
      @cancel="previewVisible = false"
    >
      <generate-portal v-if="previewVisible" :data="designContent" :preview="true" />
    </AvicModal>
  </div>
</template>
<script lang="ts" setup>
import {
  listDemoSingleByPage,
  getPortletContentById,
  delPortletConfig
} from '@/api/avic/system/PortalApi';
import PortletConfigAdd from './PortletConfigAdd.vue'; // 引入添加页面组件
import PortletConfigEdit from './PortletConfigEdit.vue'; // 引入添加页面组件
import PortalDesignerModal from '@/components/portal-designer/PortalDesignModal.vue';
import GeneratePortal from '@/components/portal-designer/components/GeneratePortal.vue';
const { proxy } = getCurrentInstance();
const columns = [
  {
    title: '编码',
    dataIndex: 'portletCode',
    ellipsis: true,
    width: 220,
    align: 'left',
    fixed: 'left'
  },
  {
    title: '名称',
    dataIndex: 'portletName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    sorter: true
  },
  {
    title: '是否默认',
    dataIndex: 'isDefault',
    ellipsis: true,
    minWidth: 100,
    align: 'center',
    resizable: true,
    customRender: ({ text }) => {
      if (text && text === '1') {
        return '是';
      } else if (text && text === '0') {
        return '否';
      }
    }
  },
  {
    title: '应用范围类型',
    dataIndex: 'resourceType',
    ellipsis: true,
    minWidth: 100,
    resizable: true,
    align: 'center',
    customRender: ({ text }) => {
      if (text && text === '0') {
        return '系统默认';
      } else if (text && text === '1') {
        return '角色定义';
      } else if (text && text === '2') {
        return '用户自定义';
      }
    }
  },
  {
    title: '描述',
    dataIndex: 'memo',
    ellipsis: true,
    minWidth: 120,
    resizable: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 200,
    align: 'center',
    fixed: 'right'
  }
];
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
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDesignerModal = ref(false);
const previewVisible = ref(false);
const designContent = ref();
const portalInfo = ref();
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const demoRadioList = ref([]); // 单选通用代码
const demoRadioButtonList = ref([]); // 单选按钮组通用代码
const demoSelectList = ref([]); // 下拉通用代码
const lookupParams = [
  { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
  { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' },
  { fieldName: 'demoSwitch', lookUpType: 'PLATFORM_SKIN_STATE' }
];
onMounted(async () => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  loading.value = true;
  listDemoSingleByPage(queryParam)
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
/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    demoRadioList.value = result.demoRadio;
    demoRadioButtonList.value = result.demoRadioButton;
    demoSelectList.value = result.demoSelect;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 添加 */
function handleAdd() {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit(id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 删除 */
function handleDelete(ids, type) {
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
      delPortletConfig(ids.join(','))
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
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
/** 勾选复选框时触发 */
function onSelectChange(rowKeys) {
  selectedRowKeys.value = rowKeys;
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
function handeleCloseDesigner() {
  showDesignerModal.value = false;
}
function openDesignModal(data) {
  showDesignerModal.value = true;
  portalInfo.value = data;
  portalInfo.value.setting = true;
}
/**根据portlet id 获取content内容**/
function handleSettingOrView(record, flag) {
  if (!record.id) return;
  getPortletContentById(record.id).then(res => {
    if (res.data) {
      const result = {
        ...res,
        content: JSON.parse(res.data.content),
        ...record
      };
      portalInfo.value = result;
      portalInfo.value.setting = true;
      designContent.value = JSON.parse(res.data.content);
      if (designContent.value == null) {
        designContent.value = {
          config: {
            gutter: '15px',
            labelPosition: 'right',
            labelWidth: 100,
            size: 'small'
          },
          list: []
        };
      }
      if (flag == 'setting') {
        showDesignerModal.value = true;
      } else {
        previewVisible.value = true;
      }
    }
  });
}
</script>
