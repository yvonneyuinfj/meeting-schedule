import request from '@/utils/request';
const basePath = '/appsys/sysautocode/SysAutoCodeManageRest';

/** 获取流水码 */
export async function getAutoCodeData(autoCode, businessId) {
  const param = { autoCode, businessId };
  const { data } = await request({
    url: basePath + '/getAutoCodeData/v1',
    data: param,
    method: 'post'
  });
  return data;
}

/** 获取流水码 */
export async function getAutoCodeByValue(autoCode, autoCodeValue) {
  const param = { autoCode, autoCodeValue };
  const { data } = await request({
    url: basePath + '/getAutoCodeByValue/v1',
    data: param,
    method: 'post'
  });
  return data;
}

/** 校验编码 */
export async function checkAutoCodeValue(autoCode, autoCodeData) {
  const autoCodeValue = ['', ...autoCodeData, ''].join('$$');
  const param = { autoCode, autoCodeValue };
  const { data } = await request({
    url: basePath + '/checkAutoCodeValue/v1',
    data: param,
    method: 'post'
  });
  return data;
}

/** 生成流水码 */
export async function generateAutoCodeValue(autoCode, autoCodeData, businessId) {
  const autoCodeValue = ['', ...autoCodeData, ''].join('$$');
  const autoCodeId = '';
  const isUseJumpCode = true;
  const param = { autoCode, autoCodeValue, autoCodeId, isUseJumpCode, businessId };
  const { data } = await request({
    url: basePath + '/generateAutoCodeValue/v1',
    data: param,
    method: 'post'
  });
  return data;
}

/** 查询流水码 */
export async function searchSerialNum(
  autoCode,
  autoIncreaseCodeData,
  serialNumLength,
  autoIncreaseFlag
) {
  const autoIncreaseCode = ['', ...autoIncreaseCodeData, ''].join('$$');
  const param = { autoCode, autoIncreaseCode, serialNumLength, autoIncreaseFlag };
  const { data } = await request({
    url: basePath + '/searchSerialNum/v1',
    data: param,
    method: 'post'
  });
  return data;
}
