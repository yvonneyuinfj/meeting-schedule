import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/pms/pmsreceives';
/** 采购到货主信息表 */
export interface PmsReceiveDto extends BaseBeanModel {
  /** 密级  */
  secretLevel?: any;
  /** 状态  */
  status?: string;
  /** 到货登记号  */
  billNo?: string;
  /** 供应商 */
  mdsVendorName?: string;
  /** 供应商ID */
  mdsVendorId?: string;
  /** 到货日期  */
  receiveDate?: any;
  receiveDateBegin?: any;
  receiveDateEnd?: any;
  /** 编制人ID */
  editUserId?: string;
  /** 编制人编码 ^ 员工编码 */
  editUserCode?: string;
  /** 编制人姓名 */
  editUserName?: string;
  /** 编制日期 ^  */
  editDate?: any;
  editDateBegin?: any;
  editDateEnd?: any;
  /** 到货类型：1-订单到货， 2-合同到货，3-换货返修单到货 */
  deliverType?: string;
  /** 退回原因 */
  rejectReason?: string;
}

/** 获取分页数据 */
export function listPmsReceiveByPage (
  param: QueryParamModel
): Promise<ResponsePageData<PmsReceiveDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsReceive (id: string): Promise<ResponseBaseData<PmsReceiveDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsReceive (form: PmsReceiveDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delPmsReceive (ids: [string]): Promise<ResponseBaseData<any>> {
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
