import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/famaccpets';
const treePath = '/mms/fam/famassetclasss';
/** FAM_ACCPET */
export interface FamAccpetDto extends BaseBeanModel {
  /** 数据密级 */
  secretLevel?: any;
  /** 备注 */
  note?: string;
  /** ATTRIBUTE_01 */
  attribute01?: string;
  /** ATTRIBUTE_02 */
  attribute02?: string;
  /** ATTRIBUTE_03 */
  attribute03?: string;
  /** ATTRIBUTE_04 */
  attribute04?: string;
  /** ATTRIBUTE_05 */
  attribute05?: string;
  /** ATTRIBUTE_06 */
  attribute06?: string;
  /** ATTRIBUTE_07 */
  attribute07?: string;
  /** ATTRIBUTE_08 */
  attribute08?: string;
  /** ATTRIBUTE_09 */
  attribute09?: string;
  /** ATTRIBUTE_10 */
  attribute10?: string;
  /** 验收申请单号 */
  accpetApplyNo?: any;
  /** 验收类型 */
  accpetType?: any;
  /** 合同名称 */
  orderName?: string;
  /** 合同编号 */
  orderNo?: string;
  /** 合同金额 */
  orderValue?: string;
  /** 采购部门id */
  procureDeptId?: string;
  /** 采购部门名称 */
  procureDeptName?: string;
  procureDeptIdAlias?: string;
  /** 验收日期 */
  accpetDate?: any;
  accpetDateBegin?: any;
  accpetDateEnd?: any;
  /** 主管部门id */
  managerDeptId?: string;
  /** 主管部门名称 */
  managerDeptName?: string;
  managerDeptIdAlias?: string;
  /** 接收部门ID */
  receiveDeptId?: string;
  /** 接收部门名称 */
  receiveDeptName?: string;
  receiveDeptIdAlias?: string;
  /** 设备类型 */
  equipmentType?: string;
  /** 资产类别 */
  assetClasst?: string;
  /** 资产类别 */
  assetClass?: string;
  /** 资金来源 */
  fundSource?: string;
  /** 其他事项 */
  otherMatter?: string;
  /** 购置方式 */
  purchWay?: string;
  /** 项目名称 */
  projectName?: string;
  /** 经办人id */
  handlePersonId?: string;
  /** 经办人名称 */
  handlePersonName?: string;
  handlePersonIdAlias?: string;
  bpmState?: string;
  bpmType?: string  /** 子表集合 */
  famAccpetListList?: [];

}

/** 获取分页数据 */
export function listFamAccpetByPage(
  param: QueryParamModel
): Promise<ResponsePageData<FamAccpetDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamAccpet(id: string): Promise<ResponseBaseData<FamAccpetDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAccpet(form: FamAccpetDto): Promise<ResponseBaseData<any>> {
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
export function delFamAccpet(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}


/** 根据资产类型名称返回父节点 */
export function getTreeParent(id: string): Promise<ResponseBaseData<FamAccpetDto>> {
  return request.get(treePath + '/getTreeTd/' + id + '/v1');
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
