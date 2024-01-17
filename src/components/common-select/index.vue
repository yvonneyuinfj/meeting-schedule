<!--
  选择控件
  两个回调函数  callback 点击确定 close 点击关闭
-->
<template>
  <span class="avicit-select-box" @click="openSelect">
    <slot />
    <a-input
      v-if="!$slots.default"
      :value="select.names"
      :title="select.names"
      :disabled="disabled"
      :placeholder="placeholder"
      :auto-focus="autoFocus"
      @change.prevent="handleChange"
      @click="inputClick"
      @blur="inputBlur"
      @focus="inputFocus"
    >
      <template #suffix>
        <avic-icon v-if="type === 'userSelect'" svg="UserOutlined" color="#86909c" />
        <avic-icon v-if="type === 'deptSelect'" svg="PartitionOutlined" color="#86909c" />
        <avic-icon v-if="type === 'roleSelect'" svg="avic-contacts-line" color="#86909c" />
        <avic-icon v-if="type === 'groupSelect'" svg="TeamOutlined" color="#86909c" />
        <avic-icon
          v-if="type === 'positionSelect'"
          svg="avic-account-box-line"
          color="#86909c"
          style="font-size: 15px; height: 14px; line-height: 1"
        />
      </template>
    </a-input>
    <!--选人-->
    <UserSelect
      v-if="type === 'userSelect'"
      v-model:show="showApprove"
      :name="name"
      :title="title"
      :title-tips="titleTips"
      :search-placeholder="searchPlaceholder"
      :select-model="selectModel"
      :max-select="localMaxSelect"
      :default-value="internaldefaultValue"
      :model-change="select"
      :tab-show="tabShow"
      :view-scope="viewScope"
      :default-org-id="internalDefaultOrgId"
      :secret-level="secretLevel"
      :default-load-dept-id="defaultLoadDeptId"
      :default-load-group-id="defaultLoadGroupId"
      :default-load-role-id="defaultLoadRoleId"
      :default-load-position-id="defaultLoadPositionId"
      :view-system-user="viewSystemUser"
      :user-url="userUrl"
      :method-type="methodType"
      :user-search-url="userSearchUrl"
      :dept-tab-expand-level="deptTabExpandLevel"
      :search-num-limit="searchNumLimit"
      :custom-param="customParam || {}"
      :custom-search-param="customSearchParam || {}"
      :user-select-tabs="userSelectTabs"
      :get-init-user-info-url="getInitUserInfoUrl"
      :get-init-user-info-method="getInitUserInfoMethod"
      :moreUserInfo="moreUserInfo"
      @defaultBack="defaultBack"
      @callBack="confirm"
      @close="close"
    />
    <!--选部门-->
    <DeptSelect
      v-if="type === 'deptSelect' && ready"
      v-model:show="showApprove"
      :name="name"
      :title="title"
      :title-tips="titleTips"
      :search-placeholder="searchPlaceholder"
      :select-model="selectModel"
      :max-select="localMaxSelect"
      :default-value="internaldefaultValue"
      :model-change="select"
      :view-scope="viewScope"
      :default-org-id="internalDefaultOrgId"
      :default-load-dept-id="defaultLoadDeptId"
      :dept-level="deptLevel"
      :view-system-dept="viewSystemDept"
      :dept-url="deptUrl"
      :filter-group="filterGroup"
      :method-type="methodType"
      :dept-search-url="deptSearchUrl"
      :dept-expand-level="deptExpandLevel"
      :custom-param="customParam || {}"
      :custom-search-param="customSearchParam || {}"
      @defaultBack="defaultBack"
      @callBack="confirm"
      @close="close"
    />
    <!--选角色-->
    <RoleSelect
      v-if="type === 'roleSelect' && ready"
      v-model:show="showApprove"
      :name="name"
      :title="title"
      :title-tips="titleTips"
      :search-placeholder="searchPlaceholder"
      :select-model="selectModel"
      :max-select="localMaxSelect"
      :default-value="internaldefaultValue"
      :model-change="select"
      :view-scope="viewScope"
      :app-id="appId"
      :default-org-id="internalDefaultOrgId"
      :org-id="orgId"
      :role-url="roleUrl"
      :role-method-type="roleMethodType"
      :custom-param="customParam || {}"
      @defaultBack="defaultBack"
      @callBack="confirm"
      @close="close"
    />
    <!--选群组-->
    <GroupSelect
      v-if="type === 'groupSelect' && ready"
      v-model:show="showApprove"
      :name="name"
      :title="title"
      :title-tips="titleTips"
      :search-placeholder="searchPlaceholder"
      :select-model="selectModel"
      :max-select="localMaxSelect"
      :default-value="internaldefaultValue"
      :model-change="select"
      :view-scope="viewScope"
      :app-id="appId"
      :default-org-id="internalDefaultOrgId"
      :org-id="orgId"
      :group-url="groupUrl"
      :group-method-type="groupMethodType"
      @defaultBack="defaultBack"
      @callBack="confirm"
      @close="close"
    />
    <!--选岗位-->
    <PositionSelect
      v-if="type === 'positionSelect' && ready"
      v-model:show="showApprove"
      :name="name"
      :title="title"
      :title-tips="titleTips"
      :search-placeholder="searchPlaceholder"
      :select-model="selectModel"
      :max-select="localMaxSelect"
      :default-value="internaldefaultValue"
      :model-change="select"
      :view-scope="viewScope"
      :app-id="appId"
      :default-org-id="internalDefaultOrgId"
      :org-id="orgId"
      :position-url="positionUrl"
      :position-method-type="positionMethodType"
      @defaultBack="defaultBack"
      @callBack="confirm"
      @close="close"
    />
    <!--    &lt;!&ndash;选组织&ndash;&gt;-->
    <!--    <OrgSelect-->
    <!--      v-if="type === 'orgSelect' && ready"-->
    <!--      ref="avicCommonSelectOrgSelect"-->
    <!--      :show.sync="showApprove"-->
    <!--      :name="name"-->
    <!--      :title="title"-->
    <!--      :title-tips="titleTips"-->
    <!--      :search-placeholder="searchPlaceholder"-->
    <!--      :select-model="selectModel"-->
    <!--      :max-select="localMaxSelect"-->
    <!--      :default-value="internaldefaultValue"-->
    <!--      :model-change="select"-->
    <!--      :view-scope="viewScope"-->
    <!--      :app-id="appId"-->
    <!--      :default-org-id="internalDefaultOrgId"-->
    <!--      :org-id="orgId"-->
    <!--      :org-url="positionUrl"-->
    <!--      :method-type="positionMethodType"-->
    <!--      :custom-param="customParam || {}"-->
    <!--      :custom-search-param="customSearchParam || {}"-->
    <!--      @defaultBack="defaultBack"-->
    <!--      @callBack="confirm"-->
    <!--      @close="close"-->
    <!--    />-->
  </span>
