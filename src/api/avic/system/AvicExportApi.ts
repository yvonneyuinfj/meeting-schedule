import request from '@/utils/request';

/** 记录导出日志 */
export function excelExportLog(params) {
  return request({
    url: '/api/appsys/common/excelExport/log/v1',
    params: params,
    method: 'post'
  });
}
