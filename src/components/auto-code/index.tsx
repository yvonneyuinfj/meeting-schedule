import {
  getAutoCodeData,
  checkAutoCodeValue,
  generateAutoCodeValue
} from '@/api/avic/system/AutoCodeApi';
import { isContentEmpty } from './validate';
import { ref, watch, onBeforeMount, onMounted } from 'vue';
import dayjs from 'dayjs';
import { Form } from 'ant-design-vue';
const VISIBLE_FALSE = false; // 用于调试，设置为true的时候让dropdown常开
export default defineComponent({
  name: 'AvicAutoCode',
  props: {
    /** 编码值 */
    value: { type: String, default: null },
    /** 编码代码 */
    codeType: { type: String, required: true },
    /** 生成编码时需要的参数，通过此参数回溯编号对应的业务数据 */
    codeParam: { type: String, default: null },
    /** 初始化时自动生成编号 */
    autoGenerate: { type: Boolean, default: true },
    /** 清空可编辑码段 */
    allowClear: { type: Boolean, default: false },
    /** 禁用控件 */
    disabled: { type: Boolean, default: true },
    /**
     * 自动禁用组件
     * @todo 与autoDisabled参数有重复，需完善
     */
    autoDisabled: { type: Boolean, default: false },
    /** 预览态，仅在编码规则配置时使用 */
    previewable: { type: Boolean, default: false },
    /** 自定义生成码段值的方法，仅在编码规则配置时使用 */
    getSegmentData: { type: Function, default: null }
  },
  emits: ['change', 'input', 'update:value'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const visible = ref(VISIBLE_FALSE),
      loading = ref(false),
      segmentData = ref([]),
      formModel = ref({
        segmentData: []
      }),
      autoCode = ref(''),
      codeEditFlag = ref(false); // 后台编码管理所有码段 可编辑 配置

    const formItemContext = Form.useInjectFormItemContext();

    onMounted(() => {
      // autoCode.value = props.value;
    });

    watch(
      () => props.value,
      val => {
        if (val) {
          autoCode.value = val;
        }
      }
    );
    watch(autoCode, (val, oldVal) => {
      if (val !== oldVal) {
        emit('update:value', val);
        emit('change', val);
        // 触发表单字段的change校验
        formItemContext?.onFieldChange && formItemContext.onFieldChange();
      }
    });
    watch(
      () => props.codeType,
      val => {
        if (val) {
          init();
        }
      }
    );
    onBeforeMount(() => {
      init();
    });

    async function init() {
      if (!props.getSegmentData && !props.codeType) {
        return;
      }
      try {
        if (props.getSegmentData) {
          segmentData.value = await props.getSegmentData();
        } else {
          const { data } = await getAutoCodeData(props.codeType, props.codeParam);
          segmentData.value = data;
        }
        formModel.value.segmentData.splice(0);
        formModel.value.segmentData.push(...(segmentData.value?.map(parseSegmentData) ?? []));
        // 编码管理配置的整体是否可编辑标识 autoCodeEditFlag 的值为1 则标识整体可编辑
        codeEditFlag.value = segmentData.value.reduce((pre, cur) => {
          if (cur.autoCodeEditFlag == '1') {
            pre = true;
          }
          return pre;
        }, false);
        if (
          (props.disabled && !props.getSegmentData && !props.value && props.autoGenerate) ||
          !codeEditFlag.value
        ) {
          await setAutoCode(formModel.value.segmentData);
        }
      } catch (e) {
        // this.$error({ title: '自动编码初始化失败' });
      } finally {
        loading.value = false;
      }
    }
    function parseSegmentData({ codeValue, segmentType }) {
      if (segmentType === '1') {
        return typeof codeValue === 'string'
          ? JSON.parse(codeValue)?.[0]?.name
          : codeValue?.[0]?.name; // 默认取第一个选项
      } else {
        return codeValue;
      }
    }

    const segmentRenders = {
      1: renderSegmentType1,
      2: renderSegmentType2,
      3: renderSegmentType3,
      4: renderSegmentType4,
      5: renderSegmentType5,
      6: renderSegmentType6,
      7: renderSegmentType7,
      8: renderSegmentType8
    };
    function renderFormItem(config, index) {
      const { autoCodeEditFlag, autoIncreaseFlag, segmentValue, segmentType } = config;
      const segmentRender = segmentRenders[segmentType] ?? renderSegmentTypeOther;
      const getValue = () => formModel.value.segmentData[index];
      const setValue = val => formModel.value.segmentData.splice(index, 1, val);
      const rules = generateRules({
        autoCodeEditFlag,
        autoIncreaseFlag,
        segmentValue,
        segmentType
      });
      return (
        <a-col>
          <a-form-item name={['segmentData', `${index}`]} rules={rules} validateFirst>
            {segmentRender({ ...config, getValue, setValue }, index)}
          </a-form-item>
        </a-col>
      );
    }
    //分类码
    function renderSegmentType1(config) {
      const { autoCodeEditFlag, codeValue, getValue, setValue } = config;
      const tip = '分类码';
      const display = autoCodeEditFlag === '3' ? 'none' : '';
      const options = JSON.parse(codeValue);
      if (isContentEmpty(getValue())) {
        setValue(options?.[0]?.name);
      }

      const selectOptions = options?.map(({ name }) => (
        <a-select-option value={name}>{name}</a-select-option>
      ));
      const selectStyle = {
        display,
        minWidth: '80px'
      };
      const value = ref('');
      const getVal = getValue();
      value.value = getVal;
      return (
        <a-tooltip
          placement="top"
          v-slots={{
            title: () => {
              return tip;
            }
          }}
        >
          <a-select
            v-model={[value.value, 'value']}
            style={selectStyle}
            disabled={autoCodeEditFlag === '2'}
            getPopupContainer={trigger => trigger.parentNode}
            onChange={val => setValue(val)}
          >
            {selectOptions}
          </a-select>
        </a-tooltip>
      );
    }
    //流水码
    function renderSegmentType2(config) {
      const { autoCodeEditFlag, getValue, setValue } = config;
      const tip = '流水码';
      if (autoCodeEditFlag === '1') {
        const value = ref('');
        const getVal = getValue();
        value.value = getVal;
        return (
          <a-tooltip
            placement="top"
            v-slots={{
              title: () => {
                return tip;
              }
            }}
          >
            <a-input
              v-model={[value.value, 'value']}
              allowClear={true}
              onInput={({ target: { value } }) => setValue(value)}
            ></a-input>
          </a-tooltip>
        );
      } else {
        const display = autoCodeEditFlag === '3' ? 'none' : '';
        return (
          <a-tooltip
            placement="top"
            v-slots={{
              title: () => {
                return tip;
              }
            }}
          >
            <span style={{ display }}>{getValue()}</span>
          </a-tooltip>
        );
      }
    }
    //日期码
    function renderSegmentType3(config) {
      const { autoCodeEditFlag, codeValue, getValue, setValue } = config;
      const tip = '日期码';
      if (autoCodeEditFlag === '1') {
        const value = ref('');
        const getVal = getValue();
        value.value = getVal;
        return (
          <a-tooltip
            placement="top"
            v-slots={{
              title: () => {
                return tip;
              }
            }}
          >
            <a-input
              v-model={[value.value, 'value']}
              allowClear={true}
              onInput={({ target: { value } }) => setValue(value)}
            ></a-input>
          </a-tooltip>
        );
      } else {
        const display = autoCodeEditFlag === '3' ? 'none' : '';
        return (
          <a-tooltip
            placement="top"
            v-slots={{
              title: () => {
                return tip;
              }
            }}
          >
            <span style={{ display }}>{codeValue}</span>
          </a-tooltip>
        );
      }
    }
    //输入码
    function renderSegmentType4(config) {
      const { segmentValue, getValue, setValue } = config;

      let tip = '';
      let inputComp;
      if (segmentValue === '1') {
        tip = '输入码-字符串';
        const value = ref('');
        const getVal = getValue();
        value.value = getVal;
        inputComp = (
          <a-input
            v-model={[value.value, 'value']}
            allowClear={true}
            onChange={e => {
              setValue(e.target.value);
            }}
          ></a-input>
        );
      } else if (segmentValue === '2') {
        tip = '输入码-数值';
        const value = ref('');
        const getVal = getValue();
        value.value = getVal;
        inputComp = (
          <a-input
            v-model={[value.value, 'value']}
            allowClear={true}
            onChange={e => {
              setValue(e.target.value);
            }}
          ></a-input>
        );
      } else {
        tip = '输入码-日期';
        const value = ref('');
        const getVal = getValue();
        value.value = getVal;
        const defaultValue = ref(dayjs(getVal));
        inputComp = (
          <a-date-picker
            v-model={[defaultValue.value, 'value']}
            allowClear={true}
            getPopupContainer={trigger => trigger.parentNode}
            onChange={(_, dateString) => setValue(dateString)}
          ></a-date-picker>
        );
      }
      return (
        <a-tooltip
          placement="top"
          v-slots={{
            title: () => {
              return tip;
            }
          }}
        >
          {inputComp}
        </a-tooltip>
      );
    }
    //固定值
    function renderSegmentType5(config) {
      const { getValue } = config;
      const tip = '固定值';
      const value = getValue();
      return (
        <a-tooltip
          placement="top"
          v-slots={{
            title: () => {
              return tip;
            }
          }}
        >
          <span>{value}</span>
        </a-tooltip>
      );
    }
    //函数值
    function renderSegmentType6(config) {
      const { getValue } = config;
      const tip = '函数值';
      const value = getValue();
      return (
        <a-tooltip
          placement="top"
          v-slots={{
            title: () => {
              return tip;
            }
          }}
        >
          <span>{value}</span>
        </a-tooltip>
      );
    }
    // SQL语句 by cuijj 2021-09-14
    function renderSegmentType7(config) {
      const { codeValue } = config;
      const tip = 'SQL语句';
      return (
        <a-tooltip
          placement="top"
          v-slots={{
            title: () => {
              return tip;
            }
          }}
        >
          <span>{codeValue}</span>
        </a-tooltip>
      );
    }
    // rest服务 by cuijj 2021-09-14
    function renderSegmentType8(config) {
      const { codeValue } = config;
      const tip = 'Rest服务';
      return (
        <a-tooltip
          placement="top"
          v-slots={{
            title: () => {
              return tip;
            }
          }}
        >
          <span>{codeValue}</span>
        </a-tooltip>
      );
    }
    //其他
    function renderSegmentTypeOther(config) {
      const { getValue } = config;
      const tip = 'SQL语句';
      const value = getValue();
      return (
        <>
          <a-tooltip
            placement="top"
            v-slots={{
              title: () => {
                return tip;
              }
            }}
          >
            <span>{value}</span>
          </a-tooltip>
        </>
      );
    }

    const RulesGeneratorMap = {
      1: generateRulesForSegmentType1,
      2: generateRulesForSegmentType2,
      3: generateRulesForSegmentType3,
      4: generateRulesForSegmentType4,
      5: generateRulesForSegmentType5,
      6: generateRulesForSegmentType6,
      7: generateRulesForSegmentType7,
      8: generateRulesForSegmentType8
    };
    function generateRules(config) {
      const { segmentType } = config;
      const generator = RulesGeneratorMap[segmentType];
      return generator(config);
    }
    function generateRulesForSegmentType1() {
      return [{ required: true, message: '请选择分类码！', trigger: 'change' }];
    }
    function generateRulesForSegmentType2(config) {
      const { autoIncreaseFlag, segmentValue: _segmentValue } = config;
      const [segmentValue, valueStart] = `${_segmentValue}`.split(',');
      return [
        { required: true, message: '请输入流水码！', trigger: 'blur' },
        {
          validator: async (_, value) => {
            if (!/^\d+$/.test(value)) {
              return Promise.reject(new Error(`流水码只能输入数字！`));
            } else if (autoIncreaseFlag === 'Y' && Number(segmentValue) !== value?.length) {
              return Promise.reject(new Error(`流水码的长度是${segmentValue}个数字！`));
            } else if (autoIncreaseFlag !== 'Y' && Number(segmentValue) < value?.length) {
              return Promise.reject(new Error(`流水码的最大长度是${segmentValue}个数字！`));
            } else if (valueStart !== '' && parseInt(value, 10) < parseInt(valueStart, 10)) {
              return Promise.reject(new Error(`流水码应不小于${valueStart}！`));
            } else {
              return Promise.resolve();
            }
          },
          trigger: 'change'
        }
      ];
    }
    const PatternMap = {
      yyyy: /^(\d{4})$/,
      yyyyMM1: /^(\d{4})(0\d{1}|1[0-2])$/, //yyyyMM
      yyyyMM2: /^(\d{4})-(0\d{1}|1[0-2])$/, //yyyy-MM
      yyyyMM3: /^(\d{4})\/(0\d{1}|1[0-2])$/, //yyyy/MM
      yyyyMMdd1: /^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])$/, //yyyyMMdd
      yyyyMMdd2: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/, //yyyy-MM-dd
      yyyyMMdd3: /^(\d{4})年(0\d{1}|1[0-2])月(0\d{1}|[12]\d{1}|3[01])日$/, //yyyy年MM月dd日
      yyyyMMddHH1: /^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])(0\d{1}|1\d{1}|2[0-3])$/, //yyyyMMddHH
      yyyyMMddHH2: /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) (0\d{1}|1\d{1}|2[0-3])$/, //yyyy-MM-dd HH
      yyyyMMddHH3:
        /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) (0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/, //yyyy-MM-dd HH:mm
      yyyyMMddHH4:
        /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) (0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/ //yyyy-MM-dd HH:mm:ss
    };
    function generateRulesForSegmentType3(config) {
      const { segmentValue } = config;
      return [
        { required: true, message: '请输入日期码！', trigger: 'blur' },
        {
          validator: async (_, value) => {
            if (segmentValue === 'yyyy' && !PatternMap[segmentValue]?.test(value)) {
              return Promise.reject(new Error(`日期码格式应为${segmentValue}`));
            } else {
              return Promise.resolve();
            }
          },
          trigger: 'change'
        }
      ];
    }
    function generateRulesForSegmentType4(config) {
      const { segmentValue } = config;
      const rules = [];
      rules.push({ required: true, message: '请输入输入码！', trigger: 'blur' });
      // 字符
      if (segmentValue === '2') {
        rules.push({
          validator: async (_, value) => {
            if (!(value === '0' || /^[1-9]\d*$/.test(value))) {
              return Promise.reject(new Error(`数值输入码只能输入数字！`));
            } else {
              return Promise.resolve();
            }
          },
          trigger: 'change'
        });
      } else if (segmentValue === '1') {
        rules.push({
          validator: async (_, value) => {
            if (value?.includes('$')) {
              return Promise.reject(new Error(`字符输入码不能包含$字符!`));
            } else {
              return Promise.resolve();
            }
          },
          trigger: 'change'
        });
      }
      return rules;
    }
    function generateRulesForSegmentType5() {
      // TODO:
      return [];
    }
    function generateRulesForSegmentType6() {
      // TODO:
      return [];
    }
    function generateRulesForSegmentType7() {
      return [];
    }
    function generateRulesForSegmentType8() {
      return [];
    }

    function validateForm() {
      return new Promise(resolve => {
        proxy.$refs.form.validate().then(async valid => {
          resolve(valid);
        });
      });
    }
    async function setAutoCode(autoCodeData) {
      if (props.previewable) {
        // 设置值
        autoCode.value = autoCodeData.join('');
        visible.value = VISIBLE_FALSE;
        return;
      }
      try {
        const { isExists, expectMaxCodeValue, isBiggerThenjumpCodeMaxCount } =
          await checkAutoCodeValue(props.codeType, autoCodeData);
        if (isExists === 'false') {
          if (isBiggerThenjumpCodeMaxCount === 'false') {
            // 设置值
            autoCode.value = autoCodeData.join('');

            visible.value = VISIBLE_FALSE;
          } else {
            proxy.$message.warning(`当前流水码最大值不能超过【${expectMaxCodeValue}】，请修改！`);
          }
        } else {
          proxy.$message.warning('该编码已经存在！');
        }
      } catch (e) {
        proxy.$message.error('调用rest服务出错!');
      }
    }
    async function confirm() {
      if (!(await validateForm())) return;
      await setAutoCode(formModel.value.segmentData);
    }
    function cancel() {
      visible.value = VISIBLE_FALSE;
    }
    /** 生成并锁定唯一编码 */
    async function submitCode(formId) {
      if (!isContentEmpty(autoCode.value)) {
        const result = await generateAutoCodeValue(
          props.codeType,
          formModel.value.segmentData,
          formId ?? props.codeParam
        );
        if (result?.result == 'success') {
          autoCode.value = result.autoCodeValue;
          emit('input', result.autoCodeValue);
          emit('update:value', result.autoCodeValue);
          emit('change', result.autoCodeValue);
        }
        return result;
      } else {
        return { autoCodeValue: '' };
      }
    }
    /** 获取用户输入码段值，格式化后由后端生成并锁定编码 */
    function getSegmentValue() {
      if (!formModel.value.segmentData?.length) {
        return;
      }
      return ['', ...formModel.value.segmentData, ''].join('$$');
    }

    function visibleChange(val) {
      visible.value = VISIBLE_FALSE || val;
    }
    return {
      loading,
      autoCode,
      codeEditFlag,
      segmentData,
      renderFormItem,
      formModel,
      confirm,
      cancel,
      visible,
      visibleChange,
      submitCode,
      getSegmentValue
    };
  },
  render() {
    if (this.loading) return <a-spin></a-spin>;
    if (this.disabled || (this.autoDisabled && this.autoCode) || !this.codeEditFlag) {
      // 修复没有禁止编辑效果问题 by meizy 20210518
      return <a-input v-model={[this.autoCode, 'value']} disabled={true} readOnly={true}></a-input>;
    } else {
      const formItems = this.segmentData.map((data, index) => this.renderFormItem(data, index));
      const formLayout = 'inline';
      const formStyle = { padding: '10px 16px', margin: 'auto' };
      const formRef = 'form';
      const footer = (
        <a-row justify="end">
          <a-button type="primary" onClick={e => this.confirm(e)}>
            确认
          </a-button>
          <a-button style={{ marginLeft: '8px' }} onClick={() => this.cancel()}>
            返回
          </a-button>
        </a-row>
      );
      const dropdownSlots = {
        overlay: () => {
          return (
            <a-form ref={formRef} style={formStyle} layout={formLayout} model={this.formModel}>
              <a-row gutter={20} justify="start">
                {formItems}
              </a-row>
              {footer}
            </a-form>
          );
        }
      };
      const iconStyle = {
        color: '#C9CDD4',
        fontSize: '12px',
        display: this.autoCode ? 'block' : 'none'
      };
      const inputSlots = {
        suffix: () => {
          return <close-circle-outlined style={iconStyle} onClick={() => (this.autoCode = '')} />;
        }
      };
      return (
        <a-dropdown
          v-model={[this.visible, 'visible']}
          getPopupContainer={e => e.parentNode}
          overlayStyle={{ width: '100%' }}
          onVisibleChange={this.visibleChange}
          v-slots={dropdownSlots}
        >
          <a-input
            v-model={[this.autoCode, 'value']}
            placeholder="请点击进行设置"
            readOnly={true}
            onInput={({ target: { value } }) => (this.autoCode = value)}
            v-slots={inputSlots}
          />
        </a-dropdown>
      );
    }
  }
});
