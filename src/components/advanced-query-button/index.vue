<template>
  <!-- :get-popup-container="triggerNode => triggerNode.parentElement" -->
  <a-dropdown-button type="primary" trigger="click">
    <template #overlay>
      <div class="more-search-box ant-dropdown-menu">
        <a-menu>
          <a-menu-item :title="item.name" :key="index" v-for="(item, index) in queryListRef">
            <span class="more-search-item" @click="handleQueryByStorage(item)">
              {{ item.name }}
            </span>
            <span class="close-icon" @click="event => handleDelete(event, item.id)">
              <avic-icon svg="avic-close-line" />
            </span>
          </a-menu-item>
        </a-menu>
        <div class="more-btn-grounp">
          <a-button type="link" key="queryAndSave" @click="handleQueryAndSave">保存并查询</a-button>
          <a-divider type="vertical"></a-divider>
          <a-button type="link" key="Save" @click="handleSave">保存筛选器</a-button>
        </div>
      </div>
    </template>
    <span @click="handleQuery">
      <search-outlined />
      查询
    </span>
  </a-dropdown-button>
  <AvicModal
    v-if="visible"
    :visible="true"
    title="保存筛选器"
    width="460px"
    height="84px"
    :adjustSize="false"
    :draggable="false"
    :centered="true"
    @cancel="closeModal"
  >
    <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
      <a-row>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="name" label="筛选器名称" has-feedback>
            <a-input v-model:value="form.name" :maxLength="510" placeholder="请输入名称" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button title="保存" type="primary" @click="saveForm">保存</a-button>
      <a-divider type="vertical"></a-divider>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import store from '@/utils/local-storage';
interface queryDto {
  name: string;
}
const { proxy } = getCurrentInstance();
const emits = defineEmits(['search', 'select']);
const props = defineProps({
  /** 唯一性标识，确定具体模块，用于区分不同模块记录的查询条件 */
  tableKey: String,
  /** 模块对应的高级查询对象数据 */
  queryForm: Object,
  /** 模块高级查询区折叠展开状态 */
  advanced: Boolean
});
const colLayout = proxy.$colLayout1; // 调用布局公共方法
const layout = {
  labelCol: { flex: '100px' },
  wrapperCol: { flex: '1' }
};
const form = ref<queryDto>({} as queryDto);
const formRef = ref();
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '名称不能为空', trigger: 'blur' }
    // { validator: (rule, value) => validateNameUnique(rule, value), trigger: 'change' }
  ]
};
const visible = ref(false);
const userStore = useUserStore();
const userName = userStore.currentUser.loginName;
//生成用户区分查询集合的唯一key
const storeKey = userName + '-' + props.tableKey + '-queryList';
let queryList = store.get(storeKey);
const queryListRef = ref([]);
if (queryList) {
  queryListRef.value = queryList;
}
function handleQuery() {
  emits('search');
}
const saveFlag = ref('');
function handleQueryAndSave() {
  visible.value = true;
  saveFlag.value = 'queryAndSave';
}
function handleSave() {
  visible.value = true;
  saveFlag.value = 'save';
}
function closeModal() {
  visible.value = false;
}
/** 异步校验唯一值唯一 */
// async function validateNameUnique(_rule, value) {
//   if (value) {
//     const searchList = queryListRef.value.filter(item => item.name == value);
//     if (searchList && searchList.length > 0) {
//       return Promise.reject('名称已存在!');
//     } else {
//       return Promise.resolve();
//     }
//   }
// }
function saveForm() {
  formRef.value.validate().then(() => {
    if (queryListRef.value) {
      const stroageValue = {
        id: proxy.$uuid(32),
        name: form.value.name,
        value: props.queryForm,
        advanced: props.advanced
      };
      queryListRef.value.push(stroageValue);
    } else {
      const stroageValue = {
        id: proxy.$uuid(32),
        name: form.value.name,
        value: props.queryForm,
        advanced: props.advanced
      };
      queryListRef.value = [stroageValue];
    }
    store.set(storeKey, queryListRef.value);
    closeModal();
    form.value = {} as queryDto;
    if (saveFlag.value == 'queryAndSave') {
      handleQuery();
    }
  });
}
function handleQueryByStorage(item) {
  const data = proxy.$lodash.cloneDeep(item);
  emits('select', data.value, data.advanced);
  closeModal();
  handleQuery();
}
function handleDelete(event, id) {
  // proxy.$confirm({
  //   title: '确认要删除选择的数据吗？',
  //   okText: '确定',
  //   cancelText: '取消',
  //   onOk: () => {
  //     const listData = proxy.$lodash.cloneDeep(queryListRef.value);
  //     const filterList = listData.filter(item => item.id != id);
  //     queryListRef.value = filterList;
  //     store.set(storeKey, queryListRef.value);
  //   }
  // });
  event.stopPropagation();
  const listData = proxy.$lodash.cloneDeep(queryListRef.value);
  const filterList = listData.filter(item => item.id != id);
  queryListRef.value = filterList;
  store.set(storeKey, queryListRef.value);
}
</script>
<style lang="less" scoped>
.more-search-box {
  width: 240px;
  overflow: hidden;
  border-radius: 4px;
  /deep/.ant-menu {
    min-height: 40px;
    max-height: 240px;
    overflow: auto;
    .ant-menu-item {
      height: 32px;
      padding: 0 8px;
      line-height: 32px;
      .ant-menu-title-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        vertical-align: middle;
        .more-search-item {
          flex: 1;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .close-icon {
          margin-left: auto;
          .svg-icon {
            vertical-align: -0.125em;
          }
        }
      }
    }
  }
  .more-btn-grounp {
    text-align: center;
    border-top: 1px solid #e5e6eb;
  }
}
</style>
