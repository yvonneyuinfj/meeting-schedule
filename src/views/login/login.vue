<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="container_box">
        <div class="login_content">
          <div class="logo">
            <img src="~@/assets/img/logo.png" alt="logo" width="48px" height="48px" />
            <span>金航业务基础云平台</span>
            <span class="tag-box">
              <a-tag color="#1AA4EE">公开</a-tag>
              <!-- <a-tag color="#1e89ff">普通商密</a-tag>
              <a-tag color="#224ecd">核心商密</a-tag>
              <a-tag color="#fe8624">内部</a-tag>
              <a-tag color="#d40000">秘密</a-tag>
              <a-tag color="#7A0000">机密</a-tag> -->
            </span>
          </div>
          <div class="login_box">
            <div class="login_box_inner">
              <h1>用户登录</h1>
              <div class="main">
                <a-form id="formLogin" layout="vertical" class="user-layout-login">
                  <a-form-item v-bind="validateInfos.username">
                    <h4>用户名</h4>
                    <a-input
                      size="large"
                      v-model:value="modelRef.username"
                      placeholder="请输入用户名"
                      style="width: 100%"
                    >
                      <!-- <template #prefix>
                        <AvicIcon svg="user-outlined" avicIconClass="prefixIcon" />
                      </template> -->
                    </a-input>
                  </a-form-item>

                  <a-form-item v-bind="validateInfos.password">
                    <h4>密码</h4>
                    <a-input-password
                      v-model:value="modelRef.password"
                      size="large"
                      placeholder="请输入密码"
                    >
                      <!-- <template #prefix>
                        <AvicIcon svg="lock-outlined" avicIconClass="prefixIcon" />
                      </template> -->
                    </a-input-password>
                  </a-form-item>

                  <!-- <a-form-item>
                    <a-checkbox v-model:checked="modelRef.rememberMe">记住用户名</a-checkbox>
                  </a-form-item> -->

                  <a-form-item style="margin-top: 24px; margin-bottom: 16px">
                    <a-button
                      size="large"
                      type="primary"
                      block
                      html-type="submit"
                      class="login-button"
                      :loading="state.loginBtn"
                      @click="handleSubmit"
                    >
                      登 录
                    </a-button>
                    <p style="color: #909399; text-align: center; margin: 0">
                      技术支持：010-0000 0000
                    </p>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="copyright">&copy; 2015 航空工业信息技术中心（金航数码）版权所有</div>
      </div>
      <ChangePassword v-if="showChangePwd" :userInfo="modelRef" @close="showChangePwd = false" />
      <LicenseUpload v-if="showUploadModal" @close="showUploadModal = false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ResponseBaseData } from '@/api/model/baseModel';
