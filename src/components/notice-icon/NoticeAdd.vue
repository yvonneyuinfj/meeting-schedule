<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
    height="580px"
    :centered="true"
    @cancel="closeModal"
  >
    <template #footer>
      <a-button title="保存" type="primary" :loading="modalLoading" @click="saveForm">
        发送消息
      </a-button>
      <a-button title="返回" @click="closeModal">返回</a-button>
    </template>
    <a-form :model="form" ref="formRef" :rules="rules" v-bind="layout" layout="horizontal">
      <a-row>
        <a-col v-bind="colLayout.cols2">
          <a-form-item name="attribute01" label="标题">
            <a-input placeholder="请输入标题" v-model:value="form.attribute01" />
            <!-- 普通输入框 -->
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="内容" name="content">
            <a-textarea :rows="10" placeholder="请输入内容" v-model:value="form.content" />
            <!-- 文本域 -->
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="所有人" name="msgType">
            <a-radio-group v-model:value="form.msgType" @change="onChange">
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
              placeholder="请选择消息接收人"
              select-model="multi"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="发送时间" name="sendDate">
            <!-- 5775 添加页面时间格式去掉秒数 -->
            <a-date-picker
              :show-time="{
                ////【7511】 【轻量化1231】【达梦火狐】【门户】消息，添加页面，发送时间和到期时间，时间格式有误
                format: 'HH:mm'
              }"
              v-model:value="form.sendDate"
              :disabled-date="startValue => proxy.$disabledEndDate(startValue, initialSendDate)"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              :show-today="false"
              placeholder="请选择发送时间"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="到期时间" name="disappearDate">
            <!-- 5775 添加页面时间格式去掉秒数 -->
            <a-date-picker
              :show-time="{
                //【7511】 【轻量化1231】【达梦火狐】【门户】消息，添加页面，发送时间和到期时间，时间格式有误
                format: 'HH:mm'
              }"
              v-model:value="form.disappearDate"
              :disabled-date="startValue => proxy.$disabledEndDate(startValue, form.sendDate)"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              :show-today="false"
              placeholder="请选择到期时间"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </AvicModal>
</template>
<script lang="ts" setup>
import { addParamApi } from '@/api/avic/system/MessageApi';
const emit = defineEmits(['close', 'reloadData', 'getUnreadCount']);
const { proxy } = getCurrentInstance();
let layout = ref({
  labelCol: { flex: '0 0 80px' },
  wrapperCol: { flex: '1 1 0' }
});
let colLayout = proxy.$colLayout2;
let modalLoading = ref(false);
let showSelectUser = ref(true);
let initialSendDate = proxy.$dateFormat(new Date().getTime(), 'YYYY-MM-DD HH:mm');
const formRef = ref(null);
let form = ref({
  attribute01: '',
  content: '',
  msgType: '0',
  recvUser: '',
  sendDate: initialSendDate,
  disappearDate: ''
});
const rules: Record<string, Rule[]> = {
  attribute01: [
    { required: true, message: '请输入标题！' },
    { max: 255, trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容！' },
    { max: 500, trigger: 'blur' }
  ],
  recvUser: [{ required: showSelectUser.value, message: '请选择消息接收人！', trigger: 'change' }],
  sendDate: [{ required: true, message: '请选择发送时间！' }],
  disappearDate: [{ required: true, message: '请选择到期时间！' }]
};

onMounted(() => {
  nextTick(() => {
    addModalHandleAdd();
  });
});
function addModalHandleAdd() {
  showSelectUser.value = true;
}
function onChange(e) {
  if (e.target.value == '1') {
    showSelectUser.value = false;
  } else {
    showSelectUser.value = true;
  }
}
/** 保存 */
function saveForm() {
  formRef.value.validate().then(() => {
    modalLoading.value = true; // 按钮开启loading状态
    let newValues = proxy.$lodash.cloneDeep(form.value); // 提交前数据处理
    newValues.sourceCode = 'personal';
    if (!newValues.msgType) {
      newValues.msgType = '0';
    }
    if (
      newValues.sendDate.valueOf(newValues.sendDate) >=
      newValues.disappearDate.valueOf(newValues.disappearDate)
    ) {
      proxy.$message.warning('到期时间必须晚于发送时间，请重新选择时间');
      modalLoading.value = false;
      return;
    }
    addParamApi(newValues)
      .then((response: any) => {
        if (response.success) {
          reloadList();
          emit('getUnreadCount');
        }
        modalLoading.value = false; // 按钮关闭loading状态
      })
      .catch(() => {
        modalLoading.value = false; // 按钮关闭loading状态
      });
  });
}
function reloadList() {
  proxy.$message.success('发送成功！'); // 提示成功
  emit('reloadData', true); // 刷新表格
  emit('close');
}
/** 关闭 */
function closeModal() {
  emit('close');
}
</script>
