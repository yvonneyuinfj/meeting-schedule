import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';

const basePath = '/demo/template/demosubinsides';
/** 主子表内嵌 */
export interface DemoSubInsideDto extends BaseBeanModel {
  /** 必填 */
  demoNotnull?: string;
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
  demoRadioName?: string;
  /** 单选(按钮) */
  demoRadioButton?: string;
  demoRadioButtonName?: string;
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
  demoDateBegin?: any;
  demoDateEnd?: any;
  /** 时间 */
  demoDateTime?: any;
  demoDateTimeBegin?: any;
  demoDateTimeEnd?: any;
  /** 编码 */
  demoCode?: any;
  /** 电话(正则) */
  demoPhone?: string;
  /** 邮件(正则) */
  demoEmail?: string;
  /** 网址(正则) */
  demoWebsite?: string;
  /** 唯一值 */
  demoUnique?: string;
  /** 多行文本 */
  demoTextarea?: string;
  /** 富文本 */
  demoRichtext?: string;
  /** 弹窗 */
  demoModalSelect?: any;
  /** 子表list */
  demoSubInsideList?: [];
  /** 主表id */
  demoMainId?: string;
}
/** 获取分页数据 */
export function listDemoSubInsideByPage(
  param: QueryParamModel
): Promise<ResponsePageData<DemoSubInsideDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id集合删除数据 */
export function delDemoSubInside(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 校验唯一值唯一性 */
export function checkDemoUniqueUnique(param: any): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/check-demo-unique-unique/v1', param);
}

/** 更新开关状态 */
export function updateDemoSwitch(id: string, demoSwitch: string): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update-demo-switch/v1/' + id + '/' + demoSwitch);
}
