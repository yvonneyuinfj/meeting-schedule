import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsinventorytransactions';
/** 库存事务处理类型定义表  */
export interface MdsInventoryTransactionDto extends BaseBeanModel {
  /** 库存事务处理类型代码 */
  invTransactTypeCode?: string;
  /** 库存事务类型说明 */
  invTransactTypeDesc?: string;
  /** 操作来源代码 ^ C --采购; S--生产; K--库存; X--销售; P--配套; I--零星; J--JIT; D--调换; T--退货; Z--建帐; Y--移库; L--领用; W--维修;B--报废; */
  operationSource?: any;
  /** 操作类型代码 ^ O --出库;   I--入库 */
  operationType?: any;
  /** 是否登帐标记 ^  */
  keepAccountFlag?: any;
  /** 库房总数量变化标记 ^+ --增加；- --减少；0 --不变 */
  changeInvQtyFlag?: any;
  /** 累计入库量变化标记 ^+ --增加；- --减少；0 --不变 */
  changeSumupInQtyFlag?: any;
  /** 累计出库量变化标记 ^+ --增加；- --减少；0 --不变 */
  changeSumupOutQtyFlag?: any;
  /** 已分配量变化标记 ^+ --增加；- --减少；0 --不变 */
  changeAllocatedQtyFlag?: any;
  /** 单据前缀代码 ^ 事务号前缀，用来生成事务处理单据号 */
  prefixCode?: string;
  /** 单据报表名称 ^ 打印报表名 */
  reportName?: string;
  /** 是否进行出库审批 */
  ynOutApprove?: any;
  /** 是否进行出库检验 */
  ynOutCheck?: any;
  /** 有效标记^ 0-无效；1-有效 */
  validFlag?: any;
  /** 是否允许选择 ^ 在出入库单据编制时是否允许选择该库存事务类型 */
  ynEnableChoose?: string;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 是否进行稽核【SFERP新增】 */
  ynAudit?: string;
}

/** 获取分页数据 */
export function listMdsInventoryTransactionByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsInventoryTransactionDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsInventoryTransaction (id: string): Promise<ResponseBaseData<MdsInventoryTransactionDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsInventoryTransaction (form: MdsInventoryTransactionDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsInventoryTransaction (ids: [string]): Promise<ResponseBaseData<any>> {
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
