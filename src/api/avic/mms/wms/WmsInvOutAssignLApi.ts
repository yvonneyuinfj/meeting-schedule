import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmsinvoutassignls';
/** 出库库存资源分配表 */
export interface WmsInvOutAssignLDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 申请单子表ID */
  wmsInvOutBillLId?: string;
  /** 原始单据子表ID^ */
  originalOrderDetailId?: string;
  /** 台账ID */
  wmsItemInventoryId?: string;
  /** 分配出库数量 */
  assignQty?: string;
  /** 出库数量 */
  outQty?: string;
  /** 新进出库数量^未使用过的数量，出库数量包含新进出库数量 */
  unusedOutQty?: string;
  /** 件号列表^小号串 */
  itemSubNoStr?: string;
  /** 检验确认数量 */
  qcCheckQty?: string;
  /** 检验确认日期 */
  qcCheckDate?: any;
  qcCheckDateBegin?: any;
  qcCheckDateEnd?: any;
  /** 检验确认人 */
  qcCheckUserId?: string;
  qcCheckUserIdAlias?: string;
  /** 检验确认人编码 */
  qcCheckUserCode?: string;
  /** 检验确认人姓名 */
  qcCheckUserName?: string;
  /** 退回原因 */
  refuseReason?: string;
  /** 单据状态 */
  outAssignLStatus?: any;
  /** 检验确认人部门 */
  qcCheckDeptId?: string;
  qcCheckDeptIdAlias?: string;
  /** 检验确认人部门编码 */
  qcCheckDeptCode?: string;
  /** 检验确认人部门名称 */
  qcCheckDeptName?: string;
  /** 余料数量 */
  surplusQty?: string;
  /** 出库备注 */
  remark?: string;
}

/** 获取分页数据 */
export function listWmsInvOutAssignLByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsInvOutAssignLDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 物资按小号出库数据查询 */
export function searchWmsInvOutAssignLForOutBill (
  param: QueryParamModel
): Promise<ResponsePageData<WmsInvOutAssignLDto>> {
  return request.post(basePath + '/searchWmsInvOutAssignLForOutBill', param);
}

/** 根据id加载数据 */
export function getWmsInvOutAssignL (id: string): Promise<ResponseBaseData<WmsInvOutAssignLDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsInvOutAssignL (form: WmsInvOutAssignLDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsInvOutAssignL (ids: [string]): Promise<ResponseBaseData<any>> {
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
