<template>
  <AvicModal
    :visible="true"
    title="编辑"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" layout="horizontal" v-bind="layout">
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorCode" label="供应商编码" has-feedback>
              <a-input
                v-model:value="form.vendorCode"
                :maxLength="128"
                :auto-focus="true"
                placeholder="请输入供应商编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorName" label="企业名称" has-feedback>
              <a-input
                v-model:value="form.vendorName"
                :maxLength="512"
                placeholder="请输入企业名称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="internalCode" label="集团编码">
              <a-input
                v-model:value="form.internalCode"
                :maxLength="128"
                placeholder="请输入集团编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="uniteCode" label="五证统一编码">
              <a-input
                v-model:value="form.uniteCode"
                :maxLength="128"
                placeholder="请输入五证统一编码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorEnName" label="企业英文名">
              <a-input
                v-model:value="form.vendorEnName"
                :maxLength="512"
                placeholder="请输入企业英文名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorAlias" label="企业别名">
              <a-input
                v-model:value="form.vendorAlias"
                :maxLength="256"
                placeholder="请输入企业别名"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorShortName" label="企业简称">
              <a-input
                v-model:value="form.vendorShortName"
                :maxLength="256"
                placeholder="请输入企业简称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorEnShortName" label="企业英文简称">
              <a-input
                v-model:value="form.vendorEnShortName"
                :maxLength="256"
                placeholder="请输入企业英文简称"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="corporationMode" label="企业性质分类 ^ SRM_CORPORATION_MODE:1-国家行政企业，2-公司合作企业，3-中外合资企业，4-社会组织机构，5-国际组织机构，6-外资企业，7-私营企业，8-集体企业，9-国防军事企业">
              <a-select
                v-model:value="form.corporationMode"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择企业性质分类 ^ SRM_CORPORATION_MODE:1-国家行政企业，2-公司合作企业，3-中外合资企业，4-社会组织机构，5-国际组织机构，6-外资企业，7-私营企业，8-集体企业，9-国防军事企业"
              >
                <a-select-option
                  v-for="item in corporationModeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynInternal" label="是否集团内 ^ YN_FLAG:Y-是,N-否 ->GYS_LX 01集团内 02集团外">
              <a-select
                v-model:value="form.ynInternal"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否集团内 ^ YN_FLAG:Y-是,N-否 ->GYS_LX 01集团内 02集团外"
              >
                <a-select-option
                  v-for="item in ynInternalList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sysCountry" label="国家/地区 代码">
              <a-input
                v-model:value="form.sysCountry"
                :maxLength="128"
                placeholder="请输入国家/地区 代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sysCity" label="城市 代码">
              <a-input
                v-model:value="form.sysCity"
                :maxLength="128"
                placeholder="请输入城市 代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tel" label="供应商电话">
              <a-input
                v-model:value="form.tel"
                :maxLength="64"
                placeholder="请输入供应商电话"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fax" label="供应商传真">
              <a-input
                v-model:value="form.fax"
                :maxLength="64"
                placeholder="请输入供应商传真"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactAddress" label="供应商通讯地址">
              <a-input
                v-model:value="form.contactAddress"
                :maxLength="1024"
                placeholder="请输入供应商通讯地址"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registeredAddress" label="供应商注册地址">
              <a-input
                v-model:value="form.registeredAddress"
                :maxLength="1024"
                placeholder="请输入供应商注册地址"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="businessType" label="供应商所属行业 ^ SRM_BUSINESS_TYPE:1-航空，2-航天，3-兵器，4-船舶，10-其他">
              <a-select
                v-model:value="form.businessType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择供应商所属行业 ^ SRM_BUSINESS_TYPE:1-航空，2-航天，3-兵器，4-船舶，10-其他"
              >
                <a-select-option
                  v-for="item in businessTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="businessEntity" label="企业法人">
              <a-input
                v-model:value="form.businessEntity"
                :maxLength="128"
                placeholder="请输入企业法人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorLevel" label="供应商等级 ^ SRM_VENDOR_LEVEL:0-I,1-II,2-III">
              <a-select
                v-model:value="form.vendorLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择供应商等级 ^ SRM_VENDOR_LEVEL:0-I,1-II,2-III"
              >
                <a-select-option
                  v-for="item in vendorLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ratepayingNo" label="纳税登记号">
              <a-input
                v-model:value="form.ratepayingNo"
                :maxLength="128"
                placeholder="请输入纳税登记号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="statisticsLicense" label="许可证编号">
              <a-input
                v-model:value="form.statisticsLicense"
                :maxLength="128"
                placeholder="请输入许可证编号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="enterpriseScale" label="企业规模（人）；">
              <a-input-number
                v-model:value="form.enterpriseScale"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入企业规模（人）；"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="businessLicenseNum" label="营业执照号">
              <a-input
                v-model:value="form.businessLicenseNum"
                :maxLength="128"
                placeholder="请输入营业执照号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="organizationCode" label="承制单位资格注册编号，组织机构代码">
              <a-input
                v-model:value="form.organizationCode"
                :maxLength="128"
                placeholder="请输入承制单位资格注册编号，组织机构代码"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="postcode" label="邮编">
              <a-input-number
                v-model:value="form.postcode"
                :min="0"
                :max="999999999999"
                :precision="0"
                :step="1"
                placeholder="请输入邮编"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="socialSecurityRegistration" label="社会保险登记证">
              <a-input
                v-model:value="form.socialSecurityRegistration"
                :maxLength="128"
                placeholder="请输入社会保险登记证"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="taxpayer" label="纳税人">
              <a-input
                v-model:value="form.taxpayer"
                :maxLength="128"
                placeholder="请输入纳税人"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="taxpayerType" label="纳税人身份 ^ SRM_TAXPAYER_TYPE:0-一般纳税人；1-小规模纳税人">
              <a-select
                v-model:value="form.taxpayerType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择纳税人身份 ^ SRM_TAXPAYER_TYPE:0-一般纳税人；1-小规模纳税人"
              >
                <a-select-option
                  v-for="item in taxpayerTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorType" label="供应商性质分类 ^ SRM_VENDOR_TYPE: 1-经销商,2-制造商,3-其他； ">
              <a-select
                v-model:value="form.vendorType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择供应商性质分类 ^ SRM_VENDOR_TYPE: 1-经销商,2-制造商,3-其他； "
              >
                <a-select-option
                  v-for="item in vendorTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="email" label="Email">
              <a-input
                v-model:value="form.email"
                :maxLength="128"
                placeholder="请输入Email"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="postOfficeBox" label="邮政信箱">
              <a-input
                v-model:value="form.postOfficeBox"
                :maxLength="530"
                placeholder="请输入邮政信箱"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="companyUrl" label="公司网址">
              <a-input
                v-model:value="form.companyUrl"
                :maxLength="256"
                placeholder="请输入公司网址"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserId" label="编制人ID">
              <AvicCommonSelect
                v-model:value="form.editorUserId"
                type="userSelect"
                placeholder="请选择编制人ID"
                :defaultShowValue="form.editorUserIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserCode" label="编制人编码 ^ 员工编码">
              <AvicCommonSelect
                v-model:value="form.editorUserCode"
                type="userSelect"
                placeholder="请选择编制人编码 ^ 员工编码"
                :defaultShowValue="form.editorUserCodeAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorUserName" label="编制人姓名">
              <AvicCommonSelect
                v-model:value="form.editorUserName"
                type="userSelect"
                placeholder="请选择编制人姓名"
                :defaultShowValue="form.editorUserNameAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptId" label="编制部门ID">
              <AvicCommonSelect
                v-model:value="form.editorDeptId"
                type="deptSelect"
                placeholder="请选择编制部门ID"
                :defaultShowValue="form.editorDeptIdAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptCode" label="编制部门编码">
              <AvicCommonSelect
                v-model:value="form.editorDeptCode"
                type="deptSelect"
                placeholder="请选择编制部门编码"
                :defaultShowValue="form.editorDeptCodeAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDeptName" label="编制部门名称">
              <AvicCommonSelect
                v-model:value="form.editorDeptName"
                type="deptSelect"
                placeholder="请选择编制部门名称"
                :defaultShowValue="form.editorDeptNameAlias"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="editorDate" label="编制时间">
              <a-date-picker
                v-model:value="form.editorDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择编制时间"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效">
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效"
              >
                <a-select-option
                  v-for="item in validFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorBusinessRange" label="经营范围">
              <a-input
                v-model:value="form.vendorBusinessRange"
                :maxLength="4000"
                placeholder="请输入经营范围"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorCapabilityRange" label="能力范围">
              <a-input
                v-model:value="form.vendorCapabilityRange"
                :maxLength="4000"
                placeholder="请输入能力范围"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorApproveRange" label="批准范围">
              <a-input
                v-model:value="form.vendorApproveRange"
                :maxLength="4000"
                placeholder="请输入批准范围"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorApproveDate" label="批准日期">
              <a-date-picker
                v-model:value="form.vendorApproveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择批准日期"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorApproveType" label="批准状态 ^ SRM_VENDOR_APPROVE_TYPE：0-不批准；1-批准；2-有条件批准；3-一次性批准">
              <a-select
                v-model:value="form.vendorApproveType"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择批准状态 ^ SRM_VENDOR_APPROVE_TYPE：0-不批准；1-批准；2-有条件批准；3-一次性批准"
              >
                <a-select-option
                  v-for="item in vendorApproveTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynEligibility" label="是否合格供应商 ^ YN_FLAG:Y-是,N-否">
              <a-select
                v-model:value="form.ynEligibility"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择是否合格供应商 ^ YN_FLAG:Y-是,N-否"
              >
                <a-select-option
                  v-for="item in ynEligibilityList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="selfUnitFlag" label="本单位标识 ^ SRM_SELF_UNIT_FLAG:0-本单位，1-非本单位">
              <a-select
                v-model:value="form.selfUnitFlag"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择本单位标识 ^ SRM_SELF_UNIT_FLAG:0-本单位，1-非本单位"
              >
                <a-select-option
                  v-for="item in selfUnitFlagList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL" has-feedback>
              <a-select
                v-model:value="form.secretLevel"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择密级 ^ 通用代码MMS_DATA_SECRET_LEVEL"
              >
                <a-select-option
                  v-for="item in secretLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="supplierFileNo" label="供方档案号">
              <a-input
                v-model:value="form.supplierFileNo"
                :maxLength="128"
                placeholder="请输入供方档案号"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="countyTown" label="供方所在市（县）/城市">
              <a-input
                v-model:value="form.countyTown"
                :maxLength="64"
                placeholder="请输入供方所在市（县）/城市"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactPeople" label="联系人（SF）">
              <a-input
                v-model:value="form.contactPeople"
                :maxLength="128"
                placeholder="请输入联系人（SF）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="其它描述（SF）">
              <a-input
                v-model:value="form.note"
                :maxLength="500"
                placeholder="请输入其它描述（SF）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="useModule" label="使用单位（SF）使用单位（SF）A1器材 A2零供">
              <a-select
                v-model:value="form.useModule"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择使用单位（SF）使用单位（SF）A1器材 A2零供"
              >
                <a-select-option
                  v-for="item in useModuleList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="city" label="省市名称（SF）">
              <a-input
                v-model:value="form.city"
                :maxLength="128"
                placeholder="请输入省市名称（SF）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="country" label="国家名称（SF）">
              <a-input
                v-model:value="form.country"
                :maxLength="128"
                placeholder="请输入国家名称（SF）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorCategory" label="供应商类别 ^ 多选，以“,”分隔；SRM_VENDOR_CATEGORY: 1-一类,2-二类,3-三类,4-二类（海），三类（空）">
              <a-select
                v-model:value="form.vendorCategory"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                placeholder="请选择供应商类别 ^ 多选，以“,”分隔；SRM_VENDOR_CATEGORY: 1-一类,2-二类,3-三类,4-二类（海），三类（空）"
              >
                <a-select-option
                  v-for="item in vendorCategoryList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registeredCapital" label="注册资金（万元）">
              <a-input
                v-model:value="form.registeredCapital"
                :maxLength="20"
                placeholder="请输入注册资金（万元）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="currencyType" label="币种 ^ 通用代码：SRM_CURRENDY_TYPE">
              <a-input
                v-model:value="form.currencyType"
                :maxLength="10"
                placeholder="请输入币种 ^ 通用代码：SRM_CURRENDY_TYPE"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receivedCapital" label="实收资本（万元）">
              <a-input
                v-model:value="form.receivedCapital"
                :maxLength="20"
                placeholder="请输入实收资本（万元）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="contactTel" label="联系人电话（SF）">
              <a-input
                v-model:value="form.contactTel"
                :maxLength="128"
                placeholder="请输入联系人电话（SF）"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="produceAddress" label="供应商生产地址">
              <a-input
                v-model:value="form.produceAddress"
                :maxLength="1024"
                placeholder="请输入供应商生产地址"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="sysProvince" label="`省份/直辖市`">
              <a-input
                v-model:value="form.sysProvince"
                :maxLength="256"
                placeholder="请输入`省份/直辖市`"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="registerMoney" label="注册资产（SF）">
              <a-input
                v-model:value="form.registerMoney"
                :maxLength="100"
                placeholder="请输入注册资产（SF）"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <MdsVendorAccountEdit ref="mdsVendorAccountEdit" :mainId="formId"></MdsVendorAccountEdit>
    </a-spin>
    <template #footer>
      <a-button title="保存" type="primary" :loading="loading" @click="saveForm">保存</a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsVendorForm, emits } from './ts/MdsVendorForm'; // 引入表单ts
import MdsVendorAccountEdit from '@/views/avic/mms/mds/mdsvendoraccount/MdsVendorAccountEdit.vue'; // 引入子表组件
const props = defineProps({
  formId: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(emits);
const {
  form,
  formRef,
  rules,
  layout,
  colLayout,
  loading,
  corporationModeList,
  ynInternalList,
  businessTypeList,
  vendorLevelList,
  taxpayerTypeList,
  vendorTypeList,
  validFlagList,
  vendorApproveTypeList,
  ynEligibilityList,
  selfUnitFlagList,
  secretLevelList,
  useModuleList,
  vendorCategoryList,
  saveForm,
  closeModal,
  mdsVendorAccountEdit
} = useMdsVendorForm({
  props: props,
  emit: emit
});
</script>


