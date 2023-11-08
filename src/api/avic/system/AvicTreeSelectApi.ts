import request from '@/utils/request';

/** 获取树 */
export function getTreeData(baseUrl, level, pid) {
  return request({
    url: baseUrl + '/get-tree/' + level + '/' + pid + '/v1',
    method: 'get'
  });
}

/** 树查询 */
export function searchTree(baseUrl, params) {
  return request({
    url: baseUrl + '/search/v1',
    data: params,
    method: 'post'
  });
}
