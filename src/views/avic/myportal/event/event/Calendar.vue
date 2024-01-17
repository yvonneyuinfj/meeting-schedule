<template>
  <a-layout>
    <a-layout-content>
      <FullCalendar ref="fullCalendar" :options="calendarOptions" class="full-calendar">
        <template #eventContent="arg">
          <a-tooltip :title="arg.event.title">
            <div class="event-item">
              <span>{{ dayjs(arg.event.start).format('HH:mm') }}-{{ dayjs(arg.event.end).format('HH:mm') }}</span>
              <span>{{ arg.event.title }}</span>
            </div>

            <!-- <i>{{ arg.event.start }}</i> -->
          </a-tooltip>
        </template>
      </FullCalendar>
      <event-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <event-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <event-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { listEvent } from '@/api/avic/myportal/event/EventApi'; // 引入模块API
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import EventAdd from './EventAdd.vue';
import EventEdit from './EventEdit.vue';
import dayjs from 'dayjs';

const fullCalendar = ref(null);
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);
const loading = ref(false);
const queryParam = reactive({
  // 请求表格数据参数
  searchParams: {}
});
const formId = ref(''); // 当前行数据id
const eventList = ref([]);
const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridDay,timeGridWeek,dayGridMonth'
  },
  initialView: 'dayGridMonth',
  locale: zhCnLocale,
  // handleWindowResize: true, //随浏览器窗口变化
  editable: true,
  droppable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  nextDayThreshold: '08:00:00',
  events: eventList,
  eventClick: handleEventClick, //日程点击事件
  select: handleDateSelect
  // eventMouseEnter: handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
  // eventsSet: this.handleEvents,
  // dateClick: this.handleDateClick,//日期方格点击事件
  // eventAdd: handleEventAdd,
  // eventChange: handleEventChange,
  // eventRemove: handleEventRemove,
});
onMounted(() => {
  const calendarApi = fullCalendar.value.getApi();
  console.log(calendarApi);
  getList();
});
/** 查询数据  */
function getList() {
  loading.value = true;
  listEvent(queryParam)
    .then(response => {
      eventList.value = response.data;
      processData(eventList);
      loading.value = false;
    })
    .catch(() => {
      eventList.value = [];
      loading.value = false;
    });
}
function processData(eventList) {
  eventList.value.forEach(event => {
    event.title = event.name;
    event.start = event.startTime;
    event.end = event.endTime;
  });
  console.log('eventList:', eventList);
}
function handleDateSelect(info) {
  showAddModal.value = true;
  console.log(info);
}
function handleEventClick(info) {
  console.log(info);
  formId.value = info.event.id;
  showDetailModal.value = true;

}
// function handleEventMouseEnter(info) {
//   console.log(info);
// }
</script>

<style scoped>
.full-calendar {
  width: 90%;
  max-width: 1100px;
  margin: 15px auto;
.event-item {
    display: flex;
    span {
      margin-right: 5px;
    }
  }
}
</style>
