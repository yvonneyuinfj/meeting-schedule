<template>
  <AvicSplit horizontal>
    <AvicPane size="55">
      <div class="content-wrapper">
        <div class="top-search-box">
          <!-- 高级查询 -->
          <a-form v-bind="layout" ref="formRef" :model="queryForm">
            <a-row :gutter="16">
              <a-col v-bind="colLayout.cols">
                <a-form-item label="供应商编码">
                  <a-input
                    v-model:value="queryForm.vendorCode"
                    placeholder="请输入供应商编码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="企业名称">
                  <a-input
                    v-model:value="queryForm.vendorName"
                    placeholder="请输入企业名称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="集团编码">
                  <a-input
                    v-model:value="queryForm.internalCode"
                    placeholder="请输入集团编码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="五证统一编码">
                  <a-input
                    v-model:value="queryForm.uniteCode"
                    placeholder="请输入五证统一编码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="企业英文名">
                  <a-input
                    v-model:value="queryForm.vendorEnName"
                    placeholder="请输入企业英文名"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="企业别名">
                  <a-input
                    v-model:value="queryForm.vendorAlias"
                    placeholder="请输入企业别名"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="企业简称">
                  <a-input
                    v-model:value="queryForm.vendorShortName"
                    placeholder="请输入企业简称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="企业英文简称">
                  <a-input
                    v-model:value="queryForm.vendorEnShortName"
                    placeholder="请输入企业英文简称"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="企业性质分类 ^ SRM_CORPORATION_MODE:1-国家行政企业，2-公司合作企业，3-中外合资企业，4-社会组织机构，5-国际组织机构，6-外资企业，7-私营企业，8-集体企业，9-国防军事企业">
                  <a-select
                    v-model:value="queryForm.corporationMode"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否集团内 ^ YN_FLAG:Y-是,N-否 ->GYS_LX 01集团内 02集团外">
                  <a-select
                    v-model:value="queryForm.ynInternal"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="国家/地区 代码">
                  <a-input
                    v-model:value="queryForm.sysCountry"
                    placeholder="请输入国家/地区 代码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="城市 代码">
                  <a-input
                    v-model:value="queryForm.sysCity"
                    placeholder="请输入城市 代码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商电话">
                  <a-input
                    v-model:value="queryForm.tel"
                    placeholder="请输入供应商电话"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商传真">
                  <a-input
                    v-model:value="queryForm.fax"
                    placeholder="请输入供应商传真"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商通讯地址">
                  <a-input
                    v-model:value="queryForm.contactAddress"
                    placeholder="请输入供应商通讯地址"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商注册地址">
                  <a-input
                    v-model:value="queryForm.registeredAddress"
                    placeholder="请输入供应商注册地址"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商所属行业 ^ SRM_BUSINESS_TYPE:1-航空，2-航天，3-兵器，4-船舶，10-其他">
                  <a-select
                    v-model:value="queryForm.businessType"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="企业法人">
                  <a-input
                    v-model:value="queryForm.businessEntity"
                    placeholder="请输入企业法人"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商等级 ^ SRM_VENDOR_LEVEL:0-I,1-II,2-III">
                  <a-select
                    v-model:value="queryForm.vendorLevel"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="纳税登记号">
                  <a-input
                    v-model:value="queryForm.ratepayingNo"
                    placeholder="请输入纳税登记号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="许可证编号">
                  <a-input
                    v-model:value="queryForm.statisticsLicense"
                    placeholder="请输入许可证编号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="营业执照号">
                  <a-input
                    v-model:value="queryForm.businessLicenseNum"
                    placeholder="请输入营业执照号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="承制单位资格注册编号，组织机构代码">
                  <a-input
                    v-model:value="queryForm.organizationCode"
                    placeholder="请输入承制单位资格注册编号，组织机构代码"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="社会保险登记证">
                  <a-input
                    v-model:value="queryForm.socialSecurityRegistration"
                    placeholder="请输入社会保险登记证"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="纳税人">
                  <a-input
                    v-model:value="queryForm.taxpayer"
                    placeholder="请输入纳税人"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="纳税人身份 ^ SRM_TAXPAYER_TYPE:0-一般纳税人；1-小规模纳税人">
                  <a-select
                    v-model:value="queryForm.taxpayerType"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商性质分类 ^ SRM_VENDOR_TYPE: 1-经销商,2-制造商,3-其他； ">
                  <a-select
                    v-model:value="queryForm.vendorType"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="Email">
                  <a-input
                    v-model:value="queryForm.email"
                    placeholder="请输入Email"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="邮政信箱">
                  <a-input
                    v-model:value="queryForm.postOfficeBox"
                    placeholder="请输入邮政信箱"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="公司网址">
                  <a-input
                    v-model:value="queryForm.companyUrl"
                    placeholder="请输入公司网址"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制人ID">
                  <AvicCommonSelect
                    v-model:value="queryForm.editorUserId"
                    type="userSelect"
                    placeholder="请选择编制人ID"
                    :defaultShowValue="queryForm.editorUserIdAlias"
                    @callback="
                      result => {
                        queryForm.editorUserIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制人编码 ^ 员工编码">
                  <AvicCommonSelect
                    v-model:value="queryForm.editorUserCode"
                    type="userSelect"
                    placeholder="请选择编制人编码 ^ 员工编码"
                    :defaultShowValue="queryForm.editorUserCodeAlias"
                    @callback="
                      result => {
                        queryForm.editorUserCodeAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制人姓名">
                  <AvicCommonSelect
                    v-model:value="queryForm.editorUserName"
                    type="userSelect"
                    placeholder="请选择编制人姓名"
                    :defaultShowValue="queryForm.editorUserNameAlias"
                    @callback="
                      result => {
                        queryForm.editorUserNameAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制部门ID">
                  <AvicCommonSelect
                    v-model:value="queryForm.editorDeptId"
                    type="deptSelect"
                    placeholder="请选择编制部门ID"
                    :defaultShowValue="queryForm.editorDeptIdAlias"
                    @callback="
                      result => {
                        queryForm.editorDeptIdAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制部门编码">
                  <AvicCommonSelect
                    v-model:value="queryForm.editorDeptCode"
                    type="deptSelect"
                    placeholder="请选择编制部门编码"
                    :defaultShowValue="queryForm.editorDeptCodeAlias"
                    @callback="
                      result => {
                        queryForm.editorDeptCodeAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制部门名称">
                  <AvicCommonSelect
                    v-model:value="queryForm.editorDeptName"
                    type="deptSelect"
                    placeholder="请选择编制部门名称"
                    :defaultShowValue="queryForm.editorDeptNameAlias"
                    @callback="
                      result => {
                        queryForm.editorDeptNameAlias = result.names;
                      }
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制时间(起)">
                  <a-date-picker
                    v-model:value="queryForm.editorDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择编制时间(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.editorDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="编制时间(止)">
                  <a-date-picker
                    v-model:value="queryForm.editorDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择编制时间(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.editorDateBegin)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效">
                  <a-select
                    v-model:value="queryForm.validFlag"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="经营范围">
                  <a-input
                    v-model:value="queryForm.vendorBusinessRange"
                    placeholder="请输入经营范围"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="能力范围">
                  <a-input
                    v-model:value="queryForm.vendorCapabilityRange"
                    placeholder="请输入能力范围"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="批准范围">
                  <a-input
                    v-model:value="queryForm.vendorApproveRange"
                    placeholder="请输入批准范围"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="批准日期(起)">
                  <a-date-picker
                    v-model:value="queryForm.vendorApproveDateBegin"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择批准日期(起)"
                    :disabled-date="startValue => proxy.$disabledStartDate(startValue, queryForm.vendorApproveDateEnd)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="批准日期(止)">
                  <a-date-picker
                    v-model:value="queryForm.vendorApproveDateEnd"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择批准日期(止)"
                    :disabled-date="endValue => proxy.$disabledEndDate(endValue, queryForm.vendorApproveDateBegin)"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="批准状态 ^ SRM_VENDOR_APPROVE_TYPE：0-不批准；1-批准；2-有条件批准；3-一次性批准">
                  <a-select
                    v-model:value="queryForm.vendorApproveType"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="是否合格供应商 ^ YN_FLAG:Y-是,N-否">
                  <a-select
                    v-model:value="queryForm.ynEligibility"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="本单位标识 ^ SRM_SELF_UNIT_FLAG:0-本单位，1-非本单位">
                  <a-select
                    v-model:value="queryForm.selfUnitFlag"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="密级 ^ 通用代码MMS_DATA_SECRET_LEVEL">
                  <a-select
                    v-model:value="queryForm.secretLevel"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供方档案号">
                  <a-input
                    v-model:value="queryForm.supplierFileNo"
                    placeholder="请输入供方档案号"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供方所在市（县）/城市">
                  <a-input
                    v-model:value="queryForm.countyTown"
                    placeholder="请输入供方所在市（县）/城市"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="联系人（SF）">
                  <a-input
                    v-model:value="queryForm.contactPeople"
                    placeholder="请输入联系人（SF）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="其它描述（SF）">
                  <a-input
                    v-model:value="queryForm.note"
                    placeholder="请输入其它描述（SF）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="使用单位（SF）使用单位（SF）A1器材 A2零供">
                  <a-select
                    v-model:value="queryForm.useModule"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="省市名称（SF）">
                  <a-input
                    v-model:value="queryForm.city"
                    placeholder="请输入省市名称（SF）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="国家名称（SF）">
                  <a-input
                    v-model:value="queryForm.country"
                    placeholder="请输入国家名称（SF）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商类别 ^ 多选，以“,”分隔；SRM_VENDOR_CATEGORY: 1-一类,2-二类,3-三类,4-二类（海），三类（空）">
                  <a-select
                    v-model:value="queryForm.vendorCategory"
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
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="注册资金（万元）">
                  <a-input
                    v-model:value="queryForm.registeredCapital"
                    placeholder="请输入注册资金（万元）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="币种 ^ 通用代码：SRM_CURRENDY_TYPE">
                  <a-input
                    v-model:value="queryForm.currencyType"
                    placeholder="请输入币种 ^ 通用代码：SRM_CURRENDY_TYPE"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="实收资本（万元）">
                  <a-input
                    v-model:value="queryForm.receivedCapital"
                    placeholder="请输入实收资本（万元）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="联系人电话（SF）">
                  <a-input
                    v-model:value="queryForm.contactTel"
                    placeholder="请输入联系人电话（SF）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="供应商生产地址">
                  <a-input
                    v-model:value="queryForm.produceAddress"
                    placeholder="请输入供应商生产地址"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="`省份/直辖市`">
                  <a-input
                    v-model:value="queryForm.sysProvince"
                    placeholder="请输入`省份/直辖市`"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols" v-show="advanced">
                <a-form-item label="注册资产（SF）">
                  <a-input
                    v-model:value="queryForm.registerMoney"
                    placeholder="请输入注册资产（SF）"
                    :allow-clear="true"
                    @pressEnter="handleQuery"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-bind="colLayout.cols"
                style="margin-left: auto"
              >
                <div class="table-page-search-submitButtons">
                  <a-space>
                    <a-button type="primary" @click="handleQuery">
                      <search-outlined />
                      查询
                    </a-button>
                    <a-button type="primary" @click="resetQuery" ghost>
                      <redo-outlined />
                      重置
                    </a-button>
                    <a-button type="link" @click="toggleAdvanced" style="margin: 0">
                      {{ advanced ? '收起' : '展开' }}
                      <up-outlined v-if="advanced" />
                      <down-outlined v-else />
                    </a-button>
                  </a-space>
                </div>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- 表格组件 -->
        <div class="table-wrapper">
          <AvicTable
            ref="mdsVendor"
            table-key="mdsVendor"
            :columns="columns"
            :row-key="record => record.id"
            :data-source="list"
            :loading="loading"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
              fixed: true
            }"
            :pageParameter="queryParam.pageParameter"
            :total="totalPage"
            rowClickSelectionType="radio"
            @change="handleTableChange"
            @refresh="getList"
          >
            <template #toolBarLeft>
          <a-space>
            <a-button
              v-hasPermi="['mdsVendor:add']"
              title="添加"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
            <a-button
              v-hasPermi="['mdsVendor:del']"
              title="删除"
              danger
              :type="selectedRowKeys.length == 0 ? 'default' : 'primary'"
              :loading="delLoading"
              @click="handleDelete(selectedRowKeys, '')"
            >
              <template #icon>
                <delete-outlined />
              </template>
              删除
            </a-button>
            <a-button
              v-hasPermi="['mdsVendor:import']"
              title="导入"
              type="primary"
              ghost
              @click="handleImport">
              <template #icon>
                 <import-outlined />
              </template>
              导入
            </a-button>
            <a-button
              v-hasPermi="['mdsVendor:export']"
              title="导出"
              type="primary"
              ghost
              @click="handleExport">
              <template #icon>
                 <export-outlined />
              </template>
              导出
            </a-button>
          </a-space>
            </template>
            <template #toolBarRight>
              <a-input-search
                class="opt-btn-commonsearch"
                style="width: 200px"
                placeholder="请输入供应商编码或企业名称"
                :allow-clear="true"
                @search="handleKeyWordQuery"
              />
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex  === 'id'">
                {{ index + 1 + queryParam.pageParameter.rows * (queryParam.pageParameter.page - 1) }}
              </template>
              <template v-else-if="column.dataIndex === 'vendorCode'">
                <a @click="handleDetail(record)">
                  {{ record.vendorCode }}
                </a>
              </template>
              <template v-else-if="column.dataIndex  === 'action'">
                <a-button
                  type="link"
                  class="inner-btn"
                  @click.stop="handleEdit(record.id)"
                >
                  编辑
                </a-button>
                <a-button
                  v-hasPermi="['mdsVendor:del']"
                  type="link"
                  class="inner-btn"
                  @click.stop="handleDelete([record.id], 'row')"
                >
                  删除
                </a-button>
              </template>
            </template>
          </AvicTable>
        </div>
      </div>
      <!-- 添加页面弹窗 -->
      <mds-vendor-add
        v-if="showAddModal"
        ref="addModal"
        @reloadData="getList"
        @close="showAddModal = false"
      />
      <!-- 编辑页面弹窗 -->
      <mds-vendor-edit
        v-if="showEditModal"
        ref="editModal"
        :form-id="formId"
        @reloadData="getList"
        @close="showEditModal = false"
      />
      <!-- 详情页面弹窗 -->
      <mds-vendor-detail
        v-if="showDetailModal"
        ref="detailModal"
        :form-id="formId"
        @close="showDetailModal = false"
      />
      <AvicExcelImport
        v-if="showImportModal"
        :formData="excelParams"
        title="模板导入"
        importUrl="/mms/mds/mdsvendors/importData/v1"
        downloadTemplateUrl="/mms/mds/mdsvendors/downloadTemplate/v1"
        @reloadData="getList"
        @close="showImportModal = false"
      />
    </AvicPane>
    <AvicPane>
      <!-- 子表组件 -->
      <mds-vendor-account-manage key="mdsVendorAccountManage" ref="mdsVendorAccountManage" :mainId="mainId" />
    </AvicPane>
  </AvicSplit>
</template>

<script lang="ts" setup>
import type { MdsVendorDto } from '@/api/avic/mms/mds/MdsVendorApi'; // 引入模块DTO
import { listMdsVendorByPage, delMdsVendor, exportExcel } from '@/api/avic/mms/mds/MdsVendorApi'; // 引入模块API
import MdsVendorAdd from './MdsVendorAdd.vue'; // 引入添加页面组件
import MdsVendorEdit from './MdsVendorEdit.vue'; // 引入编辑页面组件
import MdsVendorDetail from './MdsVendorDetail.vue'; // 引入详情页面组件
import MdsVendorAccountManage from '../mdsvendoraccount/MdsVendorAccountManage.vue'; // 引入子表页面组件
const { proxy } = getCurrentInstance();
const layout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
};
const colLayout = proxy.$colLayout4; // 页面表单响应式布局对象
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    ellipsis: true,
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '供应商编码',
    dataIndex: 'vendorCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业名称',
    dataIndex: 'vendorName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '集团编码',
    dataIndex: 'internalCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '五证统一编码',
    dataIndex: 'uniteCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业英文名',
    dataIndex: 'vendorEnName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业别名',
    dataIndex: 'vendorAlias',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业简称',
    dataIndex: 'vendorShortName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业英文简称',
    dataIndex: 'vendorEnShortName',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业性质分类',
    dataIndex: 'corporationModeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否集团内',
    dataIndex: 'ynInternalName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '国家/地区 代码',
    dataIndex: 'sysCountry',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '城市 代码',
    dataIndex: 'sysCity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商电话',
    dataIndex: 'tel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商传真',
    dataIndex: 'fax',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商通讯地址',
    dataIndex: 'contactAddress',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商注册地址',
    dataIndex: 'registeredAddress',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商所属行业',
    dataIndex: 'businessTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '企业法人',
    dataIndex: 'businessEntity',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商等级',
    dataIndex: 'vendorLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '纳税登记号',
    dataIndex: 'ratepayingNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '许可证编号',
    dataIndex: 'statisticsLicense',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '企业规模（人）；',
    dataIndex: 'enterpriseScale',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '营业执照号',
    dataIndex: 'businessLicenseNum',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '承制单位资格注册编号，组织机构代码',
    dataIndex: 'organizationCode',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '邮编',
    dataIndex: 'postcode',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'right'
  },
  {
    title: '社会保险登记证',
    dataIndex: 'socialSecurityRegistration',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '纳税人',
    dataIndex: 'taxpayer',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '纳税人身份',
    dataIndex: 'taxpayerTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '供应商性质分类',
    dataIndex: 'vendorTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '邮政信箱',
    dataIndex: 'postOfficeBox',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '公司网址',
    dataIndex: 'companyUrl',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制人ID',
    dataIndex: 'editorUserIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制人编码',
    dataIndex: 'editorUserCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制人姓名',
    dataIndex: 'editorUserNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制部门ID',
    dataIndex: 'editorDeptIdAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制部门编码',
    dataIndex: 'editorDeptCodeAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制部门名称',
    dataIndex: 'editorDeptNameAlias',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '编制时间',
    dataIndex: 'editorDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否有效标识',
    dataIndex: 'validFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '经营范围',
    dataIndex: 'vendorBusinessRange',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '能力范围',
    dataIndex: 'vendorCapabilityRange',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批准范围',
    dataIndex: 'vendorApproveRange',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '批准日期',
    dataIndex: 'vendorApproveDate',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '批准状态',
    dataIndex: 'vendorApproveTypeName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '是否合格供应商',
    dataIndex: 'ynEligibilityName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '本单位标识',
    dataIndex: 'selfUnitFlagName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '密级',
    dataIndex: 'secretLevelName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '供方档案号',
    dataIndex: 'supplierFileNo',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供方所在市（县）/城市',
    dataIndex: 'countyTown',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '联系人（SF）',
    dataIndex: 'contactPeople',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '其它描述（SF）',
    dataIndex: 'note',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '使用单位（SF）使用单位（SF）A1器材 A2零供',
    dataIndex: 'useModuleName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '省市名称（SF）',
    dataIndex: 'city',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '国家名称（SF）',
    dataIndex: 'country',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商类别',
    dataIndex: 'vendorCategoryName',
    ellipsis: true,
    minWidth: 120,
    resizable: true,
    align: 'center'
  },
  {
    title: '注册资金（万元）',
    dataIndex: 'registeredCapital',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '币种',
    dataIndex: 'currencyType',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '实收资本（万元）',
    dataIndex: 'receivedCapital',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '联系人电话（SF）',
    dataIndex: 'contactTel',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '供应商生产地址',
    dataIndex: 'produceAddress',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '`省份/直辖市`',
    dataIndex: 'sysProvince',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '注册资产（SF）',
    dataIndex: 'registerMoney',
    ellipsis: true,
    sorter: true,
    minWidth: 120,
    resizable: true,
    align: 'left'
  },
  {
    title: '操作',
    dataIndex: 'action',
    ellipsis: true,
    width: 120,
    fixed: 'right'
  }
 ];
const queryForm = ref<MdsVendorDto>({});
const queryParam = reactive({
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  searchParams: {
    ...queryForm
  },
  keyWord: ref(''), // 快速查询数据
  sidx: null, // 排序字段
  sord: null // 排序方式: desc降序 asc升序
});
const showAddModal = ref(false); // 是否展示添加弹窗
const showEditModal = ref(false); // 是否展示编辑弹窗
const showDetailModal = ref(false); // 是否展示详情弹窗
const showImportModal = ref(false); // 是否展示导入弹窗
const excelParams = ref({ tableName: 'mdsVendor' }); // 必填参数tableName全局唯一，与tableKey保持一致
const advanced = ref(false); // 高级搜索 展开/关闭
const list = ref([]); // 表格数据集合
const formId = ref(''); // 当前行数据id
const selectedRowKeys = ref([]); // 选中数据主键集合
const selectedRows = ref([]); // 选中行集合
const loading = ref(false);
const delLoading = ref(false);
const totalPage = ref(0);
const corporationModeList = ref([]); // 企业性质分类 ^ SRM_CORPORATION_MODE:1-国家行政企业，2-公司合作企业，3-中外合资企业，4-社会组织机构，5-国际组织机构，6-外资企业，7-私营企业，8-集体企业，9-国防军事企业通用代码
const ynInternalList = ref([]); // 是否集团内 ^ YN_FLAG:Y-是,N-否 ->GYS_LX 01集团内 02集团外通用代码
const businessTypeList = ref([]); // 供应商所属行业 ^ SRM_BUSINESS_TYPE:1-航空，2-航天，3-兵器，4-船舶，10-其他通用代码
const vendorLevelList = ref([]); // 供应商等级 ^ SRM_VENDOR_LEVEL:0-I,1-II,2-III通用代码
const taxpayerTypeList = ref([]); // 纳税人身份 ^ SRM_TAXPAYER_TYPE:0-一般纳税人；1-小规模纳税人通用代码
const vendorTypeList = ref([]); // 供应商性质分类 ^ SRM_VENDOR_TYPE: 1-经销商,2-制造商,3-其他； 通用代码
const validFlagList = ref([]); // 是否有效标识 ^ PLATFORM_VALID_FLAG:1-有效,0-无效通用代码
const vendorApproveTypeList = ref([]); // 批准状态 ^ SRM_VENDOR_APPROVE_TYPE：0-不批准；1-批准；2-有条件批准；3-一次性批准通用代码
const ynEligibilityList = ref([]); // 是否合格供应商 ^ YN_FLAG:Y-是,N-否通用代码
const selfUnitFlagList = ref([]); // 本单位标识 ^ SRM_SELF_UNIT_FLAG:0-本单位，1-非本单位通用代码
const secretLevelList = ref([]); // 密级 ^ 通用代码MMS_DATA_SECRET_LEVEL通用代码
const useModuleList = ref([]); // 使用单位（SF）使用单位（SF）A1器材 A2零供通用代码
const vendorCategoryList = ref([]); // 供应商类别 ^ 多选，以“,”分隔；SRM_VENDOR_CATEGORY: 1-一类,2-二类,3-三类,4-二类（海），三类（空）通用代码
const lookupParams = [
  { fieldName: 'corporationMode', lookUpType: 'MDS_CORPORATION_MODE_QY' },
  { fieldName: 'ynInternal', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'businessType', lookUpType: 'MDS_BUSINESS_TYPE' },
  { fieldName: 'vendorLevel', lookUpType: 'MDS_VENDOR_LEVEL' },
  { fieldName: 'taxpayerType', lookUpType: 'MDS_TAXPAYER_TYPE' },
  { fieldName: 'vendorType', lookUpType: 'MDS_VENDOR_TYPE' },
  { fieldName: 'validFlag', lookUpType: 'PLATFORM_VALID_FLAG' },
  { fieldName: 'vendorApproveType', lookUpType: 'MDS_VENDOR_APPROVE_TYPE' },
  { fieldName: 'ynEligibility', lookUpType: 'PLATFORM_YES_NO_FLAG' },
  { fieldName: 'selfUnitFlag', lookUpType: 'MDS_SELF_UNIT_FLAG' },
  { fieldName: 'useModule', lookUpType: 'MDS_USE_MODULE' },
  { fieldName: 'vendorCategory', lookUpType: 'MDS_VENDOR_CATEGORY' }
];

// 主表传入子表的id
const mainId = computed(() => {
  return selectedRowKeys.value.length === 1 ? selectedRowKeys.value[0] : '';
});

onMounted(() => {
  // 加载表格数据
  getList();
  // 加载查询区所需通用代码
  getLookupList();
  // 获取当前用户对应的文档密级
  getUserFileSecretList();
});

/** 查询数据  */
function getList () {
  selectedRowKeys.value = []; // 清空选中
  selectedRows.value = [];
  loading.value = true;
  listMdsVendorByPage(queryParam)
    .then(response => {
      list.value = response.data.result;
      totalPage.value = response.data.pageParameter.totalCount;
      // 设置表格初始选中项
      if (list.value.length > 0) {
        selectedRowKeys.value = [list.value[0]['id']];
      } else {
        selectedRowKeys.value = [];
      }
      loading.value = false;
    })
    .catch(() => {
      list.value = [];
      totalPage.value = 0;
      loading.value = false;
    });
}
/** 获取通用代码  */
function getLookupList () {
  proxy.$getLookupByType(lookupParams, result => {
    corporationModeList.value = result.corporationMode;
    ynInternalList.value = result.ynInternal;
    businessTypeList.value = result.businessType;
    vendorLevelList.value = result.vendorLevel;
    taxpayerTypeList.value = result.taxpayerType;
    vendorTypeList.value = result.vendorType;
    validFlagList.value = result.validFlag;
    vendorApproveTypeList.value = result.vendorApproveType;
    ynEligibilityList.value = result.ynEligibility;
    selfUnitFlagList.value = result.selfUnitFlag;
    useModuleList.value = result.useModule;
    vendorCategoryList.value = result.vendorCategory;
  });
}
/** 获取当前用户对应的文档密级 */
function getUserFileSecretList () {
  proxy.$getUserFileSecretLevelList(result => {
    secretLevelList.value = result;
  });
}
/** 高级搜索按钮操作 */
function handleQuery () {
  queryParam.searchParams = queryForm.value;
  queryParam.keyWord = '';
  queryParam.pageParameter.page = 1;
  getList();
}
/** 高级查询重置按钮操作  */
function resetQuery () {
  queryForm.value = {};
  handleQuery();
}
/** 高级查询 展开/收起 */
function toggleAdvanced () {
  advanced.value = !advanced.value;
}
/** 快速查询逻辑 */
function handleKeyWordQuery (value) {
  const keyWord = {
    vendorCode: value,
    vendorName: value
  };
  queryParam.keyWord = JSON.stringify(keyWord);
  queryParam.pageParameter.page = 1;
  getList();
}
/** 添加 */
function handleAdd () {
  showAddModal.value = true;
}
/** 编辑 */
function handleEdit (id) {
  formId.value = id;
  showEditModal.value = true;
}
/** 详情 */
function handleDetail (record) {
  formId.value = record.id;
  showDetailModal.value = true;
}
/** 导入 */
function handleImport () {
  showImportModal.value = true;
}
/** 导出 */
function handleExport () {
  proxy.$confirm({
    title: '确认导出数据吗?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      loading.value = true;
      queryParam.searchParams = queryForm.value;
      exportExcel(queryParam).then(() => {
        loading.value = false;
        proxy.$message.info('导出成功！');
      });
    }
  });
}
/** 删除 */
function handleDelete (ids, type) {
  if (ids.length == 0) {
    proxy.$message.warning('请选择要删除的数据！');
    return;
  }
  proxy.$confirm({
    title: `确认要删除${type == 'row' ? '当前行的' : '已选数据及关联的子表'}数据吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      delLoading.value = true;
      delMdsVendor(ids)
        .then(res => {
          if (res.success) {
            proxy.$message.success('删除成功！');
            // 清空选中
            selectedRowKeys.value = [];
            selectedRows.value = [];
            getList();
          }
          delLoading.value = false;
        })
        .catch(() => {
          delLoading.value = false;
        });
    }
  });
}
/** 勾选复选框时触发 */
function onSelectChange (rowKeys, rows) {
  selectedRowKeys.value = rowKeys;
  selectedRows.value = rows;
}
/** 表头排序 */
function handleTableChange (pagination, filters, sorter) {
  queryParam.pageParameter.page = pagination.current;
  queryParam.pageParameter.rows = pagination.pageSize;
  if (proxy.$objIsNotBlank(sorter.field)) {
    queryParam.sidx = sorter.field;
    queryParam.sord = sorter.order === 'ascend' ? 'asc' : 'desc'; // 排序方式: desc降序 asc升序
  }
  getList();
}

</script>
