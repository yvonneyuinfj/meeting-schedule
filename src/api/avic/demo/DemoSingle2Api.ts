import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/demo/demosingle2s';
/** demo_single2 */
export interface DemoSingle2Dto extends BaseBeanModel {
  /** 用户 */
  demoUserId?: string;
  /** 部门 */
  demoDeptId?: string;
  /** 角色 */
  demoRoleId?: string;
  /** 群组 */
  demoGroupId?: string;
  /** 岗位 */
  demoPositionId?: string;
  /** 单选 */
  demoRadio?: string;
  /** 单选（按钮样式） */
  demoRadioButton?: string;
  /** 复选 */
  demoCheckbox?: string;
  /** 下拉 */
  demoSelect?: string;
  /** 下拉多选 */
  demoSelectMultiple?: string;
  /** 密级 */
  secretLevel?: any;
  /** 开关 */
  demoSwitch?: string;
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
  /** 必填 */
  demoNotnull?: string;
  /** 编码 */
  demoCode?: string;
  /** 电话(正则) */
  demoPhone?: string;
  /** 邮件(正则) */
  demoEmail?: string;
  /** 网址(正则) */
  demoWebsite?: string;
  /** 唯一值 */
  demoUnique?: string;
  /** 弹窗 */
  demoModalSelect?: string;
  /** 背景样式 */
  demoBackgroundColor?: string;
  /** 富文本 */
  demoRichtext?: string;
  /** 多行文本 */
  demoTextarea?: string;
}

/** 获取分页数据 */
export function listDemoSingle2ByPage (
  param: QueryParamModel
): Promise<ResponsePageData<DemoSingle2Dto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getDemoSingle2 (id: string): Promise<ResponseBaseData<DemoSingle2Dto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveDemoSingle2 (form: DemoSingle2Dto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delDemoSingle2 (ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
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
