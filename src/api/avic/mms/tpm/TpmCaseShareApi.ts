import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmcaseshares';
/** 3.4.1.5经典案例分享 */
export interface TpmCaseShareDto extends BaseBeanModel {
  /** 经典案例类型，通用代码：TPM_CLASSIC_CASE_TYPE */
  classicCaseType?: any;
  /** 流程状态，通用代码：TPM_BILL_STATUS */
  billStatus?: string;
  /** 分享人ID */
  shareUserId?: string;
  shareUserIdAlias?: string;
  /** 分享人编码 */
  shareUserCode?: string;
  /** 分享人姓名 */
  shareUserName?: string;
  /** 分享时间 */
  shareDate?: any;
  shareDateBegin?: any;
  shareDateEnd?: any;
  /** 分享部门ID */
  shareDeptId?: string;
  shareDeptIdAlias?: string;
  /** 分享部门编码 */
  shareDeptCode?: string;
  /** 分享部门名称 */
  shareDeptName?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listTpmCaseShareByPage(param: QueryParamModel): Promise<ResponsePageData<TpmCaseShareDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmCaseShare (id: string): Promise<ResponseBaseData<TpmCaseShareDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmCaseShare (form: TpmCaseShareDto): Promise<ResponseBaseData<any>> {
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
export function delTpmCaseShare(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
