<!--
  批示 ，已阅
-->
<template>
  <div class="container-box">
    <div class="container-right-top">
      已选用户({{ selectList.length }})
      <delete-outlined class="total-delete-icon" title="清空" @click="handleDelSelectedTotal" />
    </div>
    <div class="checkgroup">
      <s-table
        ref="tableRefName"
        :showHeader="false"
        :showTableSetting="false"
        :columns="selectListColumns"
        :data-source="selectList"
        :row-key="record => record.id"
        :pagination="false"
        :row-height="32"
        :height="310"
        :rowDrag="true"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'title'">
            <div style="display: flex; align-items: center">
              <span class="user-icon">
                <avic-icon svg="avic-account-circle-fill" color="#3370ff" />
              </span>
              <span class="cell-txt">
                <span>{{ text }}</span>
                <span
                  v-if="record['deptName'] != null"
                  class="cell-txt-dept"
                  :title="record['deptName']"
                >
                  （{{ record['deptName'] }}）
                </span>
                <span
                  v-if="
                    (record['deptName'] == null || record['deptName'] == undefined) &&
                    record['attributes']['deptName'] != null
                  "
                  class="cell-txt-dept"
                  :title="record['attributes']['deptName']"
                >
                  （{{ record['attributes']['deptName'] }}）
                </span>
              </span>
              <div
                class="checkclose"
                title="取消已选"
                @click="handleDelSelectedItem($event, record)"
              >
                <avic-icon svg="avic-close-fill" style="font-size: 1.3em" />
              </div>
            </div>
          </template>
        </template>
      </s-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectUserBox',
  components: {
    // AIcon: Icon,
    // plusIcon
  },
  props: {
    userBoxList: {
      type: Array,
      default: () => []
    },
    selectFlowTab: {
      type: [Number, String],
      required: false, //校验
      default: 0
    }
  },
  data() {
    return {
      selectUser: [],
      selectList: [], //保存表格数据列表
      select: null, //单选选中的人
      tableRefName: 'tableRefName',
      selectListColumns: [
        {
          title: '已选用户',
          headerAlign: 'left',
          dataIndex: 'title',
          key: 'title',
          rowDrag: true
        }
      ],
      dataIndex: 'title',
      indeterminate: false, // 右侧区域已选用户复选框半选状态
      checkAll: false, // 右侧区域已选用户复选框全选状态
      errorMessage: '暂无数据'
    };
  },
  mounted() {
    // this.$dragging.$on('dragged', ({ value }) => {});
  },
  watch: {
    selectList: {
      immediate: true,
      handler(newV) {
        this.selectListColumns[0].title = `已选用户 (${newV?.length || 0})`;
      }
    }
  },
  methods: {
    getUserData(data) {
      // console.log('getUserData = ',data)
      this.selectUser = data;
      // let selectUserFlag = [];

      let selectUserObjs = [];

      this.selectUser?.map(tim => {
        if (tim.selectFlowTab == this.selectFlowTab) {
          selectUserObjs.push(tim.users);
        }
      });

      this.selectList = selectUserObjs[0];
    },
    handleDelSelectedTotal() {
      /*let selectedNum = 0;
      let selectedData = [];
      let unselectedData = [];
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].bigTableDataChecked) {
          selectedNum++;
          selectedData.push(this.selectList[i]);
        } else {
          unselectedData.push(this.selectList[i]);
        }
      }
      if (selectedNum == 0) {
        this.$message.warning('请选择要删除的数据！');
        return;
      } else {
        this.selectList = unselectedData;
        this.deleteUser(unselectedData);
        this.$refs[this.tableRefName].bigDataTableLoadData(this.selectList);
      }*/
      this.selectList = [];
      this.deleteUser(this.selectList);
    },
    handleRowSelection({ selectedRowKeys, selectedRows, record, isSelected, isFromCheckboxAll }) {
      let select = this.selectList;
      select.map(item => {
        if (selectedRowKeys.includes(item.id)) {
          item.bigTableDataChecked = true;
        } else {
          item.bigTableDataChecked = false;
        }
      });
      this.selectList = select;
    },
    handleDelSelectedItem(e, item) {
      e.stopPropagation();
      let selectList = [];
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].id != item.id) {
          selectList.push(this.selectList[i]);
        }
      }
      this.selectList = selectList;
      this.deleteUser(selectList);
    },
    rowDrop(tableData) {
      console.log(tableData, 'tableData');
      if (tableData) {
        this.selectList = tableData;
        // 【7560】选人框中通过拖动改变的处理顺序不生效
        this.selectUser.map(tim => {
          if (tim.selectFlowTab == this.selectFlowTab) {
            tim.users = JSON.parse(JSON.stringify(this.selectList));
          }
        });
        this.$emit('changeSelectUser', this.selectUser);
      }
    },

    //获取数组下标
    getIndex(all, id) {
      let index = -1;
      all.map((tim, i) => {
        if (tim.id == id) {
          index = i;
        }
      });
      return index;
    },
    changeSelectUser(e) {
      this.selectUser = e;
      this.selectUser.map(tim => {
        if (tim.selectFlowTab == this.selectFlowTab) {
          this.selectList = tim.users;
        }
      });
    },
    //排序
    sorting(arr, k, j) {
      arr.splice(k, 1, ...arr.splice(j, 1, arr[k]));
    },
    //选中人员
    clickSelect(tim) {
      if (this.select && this.select.id == tim.id) {
        this.select = null;
      } else {
        this.select = tim;
      }
    },
    //删除单项
    deleteUser(itemList) {
      if (this.selectUser) {
        this.selectUser.map((tim, i) => {
          if (this.selectFlowTab == i) {
            tim.users = [...itemList];
          }
        });
        this.$emit('changeSelectUser', this.selectUser);
      }
    }
  }
};
</script>
<style scoped lang="less">
:deep(.surely-table-body) {
  position: initial;
  overflow-x: hidden;
}
</style>
