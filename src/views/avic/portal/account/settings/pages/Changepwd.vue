<template>
  <div class="change-password avic-base-form">
    <div class="basic-title">修改密码</div>
    <a-form
      layout="horizontal"
      :model="formData"
      ref="formRef"
      v-bind="layout"
      :rules="validateMessages"
    >
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="旧密码" name="oldPassword">
            <a-input
              type="password"
              style="width: 300px"
              placeholder="请输入旧密码"
              v-model:value="formData.oldPassword"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="新密码" name="newPassword">
            <a-input
              type="password"
              style="width: 300px"
              placeholder="请输入新密码"
              v-model:value="formData.newPassword"
            />
          </a-form-item>
          <div class="pwd-security">
            <span class="pwdLi" :style="backgroundw">&nbsp;</span>
            <span class="pwdLi" :style="backgroundm">&nbsp;</span>
            <span class="pwdLi" :style="backgrounds">&nbsp;</span>
            <span class="pwdS">{{ pwdS }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="确认新密码" name="confirmpass">
            <a-input
              style="width: 300px"
              type="password"
              placeholder="请再次输入新密码"
              v-model:value="formData.confirmpass"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row>
      <a-col v-bind="formColLayout.cols">
        <a-button
          type="primary"
          :loading="changePwdLoading"
          html-type="submit"
          @click.stop.prevent="handleChangePwd"
          style="margin-right: 8px; margin-left: 140px"
        >
          <template #icon>
            <save-outlined />
          </template>
          保存
        </a-button>
        <a-button
          title="重置"
          type="primary"
          ghost
          @click="cancelChangePwd"
          :disabled="!isDataChange"
        >
          <template #icon>
            <reload-outlined />
          </template>
          重置
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import type { formDataType } from '../types/pass';
import { useUserStore } from '@/store/user';
// import { useRouter } from 'vue-router';
// import { Form } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue';
import { changePassword } from '@/api/avic/system/UserSettingApi';
import type { Rule } from 'ant-design-vue/es/form';
const { proxy }: any = getCurrentInstance(), //关键代码
  formRef = ref<FormInstance>(),
  formColLayout = proxy.$colLayout2, //关键代码
  userStore = useUserStore(),
  currentUser = computed(() => userStore.currentUser),
  // router = useRouter(),
  validateMessages: Record<string, Rule[]> = {
    oldPassword: [
      { required: true, message: '请输入旧密码！', trigger: 'blur' },
      { validator: oldPasswordValidator }
    ],
    newPassword: [
      { required: true, message: '请输入新密码！', trigger: 'blur' },
      { validator: validator }
    ],
    confirmpass: [
      { required: true, message: '请输入新密码！', trigger: 'blur' },
      { validator: checkConfirmPassword }
    ]
  },
  layout = {
    labelCol: { flex: '0 0 140px' },
    wrapperCol: { flex: '1 1 0' }
  },
  formData = reactive<formDataType>({
    oldPassword: '',
    newPassword: '',
    confirmpass: ''
  }),
  changePwdLoading = ref<boolean>(false),
  isDataChange = ref<boolean>(false),
  reqParams = {
    username: '',
    oldPassword: '',
    newPassword: ''
  },
  pwdS = ref<string>(''),
  pwdTip = ref<string>(''),
  backgroundw = ref<string>('background:#cccccc;display:none;'),
  backgroundm = ref<string>('background:#cccccc;display:none;'),
  backgrounds = ref<string>('background:#cccccc;display:none;');

function oldPasswordValidator(_rule, value) {
  if (value != '') {
    isDataChange.value = true;
  }
  return Promise.resolve();
}
/**
 * 检验密码强度（这里只针对了输入密码的长度进行了验证，具体校验规则还需再定）
 */

function validator(rule, value) {
  return passwordStrong(rule, value);
}
function passwordStrong(_rule, value) {
  if (value != '') {
    isDataChange.value = true;
  }
  if (value) {
    let m = 0;
    //匹配数字
    if (/\d+/.test(value)) {
      m++;
    }
    //匹配字母
    if (/[A-Za-z]+/.test(value)) {
      m++;
    }
    //匹配除数字字母外的特殊符号
    if (/[^0-9a-zA-Z]+/.test(value)) {
      m++;
    }

    if (value.length <= 6) {
      m = 1;
    }
    if (value.length <= 0) {
      m = 0;
    }
    switch (m) {
      case 1:
        pwdS.value = '弱';
        pwdTip.value = '安全程度';
        backgroundw.value = 'background:#f6dc94;';
        backgroundm.value = 'background:#e8e8e8;color:#e8e8e8;';
        backgrounds.value = 'background:#e8e8e8;color:#e8e8e8;';
        break;
      case 2:
        pwdS.value = '中';
        pwdTip.value = '安全程度';
        backgroundw.value = 'background:#f6dc94;';
        backgroundm.value = 'background:#bde3a4;';
        backgrounds.value = 'background:#e8e8e8;';
        break;
      case 3:
        pwdS.value = '强';
        pwdTip.value = '安全程度';
        backgroundw.value = 'background:#f6dc94;';
        backgroundm.value = 'background:#bde3a4;';
        backgrounds.value = 'background:#92d066;';
        break;
      default:
        backgroundw.value = 'background:#e8e8e8;display:none;';
        backgroundm.value = 'background:#e8e8e8;display:none;';
        backgrounds.value = 'background:#e8e8e8;display:none;';
        pwdS.value = '';
        pwdTip.value = '';
        break;
    }
    if (value === formData.oldPassword) {
      return Promise.reject('新密码与旧密码一样！');
    }
  } else {
    backgroundw.value = 'background:#e8e8e8;display:none;';
    backgroundm.value = 'background:#e8e8e8;display:none;';
    backgrounds.value = 'background:#e8e8e8;display:none;';
    pwdS.value = '';
    pwdTip.value = '';
  }
  reqParams.newPassword = proxy.$encrypt(value);
  return Promise.resolve();
}
function checkConfirmPassword(_rule, value) {
  if (value != '') {
    isDataChange.value = true;
  }
  if (value && value !== formData.newPassword) {
    return Promise.reject('两次输入不一致!');
  } else {
    return Promise.resolve();
  }
}
function handleChangePwd() {
  formRef.value.validate().then(() => {
    reqParams.username = currentUser.value.loginName;
    reqParams.oldPassword = proxy.$encrypt(formData.oldPassword);
    changePassword(reqParams)
      .then((res: any) => {
        changePwdLoading.value = false;
        if (res.code === '200') {
          proxy.$Modal.success({
            title: '修改密码成功，请重新登录！',
            okText: '确定',
            onOk: () => {
              // 修改密码后需要注销登录（否则换用户登录和菜单信息不会刷新），并location.href到登录否则页签会被缓存
              userStore.LOGOUT().then(() => {
                const basePath = proxy.$settings.routerOptions.base;
                if (basePath && basePath == '/') {
                  location.href = '/user/login';
                } else {
                  location.href = proxy.$settings.routerOptions.base + '/user/login';
                }
              });
            }
          });
        }
      })
      .catch(err => {
        proxy.$message.warning(err.message);
        changePwdLoading.value = false;
      });
  });
}
function cancelChangePwd() {
  formRef.value.resetFields();
  isDataChange.value = false;
}
</script>

<style scoped lang="less">
.change-password {
  height: calc(100vh - 160px);
  overflow: auto;

  .ant-form > .ant-row {
    padding-right: 48px;
  }
  .basic-title {
    padding: 20px;
    font-size: 16px;
  }
}

.pwd-security {
  display: flex;
  align-items: start;
  margin: 0 0 0 140px;
  padding: 0 5px;
  font-size: 12px;
  line-height: 12px;

  .pwdLi {
    display: block;
    width: 50px;
    margin: 0 1px 18px;
    color: white;
    text-align: center;
  }

  .pwdLi:first-child {
    border-radius: 8px 0 0 8px;
  }

  .pwdLi:nth-child(3) {
    border-radius: 0 8px 8px 0;
  }

  .pwdS {
    margin: 0;
    color: #f83;
  }
}
</style>
