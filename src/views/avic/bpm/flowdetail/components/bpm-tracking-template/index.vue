<template>
  <div class="flow-track">
    <div v-show="currentTab == 'list'" class="flow-list">
      <AvicTable
        :showTableSetting="false"
        :pagination="false"
        :columns="tableColumns"
        :row-key="record => record.dbid"
        :data-source="tableData"
      />

      <avic-error-card v-if="tableError" :error-message="tableError" />
    </div>
    <div v-show="currentTab == 'tracking'" class="flow-list">
      <div v-if="!timelineError || data.timelist">
        <div v-for="(tab, i) in data.timelist" :key="i" class="timeline-box">
          <a-timeline>
            <a-timeline-item v-for="(item, g) in tab" :key="g">
              <template #dot>
                <avic-icon svg="avic-time-fill" style="font-size: 1.4em" color="#7BC616" />
              </template>
              <div class="flow-list-item">
                <span class="default-box">{{ tab[0].dayName }}&nbsp;&nbsp;{{ item.timeName }}</span>
                <div class="right-text">
                  <span class="text-box">
                    {{ item.operateUserName }}（{{ item.operateDeptName }}）
                  </span>
                  <span class="default-box">在</span>
                  <span class="text-box currentActiveLabel">{{ item.currentActiveLabel }}</span>
                  <span class="default-box">节点进行了</span>
                  <span class="text-box opType">{{ item.opType }}</span>
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
import { Timeline, Empty } from 'ant-design-vue';
import AvicErrorCard from '@/components/error-card/index.vue';
import request from '@/utils/request';
import { center } from '@antv/x6/lib/registry/node-anchor/bbox';
export default {
  name: 'AvicBpmTrackingTemplate',
  components: {
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
      // currentTab: 'tracking',
      tabs: [
        { id: 1, name: '列表', type: 'list' },
        { id: 2, name: '时间轴', type: 'tracking' }
      ],
      bigTableRefName: 'bigTable',
      tableError: '',
      tableLoading: false, //加载动画
      timelineError: '',
      tableColumns: [
        {
          title: '节点',
          align: 'center',
          dataIndex: 'currentActiveLabel',
          width: '100px'
        },
        {
          title: '处理人',
          align: 'center',
          dataIndex: 'assigneeName',
          width: '120px'
        },
        {
          title: '处理人部门',
          align: 'center',
          dataIndex: 'assigneeDeptName',
          width: '140px'
        },
        {
          title: '接收时间',
          dataIndex: 'iTime',
          width: '180px',
          align: 'center'
        },
        {
          title: '打开时间',
          dataIndex: 'oTime',
          width: '180px',
          align: 'center'
        },
        {
          title: '处理时间',
          dataIndex: 'eTime',
          width: '180px',
          align: 'center'
        },
        {
          title: '操作类型',
          align: 'center',
          dataIndex: 'opType',
          width: '100px',
          align: 'center'
        },
        {
          title: '累计时间',
          dataIndex: 'useTime',
          width: '140px'
        },
        {
          title: '接收人',
          align: 'center',
          dataIndex: 'targetuser',
          width: '120px'
        },
        {
          title: '处理意见',
          dataIndex: 'message',
          ellipsis: 'true',
          tooltip: { title: ({ value }) => value, placement: 'topLeft' }
        }
      ],
      pagination: {
        showQuickJumper: false,
        showSizeChanger: false
      },
      tableData: [],
      data: {},
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
    };
  },
  methods: {
    //刷新页面
    refreshFlowTracking() {
      this.loadData();
    },
    //切换按钮
    // changeHeadTag(e) {
    //   this.currentTab = e.type;
    // },
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
      this.tableData = tableData;
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
        request({
          url: this.flowParam.url,
          data: this.flowParam.parameter,
          method: this.flowParam.method
        })
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
:deep(.ant-tooltip) {
  max-width: 80%;
}

.ant-timeline {
  padding: 6px 0 0 6px;
}
.flow-list-item {
  display: flex;
  > .default-box {
    flex-shrink: 0;
    width: 160px;
    height: revert;
    margin-right: 16px;
    color: @text-color-secondary;
  }
  .right-text {
    .default-box {
      margin: 0 4px;
    }
    .text-box {
      color: @primary-color;
      font-weight: 600;
    }
    .currentActiveLabel {
      color: #ff7d00;
    }
    .opType {
      color: #0fc6c2;
    }
  }
}
:deep(.describe-box) {
  display: flex;
  align-items: flex-start;
  .svg-icon {
    margin-right: 4px;
    color: @primary-color;
    vertical-align: -2.125px;
  }
}
</style>
