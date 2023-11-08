import request from '@/utils/request';
import type { ResponseBaseData } from '@/api/model/baseModel';
import bpmUtils from '@/views/avic/bpm/bpmutils/FlowUtils';

/** 获取父流程信息 */
export function getParentProcess(data): Promise<ResponseBaseData<any>> {
  return request({
    url: bpmUtils.baseurl + '/business/getParentprocess/v1',
    data: data,
    method: 'post'
  });
}