</template>
<script setup lang="ts">
import { Form } from 'ant-design-vue';
import UserSelect from './UserSelect.vue';
import DeptSelect from './DeptSelect.vue';
import RoleSelect from './RoleSelect.vue';
import GroupSelect from './GroupSelect.vue';
import PositionSelect from './PositionSelect.vue';
import { getDeptAndPosition, getRoles, getOrg } from './api';
import { useUserStore } from '@/store/user';

const props = defineProps({
  /** 选择类型，用户：userSelect，部门：deptSelect，角色：roleSelect，群组： groupSelect，岗位：positionSelect*/
  type: {
    type: String as PropType<
      'userSelect' | 'deptSelect' | 'roleSelect' | 'groupSelect' | 'positionSelect'
    >,
    required: false,
    default: 'deptSelect'
  },
  /** 是否禁止输入 */
  disabled: { type: Boolean, required: false, default: false },
  /** 输入框是否自动获取焦点 */
  autoFocus: { type: Boolean, required: false, default: false },
  /** 输入框提示 */
  placeholder: { type: String, required: false, default: '' },
  /** 右侧列表已选标题文案*/
  name: { type: String },
  /** 标题 */
  title: { type: String },
  /** 弹窗标题中附加的辅助提示信息 */
  titleTips: { type: String },
  /** 搜索提示 */
  searchPlaceholder: { type: String },
  /** 单选 single ，多选 multi */
  selectModel: { type: String as PropType<'single' | 'multi'>, required: false, default: 'single' },
  /** 多选最多选择人数 */
  maxSelect: { type: Number, required: false, default: 0 },
  /** 字段长度,用于计算最多选人个数 */
  fieldLength: { type: Number, required: false, default: 0 },
  /** 默认值 */
  defaultValue: { required: false, default: null },
  /** 输入框中默认显示内容，通常用于编辑页面的回填 */
  defaultShowValue: { required: false, default: null },
  /** 返回数据 */
  value: { type: String, required: false },
  /** 组织范围 */
  viewScope: { type: String, required: false, default: '' },
  /** 应用id */
  appId: { type: String, required: false, default: '' },
  /** 默认加载指定组织下的数据 */
  defaultOrgId: { type: String, required: false, default: '' },
  /** 组织id */
  orgId: { type: String, required: false, default: '' },
  /** 默认下载部门id */
  defaultLoadDeptId: { type: String, required: false, default: '' },
  /** 默认加载群组id */
  defaultLoadGroupId: { type: String, required: false, default: '' },
  /** 默认加载角色id */
  defaultLoadRoleId: { type: String, required: false, default: '' },
  /** 默认加载岗位id */
  defaultLoadPositionId: { type: String, required: false, default: '' },
  /** 请求类型 */
  methodType: { type: String, required: false, default: 'post' },
  /** 用户请求接口地址 */
  userUrl: { type: String, required: false, default: '/appsys/common/select/getUserSelectList/v1' },
  /** 用户搜索请求接口地址 */
  userSearchUrl: {
    type: String,
    required: false,
    default: '/appsys/common/select/getUserSelectList/v1'
  },
  /** 部门请求接口地址 */
  deptUrl: { type: String, required: false, default: '/appsys/common/select/getDeptSelectList/v1' },
  /** 部门搜索请求接口地址 */
  deptSearchUrl: {
    type: String,
    required: false,
    default: '/appsys/common/select/getDeptSelectList/v1'
  },
  /** 自定义参数 */
  customParam: { type: Object },
  /** 自定义搜索参数 */
  customSearchParam: { type: Object },
  /** 是否默认选中当前登录用户 */
  defaultSelectSessionUser: { type: Boolean, required: false, default: false },
  /** 角色请求接口url */
  roleUrl: { type: String },
  /** 角色请求接口method */
  roleMethodType: { type: String },
  /** 群组请求接口url */
  groupUrl: { type: String },
  /** 群组请求接口method */
  groupMethodType: { type: String },
  /** 岗位请求接口url */
  positionUrl: { type: String },
  /** 岗位请求接口method */
  positionMethodType: { type: String },
  /** 组织请求接口url */
  orgUrl: { type: String },
  /** 组织请求接口method */
  orgMethodType: { type: String },
  /** 自定义初始化用户信息请求地址 */
  getInitUserInfoUrl: { type: String },
  /** 选人获取初始化部门信息请求类型 */
  getInitUserInfoMethod: { type: String },
  /** 是否显示无效部门 */
  viewSystemDept: { type: Boolean },
  /** 选部门初始展开层级 */
  deptExpandLevel: { type: Number },
  /** 部门最大展开层级 */
  deptLevel: { type: Number },
  /** 是否展示无效用户 */
  viewSystemUser: { type: Boolean },
  /** 选人人员密级过滤 */
  secretLevel: { type: String },
  /** 选人时是否显示tab */
  tabShow: { type: Boolean },
  /** 选人的部门tab页初始展开层级 */
  deptTabExpandLevel: { type: Number },
  /** 选人关键字查询时最大用户数限制 */
  searchNumLimit: { type: Number },
  /** 获取初始化角色的组织信息请求地址 */
  getInitRoleInfoUrl: { type: String },
  /** 获取初始化角色的组织信息请求类型 */
  getInitRoleInfoMethod: { type: String },
  /** 获取初始化群组的组织信息请求地址 */
  getInitGroupInfoUrl: { type: String },
  /** 获取初始化群组的组织信息请求类型 */
  getInitGroupInfoMethod: { type: String },
  /** 获取初始化岗位的组织信息请求地址 */
  getInitPositionInfoUrl: { type: String },
  /** 获取初始化岗位的组织信息请求类型 */
  getInitPositionInfoMethod: { type: String },
  /** 是否过滤群组 */
  filterGroup: { type: Boolean, required: false, default: false },
  /** 用户可选择的维度 */
  userSelectTabs: {
    type: Array,
    default: () => {
      return ['dept', 'group', 'role', 'position'];
    }
  },
  /** 表单控制窗口是否显示 */
  showSelect: { type: Boolean, default: true },
  /** 人员额外展示信息 */
  moreUserInfo: { type: Array, default: () => [] }
});
const showApprove = ref(false), // 窗口是否显示
  localMaxSelect = ref(0),
  internalDefaultOrgId = ref('0'), // 默认选中组织id
  ready = ref(true);
