import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsinventorys';
/** 库房定义表 */
export interface MdsInventoryDto extends BaseBeanModel {
  /** 上级库房ID */
  parentMdsInventoryId?: string;
  parentMdsInventoryIdAlias?: string;
  /** 项目ID ^  */
  mdsProjectId?: string;
  mdsProjectIdAlias?: string;
  /** 库房代码  */
  inventoryCode?: string;
  /** 库房名称 */
  inventoryName?: string;
  /** 库房地点 */
  inventoryLocation?: string;
  /** 库房类别  */
  mdsInventoryTypeId?: any;
  /** 库房是否有效  */
  validFlag?: string;
  /** 库房是否有效  */
  validFlagName?: string;
  /** 库房所属部门ID */
  inventoryDeptId?: string;
  /** 库房所属部门编码 */
  inventoryDeptCode?: string;
  /** 库房所属部门名称 */
  inventoryDeptName?: string;
  /** 联系人ID */
  contactUserId?: string;
  /** 联系人编码 */
  contactUserCode?: string;
  /** 联系人姓名 */
  contactUserName?: string;
  /** 联系电话 ^ */
  contactTel?: string;
  /** 备注 ^ */
  note?: string;
  /** 业务类型 */
  transactionType?: any;
  /** 质量状态 */
  quanlityType?: any;
  /** 区域ID */
  mdsAreaId?: string;
  mdsAreaIdAlias?: string;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 库房所存储物料品类 */
  storageItemCategory?: string;
}

/** 获取分页数据 */
export function listMdsInventoryByPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsInventoryDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsInventory(id: string): Promise<ResponseBaseData<MdsInventoryDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsInventory(form: MdsInventoryDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsInventory(ids: [string]): Promise<ResponseBaseData<any>> {
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

