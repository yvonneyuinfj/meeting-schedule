import type { ScrollPosition } from '@surely-vue/table';
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号码
 * @param {*}
 */
export function isMobile(value, callback) {
  if (value) {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
    if (!reg.test(value)) {
      callback('联系电话有误');
      return;
    }
  }
  callback();
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

/**
 * 校验复选框最大长度
 */
export function validateCheckboxMaxlength(rule, value, callback, maxLength) {
  if (value) {
    if (typeof value === 'string') {
      // eslint-disable-next-line no-control-regex
      if (value.replace(/[^\x00-\xff]/g, '***').length > maxLength) {
        callback('不可超过' + maxLength + '个字符！');
        return;
      }
    } else {
      // eslint-disable-next-line no-control-regex
      if (value.join(',').replace(/[^\x00-\xff]/g, '***').length > maxLength) {
        callback('不可超过' + maxLength + '个字符！');
        return;
      }
    }
  }
  callback();
}

/**
 * 校验文本最大长度
 */
export function validateInputMaxlength(rule, value, callback, maxLength) {
  if (value) {
    if (value.replace(/\s+/g, '').length === 0) {
      callback('内容不可为空！');
      return;
    }
    // eslint-disable-next-line no-control-regex
    if (value.replace(/[^\x00-\xff]/g, '***').length > maxLength) {
      callback('不可超过' + maxLength + '个字符！');
      return;
    }
  }
  callback();
}

// 正则校验的正则表达式，这里注意正则表达式中的‘\’要使用‘\\’转义
const patterns = {
  email: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
  number: '^[+-]?(0|([1-9]\\d*))(\\.\\d+)?$',
  integer: '^-?[1-9]\\d*$',
  positiveInteger: '^[1-9]\\d*$',
  abc123_: '^[a-zA-Z0-9_]*$',
  phone: '^1[3,4,5,6,7,8,9]\\d{9}$',
  tel: '^(\\d{3,4}-?)?\\d{7,9}$',
  telPhone: '((\\d{3,4}-?)?\\d{7,9}$)|(^1[3,4,5,6,7,8,9]\\d{9}$)',
  postCode: '^[1-9]\\d{5}$',
  ipv4: '^(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$',
  ipv6: '^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$',
  qq: '^[1-9][0-9]{4,}$',
  idCard:
    '^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
  url: '^http[s]?:\\/\\/.*',
  fax: '^((0\\d{2,3}-\\d{7,8})|(1[3456789]\\d{9}))$',
  homeTel: '^([0-9]{3,4}-)?[0-9]{7,11}$'
};

// 对应正则表达式的提示信息
const patternMsg = {
  email: '请输入正确的邮箱',
  number: '请输入正确的数字',
  integer: '请输入整数',
  positiveInteger: '请输入大于0的整数',
  abc123_: '请输入数字字母下划线',
  phone: '请输入正确的手机号',
  tel: '请输入正确的办公电话',
  telPhone: '请输入正确的手机或电话',
  postCode: '请输入正确的邮编',
  ipv4: '请输入正确的IPV4格式',
  ipv6: '请输入正确的IPV6格式',
  qq: '请输入正确的QQ号',
  idCard: '请输入正确的身份证号',
  url: '请输入正确的URL地址',
  fax: '请输入正确的传真号码',
  homeTel: '请输入正确的家庭电话'
};

/**
 * 正则校验
 */
export function validateRegExp(name, msg, para = 'g') {
  let message = msg;
  if (!msg) {
    message = patternMsg[name];
  }
  return {
    pattern: new RegExp(patterns[name], para),
    message: message
  };
}

let validateMessage = '';
const ruleMap = {
  required: (value, rule) => {
    if (value == '' || value == null || value == undefined) {
      validateMessage = rule.message;
      return false;
    } else {
      return true;
    }
  },
  pattern: (value, rule) => {
    if (rule.pattern && typeof value === 'string' && value) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        validateMessage = rule.message;
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  validator: (value, rule, record) => {
    let methodName = rule.method;
    if (!methodName) {
      methodName = rule.validator;
    }
    const checkResult = methodName(value, record);
    if (!checkResult.flag) {
      validateMessage = checkResult.message;
      // message.warning(validateMessage);
      return false;
    } else {
      return true;
    }
  }
};

export function getValidateTypeByName(rule) {
  //兼容历史写法
  let validateType = ruleMap[rule.rule];
  if (validateType == null) {
    if (rule['required']) {
      validateType = ruleMap['required'];
    } else if (rule['pattern']) {
      validateType = ruleMap['pattern'];
    } else if (rule['validator']) {
      validateType = ruleMap['validator'];
    }
  }
  return validateType;
}

/**
 * 行编辑单数据校验
 */
export function validateData(value, column, rules, record) {
  let flag = true;
  if (rules[column]) {
    for (let index = 0; index < rules[column].length; index++) {
      const rule = rules[column][index];
      //const validateType = ruleMap[rule.rule];
      const validateType = getValidateTypeByName(rule);
      if (validateType && !validateType(value, rule, record)) {
        flag = false;
        break;
      } else {
        flag = true;
      }
    }
  } else {
    flag = true;
  }
  if (!record) {
    return flag;
  }
  focusElement(record.id + column, flag);
  return flag;
}

/**
 * 行编辑整条数据校验
 */
export function validateRecordData(record, rules, list, avicTable) {
  let flag = true;
  for (const key in record) {
    flag = validateData(record[key], key, rules, record);
    if (!flag) {
      if (list && list.length > 0) {
        //将校验失败的行编辑状态打开并定位
        const newData = [...list];
        newData.forEach(item => {
          if (item.id !== record.id) {
            item.editable = false;
          } else {
            item.editable = true;
          }
        });
        // 主要处理主子表嵌套时子表校验失败后滚动到表格区域，单表行编辑该定位无影响
        const advancedTableId = avicTable.value.advancedTableId;
        const dom = document.getElementById(advancedTableId);
        if (dom) {
          dom.scrollIntoView();
        }
        //通过坐标定位滚动到指定位置
        scrollToColumn(avicTable, { rowKey: record.id, columnKey: key }, true);
        setTimeout(function () {
          focusElement(record.id + key, flag);
        }, 200);
      }
      break;
    }
  }
  return flag;
}

/**
 * 定位校验失败元素
 */
export function focusElement(domId, flag) {
  const dom = document.getElementById(domId);
  if (dom != null) {
    const sondom = document.getElementById(domId + 'span');
    if (!flag) {
      dom.setAttribute('customAtrr', validateMessage);
      sondom.setAttribute('class', 'validateErrorClass');
    } else {
      dom.setAttribute('customAtrr', '');
      sondom.setAttribute('class', '');
    }
  }
}

/**
 * 表格定位滚动到指定单元格
 * @param tableRef
 * @param pos
 * @param smooth
 */
export function scrollToColumn(tableRef, pos: ScrollPosition, smooth = false) {
  tableRef.value.scrollTo(pos, smooth);
}
