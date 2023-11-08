import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';
const centerPath = '/bpm/center';
const bpmBussinessPath = '/bpm/bpm/business';
/** 发起流程 */

/** 获取常用流程 */
export function getFavProcess(param): Promise<ResponseBaseData<any>> {
  return request.post(bpmBussinessPath + '/getBmpFavs/v1', param);
}

/** 获取全部流程 */
export function getProcessModel(params): Promise<ResponseBaseData<any>> {
  return request.get(
    centerPath +
      '/getStartBpmModelsByParentId/v1?nodeId=' +
      params.nodeId +
      '&nodeType=' +
      params.nodeType
  );
}

/** 流程取消收藏/收藏 */
export function saveFavProcess(param): Promise<ResponseBaseData<any>> {
  return request.post(bpmBussinessPath + '/doBmpFav/v1', param);
}

/** 发起流程 */
export function checkStartProcessRight(pdId): Promise<ResponseBaseData<any>> {
  return request.get(centerPath + '/checkStartProcessRight/v1?processDefId=' + pdId);
}
