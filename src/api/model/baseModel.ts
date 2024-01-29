export interface BaseResponse {
  errorDesc?: string;
  message?: string;
  code?: string;
  success?: boolean;
}
/**
 * 分页响应结果
 */
export interface ResponsePageData<T> extends BaseResponse {
  data?: Page<T>;
}
/**
 * 普通响应结果
 */
export interface ResponseBaseData<T> extends BaseResponse {
  data?: T;
}
export interface Page<T> {
  pageParameter?: pageParameter;
  result?: T[];
}
export interface pageParameter {
  order?: number;
  page?: number;
  rows?: string;
  sort?: number;
  totalCount?: number;
  totalPage?: number;
}
/**
 * 分页查询后台接收数据结构
 */
export interface QueryParamModel {
  // 请求表格数据参数
  pageParameter?: {
    page: number; // 页数
    rows: number; // 每页条数
  };
  searchParams?: object;
  keyWord?: string; // 快速查询数据
  sidx?: string; // 排序字段
  sord?: string; // 排序方式: desc降序 asc升序
}

/**
 * 基础对象
 */
export interface BaseBeanModel {
  id?: string;
  createdBy?: string;
  createdDept?: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
  lastUpdatedBy?: string;
  lastUpdateIp?: string;
  version?: number;
  orgIdentity?: string;
  secretLevel?: string;
}
/**
 * 树对象
 */
export interface BaseTreeModel extends BaseBeanModel {
  treePath?: string;
  treeSort?: number;
  treeSorts?: string;
  treeLeaf?: string;
  treeLevel?: number;
}
/**
 * 树节点对象
 */
export interface TreeNodeModel {
  id?: string;
  key?: string;
  parentId?: string;
  title?: string;
  selectable?: boolean;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  icon?: string;
  disabled?: boolean;
  style?: string;
  nodeCls?: string;
  orgIdentity?: string;
  nodeType?: string;
  attributes?: object;
  orderBy?: number;
  children?: TreeNodeModel[];
}
