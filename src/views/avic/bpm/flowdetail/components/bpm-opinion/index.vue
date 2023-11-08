<template>
  <!-- 流程详细页面--流程意见 -->
  <div>
    <div class="idea-table" v-if="list.length > 0">
      <AvicTable
        row-key="ideaContent"
        :bordered="true"
        :columns="columns"
        :data-source="list"
        :show-toolbar="false"
        :show-table-setting="false"
        :pagination="false"
      />
    </div>
    <a-empty v-else :image="simpleImage" />
  </div>
</template>

<script setup lang="ts">
import { Empty } from 'ant-design-vue';
import { getFlowOpinions } from '@/api/avic/bpm/BpmOpinionApi';
const props = defineProps({
  /** 流程实例 */
  bpmInstanceObject: { type: Object }
});
const columns = ref([
  {
    title: '意见名称',
    dataIndex: 'title',
    width: 140,
    align: 'center',
    customRender: ({ record }) => {
      const obj = {
        props: {} as any
      };
      if (record.index === 0) {
        obj.props.rowSpan = record.rowSpan;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj;
    }
  },
  {
    title: '意见内容',
    dataIndex: 'ideaContent',
    align: 'left'
  }
]);
const list = ref([]);
const simpleImage = ref(Empty.PRESENTED_IMAGE_SIMPLE);
onMounted(() => {
  getList();
});

/** 查询数据 */
function getList() {
  getFlowOpinions({ entryId: props.bpmInstanceObject.bpmModel.entryId })
    .then(res => {
      let dataList = res.data.result;
      dataList.forEach(item => {
        item.forEach(tim => {
          tim.index = item.indexOf(tim);
          tim.rowSpan = item.indexOf(tim) == 0 ? item.length : 0;
          tim.ideaContent = tim.displayStyle
            .split(',')
            .map(code => {
              return tim[code];
            })
            .toString();
          list.value.push(tim);
        });
      });
    })
    .catch(() => {});
}
</script>
<style lang="less" scoped>
:deep(.idea-table .surely-table) {
  height: auto !important;

  .surely-table-body {
    min-height: 120px;
    max-height: 400px !important;
  }
}
</style>
