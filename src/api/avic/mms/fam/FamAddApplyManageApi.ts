import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/fam/famaddapplymanages';
/** 资产新增管理表 */
export interface FamAddApplyManageDto extends BaseBeanModel {
  /** 申请单号 */
  applyNo?: string;
  /** 固定资产名称 */
  capitalAssetName?: string;
  /** 固定资产主管部门 */
  capitalAssetDept?: string;
  capitalAssetDeptAlias?: string;
  /** 是否科研用 */
  ynScientific?: any;
  /** 预算项目ID */
  budgetItemId?: string;
  /** 预算项目名称 */
  budgetItemName?: string;
  /** 预算分项 */
  budgetSubItem?: string;
  /** 预算组织 */
  budgetOrg?: string;
  /** 购置数量 */
  purchaseNum?: any;
  /** 预算单价（元） */
  budgetUnivalent?: any;
  /** 预算总价（元） */
  budgetTotal?: any;
  /** 是否需要评审 */
  ynReview?: any;
  /** 联系电话 */
  tel?: string;
  /** 需求日期 */
  qualityDate?: any;
  qualityDateBegin?: any;
  qualityDateEnd?: any;
  /** 物资等级 */
  goodsLevel?: string;
  /** 申请理由 */
  applyReason?: string;
  /** 要求及建议 */
  reqAndAdvise?: string;
  /** 备注 */
  note?: string;
  /** 申请部门 */
  appllDeptId?: string;
  appllDeptIdAlias?: string;
  /** 申请时间 */
  applyDate?: string;
  /** 标题 */
  title?: string;
  /** 密级 */
  secretLevel?: any;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listFamAddApplyManageByPage(param: QueryParamModel): Promise<ResponsePageData<FamAddApplyManageDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getFamAddApplyManage(id: string): Promise<ResponseBaseData<FamAddApplyManageDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveFamAddApplyManage(form: FamAddApplyManageDto): Promise<ResponseBaseData<any>> {
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
export function delFamAddApplyManage(ids: [string]): Promise<ResponseBaseData<any>> {
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
