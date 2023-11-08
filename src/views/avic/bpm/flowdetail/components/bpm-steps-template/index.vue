<template>
  <div class="module-con-box">
    <a-spin :spinning="false" tip="正在加载流程跟踪" wrapper-class-name="flow-track-spin">
      <div class="module-con" ref="modulePopover">
        <a-steps :current="6" label-placement="vertical" v-if="timeList && timeList.length > 0">
          <a-step>
            <template v-slot:icon>
              <span v-if="maxLength < 6">开始</span>
              <ul v-if="maxLength > 5">
                <li :key="i" v-for="i in 3" />
              </ul>
            </template>
          </a-step>
          <a-step class="user-box" v-for="(item, index) in timeList" :key="index">
            <template v-slot:title>{{ item.dayName }} {{ item.timeName }}</template>
            <template v-slot:description>
              <span>{{ item.currentActiveLabel }}</span>
              <p>{{ item.operateUserName }}</p>
              <span
                v-if="
                  !(
                    bpmInstanceObject.bpmChart &&
                    bpmInstanceObject.bpmChart.isShowBpmStepsOpTypeInfo === false
                  )
                "
              >
                <span v-if="item.opType != ''">{{ item.opType }}</span>
                <span v-if="item.opType == ''">{{ tip }}</span>
              </span>
            </template>
            <!-- 默认只展示到当前流程项 最多展示到5个节点 开始和当前为默认状态（不变） -->
            <template v-slot:icon>
              <a-popover :get-container="false">
                <template v-slot:content>
                  <div style="width: 440px; overflow: hidden" class="popover-table">
                    <a-table
                      :columns="flowColumns"
                      :data-source="[item]"
                      :pagination="false"
                      size="small"
                      :bordered="false"
                    >
                      <a slot="name" slot-scope="text">
                        {{ text }}
                      </a>
                    </a-table>
                  </div>
                </template>
                <avic-icon svg="avic-user-3-line" />
              </a-popover>
            </template>
          </a-step>
          <a-step>
            <template v-slot:icon>当前</template>
          </a-step>
        </a-steps>
        <a-empty
          v-if="!loading && timeList && timeList.length == 0"
          :image="simpleImage"
          description="暂无数据"
        />
      </div>
    </a-spin>
  </div>
</template>

<script>
import { Spin, Popover, Table, Steps, Empty } from 'ant-design-vue';
import request from '@/utils/request';
// 弹出表格
const flowColumns = [
  {
    title: '节点',
    dataIndex: 'currentActiveLabel',
    key: 'currentActiveLabel',
    scopedSlots: { customRender: 'currentActiveLabel' },
    ellipsis: true
  },
  {
    title: '处理人',
    dataIndex: 'operateUserName',
    key: 'operateUserName',
    ellipsis: true
  },
  {
    title: '操作类型',
    dataIndex: 'opType',
    key: 'opType',
    ellipsis: true
  },
  {
    title: '目标接收人',
    dataIndex: 'targetuser',
    key: 'targetuser',
    ellipsis: true
  },
  {
    title: '处理意见',
    dataIndex: 'message',
    key: 'message',
    ellipsis: true
  }
];
const flowData = [
  {
    key: '1',
    node: '开始',
    name: '平台管理员',
    type: '创建流程',
    target: '张三',
    opinion: '意见意见意见意见'
  }
];
export default {
  name: 'AvicBpmStepsTemplate',
  components: {
    ASpin: Spin,
    APopover: Popover,
    ATable: Table,
    ASteps: Steps,
    AStep: Steps.Step
  },
  props: {
    flowParam: {
      type: Object,
      required: true,
      default: null
    },
    bpmInstanceObject: {
      type: Object
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  data() {
    return {
      flowData,
      flowColumns,
      data: {},
      timeList: [], // 时间轴显示数据
      maxLength: 0, // 时间轴长度
      tip: '待处理',
      loading: false, // 加载状态控制
      defaultNode: {
        dayName: '当前',
        currentActiveLabel: '',
        opType: '待提交'
      },
      flowRole: ''
    };
  },
  methods: {
    //拟稿阶段初始化节点
    initStepsTracking() {
      this.timeList = [];
      this.defaultNode.currentActiveLabel = this.bpmInstanceObject.bpmModel.activitylabel;
      this.timeList.push(this.defaultNode);
    },
    //刷新页面
    refreshStepsTracking() {
      this.loadData();
    },
    //处理列表数据合并列
    filterTableData(data) {
      let tableData = [];
      if (data) {
        data.map(tim => {
          if (tim.length == 1) {
            tableData.unshift(tim[0]);
          } else {
            tim.map((list, index) => {
              if (index != 0) {
                list.rowSpan = 0;
              } else {
                list.rowSpan = tim.length;
              }
              tableData.unshift(list);
            });
          }
        });
      }
      return tableData;
    },
    filterData() {
      let list = this.filterTableData(this.data.timelist);
      let tableData = this.filterTableData(this.data.tracklist);
      let len1 = list.length;
      let len2 = tableData.length; //表格中的数据
      if (len1 == 0 && len2 == 0) {
        list.push(this.defaultNode);
      } else if (
        len1 > 0 &&
        len2 > 0 &&
        tableData[0]['currentActiveLabel'] != list[len1 - 1]['currentActiveLabel']
      ) {
        list.push({
          ...tableData[0],
          dayName: '当前'
        });
      } else if (len1 == 0 && len2 > 0) {
        if (tableData[0].dayName == null) {
          list.push({
            ...tableData[0],
            dayName: '当前'
          });
        } else {
          list.push({
            ...tableData[0]
          });
        }
      }
      this.maxLength = list.length;
      if (list.length > 5) {
        this.timeList = list.slice(-5);
      } else {
        this.timeList = list;
      }
      this.loading = false;
    },
    //加载数据
    loadData() {
      if (!this.loading) {
        this.loading = true;
      }
      if (
        this.flowParam &&
        this.flowParam.url &&
        this.flowParam.parameter &&
        this.flowParam.parameter.entryId
      ) {
        // this.$sdk
        //   .http(this.flowParam.url, this.flowParam.parameter, this.flowParam.method)
        request({
          url: this.flowParam.url,
          data: this.flowParam.parameter,
          method: this.flowParam.method
        })
          .then(res => {
            if (res.success) {
              this.data = res.data;
              this.filterData(this.data);
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
<style lang="less">
@import './style/base.less';
</style>