import { notification, Form } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import type { RequestError } from '@/utils/request';
import { useUserStore } from '@/store/user';
import { getLincenseIsAdmin } from '@/api/user/login';
import ChangePassword from './ChangePassword.vue';
import LicenseUpload from './LicenseUpload.vue';
import store from '@/utils/local-storage';
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const state = reactive({
  loginBtn: false
});
const modelRef = reactive({
  rememberMe: true,
  username: '',
  password: ''
});
const { validate, validateInfos } = Form.useForm(
  modelRef,
  reactive({
    username: [{ required: true, message: '请输入用户名', type: 'string' }],
    password: [
      { required: true, message: '请输入密码', type: 'string', trigger: ['blur', 'change'] }
    ]
  })
);
onMounted(() => {
  modelRef.username = store.get('REMEMBER_ME') || '';
});
const showChangePwd = ref(false);
const showUploadModal = ref(false);
const requestFailed = (err: RequestError) => {
  if (err.code && err.code === '903') {
    showChangePwd.value = true;
    proxy.$message.warning(err.message || '初始登录密码需要修改');
    return;
  } else if (err.code && err.code === '911') {
    // 校验用户是否有权限上传授权文件
    let reqParams = { username: modelRef.username };
    getLincenseIsAdmin(reqParams).then((res: any) => {
      if (res.data) {
        // 打开上传平台授权文件页面
        showUploadModal.value = true;
      } else {
        proxy.$message.warning(res.message);
      }
    });
  }
  notification.error({
    message: '错误',
    description: err.message || '请求出现错误，请稍后再试',
    duration: 4
  });
};
const loginSuccess = () => {
  router.push(decodeURIComponent((route.query?.redirect_url as string) || '') || '/');
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const validateNames = ['username', 'password'];
  state.loginBtn = true;
  validate(validateNames)
    .then(values => {
      values.password = proxy.$encrypt(values.password);
      userStore
        .LOGIN({
          ...values
        })
        .then((res: ResponseBaseData<any>) => {
          if (modelRef.rememberMe) {
            store.set('REMEMBER_ME', values.username);
          } else {
            store.set('REMEMBER_ME', '');
          }
          const loginUser = res.data.userInfo;
          const consoleType = loginUser.consoleType;
          if (consoleType == '0' && proxy.$settings.consoleUrl) {
            let consoleUrl = proxy.$settings.consoleUrl;
            consoleUrl = consoleUrl.endsWith('/') ? consoleUrl : `${consoleUrl}/`;
            window.name = 'console';
            window.open(
              `${consoleUrl}access-from-portal?access_token=${res.data.token}&redirect_url=/backstage`,
              'console'
            );
          } else {
            window.name = 'portal';
            loginSuccess();
          }
        })
        .catch(err => {
          requestFailed(err);
        })
        .finally(() => {
          state.loginBtn = false;
        });
    })
    .catch((/*err*/) => {
      // 屏蔽错误处理
      // requestFailed(err);
      state.loginBtn = false;
    });
};
</script>

<style lang="less" scoped>
.user-layout-login :deep(.ant-tabs) {
  .ant-tabs-nav::before {
    border-bottom: none;
  }
}

#userLayout.user-layout-wrapper {
  height: 100%;
  .container {
    background: url('~@/assets/img/login.png') no-repeat left top;
    background-size: auto 100%;
    background-color: #3e7bf7;
    position: relative;
    width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    .container_box {
      height: 100%;
    }
    .logo {
      color: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 44px;

      svg,
      img {
        width: 56px;
        height: 56px;
        margin-right: 12px;
      }
      > span {
        font-size: 36px;
        font-weight: 600;
        font-family: 'Alibaba-PuHuiTi-Bold';
      }

      .tag-box {
        display: inline-flex;
        span {
          font-size: 14px;
          padding: 0 8px;
          border-radius: 12px;
          display: inline-block;
          text-align: center;
          font-weight: normal;
          margin-bottom: 14px;
          margin-left: 8px;
        }
      }
    }
    /deep/.ant-input:focus,
    .ant-input-focused {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px #ddefff;
    }

    /deep/.ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px #ddefff;
    }
    /deep/.ant-input:hover,
    .ant-input-affix-wrapper:hover {
      border-color: #7fc1ff;
    }
    /deep/.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
      border-color: #7fc1ff;
    }
    button.login-button {
      width: 100%;
      height: 36px;
      background: #1890ff;
      border-color: #1890ff;
      margin-top: 8px;
      margin-bottom: 32px;
    }

    .login_content {
      position: absolute;
      top: 50%;
      right: 10%;
      margin-top: -300px;
      h4 {
        color: #606266;
      }
    }
    .login_box {
      width: 462px;
      background-color: #fff;
      border-radius: 8px;
      padding: 32px 36px 0 36px;
      display: flex;
      align-items: center;
      float: right;
      h1 {
        margin-bottom: 60px;
        font-size: 22px;
        color: #1d2129;
        font-weight: 600;
      }
      .ant-input-affix-wrapper-lg,
      .ant-input-lg {
        height: 36px;
        line-height: 36px;
        padding: 4px 8px;
      }
      .login_box_inner {
        width: 100%;
        h1 {
          margin-bottom: 60px;
          font-size: 22px;
          color: #1d2129;
          font-weight: 600;
        }
      }
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 24px;
      color: #fff;
      text-align: center;

      .copyright {
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
