<template>
  <div class="flow-track">
    <div v-show="currentTab == 'list'" class="flow-list">
      <!-- <avic-big-table
        :ref="bigTableRefName"
        :is-big-data-table="true"
        :sync-resize="currentTab"
        :resizable="true"
        :default-col-width="120"
        :is-row-selection="false"
        :columns="tableColumns"
        :style="{ height: '300px', maxHeight: '400px', marginTop: '20px' }"
        :row-key="rowKey"
        :is-add-order-number="false"
        :pagination-default="false"
        :virtual-scroll-y="{ gt: 100 }"
      /> -->
      <AvicTable ref="bigTableRefName" :columns="tableColumns" :row-key="record => record.id" />
      <avic-error-card v-if="tableError" :error-message="tableError" />
    </div>
    <div v-show="currentTab == 'tracking'" class="flow-list">
      <div v-if="!timelineError || data.timelist">
        <div v-for="(tab, i) in data.timelist" :key="i" class="timeline-box">
          <a-timeline>
            <a-timeline-item v-for="(item, g) in tab" :key="g">
              <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
              <div class="flow-list-item">
                <a-col :span="3" style="display: flex; flex-flow: row">
                  <span class="default-box">
                    {{ tab[0].dayName }}&nbsp;&nbsp;{{ item.timeName }}
                  </span>
                </a-col>
                <a-col :span="20" style="display: flex; flex-flow: row">
                  <div class="divder-box" />
                  <div>
                    <span class="text-box">{{ item.operateUserName }}</span>
                    <span class="default-box">在</span>
                    <span class="text-box">{{ item.currentActiveLabel }}</span>
                    <span class="default-box">节点进行了</span>
                    <span class="text-box">{{ item.opType }}</span>
                    <span class="default-box">操作</span>
                    <span v-if="item.targetuser">
                      <span class="default-box">,接收人是</span>
                      <span class="text-box">{{ item.targetuser }}</span>
                    </span>
                    <div v-if="item.message" class="describe-box">
                      <avic-icon svg="avic-edit-line" />
                      {{ item.message }}
                    </div>
                  </div>
                </a-col>
              </div>
            </a-timeline-item>
          </a-timeline>
        </div>
      </div>
      <a-empty v-if="!data.timelist || data.timelist.length == 0" :image="simpleImage" />
      <avic-error-card v-if="timelineError" :error-message="timelineError" />
    </div>
  </div>
</template>
<script>
import { Tag, Col, Timeline, Empty } from 'ant-design-vue';
import AvicErrorCard from '@/components/error-card/index.vue';
const tableColumns = [
  {
    title: '节点',
    align: 'center',
    dataIndex: 'currentActiveLabel'
  },
  {
    title: '处理人',
    align: 'center',
    dataIndex: 'assigneeName'
  },
  {
    title: '接收时间',
    dataIndex: 'iTime'
  },
  {
    title: '打开时间',
    dataIndex: 'oTime'
  },
  {
    title: '处理时间',
    dataIndex: 'eTime'
  },
  {
    title: '操作类型',
    align: 'center',
    dataIndex: 'opType'
  },
  {
    title: '累计时间',
    dataIndex: 'useTime'
  },
  {
    title: '接收人',
    align: 'center',
    dataIndex: 'targetuser'
  },
  {
    title: '处理意见',
    dataIndex: 'message'
  }
];
const rowKey = 'id';
export default {
  name: 'AvicBpmTrackingContentTemplate',
  components: {
    ACheckableTag: Tag.CheckableTag,
    ACol: Col,
    ATimeline: Timeline,
    ATimelineItem: Timeline.Item,
    AEmpty: Empty,
    AvicErrorCard
  },
  props: {
    flowParam: {
      type: Object,
      required: true,
      default: null
    },
    currentTab: {
      type: String,
      default: 'tracking'
    }
  },
  data() {
    return {
      tabs: [
        { id: 1, name: '列表', type: 'list' },
        { id: 2, name: '时间轴', type: 'tracking' }
      ],
      bigTableRefName: 'bigTable',
      tableError: '',
      tableLoading: false, //加载动画
      timelineError: '',
      tableColumns,
      rowKey,
      pagination: {
        showQuickJumper: false,
        showSizeChanger: false
      },
      tableData: [],
      data: {},
      // 合并行或列，该函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值
      spanMethod({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, data }) {
        if (columnIndex == 0) {
          return { rowspan: row.rowSpan, colspan: 1 };
        }
      },
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
    };
  },
  methods: {
    //刷新页面
    refreshFlowTracking() {
      this.loadData();
    },
    //处理列表数据合并列
    filterTableData(data) {
      let tableData = [];
      this.tableLoading = true;
      if (data) {
        this.data.tracklist.map(tim => {
          if (tim.length == 1) {
            tableData.push(tim[0]);
          } else {
            tim.map((list, index) => {
              if (index != 0) {
                list.rowSpan = 0;
              } else {
                list.rowSpan = tim.length;
              }
              tableData.push(list);
            });
          }
        });
      }
      this.$refs[this.bigTableRefName].bigDataTableLoadData(tableData);
      this.tableLoading = false;
    },
    //加载数据
    loadData() {
      if (
        this.flowParam &&
        this.flowParam.url &&
        this.flowParam.parameter &&
        this.flowParam.parameter.entryId
      ) {
        this.$sdk
          .http(this.flowParam.url, this.flowParam.parameter, this.flowParam.method)
          .then(res => {
            if (res.success) {
              this.data = res.data;
              this.filterTableData(this.data.tracklist);
            }
          })
          .catch(() => {
            this.tableError = '流程加载失败';
            this.timelineError = '流程加载失败';
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
// .flow-track {
//   width: 100%;
//   min-width: 400px;
//   height: auto;
//   min-height: 200px;
//   overflow: hidden;
//   text-align: center;
//   .flow-tabs {
//     padding: 10px;
//     text-align: left;
//   }
//   .flow-list {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     min-height: 200px;
//     max-height: 300px;
//     margin: 15px 0;
//     overflow: auto;
//     text-align: left;
//     .my-table-wrap {
//       margin-top: 0 !important;
//     }
//     .timeline-box {
//       :deep(.ant-timeline-item) {
//         padding: 0;
//       }
//       :deep(.ant-timeline-item-tail) {
//         top: 15px;
//         left: 25px;
//         z-index: 8000;
//         height: calc(100% - 5px);
//       }
//       :deep(.ant-timeline-item-head-blue) {
//         top: 7px;
//         left: 20px;
//         z-index: 8000;
//         width: 12px;
//         height: 12px;
//       }
//       :deep(.ant-timeline-item-content) {
//         margin: 0;
//       }
//       .flow-list-item {
//         padding: 6px 10px 4px 38px;

//         .divder-box {
//         }
//         .default-box {
//           color: #888;
//           font-size: 14px;
//         }
//         .text-box {
//           color: @primary-color;
//         }
//       }
//       .ant-timeline li:nth-last-child(1) {
//         padding: 0;
//       }
//       .tim-box {
//         padding: 10px;
//         font-size: 14px;
//       }
//       span {
//         padding: 0 4px;
//       }
//     }
//   }
// }
</style>
