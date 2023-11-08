<template>
  <div class="personal-info avic-base-form">
    <a-form
      ref="formRef"
      v-bind="layout"
      :model="formData"
      :rules="validateMessages"
      layout="horizontal"
    >
      <div class="basic-title">个人信息</div>
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="真实姓名" name="name">
            <a-input placeholder="平台管理员" v-model:value="formData.name" />
          </a-form-item>
          <a-form-item label="英文名" name="nameEn">
            <a-input placeholder="请输入英文名称" :maxlength="50" v-model:value="formData.nameEn" />
          </a-form-item>
          <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="formData.sex">
              <a-radio value="1">男</a-radio>
              <a-radio value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <!-- <a-col v-bind="formColLayout.cols">
          <a-form-item label="头像">
            <div style="display: flex; flex-direction: column">
              <a-upload
                name="avatar"
                accept=".jpg,.png,.gif,jpeg,.bmp"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="upload.url"
                :headers="upload.headers"
                :before-upload="beforeUpload"
                @change="handleChange"
                ref="image"
              >
                <img v-if="imageUrl" :src="imageUrl" class="user-avatar" alt="avatar" />
                <div v-else class="user-avatar defaultAvatar">
                  <avic-icon svg="UserOutlined" color="#ffffff" />
                </div>
                <a-button
                  danger
                  type="default"
                  title="删除"
                  @click.stop="handleDelete()"
                  style="display: block; margin-left: 9px; margin-top: 10px"
                >
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
              </a-upload>
            </div>
          </a-form-item>
        </a-col> -->
      </a-row>
      <div class="basic-title">联系方式</div>
      <a-row>
        <a-col v-bind="formColLayout.cols">
          <a-form-item label="手机号码" name="mobile">
            <a-input type="text" placeholder="请输入手机号码" v-model:value="formData.mobile" />
          </a-form-item>
          <a-form-item label="家庭电话" name="homeTel">
            <a-input type="text" placeholder="请输入家庭电话" v-model:value="formData.homeTel" />
          </a-form-item>
          <a-form-item label="邮箱地址" name="email">
            <a-input type="text" placeholder="请填写邮箱地址" v-model:value="formData.email" />
          </a-form-item>
          <a-form-item label="办公电话" name="officeTel">
            <a-input type="text" placeholder="请填写办公电话" v-model:value="formData.officeTel" />
          </a-form-item>
          <a-form-item label="传真" name="fax">
            <a-input type="text" placeholder="请填写传真" v-model:value="formData.fax" />
          </a-form-item>
          <a-form-item label="家庭住址" name="homeAddress">
            <a-textarea
              maxLength="30"
              :rows="4"
              placeholder="请填写家庭地址"
              v-model:value="formData.homeAddress"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-bind="formColLayout1.cols">
          <a-form-item label="">
            <a-button
              type="primary"
              html-type="submit"
              @click="handleSave"
              style="margin-right: 8px; margin-left: 140px"
            >
              <template #icon>
                <save-outlined />
              </template>
              保存
            </a-button>
            <a-button title="重置" @click="resetForm" :disabled="!isDataChange">
              <template #icon>
                <reload-outlined />
              </template>
              重置
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import type { formDataType } from '../types';
import { getUserInfo, updateUserInfo } from '@/api/avic/system/UserSettingApi'; // 引入模块API
import { useUserStore } from '@/store/user';
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }
const { proxy }: any = getCurrentInstance(),
  layout = {
    labelCol: { flex: '0 0 120px' },
    wrapperCol: { flex: '1 1 0' }
  },
  formColLayout = proxy.$colLayout2,
  formColLayout1 = proxy.$colLayout1,
  validateMessages: Record<string, Rule[]> = {
    name: [{ required: true, message: '请输入真实姓名！', trigger: 'blur' }],
    nameEn: [
      {
        pattern: /^[a-z A-Z]+$/,
        message: '请正确填写您的英文名!',
        trigger: ['blur', 'change']
      }
    ],
    sex: [{ message: '请选择性别！', trigger: 'blur' }],
    mobile: [proxy.$validateRegExp('phone')],
    homeTel: [proxy.$validateRegExp('homeTel')],
    email: [proxy.$validateRegExp('email')],
    officeTel: [proxy.$validateRegExp('tel')],
    homeAddress: [{ message: '请输入家庭住址！', trigger: 'blur' }],
    fax: [proxy.$validateRegExp('fax')]
  },
  token = useUserStore().token,
  // upload = {
  //   url: '/api/appsys/user/user/photo/upload',
  //   headers: {
  //     'X-Access-Token': token
  //   }
  // },
  // loading = ref<boolean>(false),
  imageUrl = ref<string>(''),
  formRef = ref<FormInstance>();
