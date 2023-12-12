<!-- 增加操作栏 2023-11-10 lvmin 
<template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['tpmArea:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['tpmArea:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
          </a-space>
</template>-->
<template>
  <div class="content-form">
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentId" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.parentId"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="areaCode" label="区域编号">
              <a-input v-model:value="form.areaCode" :auto-focus="true" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="areaName" label="区域名称">
              <a-input v-model:value="form.areaName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptId" label="使用单位">
              <AvicCommonSelect
                v-model:value="form.useDeptId"
                type="deptSelect"
                :defaultShowValue="form.useDeptIdAlias"
                disabled
              />
            </a-form-item>
          </a-col> 
          <!--<a-col v-bind="colLayout.cols">
            <a-form-item name="useDeptName" label="使用单位名称">
              <AvicCommonSelect
                v-model:value="form.useDeptName"
                type="deptSelect"
                :defaultShowValue="form.useDeptNameAlias"
                disabled
              />
            </a-form-item>
          </a-col>隐藏id lvmin 2023-11-16-->
          <a-col v-bind="colLayout.cols">
            <a-form-item name="detailAddress" label="详细地址">
              <a-input v-model:value="form.detailAddress" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="排序">
              <a-input-number
                v-model:value="form.treeSort"
min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { useTpmAreaForm, emits } from './ts/TpmAreaForm'; //引入表单ts
const props = defineProps({
  formId: {
    type: String,
    default: ''
  },
  parentId: {
    type: String,
    default: ''
  },
  parentTitle: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  layout,
  colLayout,
  loading,
  secretLevelList,
  baseUrl,
  reloadDetail
} = useTpmAreaForm({
  props: props,
  emit: emit
});
defineExpose({
  reloadDetail
});
</script>
<style lang="less" scoped>
.content-form {
  max-height: 100%;
  padding: 24px 24px 50px 24px;
  overflow: auto;
}
</style>
