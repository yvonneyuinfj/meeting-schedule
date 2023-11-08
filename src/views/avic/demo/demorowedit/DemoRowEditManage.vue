<template>
  <div class="content-wrapper">
    <div class="top-search-box">
      <!-- 高级查询 -->
      <a-form v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item label="用户">
              <AvicCommonSelect
                v-model:value="queryForm.demoUserId"
                type="userSelect"
                select-model="single"
                placeholder="请选择用户"
                :defaultShowValue="queryForm.demoUserIdAlias"
                @callback="
                  result => {
                    queryForm.demoUserIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="角色">
              <AvicCommonSelect
                v-model:value="queryForm.demoRoleId"
                type="roleSelect"
                select-model="single"
                placeholder="请选择角色"
                :defaultShowValue="queryForm.demoRoleIdAlias"
                @callback="
                  result => {
                    queryForm.demoRoleIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item label="部门">
              <AvicCommonSelect
                v-model:value="queryForm.demoDeptId"
                type="deptSelect"
                select-model="single"
                placeholder="请选择部门"
                :defaultShowValue="queryForm.demoDeptIdAlias"
                @callback="
                  result => {
                    queryForm.demoDeptIdAlias = result.names;
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="密级">
              <a-select
                v-model:value="queryForm.secretLevel"
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
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="开始日期">
              <a-date-picker
                v-model:value="queryForm.demoDateBegin"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始日期"
                :disabled-date="
                  startValue => proxy.$disabledStartDate(startValue, queryForm.demoDateEnd)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" v-show="advanced">
            <a-form-item label="结束日期">
              <a-date-picker
                v-model:value="queryForm.demoDateEnd"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束日期"
                :disabled-date="
                  endValue => proxy.$disabledEndDate(endValue, queryForm.demoDateBegin)
                "
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols" style="margin-left: auto">
            <div class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <search-outlined />
                  查询
                </a-button>
                <a-button type="primary" @click="resetQuery" ghost>
                  <redo-outlined />
                  重置
                </a-button>
                <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                  {{ advanced ? '收起' : '展开' }}
                  <up-outlined v-if="advanced" />
                  <down-outlined v-else />
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格组件 -->
    <div class="table-wrapper">
      <AvicTable
        ref="demoRowEdit"
        table-key="demoRowEdit"
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
        :pageParameter="queryParam.pageParameter"
        :total="totalPage"
        :customRow="customRow"
        @change="handleTableChange"
        @refresh="getList"
      >
        <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['demoRowEdit:add']"
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
              v-hasPermi="['demoRowEdit:save']"
              type="primary"
              title="保存"
              :loading="saveLoading"
              @click="handleSaveAll"
            >
              <template #icon>
                <save-outlined />
              </template>
              保存
            </a-button>
            <a-button
              v-hasPermi="['demoRowEdit:del']"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              title="删除"
              :loading="delLoading"
              @click="
                event => {
                  handleDelete(selectedRowKeys, event, '');
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
        <template #toolBarRight>
          <a-input-search
            class="opt-btn-commonsearch"
            style="width: 200px"
            placeholder="请输入必填"
            :allow-clear="true"
            @search="handleKeyWordQuery"
          />
        </template>
        <template #bodyCell="{ column, text, record }">
          <AvicRowEdit
            v-if="column.dataIndex === 'demoUserId'"
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
          <AvicRowEdit
            v-else-if="
              ['demoNotnull', 'demoPhone', 'demoEmail', 'demoWebsite', 'demoUnique'].includes(
                column.dataIndex
              )
            "
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
          <AvicRowEdit
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
          </AvicRowEdit>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              v-show="record.editable"
              v-hasPermi="['demoRowEdit:save']"
              type="link"
              class="inner-btn"
              :disable="editingId !== ''"
              @click="handleSave(record)"
            >
              保存
            </a-button>
            <a-button
              v-show="!record.editable"
              v-hasPermi="['demoRowEdit:edit']"
              type="link"
              class="inner-btn"
              :disable="editingId !== ''"
              @click="handleEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              v-hasPermi="['demoRowEdit:del']"
              type="link"
              class="inner-btn"
              @click="
                event => {
                  handleDelete([record.id], event, 'row');
                }
              "
            >
              删除
            </a-button>
          </template>
        </template>
      </AvicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { DemoRowEditDto } from '@/api/avic/demo/DemoRowEditApi'; // 引入模块DTO
import {
  delDemoRowEditInfo,
  listDemoRowEditByPage,
  saveDemoRowEditInfo
} from '@/api/avic/demo/DemoRowEditApi'; // 引入模块API
import DemoRowEditSelect from './DemoRowEditSelect.vue'; // 引入弹窗选择页

const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '0 0 120px' },
  wrapperCol: { flex: '1 1 0' }
};
const colLayout = proxy.$colLayout4; // 调用布局公共方法
const columns = [
  {
    title: '必填',
    dataIndex: 'demoNotnull',
    key: 'demoNotnull',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    customHeaderCell() {
      // 必填设置
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
    minWidth: 120,
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
    minWidth: 120
  },
  {
    title: '角色',
    dataIndex: 'demoRoleId',
    key: 'demoRoleId',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '群组',
    dataIndex: 'demoGroupId',
    key: 'demoGroupId',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '岗位',
    dataIndex: 'demoPositionId',
    key: 'demoPositionId',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '单选',
    dataIndex: 'demoRadio',
    key: 'demoRadio',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '单选（按钮样式）',
    dataIndex: 'demoRadioButton',
    key: 'demoRadioButton',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '复选',
    dataIndex: 'demoCheckbox',
    key: 'demoCheckbox',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '下拉',
    dataIndex: 'demoSelect',
    key: 'demoSelect',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '下拉多选',
    dataIndex: 'demoSelectMultiple',
    key: 'demoSelectMultiple',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '密级',
    dataIndex: 'secretLevel',
    key: 'secretLevel',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '开关',
    dataIndex: 'demoSwitch',
    key: 'demoSwitch',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '小数',
    dataIndex: 'demoNumber',
    key: 'demoNumber',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'right'
  },
  {
    title: '整数',
    dataIndex: 'demoInteger',
    key: 'demoInteger',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'right'
  },
  {
    title: '日期',
    dataIndex: 'demoDate',
    key: 'demoDate',
    ellipsis: true,
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '日期时间',
    dataIndex: 'demoDateTime',
    key: 'demoDateTime',
    ellipsis: true,
    resizable: true,
    minWidth: 150,
    align: 'center'
  },
  {
    title: '电话(正则)',
    dataIndex: 'demoPhone',
    key: 'demoPhone',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '邮箱(正则)',
    dataIndex: 'demoEmail',
    key: 'demoEmail',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '网址(正则)',
    dataIndex: 'demoWebsite',
    key: 'demoWebsite',
    resizable: true,
    minWidth: 120
  },
  {
    title: '唯一值',
    dataIndex: 'demoUnique',
    key: 'demoUnique',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '弹窗',
    dataIndex: 'demoModalSelect',
    key: 'demoModalSelect',
    resizable: true,
    minWidth: 120,
    align: 'center'
  },
  {
    title: '多行文本',
    dataIndex: 'demoTextarea',
    key: 'demoTextarea',
    ellipsis: true,
    resizable: true,
    minWidth: 120
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
];
const queryForm = ref<DemoRowEditDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const validateRules = {
  demoNotnull: [{ required: true, message: '必填不能为空' }],
  demoSelect: [{ required: true, message: '下拉不能为空' }],
  demoUserId: [{ required: true, message: '用户不能为空' }],
  demoPhone: [proxy.$validateRegExp('phone')],
  demoEmail: [proxy.$validateRegExp('email')],
  demoWebsite: [proxy.$validateRegExp('url')],
  demoUnique: [{ required: true, message: '唯一值不能为空' }]
};
const demoRowEdit = ref(null);
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const initialList = ref([]); // 记录每次刷新得到的表格的数据
const editingId = ref(''); // 正在编辑中的数据
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const saveLoading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const secretLevelList = ref([]); // 密级通用代码
const demoRadioList = ref([]); // 单选通用代码
const demoRadioButtonList = ref([]); // 单选按钮组通用代码
const demoCheckboxList = ref([]); // 复选通用代码
const demoSelectList = ref([]); // 单选通用代码
const demoSelectMultipleList = ref([]); // 下拉多选通用代码
const lookupParams = [
  { fieldName: 'demoRadio', lookUpType: 'PLATFORM_SEX' },
  { fieldName: 'demoRadioButton', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoCheckbox', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'demoSelect', lookUpType: 'PLATFORM_DEGREE' },
  { fieldName: 'demoSelectMultiple', lookUpType: 'CHECK_TYPE' },
  { fieldName: 'secretLevel', lookUpType: 'PLATFORM_FILE_SECRET_LEVEL' }
];
const formatArrayKeys = ['demoCheckbox', 'demoSelectMultiple']; // 多选控件的值需要格式化数据
const demoRowEditSelectComponent = DemoRowEditSelect; // 弹窗选择组件

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区和表格所需通用代码
  getLookupList();
});

/** 查询数据 */
function getList() {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listDemoRowEditByPage(queryParam)
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
    secretLevelList.value = result.secretLevel;
  });
}
/** 高级查询 查询按钮操作 */
function handleQuery() {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询 重置按钮操作 */
function resetQuery() {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced() {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery(value) {
  const keyWord = {
    demoNotnull: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd() {
  let item = {
    id: 'newLine' + proxy.$uuid(),
    operationType_: 'insert',
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
    demoNotnull: '',
    demoPhone: '',
    demoEmail: '',
    demoWebsite: '',
    demoUnique: '',
    demoModalSelect: '',
    demoTextarea: '',
    editable: true // true为编辑中， false为未编辑
  };
  editingId.value = item.id;
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
  editingId.value = record.id;
  newData.forEach(item => {
    if (item.id !== record.id) {
      item.editable = false;
    }
  });
  list.value = newData;
}
/** 保存 */
function handleSave(record) {
  let target = proxy.$lodash.cloneDeep(record);
  // 单数据校验
  if (!validateRecordData([target])) {
    return;
  }
  // 保存前数据处理
  for (let key in target) {
    // 多选控件的数据，数组转化为字符串，
    if (Array.isArray(target[key])) {
      target[key] = target[key].join(',');
    }
  }
  editingId.value = '';
  saveDemoRowEditInfo([target]).then(res => {
    if (res.success) {
      getList();
      proxy.$message.success('保存成功！');
    } else {
      proxy.$message.error('保存失败！');
    }
  });
}
/** 批量保存 */
function handleSaveAll() {
  // 规避正在保存时连续点击
  if (saveLoading.value) return;
  // 开始处理数据
  saveLoading.value = true;
  // 获取改变和新增的数据
  const changedData = proxy.$getChangeRecords(list, initialList);
  if (changedData && changedData.length == 0) {
    proxy.$message.warning('请先修改数据！');
    saveLoading.value = false;
  } else if (changedData && validateRecordData(changedData)) {
    saveDemoRowEditInfo(changedData)
      .then(res => {
        if (res.success) {
          getList();
          proxy.$message.success('保存成功！');
          saveLoading.value = false;
        } else {
          proxy.$message.error('保存失败！');
          saveLoading.value = false;
        }
      })
      .catch(() => {
        saveLoading.value = false;
      });
  } else {
    saveLoading.value = false;
  }
}
/** 删除 */
function handleDelete(ids, e, type) {
  if (e) {
    e.stopPropagation(); // 阻止冒泡
  }
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '选择的'}数据吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      // 获取所有非新增的数据，执行后台删除逻辑，新增的数据直接界面删除
      const deleteIds = ids.filter(id => id.indexOf('newLine') == -1);
      if (deleteIds.length > 0) {
        return delDemoRowEditInfo(deleteIds)
          .then(() => {
            removeRecordByIds(ids);
          })
          .catch(() => {
            delLoading.value = false;
          });
      } else {
        removeRecordByIds(ids);
      }
    }
  });
}
/** 删除后更新list */
function removeRecordByIds(deleteIds) {
  let newData = [...list.value];
  let updateList = [...list.value];
  let delUpdateData = [];
  for (let i = 0; i < deleteIds.length; i++) {
    newData = newData.filter(item => item['id'] !== deleteIds[i]);
    delUpdateData = updateList.filter(
      item => item['id'] == deleteIds[i] && item['operationType_'] != 'insert'
    );
  }
  // 清空表格选中项
  selectedRowKeys.value = [];
  // 前台刷新表格
  list.value = newData;
  proxy.$message.success('删除成功！');
  delLoading.value = false;
  if (list.value.length == 0) {
    // 当前页数据被清空
    let currentPage = 1;
    if (queryParam.pageParameter.page > 1) {
      currentPage = queryParam.pageParameter.page - 1;
    }
    queryParam.pageParameter.page = currentPage;
    getList();
  } else {
    // 当前页数据没有全部删除时分页总条数为原total-删除数据中心非添加数据个数
    totalPage.value = totalPage.value - delUpdateData.length;
  }
}
/** 行点击事件 */
function customRow(record) {
  return {
    onClick: () => {
      handleEdit(record);
    }
  };
}
/** 选人，选部门，选角色，选岗位，选群组的值变化事件 */
function changeCommonSelect(value, record, column) {
  record[column + 'Alias'] = value.names;
}
/** 控件变更事件 */
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
    // 单选处理
    const target = proxy[column + 'List'].find(item => values === item.lookupCode);
    labels.push(target.lookupName);
  }
  if (record) {
    record[column + 'Name'] = labels.join(',');
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
    flag = proxy.$validateRecordData(records[index], validateRules, list.value, demoRowEdit);
    if (!flag) {
      break;
    }
  }
  return flag;
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
/** 勾选复选框时触发 */
function onSelectChange(rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
function handleTableChange(pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}
</script>
