import request from '@/utils/request';
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData } from '@/api/model/baseModel';

export const basePath = '/demo/template/demotreegrids';
/** 树列表 */
export interface DemoTreegridDto extends BaseTreeModel {
  /** 父级分类 */
  parentId?: string;
  /** 必填 */
  demoNotnull?: string;
  /** 编码 */
  demoCode?: string;
  /** 节点名称 */
  demoTitle?: string;
  /** 唯一值 */
  demoUnique?: string;
  /** 用户 */
  demoUserId?: string;
  demoUserIdAlias?: string;
  /** 部门 */
  demoDeptId?: string;
  demoDeptIdAlias?: string;
  /** 角色 */
  demoRoleId?: string;
  demoRoleIdAlias?: string;
  /** 群组 */
  demoGroupId?: string;
  demoGroupIdAlias?: string;
  /** 岗位 */
  demoPositionId?: string;
  demoPositionIdAlias?: string;
  /** 单选 */
  demoRadio?: string;
  /** 单选按钮 */
  demoRadioButton?: string;
  /** 复选 */
  demoCheckbox?: any;
  /** 下拉 */
  demoSelect?: any;
  /** 下拉多选 */
  demoSelectMultiple?: any;
  /** 开关 */
  demoSwitch?: any;
  /** 小数 */
  demoNumber?: number;
  /** 整数 */
  demoInteger?: number;
  /** 日期 */
  demoDate?: any;
  /** 日期开始 */
  demoDateBegin?: any;
  /** 日期结束 */
  demoDateEnd?: any;
  /** 日期时间 */
  demoDateTime?: any;
  /** 电话(正则) */
  demoPhone?: string;
  /** 邮件(正则) */
  demoEmail?: string;
  /** 网址(正则) */
  demoWebsite?: string;
  /** 多行文本 */
  demoTextarea?: string;
  /** 弹窗 */
  demoModalSelect?: any;
}

/** 根据parentId获取子节点 */
export function getDemoTreegridNode(level, parentId): Promise<ResponseBaseData<TreeNodeModel[]>> {
  return request.get(basePath + '/get-treegrid/' + level + '/' + parentId + '/v1');
}

/** 树列表查询 */
export function searchDemoTreegrid(params): Promise<ResponseBaseData<TreeNodeModel[]>> {
  return request.post(basePath + '/search-treegrid/v1', params);
}

/** 展开树 */
export function expandDemoTreegrid(treeId): Promise<ResponseBaseData<TreeNodeModel[]>> {
  return request.get(basePath + '/expandTree/' + treeId + '/v1');
}

/** 获取表单数据 */
export function getDemoTreegrid(id: string): Promise<ResponseBaseData<DemoTreegridDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveDemoTreegrid(form: DemoTreegridDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delDemoTreegrid(ids): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + ids + '/v1');
}

/** 校验唯一值唯一性 */
export function checkDemoUniqueUnique(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/check-demo-unique-unique/v1', param);
}

/** 更新开关状态 */
export function updateDemoSwitch(id, demoSwitch): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update-demo-switch/v1/' + id + '/' + demoSwitch);
}
