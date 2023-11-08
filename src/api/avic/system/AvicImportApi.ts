import { download } from '@/utils/download-util';
import type { downloadParam } from '@/utils/download-util';
import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';
/** 下载模版 */
export function downloadFile(res) {
  const parameter = {
    fileuploadBusinessId: res.FORMID,
    fileuploadBusinessTableName: '',
    fileuploadIsSaveToDatabase: true,
    fileId: res.FILEDID,
    encryption: ''
  };
  return download('/api/appsys/common/excelImport/downloadExcelTemplete/v1', parameter, 'post');
}

/** 获取模版信息 */
export function getExcelInfo(templateCode) {
  return request({
    url: '/api/appsys/common/excelImport/getExcelInfo/v1',
    params: templateCode,
    method: 'post'
  });
}

/** 下载错误数据 */
export function downloadErrorExcelParam(fileName) {
  return request({
    url: '/api/oa/stock/redirect:/api/common/excelImport/downloadErrorExcelFile/v1',
    params: fileName,
    method: 'post'
  });
}

/**
 * 获取导入历史数据
 * @param {Object} queryParam
 * @param {Object} tableName
 */
export function getExcelImportHis(queryParam, tableName) {
  return request({
    url: 'appsys/excelimport/ExcelImportRest/result/v1/' + tableName,
    data: queryParam,
    method: 'post'
  });
}

/** 根据id删除数据 */
export function delExcelImportHis(id): Promise<ResponseBaseData<any>> {
  return request({
    url: '/appsys/excelimport/ExcelImportRest/delete/' + id + '/v1',
    method: 'delete'
  });
}

/**
 * 下载错误数据
 * @param {Object} param
 */
export function downloadErrorFile(param) {
  const downloadDto = {
    url: '/appsys/excelimport/ExcelImportRest/download/errorFile/v1/' + param,
    data: null,
    method: 'get'
  } as downloadParam;
  return download(downloadDto);
}
