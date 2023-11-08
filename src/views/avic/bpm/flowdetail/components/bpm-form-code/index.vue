<!--
  启动流程时多个流程需要选择要启动的流程
-->
<template>
  <a-modal
    :title="title"
    :visible="visible"
    :body-style="{ height: '310px' }"
    :mask-close-able="false"
    :centered="true"
    okText="确定"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div :style="{ height: '100%', overflow: 'hidden', position: 'relative' }">
      <AvicTable
        ref="formCodeTable"
        :columns="tableColumns"
        :data-source="data"
        :row-key="record => record.dbid"
        :row-selection="{
          type: 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          columnWidth: 0,
          fixed: true
        }"
        row-click-selection-type="radio"
        :show-table-setting="false"
        :customRow="
          record => {
            return {
              onDblclick: () => {
                handleRowDblClick(record);
              }
            };
          }
        "
      />
    </div>
  </a-modal>
</template>
<script>
import bpmUtils from '../../../bpmutils/FlowUtils';
import request from '@/utils/request';
const tableColumns = [
  {
    title: '流程名称',
    dataIndex: 'name'
  },
  {
    title: '版本',
    dataIndex: 'version',
    customRender: text => {
      return 'V' + text.value;
    }
  }
];
const rowKey = 'dbid';
export default {
  name: 'AvicBpmFormCode',
  components: {},
  props: {
    //prop接收传过来的参数
    formCode: {
      type: String,
      required: true //校验
    },
    //是否打开流程详情页面
    isOpenFlow: {
      type: Boolean,
      required: false, //校验
      default: false
    },
    // 是否电子表单
    isEform: {
      type: Boolean,
      default: false
    },
    // 电子表单视图编码
    viewCode: {
      type: String
    }
  },
  data() {
    return {
      title: '请选择您要启动的流程',
      visible: false,
      formcodeParam: {
        url: bpmUtils.baseurl + '/clientbpmdisplayaction/getprocessbyformcode/v1',
        parameter: {
          formCode: this.formCode,
          // 非电子表单查流程模型传formType:vue
          formType: this.isEform ? 'eformvue' : 'vue'
        },
        method: 'post'
      },
      tableColumns,
      data: [],
      selectCode: [],
      selectedRowKeys: [], // 选中数据主键集合
      params: ''
    };
  },
  mounted() {
    this.$emit('afterFormCodeLoad'); //渲染完毕调用父组件方法
  },
  methods: {
    loadFormcode(params) {
      this.params = params;
      this.getprocessByformcode();
    },
    /** 获取流程表单code */
    getprocessByformcode() {
      // “表单驱动形式的流程，配置流程启动条件后，发起流程时，启动条件没有生效”问题修复
      let parameter = this.formcodeParam.parameter;
      if (this.params?.formData) {
        parameter = {
          ...parameter,
          formData: JSON.stringify(this.params?.formData)
        };
      }
      request({
        url: this.formcodeParam.url,
        data: parameter,
        method: this.formcodeParam.method
      })
        .then(res => {
          if (res.success) {
            if (res.data.length == 1) {
              this.$emit('select', res.data[0], this.params);
              this.openFlow(res.data[0]);
              this.$emit('close');
            } else if (res.data.length == 0) {
              this.$message.error('该表单未关联流程!');
              this.$emit('close');
            } else {
              this.data = res.data;
              this.visible = true;
            }
          } else {
            this.$emit('close');
          }
        })
        .catch(() => {
          this.$message.error('获取表单关联流程失败!');
          this.$emit('close');
        });
    },
    handleOk() {
      if (this.selectCode.length < 1) {
        this.$message.warning('请选择您要启动的流程!');
        return;
      }
      this.visible = false;
      this.$emit('select', this.selectCode[0], this.params);
      this.openFlow(this.selectCode[0]);
      this.$emit('close');
    },
    handleCancel() {
      this.visible = false;
      this.$emit('close');
    },
    handleRowDblClick(row) {
      if (row[this.rowKey]) {
        this.selectCode = [row];
      }
      this.handleOk();
    },
    /** 勾选时触发 */
    onSelectChange(rowKeys, rows) {
      if (rowKeys.length > 0) {
        this.selectedRowKeys = rowKeys;
        this.selectCode = this.data.filter(tim => tim.dbid == rowKeys[0]);
      } else {
        this.selectedRowKeys = [];
        this.selectCode = [];
      }
    },
    openFlow(result) {
      if (this.isOpenFlow) {
        bpmUtils
          .addListStart(result[this.rowKey], result.name, this.viewCode || '') // 电子表单发起流程给详情页传递视图编码
          .then(res => {})
          .catch(() => {
            this.$message.error('启动流程失败!');
          });
      }
    }
  }
};
</script>
