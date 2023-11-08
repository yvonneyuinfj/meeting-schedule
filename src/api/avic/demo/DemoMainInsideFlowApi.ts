import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';

const basePath = '/demo/template/demomainflows';
/** 主子表内嵌流程 */
export interface DemoMainInsideFlowDto extends BaseBeanModel {
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
  /** 子表List */
  demoSubFlowList?: [];
  /** 流程附件 */
  uploadFile?: any;
  bpmState?: string;
  bpmType?: string;
}
/** 获取分页数据 */
export function listMainFlowByPage(
  param: QueryParamModel
): Promise<ResponsePageData<DemoMainInsideFlowDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 保存表单数据 */
export function saveDemoMainAndSub(form: DemoMainInsideFlowDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id加载主表数据 */
export function getDemoMain(id: string): Promise<ResponseBaseData<DemoMainInsideFlowDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 主表批量删除 */
export function delDemoMainFlow(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 保存并启动流程 */
export function saveFormAndStartProcess(params: any): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-and-start-process/v1', params);
}
