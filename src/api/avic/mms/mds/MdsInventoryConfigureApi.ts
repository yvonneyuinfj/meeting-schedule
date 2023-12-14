import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsinventoryconfigures';
/** 库房配置表 */
export interface MdsInventoryConfigureDto extends BaseBeanModel {
  /** 库房ID */
  mdsInventoryId?: string;
  /** 库房盘点方法 */
  balanceType?: any;
  /** 参与计划平衡标记 ^ 是否参与MRP计划平衡的标记:  Y --是;  N --不是 */
  planBalanceFlag?: string;
  /** 参与资金计算标记 ^ 是否参与成本资金计算的标记: Y --是;  N --不是 */
  fundCalculateFlag?: string;
  /** JIT库房标记 ^ Y --是; N --不是 */
  jitFlag?: string;
  /** 参与采购平衡标记 ^  N --不是; Y --是 */
  purchaseBalanceFlag?: string;
  /** 是否筛选 ^ N -不筛选;Y -筛选 */
  filterFlag?: string;
  /** 是否允许有负库存 ^ N --否；Y --是 */
  minusQtyFlag?: string;
  /** 是否寄售库房 ^ N --否；Y --是 */
  consignmentFlag?: string;
  /** 盘点状态 ^ 0-未盘点；1-盘点中 */
  ynBalancing?: string;
  /** 库存台帐合并标记 */
  ynInventoryMerge?: string;
  /** 是否参与油封期预警 */
  ynOilSealWarn?: string;
  /** 油封期提前预警天数 */
  oilSealWarnDays?: string;
  /** 是否参与复验期预警 */
  ynRecheckWarn?: string;
  /** 复验期提前预警天数 */
  recheckWarnDays?: string;
  /** 是否参与保管期预警 */
  ynEffectStockWarn?: string;
  /** 保管期提前预警天数 */
  effectStockWarnDays?: string;
  /** 是否参与积压预警 */
  ynBacklogWarn?: string;
  /** 积压提前预警天数 */
  backlogWarnDays?: string;
  /** 是否参与超储预警 */
  ynOverstockWarn?: string;
  /** 超储警戒系数% */
  overstockWarnRatio?: string;
  /** 是否参与缺货预警 */
  ynLackWarn?: string;
  /** 缺货警戒系数% */
  lackWarnRatio?: string;
  /** 是否参与订货点预警 */
  ynOrderPointWarn?: string;
  /** 订货点警戒系数% */
  orderPointWarnRatio?: string;
  /** 是否进行出库审批 */
  ynOutApprove?: string;
  /** 是否进行出库检验 */
  ynOutCheck?: string;
  /** 备注 ^ */
  note?: string;
  /** 库房保管员 */
  wmsAdmin?: string;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 结算时间(单位：天) */
  settlementDay?: string;
  /** 结算金额 */
  settlementMoney?: string;
}

/** 获取分页数据 */
export function listMdsInventoryConfigureByPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsInventoryConfigureDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}
/** 获取数据 */
export function listMdsInventoryConfigure(
  param: QueryParamModel
): Promise<ResponseBaseData<MdsInventoryConfigureDto>> {
  return request.post(basePath + '/search/v1', param);
}

/** 根据id加载数据 */
export function getMdsInventoryConfigure(id: string): Promise<ResponseBaseData<MdsInventoryConfigureDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsInventoryConfigure(form: MdsInventoryConfigureDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsInventoryConfigure(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
