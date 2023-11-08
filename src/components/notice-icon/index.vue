<template>
  <span class="header-right-icon" :class="{ active: showMesagePanel }">
    <a-popover
      overlay-class-name="popover-news"
      placement="bottomRight"
      :get-container="false"
      :visible="showMesagePanel"
      @visibleChange="handleChangeMessagePanel"
    >
      <template v-slot:title>
        <a-row justify="space-between">
          <a-col><h3 style="font-weight: 600">最新通知</h3></a-col>
          <a-col>
            <a-button @click="handleAdd()" type="link">
              <plus-outlined />
              添加
            </a-button>
          </a-col>
        </a-row>
      </template>
      <template v-slot:content>
        <a-spin :spinning="loadingMessage">
          <a-list class="popover-news-new" :selectable="false">
            <template v-for="(item, index) in newsList">
              <a-list-item
                class="listItem"
                v-if="index < 5"
                :key="index"
                @click="
                  handleDetailOrEdit({
                    param: { id: item.id }
                  })
                "
              >
                {{ item.title }}
                <p style="font-size: 10px">{{ item.sendDate }}</p>
              </a-list-item>
            </template>
            <div v-if="newsList.length === 0" key="-1">
              <a-empty :image="simpleImage" />
            </div>
          </a-list>
        </a-spin>
        <a-row class="popover-news-but">
          <a-col span="12">
            <a-button @click="haveRead" type="link">全部已读</a-button>
          </a-col>
          <a-col span="12" style="border-left: 1px solid #f0eaea">
            <a-button @click="handleMoreMessage" type="link">查看更多</a-button>
          </a-col>
        </a-row>
      </template>
      <div style="cursor: pointer">
        <a-badge :dot="count != 0">
          <avic-icon class="anticon icon" svg="avic-message-2-fill" />
        </a-badge>
      </div>
    </a-popover>
    <!-- 添加弹框 -->
    <NoticeAdd
      v-if="showAddModal"
      :ref="addModalRefName"
      layout="2"
      @close="showAddModal = false"
      @getUnreadCount="getUnreadCount()"
    />
    <!-- 详情弹框 -->
    <NoticeDetail
      v-if="showDetailModal"
      :ref="detailModalRefName"
      :param-id="messageId"
      layout="2"
      @close="showDetailModal = false"
      @getUnreadCount="getUnreadCount()"
    />
  </span>
</template>

<script lang="ts" setup>
import {
  getUnreadDataApi,
  getUnreadCountApi,
  doReadParamApi,
  getListApi
} from '@/api/avic/system/MessageApi';
import NoticeAdd from './NoticeAdd.vue';
import NoticeDetail from './NoticeDetail.vue';
import { Empty } from 'ant-design-vue';

const { proxy } = getCurrentInstance();
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 100 // 每页条数
  },
  searchParams: {
    attribute01: '',
    content: '',
    sendDateBegin: '',
    sendDateEnd: '',
    sendUserAlias: '',
    recvOrSend: '1'
  },
  keyWord: null, // 快速查询数据
  sidx: '', // 排序字段
  sord: '' // 排序方式: desc降序 asc升序
});
let showMesagePanel = ref(false);
let loadingMessage = ref(false);
let showDetailModal = ref(false);
let showAddModal = ref(false);
let simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
let addModalRefName = 'addModal';
let detailModalRefName = 'detailModal';
let newsList = ref([]);
let messageId = ref('');
let count = ref(0);
onMounted(() => {
  getUnreadCount();
});
/** 获取未读消息数量 */
function getUnreadCount() {
  getUnreadCountApi()
    .then((response: any) => {
      if (response.success) {
        count.value = response.data;
      }
      //授权过期结束轮询
      // if (response.code == 401 && getUnReadMsgCount) {
      //   window.clearInterval(getUnReadMsgCount);
      // }
    })
    .catch(() => {
      // if (getUnReadMsgCount) {
      //   window.clearInterval(getUnReadMsgCount);
      // }
    });
}
function handleChangeMessagePanel(visible) {
  showMesagePanel.value = visible;
  if (visible) {
    fetchNotice();
  }
}
function fetchNotice() {
  newsList.value = [];
  if (loadingMessage.value) {
    loadingMessage.value = false;
    return;
  }
  loadingMessage.value = true;
  loadMessageByCount('5');
}
/** 全部已读 */
function haveRead() {
  getListApi(queryParam).then((response: any) => {
    let param = response.data.result.map(item => {
      return item.id;
    });
    let result = param.join(',');
    if (param.length) {
      doReadParamApi(result).then((response: any) => {
        if (response.success) {
          fetchNotice();
        }
      });
    }
  });
}
/** 加载未读的消息数据 */
function loadMessageByCount(params) {
  // 获取数据，将返回的data传回父组件,有回调函数执行回调函数
  getUnreadDataApi(params)
    .then((response: any) => {
      if (!response.data.length) {
        count.value = 0;
      }
      if (response.success) {
        newsList.value = response.data;
        loadingMessage.value = false;
      } else {
        loadingMessage.value = false;
      }
    })
    .catch(e => {
      console.error(e);
      loadingMessage.value = false;
    });
}
/** 添加 */
function handleAdd() {
  showMesagePanel.value = false;
  showAddModal.value = true;
}
/** 详情 */
function handleDetailOrEdit(params) {
  showMesagePanel.value = false;
  showDetailModal.value = true;
  messageId.value = params.param.id;
}
/** 更多 */
function handleMoreMessage() {
  proxy.$router.push('/account/information');
  showMesagePanel.value = false;
}
</script>

<style lang="less">
.header-right-icon {
  display: inline-block;
  padding: 0 12px;
  .ant-badge {
    vertical-align: -0.2em;
    & > span {
      display: block;
      padding: 0;
      vertical-align: initial;
    }
  }
}
.header-right-icon:hover {
  background: rgba(0, 0, 0, 0.125);
}
.popover-news {
  top: 42px !important;
  width: 350px;
  height: 410px;
  .ant-popover-content {
    width: 100%;
    height: 100%;
    .ant-popover-arrow {
      display: none;
    }
    .ant-popover-inner {
      width: 100%;
      height: 100%;
      .ant-popover-inner-content {
        display: flex;
        flex-direction: column;
        height: calc(100% - 44px);
        padding: 0;
        .popover-news-new {
          height: 300px;
          overflow: auto;
          .ant-spin-container > div {
            height: 100%;
            .ant-empty-normal {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              margin: 0;
            }
          }
        }
        .listItem {
          height: auto;
          padding: 8px 16px;
          border: none;
          cursor: pointer;
          p {
            margin: 0;
          }
        }
        .listItem:hover {
          background-color: @primary-1;
          color: @primary-7;
        }
      }
      .popover-news-but {
        border-top: 1px solid #f0eaea;
        .ant-col {
          text-align: center;
          .ant-btn {
            height: auto;
            padding: 12px;
          }
        }
      }
    }
  }
}
</style>
