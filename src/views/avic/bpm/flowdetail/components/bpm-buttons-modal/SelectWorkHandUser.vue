<template>
  <AvicModal
    :visible="selectWorkHandUserVisible"
    title="选择流程委托处理人"
    width="720px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <template v-slot:footer>
      <a-button @click="closeModal">取消</a-button>
      <a-button type="primary" :loading="modalLoading" @click="save">确定</a-button>
    </template>
    <div class="table-wrapper">
      <AvicTable
        ref="tableRefName"
        :columns="selectColumns"
        :show-table-setting="false"
        :row-key="record => record.beginUserId"
        :data-source="tableData"
        :pagination="false"
        :row-selection="{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 40,
          fixed: true
        }"
      >
        <!-- 点击查看详情 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'beginUserName'">
            <a-tooltip placement="topLeft">
              <template #title>
                选中后【{{ record.beginUserName }}】待办工作将委托给【{{ record.endUserName }}】
              </template>
              {{ record.beginUserName }}
            </a-tooltip>
          </template>
        </template>
      </AvicTable>
    </div>
  </AvicModal>
</template>
<script>
import { Button, Tooltip } from 'ant-design-vue';
import request from '@/utils/request';

// 表格主键字段
let selectColumns = [
  {
    title: '委托人',
    dataIndex: 'beginUserName',
    align: 'center',
    key: 'beginUserName'
  },
  {
    title: '委托人部门',
    align: 'center',
    dataIndex: 'beginDeptName'
  },
  {
    title: '受托人',
    align: 'center',
    dataIndex: 'endUserName'
  },
  {
    title: '受托人部门',
    align: 'center',
    dataIndex: 'endDeptName'
  }
];
export default {
  name: 'SelectWorkHandUser',
  components: {
    AButton: Button,
    ATooltip: Tooltip
  },
  props: {
    userList: {
      type: Array,
      required: true
    },
    processKey: {
      type: String,
      required: true
    },
    bpmInstanceObject: {
      type: Object
    }
  },
  data() {
    return {
      selectWorkHandUserVisible: false, // 弹窗modal显隐
      // modalWidthAndHeight: modalWidthAndHeight(1280, 540, 98), // 弹窗modal宽高控制
      modalLoading: false, // 弹窗确定按钮loading状态
      tableRefName: 'SelectWorkHandUserTable', // 表格ref名称
      selectColumns,
      tableData: [],
      selectedRowKeys: []
    };
  },
  methods: {
    /**
     * 点击返回、点击X关闭事件
     */
    closeModal() {
      this.bpmInstanceObject.bpmSelectWorkHandUser.closeSelectWorkHandUserModal(
        this.bpmInstanceObject
      );
      this.$emit('closeSelectWorkHandUserList');
      this.selectWorkHandUserVisible = false;
    },
    /**
     * 重写获取表格数据
     */
    getData(obj) {
      if (obj.data && obj.data.length > 0) {
        this.tableData = obj.data; // 渲染表格
      } else {
        this.tableData = [];
      }
      if (this.tableData.length == 0) {
        this.$emit('getSelectWorkHandUserList', []);
      } else {
        this.selectWorkHandUserVisible = true;
      }
    },
    /**
     * 保存
     */
    save() {
      let selectWorkHandUserList = this.tableData.filter(item => {
        return this.selectedRowKeys.includes(item.beginUserId);
      });
      this.$emit('getSelectWorkHandUserList', selectWorkHandUserList);
      this.selectWorkHandUserVisible = false;
    },

    //加载数据
    loadWorkHandUserData(processKey, selectWorkHand) {
      let postData = {
        userList: JSON.stringify(selectWorkHand),
        processKey
      };
      let that = this;
      request({ url: this.queryParam.url, data: postData, method: this.queryParam.method })
        .then(res => {
          if (res.success) {
            if (res.data) {
              if (that.pagination) {
                let pagination = { ...that.pagination };
                if (res.data.pageParameter) {
                  pagination.current = res.data.pageParameter.page;
                  pagination.total = res.data.pageParameter.totalCount;
                } else {
                  if (
                    res.data.page !== null &&
                    res.data.page !== undefined &&
                    res.data.page !== ''
                  ) {
                    pagination.current = res.data.page;
                  }
                  if (
                    res.data.records !== null &&
                    res.data.records !== undefined &&
                    res.data.records !== ''
                  ) {
                    pagination.total = res.data.records;
                  } else if (
                    res.data.total !== null &&
                    res.data.total !== undefined &&
                    res.data.total !== ''
                  ) {
                    pagination.total = res.data.total;
                  }
                }
                that.pagination = pagination;
              }
            }
            that.loading = false;
            that.tableData = res.data;
            //判断是否有数据需要委托,如果有打开委托页面,如果没有提交表单
            if (that.tableData && that.tableData.length > 0) {
              that.selectWorkHandUserVisible = true;
              this.$nextTick(() => {
                let selectRowkeys = [];
                this.tableData.map(item => {
                  selectRowkeys.push(item[this.rowKey]);
                });
                this.selectedRowKeys = selectRowkeys;
                this.$refs[this.tableRefName].changeSelectedRowKeys(selectRowkeys);
              });
            } else {
              that.$emit('getSelectWorkHandUserList', []);
            }
          } else {
            that.loading = false;
          }
        })
        .catch(() => {
          that.loading = false;
        });
    },
    /** 勾选复选框时触发 */
    onSelectChange(rowKeys) {
      this.selectedRowKeys = rowKeys;
    }
  },
  computed: {
    queryParam() {
      // 表格数据请求参数
      return {
        url: '/bpm/bpmActor/bpmSelectUserAction2/getWorkHandUsers/v1',
        parameter: {
          userList: JSON.stringify(this.userList),
          processKey: this.processKey
        },
        method: 'post'
      };
    }
  },
  watch: {
    /**
     * 监听是否显示
     */
    'bpmInstanceObject.bpmSelectWorkHandUser.selectWorkHandUserVisible': {
      handler(selectWorkHandUserVisible) {
        this.selectWorkHandUserVisible = selectWorkHandUserVisible;
      }
    }
  }
};
</script>
