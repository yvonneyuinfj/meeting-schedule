<template>
  <AvicModal
    :visible="true"
    title="修改密码"
    width="480px"
    height="330px"
    :centered="true"
    :mask-closable="false"
    @ok="confirm"
    @cancel="closeModal"
  >
    <a-form v-bind="layout">
      <a-form-item v-bind="validateInfos.newPassword" label="新密码">
        <a-input-password v-model:value="modelRef.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.confirmPassword" label="新密码确认">
        <a-input-password v-model:value="modelRef.confirmPassword" placeholder="请重新输入新密码" />
      </a-form-item>
    </a-form>
  </AvicModal>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue';
import { changePassword } from '@/api/avic/system/UserSettingApi';
const { proxy } = getCurrentInstance();
const props = defineProps({
  /** 用户信息 */
  userInfo: { type: Object, required: true }
});
const layout = {
  labelCol: { flex: '0 0 110px' },
  wrapperCol: { flex: '1 1 0' }
};
const modelRef = reactive({
  newPassword: '',
  confirmPassword: ''
});
const rulesRef = reactive({
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { validator: (rule, value) => checkNewPassword(rule, value), trigger: 'change' }
  ],
  confirmPassword: [
    { required: true, message: '新密码确认不能为空', trigger: 'blur' },
    { validator: (rule, value) => checkConfirmPassword(rule, value), trigger: 'change' }
  ]
});
async function checkNewPassword(rule, value) {
  if (value && value === props.userInfo.password) {
    return Promise.reject('新密码与旧密码一样！');
  } else {
    return Promise.resolve();
  }
}
async function checkConfirmPassword(rule, value) {
  if (value) {
    if (value === modelRef.newPassword) {
      return Promise.resolve();
    } else {
      return Promise.reject('两次输入不一致！');
    }
  } else {
    return Promise.resolve();
  }
}
const { validate, validateInfos } = Form.useForm(modelRef, rulesRef);
function confirm() {
  validate()
    .then(values => {
      let param = {
        username: props.userInfo.username,
        oldPassword: proxy.$encrypt(props.userInfo.password),
        newPassword: proxy.$encrypt(values.newPassword)
      };
      changePassword(param)
        .then((res: any) => {
          if (res.success) {
            proxy.$message.success('密码修改成功，请重新登录！');
            $emit('close');
          }
        })
        .catch(err => {
          proxy.$message.warning(err.message);
        });
    })
    .catch(() => {});
}

const $emit = defineEmits(['close']);
function closeModal() {
  $emit('close');
}
</script>
