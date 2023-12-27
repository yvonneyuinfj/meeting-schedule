<template>
  <AvicModal
    :visible="true"
    title="添加"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        v-bind="layout"
        layout="horizontal"
      >
        <a-row :gutter="16">
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsVendorId" label="供应商信息表主键ID" has-feedback>
              <a-input
                v-model:value="form.mdsVendorId"
                :maxLength="64"
                :auto-focus="true"
                placeholder="请输入供应商信息表主键ID"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactUser" label="联系人" has-feedback>
              <AvicCommonSelect
                v-model:value="form.contactUser"
                type="userSelect"
                placeholder="请选择联系人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sex" label="性别">
              <a-select
                v-model:value="form.sex"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择性别"
              >
                <a-select-option
                  v-for="item in sexList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="jobName" label="岗位">
              <AvicCommonSelect
                v-model:value="form.jobName"
                type="positionSelect"
                placeholder="请选择岗位"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="positionName" label="职称">
              <a-input
                v-model:value="form.positionName"
                :maxLength="64"
                placeholder="请输入职称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactDept" label="所在部门">
              <AvicCommonSelect
                v-model:value="form.contactDept"
                type="deptSelect"
                placeholder="请选择所在部门"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="education" label="学历">
              <a-input
                v-model:value="form.education"
                :maxLength="64"
                placeholder="请输入学历"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="place" label="籍贯">
              <a-input
                v-model:value="form.place"
                :maxLength="256"
                placeholder="请输入籍贯"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="companyTel" label="公司电话">
              <a-input
                v-model:value="form.companyTel"
                :maxLength="40"
                placeholder="请输入公司电话"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="userTel" label="个人电话">
              <a-input
                v-model:value="form.userTel"
                :maxLength="40"
                placeholder="请输入个人电话"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fax" label="传真">
              <a-input
                v-model:value="form.fax"
                :maxLength="40"
                placeholder="请输入传真"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="email" label="EMAIL">
              <a-input
                v-model:value="form.email"
                :maxLength="128"
                placeholder="请输入EMAIL"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sendAddress" label="发货地址">
              <a-input
                v-model:value="form.sendAddress"
                :maxLength="1024"
                placeholder="请输入发货地址"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserId" label="编制人ID">
              <AvicCommonSelect
                v-model:value="form.editorUserId"
                type="userSelect"
                placeholder="请选择编制人ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserCode" label="编制人编码 ^ 员工编码">
              <AvicCommonSelect
                v-model:value="form.editorUserCode"
                type="userSelect"
                placeholder="请选择编制人编码 ^ 员工编码"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserName" label="编制人姓名">
              <AvicCommonSelect
                v-model:value="form.editorUserName"
                type="userSelect"
                placeholder="请选择编制人姓名"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptId" label="编制部门ID">
              <AvicCommonSelect
                v-model:value="form.editorDeptId"
                type="deptSelect"
                placeholder="请选择编制部门ID"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptCode" label="编制部门编码">
              <AvicCommonSelect
                v-model:value="form.editorDeptCode"
                type="deptSelect"
                placeholder="请选择编制部门编码"
              />
            </a-form-item>
          </a-col> -->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptName" label="编制部门名称">
              <AvicCommonSelect
                v-model:value="form.editorDeptName"
                type="deptSelect"
                placeholder="请选择编制部门名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDate" label="编制时间">
              <a-date-picker
                v-model:value="form.editorDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级"
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsVendorLinkmanForm, emits } from './ts/MdsVendorLinkmanForm'; // 引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  mainId: {
    // 主表选中项的id
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  sexList,
  secretLevelList,
  saveForm,
  closeModal
} = useMdsVendorLinkmanForm({
  props: props,
  emit: emit
});
</script>

