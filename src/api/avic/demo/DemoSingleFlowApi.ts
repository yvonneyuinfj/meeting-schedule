import request from '@/utils/request';
import type {
  BaseBeanModel,
  ResponsePageData,
  ResponseBaseData,
  QueryParamModel
} from '@/api/model/baseModel';

const basePath = '/demo/template/demosingleflows';
/** 单表流程 */
export interface DemoSingleFlowDto extends BaseBeanModel {
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
  /** 流程附件 */
  avicBpmUploader?: any;
  bpmState?: string;
  bpmType?: string;
}
/** 获取分页数据 */
export function listDemoSingleFlowByPage(
  param: QueryParamModel
): Promise<ResponsePageData<DemoSingleFlowDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getDemoSingleFlow(id: string): Promise<ResponseBaseData<DemoSingleFlowDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveDemoSingleFlow(form: DemoSingleFlowDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 保存并启动流程 */
export function saveFormAndStartProcess({
  processDefId,
  formCode,
  postData
}): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save-and-start-process/v1', {
    processDefId,
    formCode,
    bean: postData
  });
}

/** 根据id集合删除数据 */
export function delDemoSingleFlow(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 校验唯一值唯一性 */
export function checkDemoUniqueUnique(param: any): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/check-demo-unique-unique/v1', param);
}

/** 更新开关 */
export function updateDemoSwitch(id: string, demoSwitch: string): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/update-demo-switch/v1/' + id + '/' + demoSwitch);
}
