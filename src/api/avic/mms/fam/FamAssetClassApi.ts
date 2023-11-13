import request from '@/utils/request';
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData } from '@/api/model/baseModel';

export const basePath = '/mms/fam/famassetclasss';
/** 单表树 */
/** 资产类别表 */
export interface FamAssetClassDto extends BaseTreeModel {
  /** 数据密级 */
  secretLevel?: any;
  /** 备注 */
  note?: string;
  /** ATTRIBUTE_01 */
  attribute01?: string;
  /** ATTRIBUTE_02 */
  attribute02?: string;
  /** ATTRIBUTE_03 */
  attribute03?: string;
  /** ATTRIBUTE_04 */
  attribute04?: string;
  /** ATTRIBUTE_05 */
  attribute05?: string;
  /** ATTRIBUTE_06 */
  attribute06?: string;
  /** ATTRIBUTE_07 */
  attribute07?: string;
  /** ATTRIBUTE_08 */
  attribute08?: string;
  /** ATTRIBUTE_09 */
  attribute09?: string;
  /** ATTRIBUTE_10 */
  attribute10?: string;
  /** 资产类别编码 */
  classCode?: string;
  /** 资产类别名称 */
  className?: string;
  /** 编码规则 */
  modelContent?: string;
  /** 使用年限 */
  useTime?: string;
  /** 上级资产类别名称 */
  parentAssetClassName?: string;
  /** 上级资产类别编码 */
  parentAssetCode?: string;
  /** 上级节点ID */
  parentId?: string;
  /** 树全路径 */
  treePath?: string;
  /** 树节点排序号(本级) */
  treeSort?: string;
  /** 树节点排序号(所有级) */
  treeSorts?: string;
  /** 是否叶子节点 */
  treeLeaf?: string;
  /** 节点层级 */
  treeLevel?: string;
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
export function getFamAssetClass(id: string): Promise<ResponseBaseData<FamAssetClassDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAssetClass(form: FamAssetClassDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id删除数据 */
export function delFamAssetClass(id: string): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + id + '/v1', {});
}

/** 获取分页数据 */
export function listFamAssetClassByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamAssetClassDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

