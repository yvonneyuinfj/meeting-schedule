<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classCode" label="大类编码" has-feedback>
              <a-input
                v-model:value="form.classCode"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入大类编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classType" label="大类类型" has-feedback>
              <a-select
                v-model:value="form.classType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择大类类型"
              >
                <a-select-option
                  v-for="item in classTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="className" label="大类名称" has-feedback>
              <a-input
                v-model:value="form.className"
                :maxLength="256"
                placeholder="请输入大类名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classAlias" label="别称">
              <a-input
                v-model:value="form.classAlias"
                :maxLength="256"
                placeholder="请输入别称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentClassId" label="父级分类">
              <AvicTreeSelect
                v-model:value="form.parentClassId"
                ref="treeSelectRef"
                :baseUrl="baseUrl"
                :parentId="parentId"
                :parentTitle="parentTitle">
              </AvicTreeSelect>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="innerOrder" label="排序序号" has-feedback>
              <a-input-number
                v-model:value="form.innerOrder"
                :min="0"
                :max="99999999"
                :precision="0"
                :step="1"
                placeholder="请输入排序序号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="levelClassCode" label="层级编码">
              <a-input
                v-model:value="form.levelClassCode"
                :maxLength="128"
                placeholder="请输入层级编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="classIndexTreeNo" label="物料大类树状索引">
              <a-input
                v-model:value="form.classIndexTreeNo"
                :maxLength="2048"
                placeholder="请输入物料大类树状索引"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="是否有效" has-feedback>
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否有效"
              >
                <a-select-option
                  v-for="item in validFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynItemSerialNo" label="是否带小编号标识" has-feedback>
              <a-select
                v-model:value="form.ynItemSerialNo"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否带小编号标识"
              >
                <a-select-option
                  v-for="item in ynItemSerialNoList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynCheck" label="是否检验标识" has-feedback>
              <a-select
                v-model:value="form.ynCheck"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否检验标识"
              >
                <a-select-option
                  v-for="item in ynCheckList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynRelSeqCatalog" label="是否关联工序配套目录" has-feedback>
              <a-select
                v-model:value="form.ynRelSeqCatalog"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否关联工序配套目录"
              >
                <a-select-option
                  v-for="item in ynRelSeqCatalogList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
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
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-form-item
              name="classDesc"
              label="大类说明"
            >
              <a-textarea
                v-model:value="form.classDesc"
                :rows="2"
                :maxLength="4000"
                placeholder="请输入大类说明"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="treeSort" label="树节点排序号（本级）" has-feedback>
              <a-input
                v-model:value="form.treeSort"
                :maxLength="22"
                placeholder="请输入树节点排序号（本级）"
              />
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
import { useMdsItemClassForm, emits } from './ts/MdsItemClassForm'; //引入表单ts
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
  rules,
  layout,
  colLayout,
  loading,
  classTypeList,
  validFlagList,
  ynItemSerialNoList,
  ynCheckList,
  ynRelSeqCatalogList,
  secretLevelList,
  baseUrl,
  saveForm,
  closeModal
} = useMdsItemClassForm({
  props: props,
  emit: emit
});
</script>
<style lang="less" scoped>
.content-form {
  max-height: 100%;
  padding: 24px 24px 50px 24px;
  overflow: auto;
}
</style>
