import { Modal, message } from 'ant-design-vue';
import lodash, { isEqual, differenceWith } from 'lodash';
import dayjs from 'dayjs';
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js';
import { getProfileValueByCode } from '@/api/avic/system/CommonApi';
import { settings } from '@/settings';
import { getAllLookUpData, getUserFileSecretList } from '@/api/avic/system/LookUpApi';
/**
 * 登录密码加密
 * @param {String} txt 待加密字符串
 * @returns {String} 加密结果
 */
export function encrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(settings.publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

/**
 * 随机生成数字
 * @param min 最小值
 * @param max 最大值
 * @return int 生成后的数字
 */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1;
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm';
  let str = '';
  for (let i = 0; i < length; i++) {
    const num = randomNumber(0, chats.length - 1);
    str += chats[num];
  }
  return str;
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function uuid(length: any) {
  if (!length) {
    length = 32;
  }
  const chats = '0123456789abcdefghijklmnopqrstuvwxyz';
  return randomString(length, chats);
}

/**
 * 全局的错误提示框
 */
export const modalError = (function () {
  let visible = false;
  return function ({ title, content, okText, onOk }) {
    if (visible) return;
    visible = true;
    Modal.error({
      title,
      content,
      okText,
      mask: false,
      onOk: () => {
        visible = false;
        onOk && onOk();
      }
    });
  };
})();

/**
 * 批量获取通用代码集合
 * @param lookupParams
 * @param callback
 */
export function getLookupByType(lookupParams, callback) {
  getAllLookUpData({ params: lookupParams })
    .then(res => {
      callback(res.data);
    })
    .catch(() => {
      message.error('通用代码获取失败，请重新打开！');
    });
}

/**
 * 获取用户文档密级
 * @param callback
 */
export function getUserFileSecretLevelList(callback) {
  getUserFileSecretList()
    .then(res => {
      callback(res.data);
    })
    .catch(() => {
      message.error('读取文档密级选项失败');
    });
}

/**
 * 根据编码获取系统参数配置
 * @param profileCode 系统参数的配置文件代码
 * @returns 配置文件值
 */
export async function getProfileValue(profileCode: string): Promise<string | Array<any>> {
  const response = await getProfileValueByCode(profileCode);
  return response?.data;
}

/**
 * 判断是否为空
 * @param obj
 * @returns
 */
export function objIsNotBlank(obj) {
  if (
    obj !== undefined &&
    obj !== null &&
    obj !== '' &&
    obj !== 'undefined' &&
    typeof obj !== undefined
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * 校验json对象中是否全部为空
 * @param jsonObj
 * @returns
 */
export function checkJsonIsAllBlank(jsonObj) {
  if (Object.keys(jsonObj).length == 0) {
    return true;
  } else {
    for (const key in jsonObj) {
      if (objIsNotBlank(jsonObj[key])) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 根据传入的占位符返回格式化后的日期
 * @param dataStr
 * @param pattern
 * @returns
 */
export const dateFormat = (dataStr: string | number, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(dataStr).format(pattern);
};

/**
 * 返回当前时间
 * @param dataStr
 * @returns
 */
export const dateFormatNow = (dataStr: string | number) => {
  return dayjs(dataStr).fromNow();
};

/**
 * 格式化时间
 * @param {时间值} value
 * @param {时间格式化形式} format
 */
export function formatDate(value, format) {
  if (value) {
    return dayjs(value).format(format);
  }
}

/**
 * 数字保留小数位数超出禁止输入
 * @param {数值} value
 * @param {保留小数位数} precision
 */
export function formatNumber(value, precision) {
  if (value.indexOf('.') < 0) {
    return value;
  } else {
    const num = precision ? precision + 1 : 3;
    const newValue = value.substr(0, value.indexOf('.') + num);
    return newValue;
  }
}

/**
 * 将整数部分逢三一断
 * @param value
 * @return string
 */
export const NumberFormat = (value?: string | number): string => {
  return value ? value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0';
};

/**
 * 数字转换为以万为单位的字符串
 * @param val
 * @returns
 */
export const FormatWan = (val: number): [number, string] | null => {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return null;
  let result = [val, ''] as [number, string];
  if (val > 10000) {
    result = [Math.floor(val / 10000), '万'];
  }
  return result;
};

/**
 * 日期不可选范围
 * @param {当前时间} current
 */
export function formatDisabledDate(current) {
  const year = dayjs().year() - 1;
  return current && current < dayjs().subtract(year, 'years');
}

/**
 * 时间-开始时间的设置。禁止开始时间大于结束时间
 * @param startValue
 * @param endValue
 * @returns
 */
export function disabledStartDate(startValue, endValue) {
  if (!startValue || !endValue) {
    const year = dayjs().year() - 1;
    return startValue && startValue < dayjs().subtract(year, 'years');
  }
  //当datePicker组件设置了value-format后，endValue的值将会变成string类型，这里需要特殊处理
  let endValueTimestamp = endValue.valueOf();
  if (endValue && typeof endValue == 'string') {
    if (startValue.length == 10) {
      // 日期类型如果不手动加 0时0分0秒通过下面方法获取时间戳为8点的时间戳，导致选时间有问题
      endValue = endValue + ' 00:00:00';
    }
    endValueTimestamp = Date.parse(new Date(endValue).toString());
  }
  return startValue.valueOf() > endValueTimestamp;
}

/**
 * 时间-结束时间的设置，禁止结束时间小于开始时间
 * @param endValue
 * @param startValue
 * @returns
 */
export function disabledEndDate(endValue, startValue) {
  if (!endValue || !startValue) {
    const year = dayjs().year() - 1;
    return endValue && endValue < dayjs().subtract(year, 'years');
  }
  //当datePicker组件设置了value-format后，startValue的值将会变成string类型，这里需要特殊处理
  console.log(endValue.valueOf());
  let startValueTimestamp = startValue.valueOf();
  if (startValue && typeof startValue == 'string') {
    if (startValue.length == 10) {
      // 日期类型如果不手动加 0时0分0秒通过下面方法获取时间戳为8点的时间戳，导致选时间有问题
      startValue = startValue + ' 00:00:00';
    }
    startValueTimestamp = Date.parse(new Date(startValue).toString());
  }
  return startValueTimestamp > endValue.valueOf();
}

/**
 * 获取行编辑改动过和新增的数据
 * @param list 改动过的数组
 * @param initialList 初始的数组
 * @return Array 生成的改动过的数据
 */
export function getChangeRecords(list, initialList) {
  // 排除掉组件中自己加的字段，以免影响判断
  const copyList = lodash.cloneDeep(list.value);
  for (let i = 0; i < copyList.length; i++) {
    const obj = copyList[i];
    for (const key in obj) {
      if (key.indexOf('editable') != -1) {
        delete obj[key];
      }
      // 数组转化为字符串
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].join(',');
      }
    }
  }
  // 表格数据分为两部分: 新加的行newData;旧有的行oldData
  const newData = [];
  const oldData = [];
  for (let i = 0; i < copyList.length; i++) {
    if (copyList[i]['id'].indexOf('newLine') != -1) {
      newData.push(copyList[i]);
    } else {
      oldData.push(copyList[i]);
    }
  }
  // 新加的行数据是否编辑了,默认未编辑
  const newDataFlag = newData.length > 0 ? true : false;
  let oldDataFlag = false;
  if (!isEqual(oldData, initialList.value)) {
    oldDataFlag = true; // 改过了
  }
  // 有改动的数据
  let changedData = [];
  // 判断表格的值有无变化,没有变化,提示修改数据
  if (!newDataFlag && !oldDataFlag) {
    return changedData;
  }
  // 获取旧有的行中编辑过的数据
  let difData = [];
  difData = differenceWith(oldData, initialList.value, isEqual);
  // 新加的行与编辑过的行,整体为有改动的数据
  changedData = [...newData, ...difData];
  return changedData;
}

/** 过滤特殊符号 */
function filter(str) {
  // 特殊字符转义
  str += ''; // 隐式转换
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
}

/**
 * json对象单层,转换url参数
 * @param {*} paramObj
 */
export function formateObjToParamStr(paramObj) {
  const sdata = [];
  for (const attr in paramObj) {
    sdata.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return sdata.join('&');
}

/**
 * 处理后台小数0和小数点后0不显示问题
 * @param {*} value
 * @param {*} format
 * @returns
 */
export function formatZero(value, format) {
  if (value == null || value == undefined) {
    return '';
  } else if (value == 0) {
    return '0.' + '0'.repeat(format);
  } else {
    return value ? value.toFixed(format) : '';
  }
}

/**
 * 复选框和下拉多选的数据需要转化为数组
 * @param record
 * @param formatArrayKeys
 */
export function formatValueToArray(record, formatArrayKeys) {
  formatArrayKeys.forEach(key => {
    if (objIsNotBlank(record[key])) {
      if (!Array.isArray(record[key])) {
        record[key] = record[key].split(',');
      }
    } else {
      record[key] = [];
    }
  });
}

/**
 * 表单校验失败后定位到第一个错误字段
 * @param formRef
 * @param error
 */
export function scrollToFirstErrorField(formRef, error) {
  const errorFields = error.errorFields;
  if (errorFields) {
    // const fieldName = errorFields[0].name.toString();
    // formRef.value.scrollToField(fieldName);
    // // 只有存下excel样式的表单定位字段时错误信息无法显示
    const excelDom = document.getElementsByClassName('form-excel-style');
    // 使用form定位api自动错误定位对于数字框不生效
    if (excelDom && excelDom.length > 0) {
      setTimeout(() => {
        const dom = document.getElementsByClassName('ant-form-item-explain-error')[0];
        dom.scrollIntoView();
      }, 10);
    } else {
      setTimeout(() => {
        const dom = document.getElementsByClassName('ant-form-item-has-error')[0];
        dom.scrollIntoView();
      }, 10);
    }
  }
}

/**
 * 组装开启单点后，逻辑判断及跳转数据
 * @returns
 */
export function getssoInfo() {
  const ssoFlag = settings.ssoConfig.ssoFlag;
  const ssoInfo = {
    enable: false, // 开启单点后token过期或者无token时是否重定向到对应的单点登录页
    name: '', // 对应单点方式的路由名称
    path: '' // 对应单点方式的路由path
  };
  if (ssoFlag == 'cas') {
    ssoInfo.enable = true;
    ssoInfo.name = 'casLogin';
    ssoInfo.path = '/casLogin';
  } else if (ssoFlag == 'koal') {
    ssoInfo.enable = true;
    ssoInfo.name = 'koalLogin';
    ssoInfo.path = '/koalLogin';
  } else if (ssoFlag == 'oauth2') {
    ssoInfo.enable = true;
    ssoInfo.name = 'oauth2Login';
    ssoInfo.path = '/oauth2Login';
  } else if (ssoFlag == 'header') {
    ssoInfo.enable = true;
    ssoInfo.name = 'httpheaderLogin';
    ssoInfo.path = '/httpheaderLogin';
  }
  return ssoInfo;
}
