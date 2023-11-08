import request from '@/utils/request';

/** 获取流程意见 */
export function getFlowOpinions(data) {
  return request({
    url: '/bpm/bpm/business/getAllIdeaStyleData/v1',
    data: data,
    method: 'post'
  });
}
