<template>
  <a-layout>
    <a-layout-content>
      <FullCalendar ref="fullCalendar" :options="calendarOptions" class="full-calendar">
        <template #eventContent="arg">
          <a-tooltip placement="left">
            <template #title>
              <avic-icon svg="avic-todo-fill" @click.stop="handleDetail(arg.event.id)"/>
              <avic-icon svg="avic-edit-fill" @click.stop="handleEdit(arg.event)" />
              <avic-icon svg="avic-delete-bin-6-fill" @click.stop="handleDelete(arg.event)" />
            </template>
            <!-- 判断事件是否跨日期 -->
            <div v-if="isMultiDayEvent(arg.event)" style="display: flex">
              <!-- 跨日期的日程 -->
              <div class="fc-event-time">
                {{ arg.event.start.getDate() }}日 - {{ arg.event.end.getDate() }}日
              </div>
              <div class="fc-event-title fc-sticky">{{ arg.event.title }}</div>
            </div>
            <div v-else style="display: flex">
              <!-- 当日跨时段的日程 -->
              <div class="fc-event-time">{{ formatEventTime(arg.event.start, arg.event.end) }}</div>
              <div class="fc-event-title-container">
                <div class="fc-event-title fc-sticky">{{ arg.event.title }}</div>
              </div>
            </div>
          </a-tooltip>
        </template>
      </FullCalendar>
      <event-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
        :dateInfo="dateInfo"
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
import { delMeeting, listMeeting } from '@/api/avic/myportal/meeting/MeetingApi'; // 引入模块API
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import EventAdd from './EventAdd.vue';
import EventEdit from './EventEdit.vue';
import EventDetail from './EventDetail.vue';
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();

const fullCalendar = ref(null);
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);
const loading = ref(false);
const queryParam = reactive({
  // 请求表格数据参数
  searchParams: {
    // startTimeBegin:'2024-01-16 00:00',
    // startTimeEnd:'2024-01-16 23:59'
  }
});
const formId = ref(''); // 当前行数据id
const dateInfo = ref({});
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
  // editable: true,  // 事件拖拽和调整大小的功能
  selectable: true,
  selectMirror: true, // 启用镜像效果
  dayMaxEvents: true,
  nextDayThreshold: '08:00:00',
  events: eventList,
  eventBorderColor: 'transparent',
  eventClick: handleEventClick, //日程点击事件
  select: handleDateSelect,
  datesSet: handleDatesSet
  // eventDrop:handleEventDrop
  // viewDidMount: handleViewDidMount
  // eventMouseEnter: handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
  // eventsSet: this.handleEvents,
  // dateClick: this.handleDateClick,//日期方格点击事件
  // eventAdd: handleEventAdd,
  // eventChange: handleEventChange,
  // eventRemove: handleEventRemove,
});
onMounted(() => {
  // const calendarApi = fullCalendar.value.getApi();
  // 添加事件监听器
  // calendarApi.on('eventDrop', handleEventDrop);
  // getList();
});
/** 查询数据  */
function getList() {
  loading.value = true;
  listMeeting(queryParam)
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
    event.backgroundColor = getRandomColor(presetColors);
    event.textColor = '#333';
    // event.title = event.name.length > 8 ? event.name.substring(0, 8) + '...' : event.name;
    event.title = event.name;
    event.start = event.startTime;
    event.end = event.endTime;
    event.display = 'block';
  });
}
// function handleViewDidMount(info) {
//   console.log('handleViewDidMount', info);
//   queryParam.searchParams.startTimeBegin = dayjs(info.view.activeStart).format('YYYY-MM-DD HH:mm');
//   queryParam.searchParams.startTimeEnd = dayjs(info.view.activeEnd).format('YYYY-MM-DD HH:mm');
// }
function handleDateSelect(info) {
  console.log('handleDateSelect', info);
  dateInfo.value = proxy.$lodash.cloneDeep(info);
  showAddModal.value = true;
}
function handleEventClick(info) {
  console.log(info);
  formId.value = info.event.id;
  showDetailModal.value = true;
}
function handleDatesSet(info) {
  // console.log('handleDatesSet', info);
  queryParam.searchParams.startTimeBegin = dayjs(info.view.activeStart).format('YYYY-MM-DD HH:mm');
  queryParam.searchParams.startTimeEnd = dayjs(info.view.activeEnd).format('YYYY-MM-DD HH:mm');
  getList();
}
// function handleEventMouseEnter(info) {
//   console.log(info);
// }
// const presetColors = ['#3EBD77','#0066FF','#00D8D3','#FF5E8F','#848DEB','#FFB906','#CCFFCC'];
const presetColors = ['#B0F2B4', '#BAF2E9', '#BAD7F2', '#F2BAC9', '#F2E2BA'];
function getRandomColor(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function formatEventTime(start, end) {
  const startTime = dayjs(start).format('HH:mm');
  // const endTime = dayjs(end).format('HH:mm');
  // return `${startTime}-${endTime}`;
  return startTime;
}
const isMultiDayEvent = event => {
  return event.start.getDate() !== event.end.getDate();
};

/** 编辑 */
function handleEdit(event) {
  console.log(event);
  if (event._def.extendedProps.createdBy != proxy.$getLoginUser().id) {
    proxy.$message.warning(`不可以编辑他人创建的数据！`);
    return;
  }
  if (event._def.extendedProps.businessstate_ && event._def.extendedProps.businessstate_ != '拟稿中') {
    proxy.$message.warning(`不可以编辑${event._def.extendedProps.businessstate_}的数据！`);
    return;
  }
  formId.value = event.id;
  showEditModal.value = true;
}
/** 详细 */
function handleDetail(id) {
  formId.value = id;
  showDetailModal.value = true;
}
/** 删除 */
const delLoading = ref(false);
function handleDelete(event) {
  if (event._def.extendedProps.createdBy != proxy.$getLoginUser().id) {
    proxy.$message.warning('不可以删除他人创建的数据！');
    return;
  }
  if (event._def.extendedProps.businessstate_ && event._def.extendedProps.businessstate_ != '拟稿中') {
    proxy.$message.warning(`不可以删除${event._def.extendedProps.businessstate_}的数据！`);
    return;
  }
  proxy.$confirm({
    title: `确定要删除数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delMeeting([event.id])
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
</script>

<style scoped>
.full-calendar {
  width: 90%;
  max-width: 1100px;
  margin: 15px auto;
  .event-item {
    display: flex;
    div {
      margin-right: 5px;
    }
  }
  .del-event {
    .avic-icon {
      margin-left: 5px;
      font-size: 14px;
      color: #86909c;
    }
    .avic-icon:hover {
      color: #f5222d;
    }
  }
}
:deep(.svg-icon) {
  margin: auto 3px;
  cursor: pointer;
}
:deep(.svg-icon:hover) {
  color: orange;
}
</style>
