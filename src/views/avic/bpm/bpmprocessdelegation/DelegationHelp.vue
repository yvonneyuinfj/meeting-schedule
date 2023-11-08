<template>
  <AvicModal
    :visible="true"
    title="帮助"
    width="800px"
    height="420px"
    :centered="true"
    :bodyStyle="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }"
    @cancel="closeModal"
  >
    <div class="message">
      <span>
        流程委托页面包括【我的委托】和【我的受托】两个页签。
        <br />
        在【我的委托】中，点击新建委托，需要维护以下信息：
        <br />
        1."委托人和委托部门":默认读取的是当前登录用户的信息。
        <br />
        2."默认受托人和受托部门":配置流程的受托人信息。注意：此处默认加载整个组织机构的用户数据，如果只想显示和当前登录用户密级符合的用户信息，则需要配置系统参数PLATFORM_V6_WORKHAND_USER，可参考流程使用手册中的系统参数配置说明。
        <br />
        3."委托生效日期和预计返回日期":配置委托的生效日期，注意：当配置多条流程委托时日期不能交叉，否则无法保存数据。
        <br />
        4."委托已有待办事宜":是指会将当前用户遗留的待办直接委托给受托人。
        <br />
        5."到期自动注销":是指流程委托到达预计返回日期时，自动注销流程委托相关信息，不再进行流程委托。
        <br />
        6."注销后自动拿回所有委托":是指将流程委托注销时，所有委托的待办将被拿回，由受托人处理。
        <br />
        7."自定义委托":是指按照个人意愿配置需要委托的流程，点击添加按钮，配置委托范围，默认加载整个流程模型库中的所有数据，按照需求选择指定的流程，然后配置受托人。注意：如果想把整个系统所有的流程委托出去，则需要配置默认受托人，可以不配置自定义委托。如果项目上只想委托部分流程，直接配置自定义委托即可。如果默认受托人和自定义委托均配置了信息，自定义委托中的配置优先级最高。
        <br />
        <p class="explain">
          说明：流程委托还支持给委托人发送待阅或者读者信息。比如张三将流程委托给李四，某用户发起流程需要张三审批时，会自动委托给李四，此时张三会收到待阅或者读者信息。默认该功能不开启，如果项目上要使用，需要配置系统参数PLATFORM_V6_WORKHAND_SENDREADER或PLATFORM_V6_WORKHAND_SENDTRANSMIT，可参考流程使用手册中的系统参数配置说明。
          在【我的受托】中，对于未开始的委托信息，可以进行驳回操作。
        </p>
      </span>
    </div>
    <template #footer>
      <a-button title="返回" type="primary" ghost @click="closeModal">取消</a-button>
    </template>
  </AvicModal>
</template>
<script lang="ts" setup>
const emit = defineEmits(['close']);
/** 返回关闭事件 */
function closeModal() {
  emit('close');
}
</script>
<style lang="less" scoped>
.message {
  height: 100%;
  overflow: auto;
  .explain {
    display: block;
    font-weight: 600px;
  }
}
</style>
