<template>
  <div class="schedule">
    <a-calendar v-model:value="value" :fullscreen="false" class="calendar">
      <template #headerRender="{ value:current, onChange }">
        <div class="header">
          <a-row type="flex" justify="space-between">
            <a-col>
              <div class="title">工作日程</div>
            </a-col>
            <a-col>
              <a-date-picker
                v-model:value="monthValue"
                picker="month"
                size="small"
                style="width: 110px"
                :allowClear="false"
                @change="
                  selectedMonth => {
                    // onChange(current.month(parseInt(String(selectedMonth), 10)));
                    onChange(current.year(selectedMonth.getYear()))
                  }
                "
              />
              {{}}
            </a-col>
          </a-row>
        </div>
      </template>
      <template #dateCellRender="{ current }">
        <div :class="dateCellClass"></div>
      </template>
    </a-calendar>
    <div class="event-list">
      <a-timeline>
        <a-timeline-item>金航数码技术交流 16:00</a-timeline-item>
        <a-timeline-item>金航数码技术交流 16:00</a-timeline-item>
        <a-timeline-item>金航数码技术交流 16:00</a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
const value = ref<Dayjs>();
const dateCellClass = ref('');
const monthValue = ref<Dayjs>();
onMounted(() => {
  if (!monthValue.value) {
    monthValue.value = dayjs();
  }
});
const handleSelectChange = selectedDate => {
  console.log('选择了日期', selectedDate);
};
</script>

<style scoped lang="less">
.schedule {
  .calendar {
    height: 265px;
    overflow: hidden;
    .header {
      padding: 8px;
      .title {
        color: #1e1e1e;
        font-size: 16px;
        font-weight: 700;
      }
    }
    /deep/ .ant-picker-calendar-date-today {
      border-radius: 20px;
    }
    /deep/ .ant-picker-cell-inner {
      border-radius: 20px;
    }
    /deep/ .ant-picker-cell-inner::before {
      border-radius: 20px;
    }
    .busyDay {
      width: 5px;
      height: 5px;
      border-radius: 5px;
      background-color: #338fe5;
      margin: 0 auto;
    }
  }
  .event-list {
    // border-top: 1px solid #E9E9E9;
    margin-top: 18px;
    .ant-timeline-item {
      padding-bottom: 10px;
    }
    .ant-timeline-item:nth-last-child(1) {
      /deep/ .ant-timeline-item-content {
        min-height: 0;
      }
    }
    .ant-timeline-item-last > .ant-timeline-item-content {
      min-height: 0;
    }
  }
}
</style>
