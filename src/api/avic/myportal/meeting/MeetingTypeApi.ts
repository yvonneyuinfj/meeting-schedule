import request from '@/utils/request';
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData } from '@/api/model/baseModel';

export const basePath = '/myportal/meeting/meetingtypes';
/** 单表树 */
/** 会议类型表 */
export interface MeetingTypeDto extends BaseTreeModel {
  /** 父节点ID */
  parentId?: string;
  /** 会议类型编号 */
  typeCode?: string;
  /** 会议类型名称 */
  typeName?: string;
  /** 树路径 */
  treePath?: string;
  /** TREE_SORT */
  treeSort?: number;
  /** TREE_SORTS */
  treeSorts?: string;
  /** TREE_LEAF */
  treeLeaf?: string;
  /** TREE_LEVEL */
  treeLevel?: number;
  /** 备注 */
  note?: string;
  /** 预留字段01 */
  attribute01?: string;
  /** 预留字段02 */
  attribute02?: string;
  /** 预留字段03 */
  attribute03?: string;
  /** 预留字段04 */
  attribute04?: string;
  /** 预留字段05 */
  attribute05?: string;
  /** 预留字段06 */
  attribute06?: string;
  /** 预留字段07 */
  attribute07?: string;
  /** 预留字段08 */
  attribute08?: string;
  /** 预留字段09 */
  attribute09?: any;
  attribute09Begin?: any;
  attribute09End?: any;
  /** 预留字段10 */
  attribute10?: any;
  attribute10Begin?: any;
  attribute10End?: any;
  /** 密级 */
  secretLevel?: any;
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
export function getMeetingType(id: string): Promise<ResponseBaseData<MeetingTypeDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMeetingType(form: MeetingTypeDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id删除数据 */
export function delMeetingType(id: string): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + id + '/v1', {});
}



