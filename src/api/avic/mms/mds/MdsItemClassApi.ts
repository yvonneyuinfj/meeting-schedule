import request from '@/utils/request';
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData, QueryParamModel, ResponsePageData } from '@/api/model/baseModel';

export const basePath = '/mms/mds/mdsitemclasss';
/** 单表树 */
/** 物料大类表 */
export interface MdsItemClassDto extends BaseTreeModel {
  /** 大类编码 */
  classCode?: string;
  /** 大类类型 */
  classType?: any;
  classTypeName?: string;
  /** 大类名称 */
  className?: string;
  /** 别称 */
  classAlias?: string;
  /** 父类ID */
  parentClassId?: string;
  /** 排序序号 */
  innerOrder?: number;
  /** 层级编码 */
  levelClassCode?: string;
  /** 物料大类树状索引 */
  classIndexTreeNo?: string;
  /** 是否有效 */
  validFlag?: any;
  validFlagName?: string;
  /** 是否带小编号标识 */
  ynItemSerialNo?: any;
  ynItemSerialNoName?: string;
  /** 是否检验标识 */
  ynCheck?: any;
  ynCheckName?: string;
  /** 是否关联工序配套目录 */
  ynRelSeqCatalog?: any;
  ynRelSeqCatalogName?: string;
  /** 密级 */
  secretLevel?: any;
  /** 大类说明 */
  classDesc?: string;
  /** 树全路径 */
  treePath?: string;
  /** 树节点排序号（本级） */
  treeSort?: string;
  /** 树节点排序号（所有级） */
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
export function getMdsItemClass(id: string): Promise<ResponseBaseData<MdsItemClassDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsItemClass(form: MdsItemClassDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id删除数据 */
export function delMdsItemClass(id: string): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + id + '/v1', {});
}

/** 获取分页数据 */
export function listMdsItemClassByParentIDPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsItemClassDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

