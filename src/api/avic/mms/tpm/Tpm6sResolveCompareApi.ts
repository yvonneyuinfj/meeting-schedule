import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';

const basePath = '/mms/tpm/tpm6sresolvecompares';
/** 六源问题解决评价表 */
export interface Tpm6sResolveCompareDto extends BaseBeanModel {
  /** TPM_6S_APPLY_ID */
  tpm6sApplyId?: string;
  /** 立项单位ID(冗余) */
  editDeptId?: string;
  editDeptIdAlias?: string;
  /** 立项单位名称(冗余) */
  editDeptName?: string;
  /** 立项时间 */
  approvedDate?: any;
  approvedDateBegin?: any;
  approvedDateEnd?: any;
  /** 完成时间 */
  finishDate?: any;
  finishDateBegin?: any;
  finishDateEnd?: any;
  /** 六源问题问题解决评价 */
  problemSolvingEvaluation?: string;
  /** 流程状态，通用代码：TPM_BILL_STATUS^0-编制中,5-拟稿中 15-审批中,20审批通过 */
  billStatus?: string;
  billStatusName?: string;
  /** 密级 */
  secretLevel?: any;
  /** 六源问题解决情况 */
  problemSolvingInstruction?: string;
  
  bpmState?: string;
  bpmType?: string;
  /**下面是从Apply表中拿到的数据**/
   /** 立项编号 */
   billNo?: string;
   /** 六源问题立项 */
   projectCategory?: string;
   /** 项目立项名称 */
   projectName?: string;
   /** 地点/位置 */
   location?: string;
   /** 问题发现人ID */
   problemFinderId?: string;
   /** 问题发现人姓名 */
   problemFinderName?: string;
   /** 编制人ID */
   editUserId?: string;
   /** 编制人姓名 */
   editUserName?: string;
   /** 提出时间 */
   applyDate?: any;
   applyDateBegin?: any;
   applyDateEnd?: any;
   /** 计划完成时间 */
   planFinishDate?: any;
   planFinishDateBegin?: any;
   planFinishDateEnd?: any;
   /** 六源问题描述 */
   problemDescription?: string;
 
   /** 六源问题改善建议 */
   problemAdvice?: string;
   /** 项目组长ID */
   chargeUserId?: string;
   /** 项目组长姓名 */
   chargeUserName?: string;
   /** 团队成员ID */
   teamUserId?: string;
   /** 团队成员姓名 */
   teamUserName?: string;

 
}

/** 获取分页数据 */
export function listTpm6sResolveCompareByPage(param: QueryParamModel): Promise<ResponsePageData<Tpm6sResolveCompareDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpm6sResolveCompare (id: string): Promise<ResponseBaseData<Tpm6sResolveCompareDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpm6sResolveCompare (form: Tpm6sResolveCompareDto): Promise<ResponseBaseData<any>> {
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
export function delTpm6sResolveCompare(ids: [string]): Promise<ResponseBaseData<any>> {
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
