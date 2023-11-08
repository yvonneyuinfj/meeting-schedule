<template>
  <AvicModal
    :visible="true"
    title="委托详细"
    width="960px"
    height="520px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout">
        <a-row>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workOwnerId" label="委托人">
              <AvicCommonSelect
                v-model:value="form.workOwnerId"
                :defaultShowValue="form.workOwnerName"
                type="userSelect"
                placeholder="请选择委托人"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="workOwnerDeptId" label="委托人部门">
              <AvicCommonSelect
                v-model:value="form.workOwnerDeptId"
                :defaultShowValue="form.workOwnerDeptName"
                type="deptSelect"
                placeholder="请选择委托人部门"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receptUserId" label="受托人">
              <AvicCommonSelect
                v-model:value="form.receptUserId"
                :defaultShowValue="form.receptUserName"
                type="userSelect"
                placeholder="请选择受托人"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="receptDeptId" label="受托人部门">
              <AvicCommonSelect
                v-model:value="form.receptDeptId"
                :defaultShowValue="form.receptDeptName"
                type="deptSelect"
                placeholder="请选择受托人部门"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="handEffectiveDate" label="委托生效日期">
              <a-date-picker
                v-model:value="form.handEffectiveDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择委托生效日期"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="backDate" label="预计返回日期">
              <a-date-picker
                v-model:value="form.backDate"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择预计返回日期"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCheckbox" label="委托已有待办">
              <a-checkbox-group v-model:value="form.handAcceptedTask" disabled>
                <a-checkbox value="1" disabled />
              </a-checkbox-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols">
            <a-form-item name="demoCheckbox" label="到期后自动注销">
              <a-checkbox-group v-model:value="form.expireAutoCancel" disabled>
                <a-checkbox value="1" disabled />
              </a-checkbox-group>
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout.cols2">
            <a-form-item name="handReason" label="委托原因">
              <a-textarea
                v-model:value="form.handReason"
                :rows="2"
                placeholder="请输入委托原因"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
        <div v-if="customProcessList.length > 0">
          <a-row>
            <a-col v-bind="colLayout.cols">
              <a-form-item label="自定义委托">
                <a-checkbox :checked="checked" @change="customProcessWayChange" disabled>
                  (注:配置特定流程的委托人)
                </a-checkbox>
              </a-form-item>
            </a-col>
          </a-row>
          <div v-for="(item, i) in customProcessList" :key="'mlist-' + i">
            <a-row>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="委托范围">
                  <a-input v-model:value="item.modelName" disabled />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout.cols">
                <a-form-item label="受托人">
                  <a-input v-model:value="item.receptUserName" disabled />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-form>
    </a-spin>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
</template>
<script>
//引用模块公共js,DelegationForm.js
import DelegationForm from './js/DelegationForm';
export default defineComponent({
  name: 'DemoSingleAdd',
  ...DelegationForm
});
</script>