const formItemContext = Form.useInjectFormItemContext();
let select = reactive({ ids: '', names: '' }),
  internaldefaultValue = reactive({ ids: '', names: '' }); // 默认选中值

watch(
  () => props.fieldLength,
  newValue => {
    let idLength = 33; // 每一个用户id的长度
    localMaxSelect.value = parseInt((newValue + 1) / idLength);
  },
  { immediate: true }
);
watch(
  () => props.maxSelect,
  newValue => {
    localMaxSelect.value = newValue;
  },
  { immediate: true }
);
watch(
  () => props.defaultValue,
  newValue => {
    if (newValue) {
      select.ids = newValue.ids;
      select.names = newValue.names;
      internaldefaultValue.ids = newValue.ids;
      internaldefaultValue.names = newValue.names;
    } else {
      select.ids = '';
      select.names = '';
    }
  },
  { immediate: true }
);
watch(
  () => props.value,
  newValue => {
    if (!newValue) {
      select.ids = '';
      select.names = '';
    } else {
      select.ids = newValue;
    }
  },
  { immediate: true }
);
watch(
  () => props.defaultShowValue,
  newValue => {
    select.names = newValue;
  },
  { immediate: true }
);
watch(
  () => props.defaultOrgId,
  newValue => {
    internalDefaultOrgId.value = newValue;
  },
  { immediate: true }
);
watch(
  () => props.type,
  () => {
    ready.value = false;
    select.ids = '';
    select.names = '';
  }
);
onBeforeMount(() => {
  if (props.defaultOrgId) {
    internalDefaultOrgId.value = props.defaultOrgId;
  }
  if (select.ids && props.defaultSelectSessionUser) {
    selectSessionUser();
  }
  if (props.defaultShowValue) {
    select.names = props.defaultShowValue;
  }
});
const $emit = defineEmits([
  'change',
  'update:value',
  'input',
  'callback',
  'close',
  'click',
  'blur',
  'focus'
]);

