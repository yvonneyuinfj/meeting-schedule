<template>
  <div class="content-container">
    <a-spin :spinning="spinning">
      <portal-generate
        :data="portalNewContent"
        :preview="false"
        class="dashboard-container"
        @afterUpdate="afterUpdate"
      />
    </a-spin>
    <div
      style="
        border-top: 4px solid #1e89ff;
        background: #fff;
        height: 56px;
        line-height: 56px;
        text-align: center;
        margin: 0 -8px -8px -8px;
      "
    >
      <span style="margin-right: 16px">中国航发动力所-信息技术中心 版权所有</span>
      <!-- <span>技术支持：信息技术中心</span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortalGenerate } from '@/components/portal-designer/index';
import { getAllPortlet, getPortletContentById } from '@/api/avic/system/PortalApi';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const defaultDesignContent = ref({
    list: [],
    config: { labelWidth: 100, labelPosition: 'right', size: 'small' }
  }),
  spinning = ref(true),
  authorizedPortlets = ref([]),
  portalContent = ref({ config: {}, list: [] });

const currentPortalId = computed(() => appStore.portalDesign);
/** 根据权限为有权限的门户小页打授权标记 */
const portalNewContent = computed(() => {
  // this.$set(this.$data, "spinning", true);
  let designContent = portalContent.value;
  let portletList = authorizedPortlets.value;
  if (designContent && designContent.list.length > 0) {
    let wlen = designContent.list.length;
    for (let i = 0; i < wlen; i++) {
      let isAuth = false;
      //重新生成key,防止使用模板的key 重复
      const key = new Date().toString();
      designContent.list[i].key = key + '_' + Math.ceil(Math.random() * 99999);
      //权限判断
      if (portletList && portletList.length > 0) {
        let bcLen = portletList.length;
        for (let j = 0; j < bcLen; j++) {
          if (designContent.list[i].id == portletList[j].id) {
            isAuth = true; // 此小页有权限
            designContent.list[i].url = portletList[j].menuUrl;
          }
        }
      }
      if (!isAuth) {
        //此小页无权限
        designContent.list[i].url = 'views/avic/portal/homepage/portletcards/401';
      }
      // 权限打标
      designContent.list[i].isAuth = isAuth;
    }
  }
  designContent = designContent ? designContent : defaultDesignContent.value;
  return designContent;
});
/** 当前门户小页的id */
watch(currentPortalId, () => {
  getPortalContentById();
});

onBeforeMount(() => {
  getPortletList();
  getPortalContentById();
});

function afterUpdate() {
  setTimeout(() => {
    spinning.value = false;
  }, 300);
}
/*获取用户有权限的门户小页列表*/
async function getPortletList() {
  const res = await getAllPortlet({ uiType: '1' });
  let data = [];
  if (res.code === '200') {
    res.data.forEach(tim => {
      if (tim != null) {
        data.push(tim);
      }
    });
  }
  authorizedPortlets.value = data;
}
/**根据portlet id 获取content内容**/
async function getPortalContentById() {
  if (!currentPortalId.value) return;
  const res = await getPortletContentById(currentPortalId.value.split('_')[0]);
  if (res.code === '200') {
    portalContent.value = res?.data?.content ? JSON.parse(res.data.content) : undefined;
  }
}
</script>
