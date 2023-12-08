<template>
  <AvicModal
    :visible="true"
    title="详情"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form
        ref="formRef"
        :model="form"
        v-bind="layout"
        layout="horizontal"
       >
        <a-row :gutter="16">
          <a-col v-bind="colLayout.cols">
            <a-form-item name="secretLevel" label="密级">
              <a-select
                v-model:value="form.secretLevel"
                :auto-focus="true"
                :get-popup-container="triggerNode => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
            <a-form-item name="customerCode" label="客户编码">
              <a-input v-model:value="form.customerCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="corporationUniqueCode" label="企业编码">
              <a-input v-model:value="form.corporationUniqueCode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="customerName" label="客户名称">
              <a-input v-model:value="form.customerName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="customerOrgName" label="曾用名">
              <a-input v-model:value="form.customerOrgName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="districtNumber" label="区号">
              <a-input v-model:value="form.districtNumber" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="parentCustomerId" label="上级渠道">
              <a-input v-model:value="form.parentCustomerId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="alias" label="企业别名">
              <a-input v-model:value="form.alias" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="address" label="客户地址">
              <a-input v-model:value="form.address" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsRegionId" label="地区ID">
              <a-input v-model:value="form.mdsRegionId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsLanguageId" label="语种">
              <a-input v-model:value="form.mdsLanguageId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tel" label="客户电话">
              <a-input v-model:value="form.tel" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tel2" label="电话2">
              <a-input v-model:value="form.tel2" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="tel3" label="电话3">
              <a-input v-model:value="form.tel3" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="fax" label="客户传真">
              <a-input v-model:value="form.fax" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="url" label="域名">
              <a-input v-model:value="form.url" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="email" label="E_mail">
              <a-input v-model:value="form.email" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="payMode" label="付款方式">
              <a-select
                v-model:value="form.payMode"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in payModeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="prepayRate" label="预付比率（%）">
              <a-input v-model:value="form.prepayRate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="juridicalPerson" label="企业法人">
              <a-input v-model:value="form.juridicalPerson" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="taxpayer" label="纳税人">
              <a-input v-model:value="form.taxpayer" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accountCurrent" label="银行帐号">
              <a-input v-model:value="form.accountCurrent" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="depositBank" label="开户行">
              <a-input v-model:value="form.depositBank" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vatNo" label="增值账号">
              <a-input v-model:value="form.vatNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="vendorQulityLevel" label="质量等级">
              <a-select
                v-model:value="form.vendorQulityLevel"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in vendorQulityLevelList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="corporationMode" label="单位性质">
              <a-select
                v-model:value="form.corporationMode"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
            <a-form-item name="postcode" label="邮政编码">
              <a-input v-model:value="form.postcode" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="box" label="邮政信箱">
              <a-input v-model:value="form.box" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="dealIn" label="主要业务">
              <a-input v-model:value="form.dealIn" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="employees" label="企业规模（人）">
              <a-input-number
                v-model:value="form.employees"
min="0"
                :max="9999999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="aheadDelivery" label="允许提前交付期（天）">
              <a-input-number
                v-model:value="form.aheadDelivery"
min="0"
                :max="9999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="delayDelivery" label="允许延误交付期（天）">
              <a-input-number
                v-model:value="form.delayDelivery"
min="0"
                :max="9999"
                :precision="0"
                :step="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="accpetOverRate" label="允许接收超出百分比">
              <a-input v-model:value="form.accpetOverRate" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="customerImport" label="客户重要程度">
              <a-select
                v-model:value="form.customerImport"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in customerImportList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="customerType" label="单位类型">
              <a-select
                v-model:value="form.customerType"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in customerTypeList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="salesIncome" label="销售收入">
              <a-input v-model:value="form.salesIncome" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="riskResistable" label="抗风险能力">
              <a-select
                v-model:value="form.riskResistable"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in riskResistableList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="devAbility" label="研发能力">
              <a-select
                v-model:value="form.devAbility"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in devAbilityList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="occupiedArea" label="占地面积">
              <a-input v-model:value="form.occupiedArea" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="serviceCreditPoint" label="服务信誉分数">
              <a-input v-model:value="form.serviceCreditPoint" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCreditPoint" label="质量信誉分数">
              <a-input v-model:value="form.qualityCreditPoint" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="totalPoint" label="总分数">
              <a-input v-model:value="form.totalPoint" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCurrencyId" label="币种ID">
              <a-input v-model:value="form.mdsCurrencyId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="certificate" label="客户认证">
              <a-select
                v-model:value="form.certificate"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in certificateList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsCountryId" label="国别ID">
              <a-input v-model:value="form.mdsCountryId" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="mdsRegionName" label="地区名称">
              <a-input v-model:value="form.mdsRegionName" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="qualityCreditId" label="质量信誉">
              <a-select
                v-model:value="form.qualityCreditId"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in qualityCreditIdList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="cableAddress" label="电挂">
              <a-input v-model:value="form.cableAddress" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ynReplace" label="是否可替代">
              <a-select
                v-model:value="form.ynReplace"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in ynReplaceList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliveryChangeDeal" label="交付期变化处理">
              <a-select
                v-model:value="form.deliveryChangeDeal"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in deliveryChangeDealList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="overAcceptDeal" label="超出接受处理">
              <a-select
                v-model:value="form.overAcceptDeal"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
              >
                <a-select-option
                  v-for="item in overAcceptDealList"
                  :key="item.sysLookupTlId"
                  :value="item.lookupCode"
                >
                  {{ item.lookupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="communicationAddress" label="通讯地址">
              <a-input v-model:value="form.communicationAddress" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="deliverAddress" label="发货地址">
              <a-input v-model:value="form.deliverAddress" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="approbateNo" label="许可证号">
              <a-input v-model:value="form.approbateNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="ratepayingNo" label="纳税登记号">
              <a-input v-model:value="form.ratepayingNo" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="note" label="备注">
              <a-input v-model:value="form.note" disabled />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="validFlag" label="有效标识">
              <a-select
                v-model:value="form.validFlag"
                :get-popup-container="(triggerNode) => triggerNode.parentNode"
                option-filter-prop="children"
                :show-search="true"
                :allow-clear="true"
                disabled
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
            <a-form-item name="customerTypeId" label="客户类型">
              <a-select v-model:value="form.customerTypeId"
                :get-popup-container="triggerNode => triggerNode.parentNode" option-filter-prop="children"
                :show-search="true" :allow-clear="true" :disabled="true">
                <a-select-option v-for="item in mdsCustomerTypeList" :key="item.id" :value="item.id">
                  {{ item.typeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
import { useMdsCustomerForm, emits } from './ts/MdsCustomerForm'; // 引入表单ts
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
  layout,
  colLayout,
  loading,
  secretLevelList,
  payModeList,
  vendorQulityLevelList,
  corporationModeList,
  customerImportList,
  customerTypeList,
  riskResistableList,
  devAbilityList,
  certificateList,
  qualityCreditIdList,
  ynReplaceList,
  deliveryChangeDealList,
  overAcceptDealList,
  validFlagList,
  closeModal,
  mdsCustomerTypeList
} = useMdsCustomerForm({
  props: props,
  emit: emit
});
</script>

