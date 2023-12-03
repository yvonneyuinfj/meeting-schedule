import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmintactratiomtbfmttrs';

/** 设备完好率、MTBF、MTTR申报主表 */
export interface TpmIntactRatioMtbfMttrDto extends BaseBeanModel {
  /** 申报月份 */
  reportDate?: any;
  reportDateBegin?: any;
  reportDateEnd?: any;
  /** 填报部门 */
  reportDeptId?: string;
  reportDeptIdAlias?: string;
  /** 填报部门编码 */
  reportDeptCode?: string;
  /** 填报部门名称 */
  reportDeptName?: string;
  /** 填报人 */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 申请人名称 */
  applyUserName?: string;
  /** 填报日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 设备完好率(%) */
  equipmentIntegrityRate?: string;
  /** 流程状态，通用代码：TPM_BILL_STATUS */
  billStatus?: string;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  tpmIntactRatioMtbfMttrLList?: [];
}

/** 获取分页数据 */
export function listTpmIntactRatioMtbfMttrByPage(param: QueryParamModel): Promise<ResponsePageData<TpmIntactRatioMtbfMttrDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmIntactRatioMtbfMttr(id: string): Promise<ResponseBaseData<TpmIntactRatioMtbfMttrDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmIntactRatioMtbfMttr(form: TpmIntactRatioMtbfMttrDto): Promise<ResponseBaseData<any>> {
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
export function delTpmIntactRatioMtbfMttr(ids: [string]): Promise<ResponseBaseData<any>> {
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
