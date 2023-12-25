import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/pms/pmscertifications';
/** 检验结论表（合格证表） */
export interface PmsCertificationDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 厂内合格证 */
  facprtlotNo?: string;
  /** 合格品数量 */
  qualifiedQty?: number;
  /** 检验结论 */
  checkResult?: any;
  /** 不合格品数量 */
  unqualifiedQty?: number;
  /** 不合格品处理单号 */
  unqualifiedNo?: string;
  /** 检验损耗数量 */
  checkLossQty?: number;
  /** 状态 */
  status?: string;
  /** 检验人 */
  checkerUserId?: string;
  checkerUserIdAlias?: string;
  /** 检验日期  */
  checkDate?: any;
  checkDateBegin?: any;
  checkDateEnd?: any;
  /** 理化试验结论 */
  entrustResult?: string;
  /** 无损检测结论 */
  losslessResult?: string;
  /** 备注 */
  notes?: string;
  /** 采购到货检验单表ID */
  pmsCheckBillId?: string;
  /** 采购到货三期表ID */
  pmsReceiveLDetailThreeId?: string;
  /** 质量编号 ^ 用于控制产品质量及性能的产品质量检验编号。0表示此物料不需要质量跟踪,格式：QYYYYMMDDXXXX */
  prtlotNo?: string;
  /** 审批单号 */
  approveNo?: string;
  /** 限用产品 */
  usedProductLimit?: string;
  /** 限用范围 */
  usedRangeLimit?: string;
  /** 试验单号 */
  checkBusinessNo?: string;
  /** 检验人代码 */
  checkerUserCode?: string;
  /** 检验人姓名 */
  checkerUserName?: string;
  /** 审批结果 */
  approveResult?: string;
  /** 质量编号反馈人id */
  prtlotNoUserId?: string;
  /** 质量编号反馈人编号 */
  prtlotNoUserCode?: string;
  /** 质量编号反馈人姓名 */
  prtlotNoUserName?: string;
  /** 退回原因 */
  backNote?: string;
  /** 到货明细ID */
  pmsReceiveLDetailId?: string;
  bpmState?: string;
  bpmType?: string;
}

/** 获取分页数据 */
export function listPmsCertificationByPage(param: QueryParamModel): Promise<ResponsePageData<PmsCertificationDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getPmsCertification (id: string): Promise<ResponseBaseData<PmsCertificationDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function savePmsCertification (form: [PmsCertificationDto]): Promise<ResponseBaseData<any>> {
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
export function delPmsCertification(ids: [string]): Promise<ResponseBaseData<any>> {
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
