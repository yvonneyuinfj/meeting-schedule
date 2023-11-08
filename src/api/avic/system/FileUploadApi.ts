import request from '@/utils/request';

const basePath = '/appsys/common/uploader';
/** 流程下载权限验证 */
export function downloadFlowFile(param) {
  return request({
    url: basePath + '/validDownload/v1',
    data: param,
    method: 'post'
  });
}

/** 删除文件 */
export function deleteFile(param) {
  return request({
    url: basePath + '/delete/v1',
    data: param,
    method: 'post'
  });
}

/** 附件修改 */
export function fileEditInfo(param) {
  return request({
    url: basePath + '/EditInfo/v1',
    data: param,
    method: 'post'
  });
}

/** 校验下载 */
export function validDownload(param) {
  return request({
    url: basePath + '/validDownload/v1',
    data: param,
    method: 'post'
  });
}

/** 预览验证 */
export function validPreview(param) {
  return request({
    url: basePath + '/validPreview/v2',
    data: param,
    method: 'post'
  });
}

/** 获取附件信息 */
export function getInfos(url, param) {
  //api/appsys/common/uploader/getInfos/v1平台默认接口地址，项目可自定义
  return request({
    url: url,
    data: param,
    method: 'post'
  });
}
