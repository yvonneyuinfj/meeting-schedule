import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/tpm/tpmopltrainings';
/** OPL点滴培训表 */
export interface TpmOplTrainingDto extends BaseBeanModel {
  /** 活动编号 */
  billNo?: string;
  /** 培训单位ID */
  oplDeptId?: string;
  oplDeptIdAlias?: string;
  /** 培训单位名称 */
  oplDeptName?: string;
  /** 主题 */
  subject?: string;
  /** 小组名称 */
  groupName?: string;
  /** 课题分类 */
  subjectCategory?: any;
  /** 编制人 */
  editUserId?: string;
  /** 编制人姓名 */
  editUserName?: string;
  /** 培训目的 */
  trainingPurpose?: string;
  /** 培训要点 */
  trainingFocus?: string;
  /** 培训时间 */
  trainingDate?: any;
  trainingDateBegin?: any;
  trainingDateEnd?: any;
  /** 培训人员id */
  trainingPersonId?: string;
  /** 培训人员 */
  trainingPersonName?: string;
  /** 讲师id */
  lecturerUserId?: string;
  lecturerUserIdAlias?: string;
  /** 讲师姓名 */
  lecturerUserName?: string;
  /** 人数 */
  peopleNumber?: number;
  /** 密级 */
  secretLevel?: any;
}

/** 获取分页数据 */
export function listTpmOplTrainingByPage (
  param: QueryParamModel
): Promise<ResponsePageData<TpmOplTrainingDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getTpmOplTraining (id: string): Promise<ResponseBaseData<TpmOplTrainingDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveTpmOplTraining (form: TpmOplTrainingDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delTpmOplTraining (ids: [string]): Promise<ResponseBaseData<any>> {
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
