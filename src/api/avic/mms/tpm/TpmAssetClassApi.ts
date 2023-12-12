import request from '@/utils/request';
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData } from '@/api/model/baseModel';

export const basePath = '/mms/tpm/tpmassetclasss';
/** 单表树 */
/** TPM_ASSET_CLASS */
export interface TpmAssetClassDto extends BaseTreeModel {
  /** 父节点 */
  parentId?: string;
  /** 大类编码 */
  classCode?: string;
  /** 大类名称 */
  className?: string;
  /** 树全路径 */
  treePath?: string;
  /** 序号（本级） */
  treeSort?: number;
  /** 序号（所有级） */
  treeSorts?: string;
  /** 是否末级 */
  treeLeaf?: string;
  /** 节点层级 */
  treeLevel?: number;
  /** 密级 */
  secretLevel?: any;
  /** 备注 */
  note?: string;
}
/** 获取树数据 */
export function getTreeData(level: number, pid: string): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.get(basePath + '/get-tree/' + level + '/' + pid + '/v1');
}

/** 搜索树数据 */
export function searchTreeList(param: any): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.post(basePath + '/search/v1', param);
}

/** 根据id加载数据 */
export function getTpmAssetClass(id: string): Promise<ResponseBaseData<TpmAssetClassDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmAssetClass(form: TpmAssetClassDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id删除数据 */
export function delTpmAssetClass(id: string): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + id + '/v1', {});
}



