<template>
  <a-card class="message-pop-up" v-show="visible" :loading="loadingMessage">
    <template v-slot:title>消息通知 ({{ count }})</template>
    <template v-slot:extra><close-outlined @click="handleClose" class="close" /></template>
    <template v-slot:actions>
      <a-button type="link" @click="handleMoreMessage" class="more">查看全部消息</a-button>
    </template>
    <ul class="message-list">
      <li
        class="message-list-item"
        v-for="(item, key) in newsList"
        :key="key"
        @click="handleDetailOrEdit({ param: { id: item.id } })"
      >
        <span class="left-con">{{ item.title }}</span>
        <span class="right-con">{{ item.sendDate }}</span>
      </li>
    </ul>
    <NoticeDetail
      v-if="showDetailModal"
      :ref="detailModalRefName"
      :param-id="messageId"
      layout="2"
      @close="showDetailModal = false"
      @getUnreadCount="getUnreadCount()"
    />
  </a-card>
</template>
<script lang="ts" setup>
import { getUnreadCountApi, getUnreadDataApi } from '@/api/avic/system/MessageApi';
import NoticeDetail from '@/components/notice-icon/NoticeDetail.vue';
const { proxy } = getCurrentInstance();
let showDetailModal = ref(false);
let loadingMessage = ref(false);
let visible = ref(false);
let detailModalRefName = 'detailModal';
let newsList = ref([]);
let getNewMessages = ref(null);
let messageId = ref('');
let count = ref(0);
let isDialogShow = ref('false');
let dialogShowTime = ref('10000');
let dialogIntervalTime = ref('30000');
onMounted(() => {
  proxy.$getProfileValue('PLATFORM_V6_MESSAGE_DIALOG_TIME').then(res => {
    dialogShowTime.value = res;
  });
  proxy.$getProfileValue('PLATFORM_V6_MESSAGE_REQUEST_INTERVAL').then(res => {
    dialogIntervalTime.value = res;
  });
  proxy.$getProfileValue('PLATFORM_V6_MESSAGE_DIALOG_SHOW').then(res => {
    isDialogShow.value = res;
  });
});

/** 获取未读消息数量 */
function getUnreadCount() {
  getUnreadCountApi()
    .then((response: any) => {
      if (response.success) {
        count.value = response.data;
        if (count.value > 0) {
          // 有新消息，继续请求消息内容
          visible.value = true;
          loadMessageByCount('5');
        } else {
          visible.value = false;
        }
        //授权过期结束轮询
        if (response.code == 401 && getNewMessages.value) {
          clearInterval(getNewMessages.value);
        }
      }
    })
    .catch(() => {
      if (getNewMessages.value) {
        clearInterval(getNewMessages.value);
      }
    });
}
/** 加载未读的消息数据 */
function loadMessageByCount(params) {
  // 获取数据，将返回的data传回父组件,有回调函数执行回调函数
  getUnreadDataApi(params)
    .then((response: any) => {
      if (response.success) {
        newsList.value = response.data;
        loadingMessage.value = false;
      } else {
        newsList.value = [];
        loadingMessage.value = false;
      }
      setTimeout(() => {
        visible.value = false;
      }, Number(dialogShowTime.value));
      //授权过期结束轮询
      if (response.code == 401 && getNewMessages.value) {
        clearInterval(getNewMessages.value);
      }
    })
    .catch(e => {
      console.error(e);
      loadingMessage.value = false;
    });
}
/** 详情 */
function handleDetailOrEdit(params) {
  showDetailModal.value = true;
  messageId.value = params.param.id;
}
/** 关闭 */
function handleClose() {
  visible.value = false;
}
/** 跳转消息通知 */
function handleMoreMessage() {
  proxy.$router.push('/account/information');
  visible.value = false;
}
watch(
  isDialogShow,
  newVal => {
    if (newVal == 'true') {
      if (getNewMessages.value) {
        clearInterval(getNewMessages.value);
      }
      getUnreadCount();
      getNewMessages.value = setInterval(() => {
        getUnreadCount();
      }, Number(dialogIntervalTime.value));
    } else {
      visible.value = false;
      if (getNewMessages.value) {
        clearInterval(getNewMessages.value);
      }
    }
  },
  { immediate: true, deep: true }
);
onBeforeUnmount(() => {
  if (getNewMessages.value) {
    clearInterval(getNewMessages.value);
  }
});
</script>
<style lang="less">
.message-pop-up.ant-card {
  width: 360px;
  height: 400px;
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  .ant-card-head {
    padding: 0px 12px;
    .ant-card-head-title {
      padding: 8px 0px;
    }
    .ant-card-extra {
      padding: 8px 0px;
      .close {
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
  .ant-card-body {
    padding: 4px 8px;
    line-height: 32px;
    .message-list {
      // 【13282】 【系统消息】：打开“V6平台消息弹出框控制显隐”系统参数配置后，页面消息显示样式不正确
      padding: 0px;
      margin: 0;
      .message-list-item {
        cursor: pointer;
        list-style: none;
        display: flex;
        flex-direction: row;
        margin: 0;
        .left-con {
          max-width: 70%;
          color: @primary-color;
        }
        .right-con {
          margin-left: auto;
        }
      }
    }
  }
  .ant-card-actions {
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: transparent;
    border-top: 0;
  }
  .ant-card-actions > li {
    width: 100%;
    text-align: left;
    margin: 0px;
    .more {
      .ant-btn-link {
        padding-left: 12px;
      }
    }
  }
}
</style>
