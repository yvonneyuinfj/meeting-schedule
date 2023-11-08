<template>
  <div>
    <a-popover
      title
      :arrow-point-at-center="true"
      auto-adjust-overflow
      placement="right"
      destroy-tooltip-onhide
      overlayClassName="bpm-x6chart-node-popover"
      :get-popup-container="triggerNode => getContainer(triggerNode)"
      v-if="popoverHistActivity"
    >
      <template #content>
        <a-spin
          :spinning="popoverSpinning"
          class="bpm-x6chart-node-box"
          :style="{ width: popoverWidth + 'px' }"
        >
          <div class="table-box">
            <div class="node">
              <span class="name">节点:</span>
              {{ popoverHistActivity.alias }}
            </div>
            <div class="node">
              <span class="name">耗时:</span>
              {{ popoverHistActivity.consumeTime }}
            </div>
          </div>
          <div class="table-box">
            <div class="node">
              <span class="name">开始:</span>
              {{ popoverHistActivity.sTime }}
            </div>
            <div class="node">
              <span class="name">结束:</span>
              {{ popoverHistActivity.eTime }}
            </div>
          </div>
          <div class="table-content">
            <AvicTable
              size="small"
              :bordered="true"
              :is-row-selection="false"
              :columns="tableColumns"
              :data-source="popoverData"
              :scroll="{ y: 100 }"
              :style="tableStyle"
              :row-key="record => record.dbid"
              :is-show-toolbar="false"
              :is-show-table-setting="false"
              :pagination="false"
            />
          </div>
        </a-spin>
      </template>
      <slot></slot>
    </a-popover>
    <div v-if="!popoverHistActivity"><slot></slot></div>
  </div>
</template>

<script>
const tableColumns = [
  {
    title: '接收人',
    dataIndex: 'assigneeName'
  },
  {
    title: '处理人',
    dataIndex: 'operateUserName'
  },
  {
    title: '操作类型',
    dataIndex: 'opType'
  },
  {
    title: '意见',
    dataIndex: 'message'
  },
  {
    title: '时间',
    dataIndex: 'eTime',
    width: 150
  }
];
export default {
  name: 'AvicNodePopover',
  props: ['popoverHistActivity', 'popoverData', 'popconfirmId'],
  data() {
    return {
      popoverSpinning: false,
      popoverWidth: '600',
      placement: 'right',
      tableStyle: { marginTop: '5px', height: '150px' },
      tableColumns
    };
  },
  methods: {
    getContainer(triggerNode) {
      if (this.popconfirmId) {
        let doc = document.getElementById(this.popconfirmId);
        console.log('doc', doc);
        return doc;
      } else {
        return document.body;
      }
    }
  }
};
</script>

<style scoped lang="less">
.bpm-x6chart-node-popover {
  .ant-popover-inner-content {
    padding: 0;
  }
  :deep(.ant-spin-container) {
    display: flex;
    /*width: 500px;*/
  }

  .table-box {
    display: flex;
    flex: 1;
    width: 640px;
    .node {
      flex: 1;
      .name {
        width: 20px;
      }
    }
  }
  .table-content {
    height: 150px;
    min-height: 86px;
    overflow: hidden;
  }
}
</style>
