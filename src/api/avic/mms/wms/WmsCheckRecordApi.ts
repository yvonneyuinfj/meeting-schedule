import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmscheckrecords';
/** 送检记录表 */
export interface WmsCheckRecordDto extends BaseBeanModel {
  /** 原始单据ID */
  originalOrderDetailId?: string;
  /** 原始单据表名（入库子单、出库子单、派工单） */
  originalOrderTabName?: string;
  /** 单据类型 */
  billSource?: any;
  /** 送检类型 */
  checkSubmitType?: any;
  /** 送检物料ID */
  mdsItemId?: string;
  /** 送检物料CODE */
  mdsItemCode?: string;
  /** 送检物料NAME */
  mdsItemName?: string;
  /** 送检数量 */
  checkSubmitQty?: string;
  /** 送检人ID */
  checkSubmitUserId?: string;
  checkSubmitUserIdAlias?: string;
  /** 送检人CODE */
  checkSubmitUserCode?: string;
  /** 送检人NAME */
  checkSubmitUserName?: string;
  /** 送检部门ID */
  checkSubmitDeptId?: string;
  checkSubmitDeptIdAlias?: string;
  /** 送检部门CODE */
  checkSubmitDeptCode?: string;
  /** 送检部门NAME */
  checkSubmitDeptName?: string;
  /** 送检日期 */
  checkSubmitDate?: any;
  checkSubmitDateBegin?: any;
  checkSubmitDateEnd?: any;
  /** 质量编号 */
  quanlityNo?: string;
  /** 检验结果 */
  checkResult?: string;
  /** 合格数量 */
  qualifiedQty?: string;
  /** 不合格数量 */
  unqualifiedQty?: string;
  /** 检验员name */
  checkOperatorName?: string;
  /** 检验日期 */
  checkDate?: any;
  checkDateBegin?: any;
  checkDateEnd?: any;
  /** 合格证编号 */
  qualiticationNo?: string;
  /** 试验单号 */
  testBillno?: string;
  /** 试验结论 */
  testResult?: string;
  /** 试验数量 */
  consumeQty?: string;
  /** 限用型号 */
  confineProduct?: string;
  /** 限用批次 */
  confineBatch?: string;
  /** 限用起始架次 */
  confineStartLot?: string;
  /** 限用截止架次 */
  confineEndLot?: string;
  /** 限用说明 */
  confineDesc?: string;
  /** 故障单号 */
  malNo?: string;
  /** 偏离单号 */
  deflectionBillno?: string;
  /** 保留单号 */
  reserveBillno?: string;
  /** 检验状态 */
  checkStatus?: any;
  /** 台账ID */
  wmsItemInventoryId?: string;
  /** 资源分配表ID */
  wmsOutAssignId?: string;
  /** 审理单编号 */
  docNumber?: string;
  /** 密级  */
  secretLevel?: any;
  /** 送检单号 */
  wmsCheckNo?: string;
  /** 检验驳回原因 */
  rejectReason?: string;
  /** 是否限用 */
  confineFlag?: any;
  /** 检验备注 */
  checkNote?: string;
  /** 检验员code */
  checkOperatorCode?: string;
}

/** 获取分页数据 */
export function listWmsCheckRecordByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsCheckRecordDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsCheckRecord (id: string): Promise<ResponseBaseData<WmsCheckRecordDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsCheckRecord (form: WmsCheckRecordDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsCheckRecord (ids: [string]): Promise<ResponseBaseData<any>> {
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
