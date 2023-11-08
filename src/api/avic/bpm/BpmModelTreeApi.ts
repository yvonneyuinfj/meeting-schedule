import request from '@/utils/request';
import type { TreeNodeModel, ResponseBaseData } from '@/api/model/baseModel';
const basePath = '/bpm/center';

/** 获取树信息 */
export function getTreeList(treeParam): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.post( basePath + '/get-tree/v1', treeParam);
}

/** 搜索树 */
export function searchTreeList(param): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.post(basePath + '/search/v1', param);
}
