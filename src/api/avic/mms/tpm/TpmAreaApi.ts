import request from '@/utils/request';

/*增加列表展示所用接口 lvmiin 2023-11-10*/
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData, QueryParamModel,ResponsePageData } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

export const basePath = '/mms/tpm/tpmareas';
/** 单表树 */
/** 设备区域管理表 */
export interface TpmAreaDto extends BaseTreeModel {
  /** 上级节点ID */
  parentId?: string;
  /** 区域编号 */
  areaCode?: string;
  /** 区域名称 */
  areaName?: string;
  /** 使用单位ID */
  useDeptId?: string;
  useDeptIdAlias?: string;
  /** 使用单位名称 */
  useDeptName?: string;
  useDeptNameAlias?: string;
  /** 详细地址 */
  detailAddress?: string;
  /** 树全路径 */
  treePath?: string;
  /** 是否叶子节点 */
  treeLeaf?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  /** 扩展字段 */
  attribute01?: string;
  /** 扩展字段 */
  attribute02?: string;
  /** 扩展字段 */
  attribute03?: string;
  /** 扩展字段 */
  attribute04?: string;
  /** 扩展字段 */
  attribute05?: string;
  /** 扩展字段 */
  attribute06?: string;
  /** 扩展字段 */
  attribute07?: any;
  attribute07Begin?: any;
  attribute07End?: any;
  /** 扩展字段 */
  attribute08?: any;
  attribute08Begin?: any;
  attribute08End?: any;
  /** 扩展字段 */
  attribute09?: string;
  /** 扩展字段 */
  attribute10?: string;
  /** 数节点排序号（本级） */
  treeSort?: number;
  /** 数节点排序号（所有级） */
  treeSorts?: string;
  /** 节点层级 */
  treeLevel?: number;
}
/** 获取树数据 */
export function getTreeData(level: number, pid: string): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.get(basePath + '/get-tree/' + level + '/' + pid + '/v1');
}

/** 搜索树数据 */
export function searchTreeList(param: any): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.post(basePath + '/searchTree/v1', param);
}

/** 根据id加载数据 */
export function getTpmArea(id: string): Promise<ResponseBaseData<TpmAreaDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmArea(form: TpmAreaDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id删除数据 */
export function delTpmArea(id: string): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + id + '/v1', {});
}


/** 获取分页数据 */
export function listTpmAreaByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmAreaDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 导出Excel */
export function exportExcel (param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}

//根据parentId获取子节点
export function getTpmAreaNode (level: number, parentId: string): Promise<ResponseBaseData<TreeNodeModel[]>> {
  return request.get(basePath + '/get-treegrid/'+level+'/'+parentId+'/v1');
}