import request from '@/utils/request';
import type { ResponsePageData, ResponseBaseData } from '@/api/model/baseModel';
const centerPath = '/bpm/center';
const batchhandlePath = '/bpm/bpm/batchhandle';
const bpmBussinessPath = '/bpm/bpm/business';
/** 我的任务 */

/** 获取任务数量 */
export function searchBpmTaskCount(param): Promise<ResponseBaseData<any>> {
  return request.post(centerPath + '/searchBpmTaskCount/v1', param);
}

/** 获取任务数量 */
export function searchMyProcessCount(param): Promise<ResponseBaseData<any>> {
  return request.post(centerPath + '/searchMyProcessCount/v1', param);
}

/** 获取任务列表 */
export function listBpmTaskListByPage(param): Promise<ResponsePageData<any>> {
  return request.post(centerPath + '/searchHistTaskByPageNew/v1', param);
}

/** 执行批量办理 */
export function batchHandle(param): Promise<ResponseBaseData<any>> {
  return request.post(batchhandlePath + '/doBatchHandle/v1', param);
}

/** 请求办理结果详情 */
export function getBatchHandleInfo(): Promise<ResponseBaseData<any>> {
  return request.post(batchhandlePath + '/getBatchHandleInfo/v1');
}

/** 执行批量待阅 */
export function batchRead(param): Promise<ResponseBaseData<any>> {
  return request.post(batchhandlePath + '/doBatchRead/v1', param);
}

/** 执行待阅 */
export function finishRead(param): Promise<ResponseBaseData<any>> {
  return request.post(bpmBussinessPath + '/finishreader/v1', param);
}

/** 获取我的流程列表 */
export function listHistProcessByPage(param): Promise<ResponsePageData<any>> {
  return request.post(centerPath + '/searchHistProcessByPageNew/v1', param);
}
