<template>
  <!-- 表格组件 -->
  <div style="padding-bottom: 8px">
    <AvicTable
      ref="demoSubInsideFlow"
      table-key="demoSubInsideFlow"
      :height="300"
      :columns="columns"
      :row-key="record => record.id"
      :data-source="list"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 40,
        fixed: true
      }"
      :showTableSetting="false"
      :pageParameter="queryParam.pageParameter"
      :total="totalPage"
      :customRow="customRow"
      @change="handleTableChange"
    >
      <template v-if="!props.readOnly" #toolBarLeft>
        <a-space>
          <a-button
            v-if="bpmInstanceObject ? subTablePermission(['addSubTableButton']) : true"
            type="primary"
            title="添加"
            @click="handleAdd"
          >
            <template #icon>
              <plus-outlined />
            </template>
            添加
          </a-button>
          <a-button
            v-if="bpmInstanceObject ? subTablePermission(['deleteSubTableButton']) : true"
            danger
            :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
            title="删除"
            :loading="delLoading"
            @click="
              event => {
                handleDelete(selectedRowKeys, event);
              }
            "
          >
            <template #icon>
              <delete-outlined />
            </template>
            删除
          </a-button>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
        <AvicRowEdit
          v-if="['demoNotnull', 'demoCode', 'demoUnique'].includes(column.dataIndex)"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record[column.dataIndex]"
              :placeholder="'请输入' + column.title"
              style="width: 100%"
              @input="$forceUpdate()"
              @blur="blurInput($event, record, column.dataIndex)"
            ></a-input>
          </template>
        </AvicRowEdit>
        <!-- 选人框 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoUserId'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.demoUserId"
              :defaultShowValue="record.demoUserIdAlias"
              placeholder="请选择"
              type="userSelect"
              @callback="
                value => {
                  changeCommonSelect(value, record, 'demoUserId');
                }
              "
            />
          </template>
          <template #default>
            {{ record['demoUserIdAlias'] }}
          </template>
        </AvicRowEdit>
        <!-- 选部门 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoDeptId'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.demoDeptId"
              :defaultShowValue="record.demoDeptIdAlias"
              placeholder="请选择"
              type="deptSelect"
              @callback="
                value => {
                  changeCommonSelect(value, record, 'demoDeptId');
                }
              "
            />
          </template>
          <template #default>
            {{ record['demoDeptIdAlias'] }}
          </template>
        </AvicRowEdit>
        <!-- 选角色-->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoRoleId'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.demoRoleId"
              :defaultShowValue="record.demoRoleIdAlias"
              placeholder="请选择"
              type="roleSelect"
              @callback="
                value => {
                  changeCommonSelect(value, record, 'demoRoleId');
                }
              "
            />
          </template>
          <template #default>
            {{ record['demoRoleIdAlias'] }}
          </template>
        </AvicRowEdit>
        <!-- 选群组 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoGroupId'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.demoGroupId"
              :defaultShowValue="record.demoGroupIdAlias"
              placeholder="请选择"
              select-model="single"
              type="groupSelect"
              @callback="
                value => {
                  changeCommonSelect(value, record, 'demoGroupId');
                }
              "
            />
          </template>
          <template #default>
            {{ record['demoGroupIdAlias'] }}
          </template>
        </AvicRowEdit>
        <!-- 选岗位 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoPositionId'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicCommonSelect
              v-model:value="record.demoPositionId"
              :defaultShowValue="record.demoPositionIdAlias"
              placeholder="请选择"
              type="positionSelect"
              @callback="
                value => {
                  changeCommonSelect(value, record, 'demoPositionId');
                }
              "
            />
          </template>
          <template #default>
            {{ record['demoPositionIdAlias'] }}
          </template>
        </AvicRowEdit>
        <!-- 单选 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoRadio'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-radio-group
              v-model:value="record.demoRadio"
              @change="
                event => {
                  changeControlValue(event.target.value, record, 'demoRadio');
                }
              "
            >
              <a-radio
                :disabled="item.disabled === true"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
                v-for="item in demoRadioList"
              >
                {{ item.lookupName }}
              </a-radio>
            </a-radio-group>
          </template>
          <template #default>
            {{ record['demoRadioName'] }}
          </template>
        </AvicRowEdit>
        <!-- 单选按钮 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoRadioButton'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-radio-group
              v-model:value="record.demoRadioButton"
              button-style="solid"
              @change="
                event => {
                  changeControlValue(event.target.value, record, 'demoRadioButton');
                }
              "
            >
              <a-radio-button
                v-for="item in demoRadioButtonList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
                :disabled="item.disabled === true"
              >
                {{ item.lookupName }}
              </a-radio-button>
            </a-radio-group>
          </template>
          <template #default>
            {{ record['demoRadioButtonName'] }}
          </template>
        </AvicRowEdit>
        <!-- 复选框 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoCheckbox'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-checkbox-group
              v-model:value="record.demoCheckbox"
              button-style="solid"
              @change="
                value => {
                  changeControlValue(value, record, 'demoCheckbox');
                }
              "
            >
              <a-checkbox
                v-for="item in demoCheckboxList"
                :key="item.sysLookupTlId"
                :value="item.lookupCode"
                :disabled="item.disabled === true"
              >
                {{ item.lookupName }}
              </a-checkbox>
            </a-checkbox-group>
          </template>
          <template #default>
            {{ record['demoCheckboxName'] }}
          </template>
        </AvicRowEdit>
        <!-- 下拉框 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoSelect'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.demoSelect"
              placeholder="请选择"
              style="width: 100%"
              @change="value => changeControlValue(value, record, 'demoSelect')"
            >
              <a-select-option
                v-for="select in demoSelectList"
                :key="select.sysLookupTlId"
                :title="select.lookupName"
                :value="select.lookupCode"
                :disabled="select.disabled === true"
              >
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            {{ record['demoSelectName'] }}
          </template>
        </AvicRowEdit>
        <!-- 多选下拉框 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoSelectMultiple'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.demoSelectMultiple"
              mode="multiple"
              placeholder="请选择"
              style="width: 100%"
              @change="value => changeControlValue(value, record, 'demoSelectMultiple')"
            >
              <a-select-option
                v-for="select in demoSelectMultipleList"
                :key="select.sysLookupTlId"
                :title="select.lookupName"
                :value="select.lookupCode"
                :disabled="select.disabled === true"
              >
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            {{ record['demoSelectMultipleName'] }}
          </template>
        </AvicRowEdit>
        <!-- 密级 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'secretLevel'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-select
              v-model:value="record.secretLevel"
              placeholder="请选择"
              style="width: 100%"
              @change="value => changeControlValue(value, record, 'secretLevel')"
            >
              <a-select-option
                v-for="select in secretLevelList"
                :key="select.sysLookupTlId"
                :title="select.lookupName"
                :value="select.lookupCode"
                :disabled="select.disabled === true"
              >
                {{ select.lookupName }}
              </a-select-option>
            </a-select>
          </template>
          <template #default>
            {{ record['secretLevelName'] }}
          </template>
        </AvicRowEdit>
        <!-- 开关 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoSwitch'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-switch
              :checked="Boolean(text)"
              button-style="solid"
              @change="
                checked => {
                  changeSwitch(checked, record, 'demoSwitch');
                }
              "
            ></a-switch>
          </template>
          <template #default>
            <a-switch :checked="Boolean(text)" disabled button-style="solid"></a-switch>
          </template>
        </AvicRowEdit>
        <!-- 选数字框 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoNumber'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input-number
              v-model:value="record.demoNumber"
              :max="999999999999"
              :min="-999999999999"
              :precision="2"
              :step="0.01"
              placeholder="请输入数字"
              style="width: 100%"
            ></a-input-number>
          </template>
        </AvicRowEdit>
        <!-- 整数 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoInteger'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input-number
              v-model:value="record.demoInteger"
              :precision="0"
              :step="1"
              placeholder="请输入整数"
              style="width: 100%"
            ></a-input-number>
          </template>
        </AvicRowEdit>
        <!-- 日期 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoDate'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-date-picker
              v-model:value="record.demoDate"
              valueFormat="YYYY-MM-DD"
              placeholder="请选择日期"
            ></a-date-picker>
          </template>
        </AvicRowEdit>
        <!-- 时间 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoDateTime'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-date-picker
              v-model:value="record.demoDateTime"
              :show-time="true"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择时间"
            ></a-date-picker>
          </template>
        </AvicRowEdit>
        <!-- input框 -->
        <AvicRowEdit
          v-else-if="['demoPhone', 'demoEmail', 'demoWebsite'].includes(column.dataIndex)"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-input
              v-model:value="record[column.dataIndex]"
              :placeholder="'请输入' + column.title"
              style="width: 100%"
              @input="$forceUpdate()"
              @blur="blurInput($event, record, column.dataIndex)"
            ></a-input>
          </template>
        </AvicRowEdit>
        <!-- 多行文本 -->
        <AvicRowEdit
          v-else-if="column.dataIndex === 'demoTextarea'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <a-textarea
              v-model:value="record.demoTextarea"
              placeholder="请输入文本内容"
            ></a-textarea>
          </template>
        </AvicRowEdit>
        <!-- 弹窗选择 -->
        <!-- <AvicRowEdit
          v-else-if="column.dataIndex === 'demoModalSelect'"
          :record="record"
          :column="column.dataIndex"
        >
          <template #edit>
            <AvicModalSelect
              v-model:value="record.demoModalSelect"
              modalTitle="选择弹窗"
              placeholder="请选择弹窗"
              valueField="demoNotnull"
              showField="demoNotnull"
              :selectComponent="demoRowEditSelectComponent"
              :isMultiSelection="false"
              :allow-clear="true"
            />
          </template>
        </AvicRowEdit> -->
        <template v-else-if="column.dataIndex === 'action' && !props.readOnly">
          <a-button
            class="inner-btn"
            type="link"
            @click="
              event => {
                handleDelete([record.id], event);
              }
            "
          >
            删除
          </a-button>
        </template>
      </template>
    </AvicTable>
  </div>
