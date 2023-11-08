<template>
  <AvicModal
    :visible="visible"
    title="消息详情"
    width="960px"
    height="540px"
    :centered="true"
    @cancel="closeModal"
  >
    <template #footer>
      <a-button title="返回" @click="closeModal">返回</a-button>
    </template>
    <a-form
      :model="form"
      ref="formRef"
      v-bind="layout"
      layout="horizontal"
      class="form-excel-style"
    >
      <a-row>
        <a-col v-bind="colLayout.cols2">
          <a-form-item name="attribute01" label="标题">
            <a-input v-model:value="form.attribute01" :disabled="true" />
            <!-- 普通输入框 -->
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="内容" name="content">
            <a-textarea :rows="12" v-model:value="form.content" :disabled="true" />
            <!-- 文本域 -->
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="所有人" name="msgType">
            <a-radio-group v-model:value="form.msgType" :disabled="true">
              <a-radio value="1">是</a-radio>
              <a-radio value="0">否</a-radio>
            </a-radio-group>
            <!-- 单选是否所有人-->
          </a-form-item>
        </a-col>
        <a-col v-if="showSelectUser" v-bind="colLayout.cols">
          <a-form-item label="接收人" name="recvUser">
            <AvicCommonSelect
              v-model:value="form.recvUser"
              type="userSelect"
              :defaultShowValue="form.recvUserAlias"
              select-model="multi"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="发送时间" name="sendDate">
            <!-- 5775 添加页面时间格式去掉秒数 -->
            <a-date-picker
              v-model:value="form.sendDate"
              format="YYYY-MM-DD HH:mm"
              valueFormat="YYYY-MM-DD HH:mm"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="到期时间" name="disappearDate">
            <!-- 5775 添加页面时间格式去掉秒数 -->
            <a-date-picker
              v-model:value="form.disappearDate"
              format="YYYY-MM-DD HH:mm"
              valueFormat="YYYY-MM-DD HH:mm"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </AvicModal>
</template>
<script lang="ts" setup>
import { detailParamApi, doReadParamApi } from '@/api/avic/system/MessageApi';
const emit = defineEmits(['close', 'closeDetail', 'getUnreadCount']);
const { proxy } = getCurrentInstance();
const props = defineProps({
  paramId: {
    type: String,
    default: ''
  }
});
let layout = ref({
  labelCol: { flex: '0 0 100px' },
  wrapperCol: { flex: '1 1 0' }
});
let colLayout = proxy.$colLayout2;
let visible = ref(false);
let showSelectUser = ref(false);
let form = ref({
  attribute01: '',
  content: '',
  msgType: '0',
  recvUser: '',
  sendDate: '',
  disappearDate: '',
  recvUserAlias: ''
});

onMounted(() => {
  modalHandleDetailOrEdit(props.paramId);
});
/** 获取数据 */
function modalHandleDetailOrEdit(id) {
  visible.value = true;
  detailParamApi({ id }).then((response: any) => {
    if (response.success) {
      const { attribute01, recvUserAlias, content, recvUser, sendDate, disappearDate, msgType } =
        response.data;
      if (msgType == '1') {
        showSelectUser.value = false;
      } else {
        showSelectUser.value = true;
      }
      form.value.attribute01 = attribute01;
      form.value.content = content;
      form.value.recvUser = recvUser;
      form.value.sendDate = sendDate;
      form.value.disappearDate = disappearDate;
      form.value.msgType = msgType;
      form.value.recvUserAlias = recvUserAlias;
      haveRead(response.data.id);
    }
  });
}
/** 已读 */
function haveRead(id) {
  doReadParamApi(id).then(() => {});
}
/** 关闭 */
function closeModal() {
  emit('getUnreadCount');
  emit('closeDetail'); //关闭页面刷新表格
  emit('close');
}
</script>
