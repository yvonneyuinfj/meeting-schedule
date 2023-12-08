import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdscustomers';
/** 客户定义表 */
export interface MdsCustomerDto extends BaseBeanModel {
  /** 密级 */
  secretLevel?: any;
  /** 客户编码 */
  customerCode?: string;
  /** 企业编码 */
  corporationUniqueCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 曾用名 */
  customerOrgName?: string;
  /** 区号 */
  districtNumber?: string;
  /** 上级渠道 */
  parentCustomerId?: string;
  /** 企业别名 */
  alias?: string;
  /** 客户地址 */
  address?: string;
  /** 地区ID */
  mdsRegionId?: string;
  /** 语种 */
  mdsLanguageId?: string;
  /** 客户电话 */
  tel?: string;
  /** 电话2 */
  tel2?: string;
  /** 电话3 */
  tel3?: string;
  /** 客户传真 */
  fax?: string;
  /** 域名 */
  url?: string;
  /** E_mail */
  email?: string;
  /** 付款方式 */
  payMode?: any;
  /** 预付比率（%） */
  prepayRate?: string;
  /** 企业法人 */
  juridicalPerson?: string;
  /** 纳税人 */
  taxpayer?: string;
  /** 银行帐号 */
  accountCurrent?: string;
  /** 开户行 */
  depositBank?: string;
  /** 增值账号 */
  vatNo?: string;
  /** 质量等级 */
  vendorQulityLevel?: any;
  /** 单位性质 */
  corporationMode?: any;
  /** 邮政编码 */
  postcode?: string;
  /** 邮政信箱 */
  box?: string;
  /** 主要业务 */
  dealIn?: string;
  /** 企业规模（人） */
  employees?: number;
  /** 允许提前交付期（天） */
  aheadDelivery?: number;
  /** 允许延误交付期（天） */
  delayDelivery?: number;
  /** 允许接收超出百分比 */
  accpetOverRate?: string;
  /** 客户重要程度 */
  customerImport?: any;
  /** 单位类型 */
  customerType?: any;
  unitTypeName?: string;
  /** 销售收入 */
  salesIncome?: string;
  /** 抗风险能力 */
  riskResistable?: any;
  /** 研发能力 */
  devAbility?: any;
  /** 占地面积 */
  occupiedArea?: string;
  /** 服务信誉分数 */
  serviceCreditPoint?: string;
  /** 质量信誉分数 */
  qualityCreditPoint?: string;
  /** 总分数 */
  totalPoint?: string;
  /** 币种ID */
  mdsCurrencyId?: string;
  /** 客户认证 */
  certificate?: any;
  /** 国别ID */
  mdsCountryId?: string;
  /** 地区名称 */
  mdsRegionName?: string;
  /** 质量信誉 */
  qualityCreditId?: any;
  /** 电挂 */
  cableAddress?: string;
  /** 是否可替代 */
  ynReplace?: any;
  /** 交付期变化处理 */
  deliveryChangeDeal?: any;
  /** 超出接受处理 */
  overAcceptDeal?: any;
  /** 通讯地址 */
  communicationAddress?: string;
  /** 发货地址 */
  deliverAddress?: string;
  /** 许可证号 */
  approbateNo?: string;
  /** 纳税登记号 */
  ratepayingNo?: string;
  /** 备注 */
  note?: string;
  /** 有效标识 */
  validFlag?: any;
  /** 客户类型 */
  customerTypeId?: string;
  /** 客户类型 编码 */
  customerTypeCode?: string;
  /** 客户类型 名称 */
  customerTypeName?: string;
}

/** 获取分页数据 */
export function listMdsCustomerByPage(
  param: QueryParamModel
): Promise<ResponsePageData<MdsCustomerDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsCustomer(id: string): Promise<ResponseBaseData<MdsCustomerDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsCustomer(form: MdsCustomerDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsCustomer(ids: [string]): Promise<ResponseBaseData<any>> {
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
