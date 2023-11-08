/* 全局方法挂载 */
import {
  colLayout1,
  colLayout2,
  colLayout3,
  colLayout4,
  modalWidthAndHeightBylayout
} from '@/utils/layout-util';
import {
  encrypt,
  getLookupByType,
  getUserFileSecretLevelList,
  objIsNotBlank,
  uuid,
  disabledStartDate,
  disabledEndDate,
  getChangeRecords,
  formatZero,
  formatValueToArray,
  scrollToFirstErrorField,
  dateFormat,
  getProfileValue,
  checkJsonIsAllBlank
} from '@/utils/common-util';
import {
  validateInputMaxlength,
  validateRegExp,
  validateData,
  validateRecordData
} from '@/utils/validate';
import { settings } from '@/settings';
import lodash from 'lodash';
import dayjs from 'dayjs';
import { message, Modal, Empty } from 'ant-design-vue';
import type { Settings } from '@/typing';
import { hasPermi, hasPermiAnd, hasRole, hasRoleAnd } from '@/utils/permission';
import { useUserStore } from '@/store/user';
export function registerMethod(app) {
  const global = app.config.globalProperties;
  global.$encrypt = encrypt;
  global.$lodash = lodash;
  global.$dayjs = dayjs;
  global.$message = message;
  global.$Modal = Modal;
  global.$confirm = Modal.confirm;
  global.$Empty = Empty;
  global.$colLayout1 = colLayout1;
  global.$colLayout2 = colLayout2;
  global.$colLayout3 = colLayout3;
  global.$colLayout4 = colLayout4;
  global.$settings = settings as Settings;
  global.$modalWidthAndHeightBylayout = modalWidthAndHeightBylayout;
  global.$getLookupByType = getLookupByType;
  global.$getUserFileSecretLevelList = getUserFileSecretLevelList;
  global.$objIsNotBlank = objIsNotBlank;
  global.$checkJsonIsAllBlank = checkJsonIsAllBlank;
  global.$uuid = uuid;
  global.$disabledStartDate = disabledStartDate;
  global.$disabledEndDate = disabledEndDate;
  global.$getChangeRecords = getChangeRecords;
  global.$validateInputMaxlength = validateInputMaxlength;
  global.$validateRegExp = validateRegExp;
  global.$validateData = validateData;
  global.$validateRecordData = validateRecordData;
  global.$formatZero = formatZero;
  global.$formatValueToArray = formatValueToArray;
  global.$scrollToFirstErrorField = scrollToFirstErrorField;
  global.$dateFormat = dateFormat;
  global.$hasPermi = hasPermi;
  global.$hasPermiAnd = hasPermiAnd;
  global.$hasRole = hasRole;
  global.$hasRoleAnd = hasRoleAnd;
  global.$getLoginUser = () => useUserStore().currentUser;
  global.$getProfileValue = getProfileValue;
}
