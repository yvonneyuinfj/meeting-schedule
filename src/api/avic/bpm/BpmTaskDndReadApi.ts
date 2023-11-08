import request from '@/utils/request';
const basePath = '/bpm/bpm/todo';

/**获取待办数据 */
export function listBpmTaskListByPage(param) {
  return request.post(basePath + '/portal/waittodo/v1', param);
}
