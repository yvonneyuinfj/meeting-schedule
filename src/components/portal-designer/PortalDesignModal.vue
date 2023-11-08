<template>
  <a-modal
    :visible="showModal"
    :centered="true"
    :closable="false"
    wrap-class-name="full-modal"
    :mask-closable="false"
    width="100% "
    :destroy-on-close="true"
    :body-style="{ padding: 0, overflow: 'hidden' }"
    :footer="null"
    :title="null"
  >
    <div class="modal-body">
      <a-spin :spinning="spinning">
        <portal-designer
          v-if="!spinning"
          :widget-form="widgetForm"
          :portal-info="portalInfo"
          @updatePortalList="updatePortalList"
          @closeModal="closeModal"
          @reloadData="reloadData"
        />
      </a-spin>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { PortalDesigner } from './index.js';
import { getPortletContentById, getAllPortlet } from '@/api/avic/system/PortalApi';
const props = defineProps({
  portalInfo: { type: Object }
});
const spinning = ref<boolean>(false);
const showModal = ref(true);
const portletList = ref([]);
const designContent = ref();
const widgetForm = ref();
onMounted(() => {
  initData();
});
const emit = defineEmits(['closeModal', 'updatePortalList', 'reloadData']);
async function closeModal() {
  // 返回关闭事件
  showModal.value = false;
  emit('closeModal');
}
async function updatePortalList() {
  emit('updatePortalList');
}
/** 更新首页设计内容 */
function reloadData(portalId) {
  emit('reloadData', portalId);
}
async function initData() {
  await getPortletList();
  await getConetntById();
  setPortletAuthority();
}
/** 获取门户小页列表*/
async function getPortletList() {
  const response = await getAllPortlet({ uiType: '1' });
  let list = [];
  if (response.success) {
    response.data.forEach(tim => {
      if (tim != null) {
        list.push(tim);
      }
    });
  }
  portletList.value = list;
}
/**根据portlet id 获取content内容**/
async function getConetntById() {
  const res = await getPortletContentById(props.portalInfo.id);
  if (res.data.content) {
    designContent.value = JSON.parse(res.data.content);
  }
}
/**设置小页查看权限**/
function setPortletAuthority() {
  spinning.value = true;
  let design = designContent.value;
  if (design && design.list.length > 0) {
    //权限判断
    let wlen = design.list.length;
    for (let i = 0; i < wlen; i++) {
      let isAuth = false;
      if (portletList && portletList.value.length > 0) {
        let bcLen = portletList.value.length;
        for (let j = 0; j < bcLen; j++) {
          if (design.list[i].id == portletList.value[j].id) {
            isAuth = true;
            design.list[i].url = portletList.value[j].menuUrl;
          }
        }
      }
      if (!isAuth) {
        design.list[i].url = 'views/avic/portal/homepage/portletcards/401';
      }
      design.list[i].isAuth = isAuth;
    }
  }

  widgetForm.value = design;
  spinning.value = false;
}
</script>
<style lang="less" scoped>
.modal-body {
  width: 100%;
  height: 100%;
}
.table-modal-wrap {
  overflow: hidden !important;
}
</style>
