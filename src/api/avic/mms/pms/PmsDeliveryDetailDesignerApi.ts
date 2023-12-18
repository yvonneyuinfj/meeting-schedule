import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/pms/pmsdeliverydetaildesigners';
/** 交付明细-设计员 */
export interface PmsDeliveryDetailDesignerDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 计划ID */
  pmsPlanId?: string;
  /** PDM归档编号 */
  pdmArchiveNumber?: string;
  /** 文件名称 */
  fileName?: string;
  /** 上传人 */
  uplink?: string;
  /** 上传时间 */
  uploadTime?: any;
  uploadTimeBegin?: any;
  uploadTimeEnd?: any;
  /** 是否审批 */
  ynApprover?: string;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listPmsDeliveryDetailDesignerByPage(param: QueryParamModel): Promise<ResponsePageData<PmsDeliveryDetailDesignerDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsDeliveryDetailDesigner (id: string): Promise<ResponseBaseData<PmsDeliveryDetailDesignerDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsDeliveryDetailDesigner (form: PmsDeliveryDetailDesignerDto): Promise<ResponseBaseData<any>> {
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
export function delPmsDeliveryDetailDesigner(ids: [string]): Promise<ResponseBaseData<any>> {
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

/** 提交审批数据 */
export function approvalPmsDeliveryDetailDesigner({
  processDefId,
  formCode,
  postData
}): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/start-create-process/v1', {
    processDefId,
    formCode,
    bean: postData
  });
}