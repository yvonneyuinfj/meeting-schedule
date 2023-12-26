import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/wms/wmsinvinbills';
/** 入库单主表 */
export interface WmsInvInBillDto extends BaseBeanModel {
  /** 申请单号 */
  billNo?: string;
  /** 入库事务类型ID */
  billType?: string;
  /** 单据来源 ^ R 原材料 C 成品 U 标准件 */
  billSource?: string;
  /** 是否红单 ^ Y-红单,N-蓝单,红单时更新指定的库房台帐ID,库存数量=库存数量-入库数量 */
  ynRedBill?: string;
  /** 库房 */
  mdsInventoryId?: string;
  /** 申请人 */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 申请人姓名 */
  applyUserName?: string;
  /** 申请部门 */
  applyDeptId?: string;
  applyDeptIdAlias?: string;
  /** 申请部门编码 */
  applyDeptCode?: string;
  /** 申请部门名称 */
  applyDeptName?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 备注 */
  note?: string;
  /** 密级 */
  secretLevel?: any;
  /** 操作来源代码【冗余】 ^ C --采购; S--生产; K--库存; X--销售; P--配套; I--零星; J--JIT; D--调换; T--退货; Z--建帐; Y--移库; L--领用; W--维修;B--报废; 0--到货，1--台账 */
  operationSource?: string;
  /** TESTCLOB */
  testclob?: string;
  /** TESTBLOB */
  testblob?: string;
}

/** 获取分页数据 */
export function listWmsInvInBillByPage (
  param: QueryParamModel
): Promise<ResponsePageData<WmsInvInBillDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsInvInBill (id: string): Promise<ResponseBaseData<WmsInvInBillDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsInvInBill (form: WmsInvInBillDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delWmsInvInBill (ids: [string]): Promise<ResponseBaseData<any>> {
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
