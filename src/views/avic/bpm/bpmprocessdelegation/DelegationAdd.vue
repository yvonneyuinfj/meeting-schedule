<template>
  <AvicModal
    :visible="true"
    title="新建委托"
    width="960px"
    height="480px"
    :centered="true"
    @cancel="closeModal"
  >
    <a-form ref="formRef" :model="form" :rules="rules" v-bind="layout" layout="horizontal">
      <a-row>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="workOwnerId" label="委托人" has-feedback>
            <AvicCommonSelect
              v-model:value="form.workOwnerId"
              :defaultShowValue="form.workOwnerName"
              type="userSelect"
              placeholder="请选择委托人"
              select-model="single"
              disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="workOwnerDeptId" label="委托人部门" has-feedback>
            <AvicCommonSelect
              v-model:value="form.workOwnerDeptId"
              :defaultShowValue="form.workOwnerDeptName"
              type="deptSelect"
              placeholder="请选择委托人部门"
              select-model="single"
              disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="receptUserId" label="受托人" has-feedback>
            <AvicCommonSelect
              v-model:value="form.receptUserId"
              type="userSelect"
              placeholder="请选择受托人"
              select-model="single"
              @callback="receptUserCallback"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="receptDeptId" label="受托人部门" has-feedback>
            <AvicCommonSelect
              v-model:value="form.receptDeptId"
              type="deptSelect"
              placeholder="请选择受托人部门"
              :defaultShowValue="form.receptDeptName"
              select-model="single"
              disabled
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="handEffectiveDate" label="委托生效日期" has-feedback>
            <a-date-picker
              v-model:value="form.handEffectiveDate"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              :disabled-date="startValue => proxy.$disabledEndDate(startValue, initialSendDate)"
              placeholder="请选择委托生效日期"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item name="backDate" label="预计返回日期" has-feedback>
            <a-date-picker
              v-model:value="form.backDate"
              :disabled-date="
                startValue => proxy.$disabledEndDate(startValue, form.handEffectiveDate)
              "
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              placeholder="请选择预计返回日期"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="委托已有待办">
            <a-checkbox-group v-model:value="form.handAcceptedTask">
              <a-checkbox value="1" />
            </a-checkbox-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="到期后自动注销">
            <a-checkbox-group v-model:value="form.expireAutoCancel">
              <a-checkbox value="1" />
            </a-checkbox-group>
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols2">
          <a-form-item label="委托原因">
            <a-textarea
              v-model:value="form.handReason"
              :rows="2"
              placeholder="请输入委托原因"
              :maxLength="4000"
            />
          </a-form-item>
        </a-col>
        <a-col v-bind="colLayout.cols">
          <a-form-item label="自定义委托">
            <a-checkbox :checked="checked" @change="customProcessWayChange">
              (注:配置特定流程的委托人)
            </a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-if="isCustomProcess">
        <a-row>
          <a-col v-bind="colLayout.cols2">
            <a-button type="primary" title="添加" @click="addCustomProcess">
              <template #icon>
                <plus-outlined />
              </template>
              添加
            </a-button>
          </a-col>
        </a-row>
        <div v-for="item in customProcessList" :key="item.id">
          <a-row>
            <a-col v-bind="colLayout4.cols3">
              <a-row>
                <a-col v-bind="colLayout.cols">
                  <a-form-item label="委托范围">
                    <a-input v-model:value="item.modelId" style="display: none" />
                    <a-input v-model:value="item.workHandType" style="display: none" />
                    <a-input
                      v-model:value="item.modelName"
                      @click="openDelegationScopeModal(item)"
                    />
                  </a-form-item>
                </a-col>
                <a-col v-bind="colLayout.cols">
                  <a-form-item label="受托人">
                    <AvicCommonSelect
                      v-model:value="item.receptUserId"
                      type="userSelect"
                      select-model="single"
                      :defaultShowValue="item.receptUserName"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col v-bind="colLayout4.cols">
              <a-form-item label="">
                <a-button
                  type="danger"
                  class="inner-btn"
                  @click="removeCustomProcess(item)"
                  style="margin: 0 5px"
                >
                  <template #icon>
                    <delete-outlined />
                  </template>
                  删除
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-form>
    <template #footer>
      <a-button title="保存" type="primary" :loading="modalLoading" @click="saveForm">
        确定
      </a-button>
      <a-button title="返回" type="primary" ghost @click="closeModal">返回</a-button>
    </template>
  </AvicModal>
  <DelegationScope
    :ref="DelegationScopeRefName"
    @sendSelectedFlow="sendSelectedFlow"
    :parentItem="parentItem"
    v-if="showScopeModal"
    @close="showScopeModal = false"
  />
</template>
<script>
//引用模块公共js,DelegationForm.js
import DelegationForm from './js/DelegationForm';
export default defineComponent({
  name: 'DemoSingleAdd',
  ...DelegationForm
});
</script>
