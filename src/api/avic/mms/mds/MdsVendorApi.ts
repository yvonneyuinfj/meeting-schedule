import request from '@/utils/request';
import type { BaseBeanModel, ResponsePageData, ResponseBaseData, QueryParamModel } from '@/api/model/baseModel';
import type { downloadParam } from '@/utils/download-util';
import { downloadSysFile } from '@/utils/download-util';
const basePath = '/mms/mds/mdsvendors';
/** 供应商基本信息表 */
export interface MdsVendorDto extends BaseBeanModel {
  /** 供应商编码 */
  vendorCode?: string;
  /** 企业名称 */
  vendorName?: string;
  /** 集团编码 */
  internalCode?: string;
  /** 五证统一编码 */
  uniteCode?: string;
  /** 企业英文名 */
  vendorEnName?: string;
  /** 企业别名 */
  vendorAlias?: string;
  /** 企业简称 */
  vendorShortName?: string;
  /** 企业英文简称 */
  vendorEnShortName?: string;
  /** 企业性质分类 ^ SRM_CORPORATION_MODE:1-国家行政企业，2-公司合作企业，3-中外合资企业，4-社会组织机构，5-国际组织机构，6-外资企业，7-私营企业，8-集体企业，9-国防军事企业 */
  corporationMode?: any;
  /** 是否集团内 ^ YN_FLAG:Y-是,N-否 ->GYS_LX 01集团内 02集团外 */
  ynInternal?: any;
  /** 国家/地区 代码 */
  sysCountry?: string;
  /** 城市 代码 */
  sysCity?: string;
  /** 供应商电话 */
  tel?: string;
  /** 供应商传真 */
  fax?: string;
  /** 供应商通讯地址 */
  contactAddress?: string;
  /** 供应商注册地址 */
  registeredAddress?: string;
  /** 供应商所属行业 ^ SRM_BUSINESS_TYPE:1-航空，2-航天，3-兵器，4-船舶，10-其他 */
  businessType?: any;
  /** 企业法人 */
  businessEntity?: string;
  /** 供应商等级 ^ SRM_VENDOR_LEVEL:0-I,1-II,2-III */
  vendorLevel?: any;
  /** 纳税登记号 */
  ratepayingNo?: string;
  /** 许可证编号 */
  statisticsLicense?: string;
  /** 企业规模（人）； */
  enterpriseScale?: number;
  /** 营业执照号 */
  businessLicenseNum?: string;
  /** 承制单位资格注册编号，组织机构代码 */
  organizationCode?: string;
  /** 邮编 */
  postcode?: number;
  /** 社会保险登记证 */
  socialSecurityRegistration?: string;
  /** 纳税人 */
  taxpayer?: string;
  /** 纳税人身份 ^ SRM_TAXPAYER_TYPE:0-一般纳税人；1-小规模纳税人 */
  taxpayerType?: any;
  /** 供应商性质分类 ^ SRM_VENDOR_TYPE: 1-经销商,2-制造商,3-其他；  */
  vendorType?: any;
  /** Email */
  email?: string;
  /** 邮政信箱 */
  postOfficeBox?: string;
  /** 公司网址 */
  companyUrl?: string;
  /** 编制人ID */
  editorUserId?: string;
  editorUserIdAlias?: string;
  /** 编制人编码 ^ 员工编码 */
  editorUserCode?: string;
  editorUserCodeAlias?: string;
  /** 编制人姓名 */
  editorUserName?: string;
  editorUserNameAlias?: string;
  /** 编制部门ID */
  editorDeptId?: string;
  editorDeptIdAlias?: string;
  /** 编制部门编码 */
  editorDeptCode?: string;
  editorDeptCodeAlias?: string;
  /** 编制部门名称 */
  editorDeptName?: string;
  editorDeptNameAlias?: string;
  /** 编制时间 */
  editorDate?: any;
  editorDateBegin?: any;
  editorDateEnd?: any;
  /** 是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效 */
  validFlag?: any;
  /** 经营范围 */
  vendorBusinessRange?: string;
  /** 能力范围 */
  vendorCapabilityRange?: string;
  /** 批准范围 */
  vendorApproveRange?: string;
  /** 批准日期 */
  vendorApproveDate?: any;
  vendorApproveDateBegin?: any;
  vendorApproveDateEnd?: any;
  /** 批准状态 ^ SRM_VENDOR_APPROVE_TYPE：0-不批准；1-批准；2-有条件批准；3-一次性批准 */
  vendorApproveType?: any;
  /** 是否合格供应商 ^ YN_FLAG:Y-是,N-否 */
  ynEligibility?: any;
  /** 本单位标识 ^ SRM_SELF_UNIT_FLAG:0-本单位，1-非本单位 */
  selfUnitFlag?: any;
  /** 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL */
  secretLevel?: any;
  /** 供方档案号 */
  supplierFileNo?: string;
  /** 供方所在市（县）/城市 */
  countyTown?: string;
  /** 联系人（SF） */
  contactPeople?: string;
  /** 其它描述（SF） */
  note?: string;
  /** 使用单位（SF）使用单位（SF）A1器材 A2零供 */
  useModule?: any;
  /** 省市名称（SF） */
  city?: string;
  /** 国家名称（SF） */
  country?: string;
  /** 供应商类别 ^ 多选，以“,”分隔；SRM_VENDOR_CATEGORY: 1-一类,2-二类,3-三类,4-二类（海），三类（空） */
  vendorCategory?: any;
  /** 注册资金（万元） */
  registeredCapital?: string;
  /** 币种 ^ 通用代码：SRM_CURRENDY_TYPE */
  currencyType?: string;
  /** 实收资本（万元） */
  receivedCapital?: string;
  /** 联系人电话（SF） */
  contactTel?: string;
  /** 供应商生产地址 */
  produceAddress?: string;
  /** `省份/直辖市` */
  sysProvince?: string;
  /** 注册资产（SF） */
  registerMoney?: string;
  /** 子表集合 */
  mdsVendorAccountList?: [];
}

/** 获取分页数据 */
export function listMdsVendorByPage (
  param: QueryParamModel
): Promise<ResponsePageData<MdsVendorDto>> {
  return request.post(basePath + '/search-by-page/v1', param);
}

/** 根据id加载数据 */
export function getMdsVendor (id: string): Promise<ResponseBaseData<MdsVendorDto>> {
  return request.get(basePath + '/get/' + id + '/v1');
}

/** 保存表单数据 */
export function saveMdsVendor (form: MdsVendorDto): Promise<ResponseBaseData<any>> {
  return request.post(basePath + '/save/v1', form);
}

/** 根据id集合删除数据 */
export function delMdsVendor (ids: [string]): Promise<ResponseBaseData<any>> {
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