// 禁止输入内容
function handleChange() {
  // 输入时打开弹框
  if (!props.disabled && !showApprove && props.showSelect) {
    showApprove.value = true;
  }
}

// 打开对应弹窗
function openSelect() {
  if (!props.disabled && props.showSelect) {
    showApprove.value = true;
  }
}

// 默认值回填
function defaultBack(value) {
  select.ids = value.ids;
  select.names = value.names;
}

// 点击确认
function confirm(value, selectRows = []) {
  select.ids = value.ids;
  select.names = value.names;
  //双向绑定
  $emit('input', value?.ids);
  // 空值也提交事件，以便清空表单项
  $emit('update:value', value?.ids);
  $emit('change', value?.ids);
  $emit('callback', value, selectRows);
  // 触发表单字段的change校验
  formItemContext?.onFieldChange && formItemContext.onFieldChange();
  if (showApprove) {
    showApprove.value = false;
  }
}

//点击取消
function close() {
  $emit('close');
  showApprove.value = false;
}

function inputClick() {
  $emit('click', showApprove, select);
}

function inputBlur() {
  $emit('blur', showApprove, select);

  // 触发表单字段的blur校验
  formItemContext?.onFieldBlur && formItemContext.onFieldBlur();
}

function inputFocus() {
  $emit('focus', showApprove, select);
}

async function selectSessionUser() {
  const userStore = useUserStore();
  let user = userStore.currentUser;
  let dept = null;
  let role = null;
  let org = null;
  if (props.type === 'deptSelect' || props.type === 'positionSelect') {
    dept = await getDeptAndPosition(user.id);
  } else if (props.type === 'roleSelect') {
    role = await getRoles(user.id);
  } else if (props.type === 'orgSelect') {
    org = await getOrg(user.orgId);
  }
  if (user != null) {
    try {
      setTimeout(() => {
        let newSelect = {};
        if (select.ids.length == 0) {
          if (props.type === 'userSelect') {
            newSelect = { ids: user.id, names: user.username };
          } else if (props.type === 'deptSelect') {
            let ids = '';
            let names = '';
            if (dept && dept.length > 0) {
              dept.map((deptItem, i) => {
                if (i == 0) {
                  ids += deptItem.id;
                  names += deptItem.deptName;
                }
              });
            }
            newSelect = { ids, names };
          } else if (props.type === 'roleSelect') {
            const ids = role?.map(({ id }) => id)?.join?.(';') ?? '';
            const names = role?.map(({ roleName }) => roleName)?.join?.(';') ?? '';
            newSelect = { ids, names };
            internalDefaultOrgId.value = user.curOrgId;
          } else if (props.type === 'positionSelect') {
            let ids = '';
            let names = '';
            if (dept && dept.length > 0) {
              dept.map((deptItem, i) => {
                if (i == 1) {
                  ids += deptItem.id;
                  names += deptItem.positionName;
                }
              });
            }
            newSelect = { ids, names };
          } else if (props.type === 'orgSelect') {
            let ids = '';
            let names = '';
            if (org.result) {
              ids = org.result.orgId;
              names = org.result.orgName;
            }
            newSelect = { ids, names };
          }
          internaldefaultValue = reactive(select);
          if (newSelect != null) {
            confirm(newSelect);
          }
        }
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
<style lang="less">
@import './style/base';
</style>
