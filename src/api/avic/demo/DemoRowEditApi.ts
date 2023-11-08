import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';

const basePath = '/demo/template/demorowedits';
/** 单表行编辑 */
export interface DemoRowEditDto extends BaseBeanModel {
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
  /** 单选（按钮样式）*/
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
  /** 日期时间 */
  demoDateTime?: any;
  demoDateTimeBegin?: any;
  demoDateTimeEnd?: any;
  /** 电话(正则) */
  demoPhone?: string;
  /** 邮箱(正则) */
  demoEmail?: string;
  /** 网址(正则) */
  demoWebsite?: string;
  /** 唯一值 */
  demoUnique?: string;
  /** 弹窗 */
  demoModalSelect?: string;
  /** 多行文本 */
  demoTextarea?: string;
}
/** 获取分页数据 */
export function listDemoRowEditByPage(
  param: QueryParamModel
): Promise<ResponsePageData<DemoRowEditDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 保存表单数据 */
export function saveDemoRowEditInfo(form: [DemoRowEditDto]): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delDemoRowEditInfo(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}
