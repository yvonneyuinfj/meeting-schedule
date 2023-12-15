<template>
  <div class="content-wrapper">
    <div class="table-wrapper">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOilSealWarn" label="是否参与油封期预警">
              <a-select v-model:value="form.ynOilSealWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与油封期预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="oilSealWarnDays" label="油封期提前预警天数">
              <a-input v-model:value="form.oilSealWarnDays" :maxLength="20" placeholder="请输入油封期提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynRecheckWarn" label="是否参与复验期预警">
              <a-select v-model:value="form.ynRecheckWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与复验期预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="recheckWarnDays" label="复验期提前预警天数">
              <a-input v-model:value="form.recheckWarnDays" :maxLength="20" placeholder="请输入复验期提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynEffectStockWarn" label="是否参与保管期预警">
              <a-select v-model:value="form.ynEffectStockWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与保管期预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="effectStockWarnDays" label="保管期提前预警天数">
              <a-input v-model:value="form.effectStockWarnDays" :maxLength="20" placeholder="请输入保管期提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynBacklogWarn" label="是否参与积压预警">
              <a-select v-model:value="form.ynBacklogWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与积压预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backlogWarnDays" label="积压提前预警天数">
              <a-input v-model:value="form.backlogWarnDays" :maxLength="20" placeholder="请输入积压提前预警天数" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOverstockWarn" label="是否参与超储预警">
              <a-select v-model:value="form.ynOverstockWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与超储预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="overstockWarnRatio" label="超储警戒系数%">
              <a-input v-model:value="form.overstockWarnRatio" :maxLength="20" placeholder="请输入超储警戒系数%" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynLackWarn" label="是否参与缺货预警">
              <a-select v-model:value="form.ynLackWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与缺货预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="lackWarnRatio" label="缺货警戒系数%">
              <a-input v-model:value="form.lackWarnRatio" :maxLength="20" placeholder="请输入缺货警戒系数%" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynOrderPointWarn" label="是否参与订货点预警">
              <a-select v-model:value="form.ynOrderPointWarn" :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" placeholder="请选择是否参与订货点预警">
                <a-select-option v-for="item in yNFlagList" :key="item.sysLookupTlId" :value="item.lookupCode">
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="orderPointWarnRatio" label="订货点警戒系数%">
              <a-input v-model:value="form.orderPointWarnRatio" :maxLength="20" placeholder="请输入订货点警戒系数%" />
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMdsInventoryConfigureForm, emits } from './ts/MdsInventoryConfigureForm'; // 引入表单ts
import { listMdsInventoryConfigure } from '@/api/avic/mms/mds/MdsInventoryConfigureApi'; // 引入模块API
const { proxy } = getCurrentInstance();
const props = defineProps({
  formId: {
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
  yNFlagList,
  loading,
  secretLevelList,
  saveForm
} = useMdsInventoryConfigureForm({
  props: props,
  emit: emit
});
const queryParam = reactive({
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  // 请求表格数据参数
  searchParams: {
    mdsInventoryId: ''
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
onMounted(() => {
  //重载子表数据
  getFormData(props.formId);
});
/**
   * 编辑、详情页面加载数据
   * @param {String} id 行数据的id
   */
function getFormData(mdsInventoryId) {
  loading.value = true;
  queryParam.searchParams.mdsInventoryId = mdsInventoryId ? mdsInventoryId : '-1';
  listMdsInventoryConfigure(queryParam)
    .then(async (res) => {
      if (res.success) {
        form.value = res.data || {};
        // 处理数据
        loading.value = false;
      }
    })
    .catch(() => {
      proxy.$message.warning('获取表单数据失败！');
      loading.value = false;
    });
}
watch(
  () => props.formId,
  newVal => {
    if (newVal) {
      getFormData(props.formId); // 查询表格数据
    }
  },
  { immediate: true }
);
</script>