</template>
<script lang="ts" setup>
import type { DemoSubInsideFlowDto } from '@/api/avic/demo/DemoSubInsideFlowApi'; // 引入模块DTO
import { listDemoSubByPage } from '@/api/avic/demo/DemoSubInsideFlowApi'; // 引入模块API
import flowUtils from '@/views/avic/bpm/bpmutils/FlowUtils.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
  // 主表选中项的keys集合
  mainId: {
    type: String,
    default: ''
  },
  // 只读
  readOnly: {
    type: Boolean,
    default: false
  },
  bpmInstanceObject: {
    type: Object
  },
  // 以弹窗方式打开流程详情页时，以组件传参时使用，存储来自prop或者url的参数信息
  bpmParams: {
    type: Object,
    required: false,
    default: null
  }
});
let columns = [
  {
    title: '必填',
    dataIndex: 'demoNotnull',
    key: 'demoNotnull',
    ellipsis: true,
    resizable: true,
    width: 100,
    customHeaderCell() {
      //必填设置
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '编码',
    dataIndex: 'demoCode',
    key: 'demoCode',
    ellipsis: true,
    resizable: true,
    width: 100
  },
  {
    title: '唯一值',
    dataIndex: 'demoUnique',
    key: 'demoUnique',
    ellipsis: true,
    resizable: true,
    width: 90,
    align: 'left',
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '用户',
    dataIndex: 'demoUserId',
    key: 'demoUserId',
    ellipsis: true,
    sorter: true,
    resizable: true,
    width: 120,
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '部门',
    dataIndex: 'demoDeptId',
    key: 'demoDeptId',
    sorter: true,
    ellipsis: true,
    resizable: true,
    width: 120
  },
  {
    title: '角色',
    dataIndex: 'demoRoleId',
    key: 'demoRoleId',
    ellipsis: true,
    resizable: true,
    width: 120
  },
  {
    title: '群组',
    dataIndex: 'demoGroupId',
    key: 'demoGroupId',
    ellipsis: true,
    resizable: true,
    width: 120
  },
  {
    title: '岗位',
    dataIndex: 'demoPositionId',
    key: 'demoPositionId',
    ellipsis: true,
    resizable: true,
    width: 120
  },
  {
    title: '单选',
    dataIndex: 'demoRadio',
    key: 'demoRadio',
    ellipsis: true,
    resizable: true,
    width: 120,
    align: 'center'
  },
  {
    title: '单选（按钮样式）',
    dataIndex: 'demoRadioButton',
    key: 'demoRadioButton',
    resizable: true,
    width: 280,
    align: 'center'
  },
  {
    title: '复选',
    dataIndex: 'demoCheckbox',
    key: 'demoCheckbox',
    resizable: true,
    width: 280,
    align: 'left'
  },
  {
    title: '下拉',
    dataIndex: 'demoSelect',
    key: 'demoSelect',
    ellipsis: true,
    resizable: true,
    width: 120,
    align: 'center'
  },
  {
    title: '下拉多选',
    dataIndex: 'demoSelectMultiple',
    key: 'demoSelectMultiple',
    ellipsis: true,
    resizable: true,
    width: 120,
    align: 'left'
  },
  {
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    resizable: true,
    width: 80,
    align: 'center',
    customHeaderCell() {
      return {
        ['class']: 'required-table-title'
      };
    }
  },
  {
    title: '开关',
    dataIndex: 'demoSwitch',
    key: 'demoSwitch',
    ellipsis: true,
    resizable: true,
    width: 80,
    align: 'center'
  },
  {
    title: '小数',
    dataIndex: 'demoNumber',
    key: 'demoNumber',
    ellipsis: true,
    resizable: true,
    width: 90,
    align: 'right'
  },
  {
    title: '整数',
    dataIndex: 'demoInteger',
    key: 'demoInteger',
    ellipsis: true,
    resizable: true,
    width: 90,
    align: 'right'
  },
  {
    title: '日期',
    dataIndex: 'demoDate',
    key: 'demoDate',
    ellipsis: true,
    resizable: true,
    width: 140,
    align: 'left'
  },
  {
    title: '日期时间',
    dataIndex: 'demoDateTime',
    key: 'demoDateTime',
    ellipsis: true,
    resizable: true,
    width: 200,
    align: 'left'
  },
  {
    title: '电话(正则)',
    dataIndex: 'demoPhone',
    key: 'demoPhone',
    ellipsis: true,
    resizable: true,
    width: 90,
    align: 'left'
  },
  {
    title: '邮箱(正则)',
    dataIndex: 'demoEmail',
    key: 'demoEmail',
    ellipsis: true,
    resizable: true,
    width: 90,
    align: 'left'
  },
  {
    title: '网址(正则)',
    dataIndex: 'demoWebsite',
    key: 'demoWebsite',
    resizable: true,
    width: 90,
    align: 'left'
  },
  {
    title: '多行文本',
    dataIndex: 'demoTextarea',
    key: 'demoTextarea',
    ellipsis: true,
    resizable: true,
    width: 90,
    align: 'left'
  },
  {
    title: '弹窗',
    dataIndex: 'demoModalSelect',
    key: 'demoModalSelect',
    resizable: true,
    width: 90,
    align: 'center'
  }
] as any;
const queryForm = ref<DemoSubInsideFlowDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {},
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const validateRules = {
  demoNotnull: [{ required: true, message: '必填不能为空' }],
  demoUnique: [{ required: true, message: '唯一值不能为空' }],
  demoUserId: [{ required: true, message: '用户不能为空' }],
  secretLevel: [{ required: true, message: '密级不能为空' }],
  demoPhone: [proxy.$validateRegExp('phone')],
  demoEmail: [proxy.$validateRegExp('email')],
  demoWebsite: [proxy.$validateRegExp('url')]
};
const demoSubInsideFlow = ref(null);
const subTableName = 'DEMOSUBFLOWINFO';
const list = ref([]); //表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const demoRadioList = ref([]); // 单选通用代码
const demoRadioButtonList = ref([]); // 单选按钮组通用代码
const demoCheckboxList = ref([]); // 复选通用代码
const demoSelectList = ref([]); // 单选通用代码
const demoSelectMultipleList = ref([]); // 下拉多选通用代码
const deletedData = ref([]); // 前台删除数据的记录
const formatArrayKeys = ['demoCheckbox', 'demoSelectMultiple']; // 多选控件的值需要格式化数据
const lookupParams = [
  { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
  { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoCheckbox', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' },
  { fieldName: 'demoSelectMultiple', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'secretLevel', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' }
];

//非只读状态添加操作列
if (!props.readOnly) {
  columns.push({
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    fixed: 'right',
    align: 'center'
  });
}

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区和表格所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  queryForm.value.demoMainId = props.mainId ? props.mainId : '-1';
  queryParam.searchParams = queryForm.value;
  listDemoSubByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      loading.value = false;
      // 查询的初始数据,保存时做比对
      initialList.value = proxy.$lodash.cloneDeep(list.value);
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 获取通用代码 */
function getLookupList() {
  proxy.$getLookupByType(lookupParams, result => {
    demoRadioList.value = result.demoRadio;
    demoRadioButtonList.value = result.demoRadioButton;
    demoCheckboxList.value = result.demoCheckbox;
    demoSelectList.value = result.demoSelect;
    demoSelectMultipleList.value = result.demoSelectMultiple;
  });
}
/** 获取当前用户对应的文档密级  */
function getUserFileSecretList() {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 获取修改的数据 */
function getChangedData() {
  deletedData.value.forEach(item => {
    item['operationType_'] = 'delete';
  });
  const changedData = proxy.$getChangeRecords(list, initialList);
  return deletedData.value.concat(changedData);
}
/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
    demoNotnull: '',
    demoUnique: '',
    demoUserId: '',
    demoDeptId: '',
    demoRoleId: '',
    demoGroupId: '',
    demoPositionId: '',
    demoRadio: '',
    demoRadioButton: '',
    demoCheckbox: [], // 复选框 初始值为空
    demoSelect: undefined, // 单选下拉框 初始值为空 需要设置为undefined
    demoSelectMultiple: [], // 多选下拉框 初始值为空 需要设置为空数组
    secretLevel: undefined,
    demoSwitch: '',
    demoNumber: '',
    demoInteger: '',
    demoDate: null, // 日期值为空，需要设置为null
    demoDateTime: null,
    demoPhone: '',
    demoEmail: '',
    demoWebsite: '',
    demoModalSelect: '',
    demoTextarea: '',
    editable: true // true为编辑中，false为未编辑
  };
  const newData = [...list.value];
  // 数据校验
  if (!validateRecordData(newData)) {
    return;
  }
  // 其他列编辑状态修改为false
  newData.forEach(item => {
    item.editable = false;
  });
  newData.unshift(item);
  list.value = newData;
}
/** 编辑 */
function handleEdit(record) {
  record.editable = true;
  record.operationType_ = record.operationType_ || 'update';
  // 数据转化为数组
  proxy.$formatValueToArray(record, formatArrayKeys);
  const newData = [...list.value];
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}
/** 删除处理逻辑*/
function handleDelete(ids, e) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  let newData = [...list.value];
  let deletedItems = [];
  for (let i = 0; i < ids.length; i++) {
    if (ids[i].indexOf('newLine') == -1) {
      // 缓存删除的后台数据
      deletedItems.push(newData.find(item => item['id'] == ids[i]));
    }
    newData = newData.filter(item => item['id'] !== ids[i]);
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  selectedRows.value = [];
  // 前台刷新表格
  list.value = newData;
  deletedData.value = deletedData.value.concat(deletedItems);
}
/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
function handleTableChange(pagination, _filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
/** 选人，选部门，选角色，选岗位，选组件的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}
/**控件变更事件 */
function changeControlValue(values, record, column) {
  let labels = [];
  if (Array.isArray(values)) {
    // 多选处理
    for (let i = 0; i < values.length; i++) {
      // 从对应的通用代码中查询对应的label
      const target = proxy[column + 'List'].find(item => values[i] === item.lookupCode);
      labels.push(target.lookupName);
    }
  } else {
    //单选处理
    const target = proxy[column + 'List'].find(item => values === item.lookupCode);
    labels.push(target.lookupName);
  }
  if (record) {
    record[column + 'Name'] = labels.join(',');
  }
}
/** 开关的值发生变化事件 */
function changeSwitch(checked, record, column) {
  const newData = [...list.value];
  const target = newData.find(item => record.id === item.id);
  if (target) {
    target[column] = Number(checked);
    list.value = newData;
  }
}
/** 输入框的值失去焦点 */
function blurInput(e, record, column) {
  proxy.$validateData(e.target.value, column, validateRules, record); // 校验数据
}
/** 批量数据校验 */
function validateRecordData(records) {
  let flag = true;
  for (let index in records) {
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, demoSubInsideFlow);
    if (!flag) {
      break;
    }
  }
  return flag;
}
/** 校验并执行回调函数 */
function validate(callback) {
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && validateRecordData(changedData)) {
    // 校验通过
    if (callback) {
      callback(true);
    }
  } else {
    // 校验未通过
    if (callback) {
      callback(false);
    }
  }
}
/** 设置子表权限是否可编辑*/
function subTablePermission(buttonFors) {
  const result = flowUtils.subTablePermissions(
    props.bpmInstanceObject,
    columns,
    subTableName,
    buttonFors
  );
  // 业务需求：自定义不可编辑
  if (props.bpmParams.customStatus && props.bpmParams.customStatus == 'nonEditable') {
    result.pageSettingData.map(tim => {
      tim.isCanEdit = false;
    });
    result.permissions = false;
  }
  columns = result.pageSettingData;
  return result.permissions;
}
defineExpose({
  validate,
  getChangedData
});
</script>
