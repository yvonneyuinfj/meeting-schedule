import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsitems';
/** 物料主数据表 */
export interface MdsItemDto extends BaseBeanModel {
  /** 物料号  */
  itemCode?: string;
  /** 物料名称  */
  itemName?: string;
  /** 图号 */
  drawingCode?: string;
  /** 物料类型  */
  itemType?: any;
  /** 来源类型 */
  sourceType?: any;
  /** 计量单位  */
  mdsUnitId?: string;
  mdsUnitName?: string;
  /** 关重件标记 */
  keyFlag?: any;
  /** 备注  */
  note?: string;
  /** 牌号  */
  marque?: string;
  /** 规格  */
  specs?: string;
  /** 技术条件种类名称 */
  techCondition?: string;
  /** 主制部门 */
  mainHrDeptId?: string;
  mainHrDeptIdAlias?: string;
  /** 物料大类 */
  mdsItemClassId?: string;
  /** 物料大类 */
  mdsItemClassName?: string;
  /** 交货状态 */
  deliveryStatus?: string;
  /** 版本号  */
  itemRevision?: string;
  /** 适用产品 */
  appProductCode?: any;
  /** 计划价  */
  plannedPrice?: string;
  /** 物料状态  */
  mdsItemStatus?: any;
  /** 扩展属性合并显示文本  */
  extendText?: string;
  /** 密级  */
  secretLevel?: any;
  /** 原始物料编码 */
  originalItemCode?: string;
  /** 物料基础码 */
  extendItemCode?: string;
  /** 特殊要求 */
  specialRequirements?: string;
  /** 技术标准号 */
  technicalStandardNo?: string;
  /** 技标版本 */
  jbbb?: string;
  /** 集团码 */
  jtm?: string;
  /** 制造国名称 */
  makeCountry?: string;
  /** 牌号代码 */
  marqueCode?: string;
  /** 交货状态代码 */
  deliveryStatusCode?: string;
  /** 数据来源 */
  dataSource?: any;
  /** 技术条件代码 */
  techConditionCode?: string;
  /** 浪潮代码 */
  lcCode?: string;
  /** 补充技术条件 */
  additionalTechCondition?: string;
  /** 供货尺寸类别 */
  deliverySizeType?: string;
  /** 承制单位 */
  manufactor?: string;
  /** 锻铸件类别 */
  dzType?: string;
  /** 超声波 */
  csb?: string;
  /** 试料数量 */
  testamount?: string;
  /** 关键件等级  */
  keyLevel?: string;
  /** 是否关键原材料 */
  ynKeyMaterial?: any;
  /** 民机对应项目ID */
  mpmId?: string;
  /** 定倍尺标识 */
  fixedFlag?: string;
  /** 技标号 */
  jbh?: string;
  /** 机型代号主数据编码 */
  jxdhbm?: string;
  /** 规格数据 */
  mdmSpecs?: string;
  /** 是否关键站位 */
  ynKeyZw?: any;
  /** 标准号 */
  bzh?: string;
  /**新增字段 */
  /**物料简称 */
  itemShortName?: string;
  /**条形码 */
  barCode?: string;
  /**产品线 */
  productLine?: string;
  /**物料税类 */
  itemDutyType?: string;
  /**换算率 */
  convertRate?: string;
  /**辅计量单位 */
  calculateUnit?: string;
  /**物资用途分类 */
  itemUseClassify?: string;
  /**材料形态 */
  materialModal?: string;
  /**核算分类 */
  accordClassify?: string;
  /**质量等级 */
  qualityGrade?: string;
  /**重要程度 */
  importanceLevel?: string;
  /**生产材料 */
  produceMaterial?: string;
  /**是否主制件 */
  ynMainParts?: any;
  /**是否通用件 */
  ynGeneralParts?: any;
  /**是否成附件 */
  ynAttach?: any;
  /**是否标准件 */
  ynStandardParts?: any;
  /**是否可分解 */
  ynDecompose?: any;

  /**是否消耗件 */
  ynConsume?: any;
  /**是否虚拟件 */
  ynVirtual?: any;
  /**加工工艺 */
  workTechnology?: string;
  /**大小分类 */
  sizeClassify?: string;
  /**是否主机件 */
  ynMaster?: any;
  /**流水号 */
  serialNo?: string;
  /**不传二级库标记 */
  itemFlag?: string;

}

/** 获取分页数据 */
export function listMdsItemByPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsItemDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsItem(id: string): Promise<ResponseBaseData<MdsItemDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsItem(form: MdsItemDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsItem(ids: [string]): Promise<ResponseBaseData<any>> {
  return request.delete(basePath + '/delete-by-ids/v1', { data: ids });
}

/** 导出Excel */
export function exportExcel(param: any) {
  const download = {
    url: basePath + '/exportData/v1',
    data: param,
    method: 'post'
  } as downloadParam;
  return downloadSysFile(download);
}
