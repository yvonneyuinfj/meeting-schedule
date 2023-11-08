import request from '@/utils/request';
import type { BaseTreeModel, TreeNodeModel, ResponseBaseData } from '@/api/model/baseModel';

export const basePath = '/demo/template/demolefttrees';
/** 树列表-树 */
export interface DemoLeftTreeDto extends BaseTreeModel {
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
}

/** 获取树数据 */
export function getTreeData(level, pid): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.get(basePath + '/get-tree/' + level + '/' + pid + '/v1');
}

/** 搜索树数据 */
export function searchTreeList(param): Promise<ResponseBaseData<TreeNodeModel>> {
  return request.post(basePath + '/search/v1', param);
}

/** 初始化根节点 */
export function initTreeRoot(): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/insert-root/v1');
}

/** 根据id加载数据 */
export function getDemoLeftTree(id): Promise<ResponseBaseData<DemoLeftTreeDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveDemoLeftTree(form: DemoLeftTreeDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id删除数据 */
export function delDemoLeftTree(id): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-id/' + id + '/v1');
}

/** 校验唯一值唯一性 */
export function checkDemoUniqueUnique(param): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/check-demo-unique-unique/v1', param);
}

/** 更新开关 */
export function updateDemoSwitch(id, demoSwitch): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update-demo-switch/v1/' + id + '/' + demoSwitch);
}