// const checkFileSize = ref<boolean>(false);
const state = reactive({
  formData: {
    name: '',
    nameEn: '',
    sex: '',
    mobile: '',
    homeTel: '',
    email: '',
    officeTel: '',
    fax: '',
    homeAddress: ''
  }, // 表单数据
  initFormData: {}, //初始化表单数据
  oldFormData: {}, //旧表单数据
  isChangeForm: false,
  isDataChange: false
});
let { formData, initFormData, isChangeForm, isDataChange } = toRefs(state);
onMounted(() => {
  getInfo();
  getTokenAvatar('/api/appsys/user/user/photo/get');
});
watch(
  () => formData,
  () => {
    if (isChangeForm.value) {
      isDataChange.value = true;
    }
  },
  { deep: true }
);
// 获取用户数据
function getInfo() {
  getUserInfo()
    .then((res: any) => {
      if (res.code === '200') {
        formData.value = {
          name: res.data.name,
          nameEn: res.data.nameEn,
          sex: res.data.sex,
          mobile: res.data.mobile,
          homeTel: res.data.homeTel,
          email: res.data.email,
          officeTel: res.data.officeTel,
          fax: res.data.fax,
          homeAddress: res.data.homeAddress
        };
        initFormData.value = { ...formData.value };
        setTimeout(() => {
          isChangeForm.value = true;
          // oldFormData.value=form.getFieldsValue();
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 获取用户头像
function getTokenAvatar(url: string) {
  let xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url, true);
  xmlhttp.responseType = 'arraybuffer';
  xmlhttp.setRequestHeader('X-Access-Token', token);

  // if (this.$getMicroToken()) {
  //   xmlhttp.setRequestHeader(
  //     'x-kong-api-key',
  //     'bearer ' + this.$getMicroToken()
  //   );
  // }
  xmlhttp.onload = function () {
    if (this.status == 200) {
      if (this.response.byteLength) {
        imageUrl.value =
          'data:image/png;base64,' +
          btoa(
            new Uint8Array(this.response).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
      }
    }
  };
  xmlhttp.send();
}

// 上传前验证
// function beforeUpload(file) {
//   const isImageFile =
//     file.type === 'image/jpeg' ||
//     file.type === 'image/jpg' ||
//     file.type === 'image/png' ||
//     file.type === 'image/bmp';
//   if (!isImageFile) {
//     proxy.$message.error('请选择图片类文件！');
//   }
//   const checkFileSize = file.size / 512 < 512;
//   if (!checkFileSize) {
//     proxy.$message.error('请选择小于521KB的头像图片！');
//   }
//   return isImageFile && checkFileSize;
// }
// // 上传
// function handleChange(info) {
//   if (info.file.status === 'uploading') {
//     // loading.value = true;
//     return;
//   }
//   if (info.file.status === 'done') {
//     getBase64(info.file.originFileObj, url => {
//       if (info.file.response.retCode == '200') {
//         imageUrl.value = url;
//         // loading.value = false;
//       } else {
//         proxy.$message.error(info.file.response.errorDesc || info.file.response.message);
//       }
//     });
//   }
// }
// function handleDelete() {
//   imageUrl.value = '';
// }
// 重置表单
function resetForm() {
  // formRef.value.resetFields();
  formData.value = { ...initFormData.value } as formDataType;
  setTimeout(() => {
    isDataChange.value = false;
  });
}
//保存
function handleSave() {
  formRef.value.validate().then(() => {
    updateUserInfo(formData.value)
      .then((res: any) => {
        if (res.success) {
          proxy.$message.success('保存成功！');
          isDataChange.value = false;
        }
      })
      .catch(() => {});
  });
}
</script>

<style lang="less" scoped>
.personal-info {
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  .basic-title {
    // display: block;
    padding: 20px;
    font-size: 16px;
  }
  .user-avatar {
    width: 100px;
    height: 100px;
    margin: -1px 0 0 -1px;
    padding: 5px;
    border-radius: 50%;
  }
  .defaultAvatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    background: #b8d4ff;
  }
}
</style>
