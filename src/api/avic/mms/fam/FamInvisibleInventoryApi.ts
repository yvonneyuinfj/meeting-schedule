import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/fam/faminvisibleinventorys';
/** 无形资产台账 */
export interface FamInvisibleInventoryDto extends BaseBeanModel {
  /** 资产名称 */
  assetName?: string;
  /** 资产编号 */
  assetNo?: string;
  /** 使用权 */
  usufruct?: string;
  /** 所有权 */
  ownerShip?: string;
  /** 软件商名称 */
  softwareVendors?: string;
  /** 使用年限（10年） */
  useTime?: number;
  /** 是否授权 */
  ynAuthorization?: any;
  /** 实体 */
  entity?: string;
  /** 使用权编号 */
  usufructNo?: string;
  /** 原值（等于出厂原价） */
  factoryPrice?: string;
  /** 数量（默认1） */
  num?: number;
  /** 合同编号 */
  contractNo?: string;
  /** 合同金额 */
  orderValue?: string;
  /** 责任人 */
  liablePersion?: string;
  liablePersionAlias?: string;
  /** 主管部门id */
  managerDeptId?: string;
  managerDeptIdAlias?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  /** 使用部门id */
  useDeptId?: string;
  useDeptIdAlias?: string;
  /** 使用部门名称 */
  useDeptName?: string;
  /** 资产状态（在用，处置） */
  assetStatus?: any;
  /** 购置时间（验收审批完成时间） */
  purchaseTime?: any;
  purchaseTimeBegin?: any;
  purchaseTimeEnd?: any;
  /** 数据密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listFamInvisibleInventoryByPage (
  param: QueryParamModel
): Promise<ResponsePageData<FamInvisibleInventoryDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamInvisibleInventory (id: string): Promise<ResponseBaseData<FamInvisibleInventoryDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamInvisibleInventory (form: FamInvisibleInventoryDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delFamInvisibleInventory (ids: [string]): Promise<ResponseBaseData<any>> {
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
