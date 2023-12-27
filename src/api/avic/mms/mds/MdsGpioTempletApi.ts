import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsgpiotemplets';
/** 通用输入输出模板管理 */
export interface MdsGpioTempletDto extends BaseBeanModel {
  /** 模板编号 */
  templetCode?: string;
  /** 模板名称 */
  templetName?: string;
  /** 模板格式  */
  templetType?: any;
  /** 模板分类 */
  templetClass?: any;
  /** 模板文件 */
  templetFile?: string;
  /** 预留字段1 */
  attribute01?: string;
  /** 预留字段2 */
  attribute02?: string;
  /** 预留字段3 */
  attribute03?: string;
  /** 预留字段4 */
  attribute04?: string;
  /** 预留字段5 */
  attribute05?: string;
  /** 预留字段6 */
  attribute06?: string;
  /** 预留字段8 */
  attribute08?: string;
  /** 预留字段7 */
  attribute07?: string;
  /** 预留字段9 */
  attribute09?: string;
  /** 预留字段10 */
  attribute10?: string;
  /** 模板版本号 */
  templetVersion?: string;
  /** 品类ID */
  mdsCategoryLvId?: string;
  /** 品类编码 */
  mdsCategoryLvCode?: string;
  /** 品类名称 */
  mdsCategoryLvName?: string;
  /** 密级 */
  secretLevel?: any;
  /** 二级类型 */
  secModelType?: any;
  /** 合同分类 */
  contractClass?: any;
  /** 是否标准模板 */
  standardContactFlag?: any;
  /** 模板描述 */
  templetDesc?: string;
}

/** 获取分页数据 */
export function listMdsGpioTempletByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsGpioTempletDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsGpioTemplet (id: string): Promise<ResponseBaseData<MdsGpioTempletDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsGpioTemplet (form: MdsGpioTempletDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsGpioTemplet (ids: [string]): Promise<ResponseBaseData<any>> {
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
