import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/wms/wmsinvoutbills';
/** 出库单主表 */
export interface WmsInvOutBillDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 单据编号 */
  billNo?: string;
  /** 单据类型 */
  billType?: any;
  /** 领用部门 */
  useDeptId?: string;
  useDeptIdAlias?: string;
  /** 库房 */
  mdsInventoryId?: string;
  /** 申请人 */
  applyUserId?: string;
  applyUserIdAlias?: string;
  /** 申请部门 */
  applyDeptId?: string;
  applyDeptIdAlias?: string;
  /** 申请日期 */
  applyDate?: any;
  applyDateBegin?: any;
  applyDateEnd?: any;
  /** 备注 */
  note?: string;
  /** 领用部门编码 */
  useDeptCode?: string;
  /** 领用部门名称 */
  useDeptName?: string;
  /** 申请部门名称 */
  applyDeptName?: string;
  /** 申请部门编码 */
  applyDeptCode?: string;
  /** 申请人姓名 */
  applyUserName?: string;
  /** 申请人编码 */
  applyUserCode?: string;
  /** 单据来源 ^ R-原材料,C-成品,D-锻件,U-标准件 */
  billSource?: string;
  /** 操作来源代码【冗余】 ^ C --采购; S--生产; K--库存; X--销售; P--配套; I--零星; J--JIT; D--调换; T--退货; Z--建帐; Y--移库; L--领用; W--维修;B--报废;N--库内转移;Y--库间转移 */
  operationSource?: string;
  /** 是否红单 ^ Y-红单,N-蓝单,红单时更新指定的库房台帐ID,库存数量=库存数量-出库数量 */
  ynRedBill?: string;
  bpmState?: string;
  bpmType?: string;
  /** 子表集合 */
  wmsInvOutBillLList?: [];
}

/** 获取分页数据 */
export function listWmsInvOutBillByPage(param: QueryParamModel): Promise<ResponsePageData<WmsInvOutBillDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getWmsInvOutBill (id: string): Promise<ResponseBaseData<WmsInvOutBillDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveWmsInvOutBill (form: WmsInvOutBillDto): Promise<ResponseBaseData<any>> {
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
export function delWmsInvOutBill(ids: [string]): Promise<ResponseBaseData<any>> {
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
