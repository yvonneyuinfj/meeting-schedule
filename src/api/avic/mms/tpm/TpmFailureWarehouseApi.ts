import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpmfailurewarehouses';
/** 故障库表 */
export interface TpmFailureWarehouseDto extends BaseBeanModel {
  /** 单据号 */
  billNo?: any;
  /** 设备台账ID */
  tpmInventoryId?: string;
  /** 设备编号 */
  equipmentCode?: string;
  equipmentCodeAlias?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 设备型号 */
  model?: string;
  /** 设备规格 */
  specs?: string;
  /** 使用部门名称 */
  useDeptName?: string;
  /** 申请人姓名 */
  applyUserName?: string;
  applyUserNameAlias?: string;
  /** 使用部门ID */
  useDeptId?: string;
  /** 使用部门编码 */
  useDeptCode?: string;
  /** 申请人ID */
  applyUserId?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 申请人电话 */
  applyUserTel?: string;
  /** 维修单位 */
  repairDept?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过 */
  billStatus?: any;
  /** 故障发生时间 */
  faultDate?: any;
  faultDateBegin?: any;
  faultDateEnd?: any;
  /** 计划完成时间 */
  planFinishDate?: any;
  planFinishDateBegin?: any;
  planFinishDateEnd?: any;
  /** 维修类型：自主/外委 */
  repairType?: string;
  /** 维修金额 */
  repairMoney?: string;
  /** 故障库类型 */
  failureWarehouseType?: any;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  /** 故障现象及原因 */
  faultContent?: string;
  /** 维修内容 */
  repairContent?: string;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listTpmFailureWarehouseByPage(param: QueryParamModel): Promise<ResponsePageData<TpmFailureWarehouseDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmFailureWarehouse (id: string): Promise<ResponseBaseData<TpmFailureWarehouseDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmFailureWarehouse (form: TpmFailureWarehouseDto): Promise<ResponseBaseData<any>> {
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
/** 提交审批 */
export function approvalTpmFailureWarehouse(data) {
  return request.post(basePath + '/start-process-by-ids/v1', data);
}

/** 根据id集合删除数据 */
export function delTpmFailureWarehouse(ids: [string]): Promise<ResponseBaseData<any>> {
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
