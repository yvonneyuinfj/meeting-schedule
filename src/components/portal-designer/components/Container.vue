<template>
  <a-layout class="portal-container">
    <!--设计器顶部start-->
    <a-layout-header class="portal-header-bar" style="height: 56px">
      <a-row>
        <a-col :span="12">
          <div class="portal-title-container" v-if="!showEdit">
            <div class="portal-title-text" :title="portletName">{{ portletName }}</div>
            <span class="portal-title-icon">
              <edit-outlined class="theme-main-hover-color" @click="handleEditTitle" />
            </span>
          </div>
          <div class="edit-title" v-else>
            <a-space>
              <a-input v-model:value="portletName" style="width: 180px" :max-length="100" />
              <a-button type="primary" @click="handleSavePortalTitle" :loading="editNameBtnLoading">
                确定
              </a-button>
              <a-button
                type="primary"
                ghost
                @click="handleCancleEdit"
                :loading="editNameBtnLoading"
              >
                取消
              </a-button>
            </a-space>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="btn-group">
            <a-space>
              <a-button type="primary" @click="handleSaveDesign">
                <template #icon><save-outlined /></template>
                保存
              </a-button>
              <a-button v-if="resourceType" @click="handleDelete" danger>
                <template #icon><delete-outlined /></template>
                删除此门户
              </a-button>
              <a-button type="primary" ghost @click="handleClear">
                <template #icon><reload-outlined /></template>
                清空
              </a-button>
              <a-button type="primary" @click="handlePreview" ghost>
                <template #icon><eye-outlined /></template>
                预览
              </a-button>
              <a-button type="primary" v-if="generateJson" @click="handleGenerateJson" ghost>
                <template #icon>
                  <code-outlined />
                </template>
                生成JSON
              </a-button>
              <a-button type="primary" @click="closeModal" ghost>
                <close-outlined />
                取消
              </a-button>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </a-layout-header>
    <!--设计器内容区-->
    <a-layout class="portal-container-center">
      <AvicSplit>
        <!--门户小页右边栏-->
        <AvicPane size="200px" collapsible="left" :draggable="false">
          <div class="portal-container-center-left">
            <!-- 基础组件 -->
            <div class="portal-left-title">门户小页</div>
            <li
              v-for="(item, index) in portletList"
              :key="index"
              class="portal-left-li-list"
              :class="{ 'no-put': item.type == 'divider' }"
              @click="handleAddPortlet(item)"
            >
              <span>{{ item.name }}</span>
              <check-outlined v-if="item.options.hasAdd" class="drag-icon success" />
              <plus-outlined v-if="!item.options.hasAdd" class="drag-icon" />
            </li>
            <!-- 模板页面暂且隐藏，小页数量太少 -->
            <!-- <div class="portal-left-title">模板页面</div>
            <ul>
              <li
                v-for="(item, index) in templateList"
                :key="index"
                class="portal-left-li-list no-put portal-left-li-modeltemp"
                @click="handleAddTemp(item)"
              >
                <a>
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </ul> -->
          </div>
        </AvicPane>
        <!--设计区域-->
        <AvicPane :draggable="false">
          <widget-design
            v-model:data="designContent"
            :select="selectedPortlet"
            @move="handleWidgetMove"
            @handleSelectWidget="handleSelectWidget"
          />
        </AvicPane>
        <!--属性区域-->
        <AvicPane ref="rightPaneRef" size="265px" collapsible="right" :collapsed="true">
          <a-layout :style="{ height: '100%' }" class="portal-widget-config-container">
            <a-layout-header class="portal-header-bar" style="height: 45px">
              <div class="portal-config-tab active">小页配置</div>
            </a-layout-header>
            <a-layout-content
              class="portal-config-content"
              :style="{ overflowY: 'auto', overflowX: 'hidden' }"
            >
              <widget-config v-model:data="selectedPortlet" />
            </a-layout-content>
          </a-layout>
        </AvicPane>
      </AvicSplit>
    </a-layout>
    <!--预览弹窗-->
    <div ref="cardicon" style="width: 0; height: 0" />
    <avic-modal
      title="预览"
      ref="widgetPreview"
      :visible="previewVisible"
      :fullScreen="true"
      :adjustSize="false"
      :get-container="() => $refs.cardicon"
      :body-style="{ background: '#F1F3F9' }"
      :footer="null"
      @cancel="previewVisible = false"
    >
      <generate-portal v-if="previewVisible" :data="designContent" :preview="true" />
    </avic-modal>
    <!--生成JSon弹窗-->
    <avic-modal
      title="JSON预览"
      ref="jsonPreview"
      :visible="jsonVisible"
      :get-container="() => $refs.cardicon"
      :footer="null"
      :fullScreen="true"
      :adjustSize="false"
      @cancel="jsonVisible = false"
    >
      <div id="jsoneditor" style="height: 400px; width: 100%">{{ designContent }}</div>
    </avic-modal>
  </a-layout>
</template>

<script setup lang="ts">
import {
  EditOutlined,
  PlusOutlined,
  CheckOutlined,
  SaveOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined,
  CodeOutlined
} from '@ant-design/icons-vue';
import WidgetConfig from './WidgetConfig.vue';
import WidgetDesign from './WidgetForm.vue';
import GeneratePortal from './GeneratePortal.vue';
import {
  deletePortalById,
  getAllPortlet,
  updatePortalInfo,
  savePortalDesign,
  updatePortletConfig
} from '@/api/avic/system/PortalApi';
// import Clipboard from 'clipboard';
import { layouts } from './js/componentsConfig.js';
const $attrs: any = useAttrs();
const { proxy } = getCurrentInstance();
defineProps({
  /** 生成Json */
  generateJson: { type: Boolean, default: false }
});
const showEdit = ref(false),
  editNameBtnLoading = ref(false),
  portletName = ref(''),
  portletList = ref([]),
  templateList = ref(layouts),
  previewVisible = ref(false),
  jsonVisible = ref(false);
const rightPaneRef = ref();
// 初始化
let designContent = reactive({
  list: [],
  config: {
    gutter: '15px',
    labelWidth: 100,
    labelPosition: 'right',
    size: 'small'
  }
});
let selectedPortlet = ref({}),
  portalInfo: any = {};
onMounted(() => {
  getAuthPortlets();
  portalInfo = { ...$attrs['portal-info'] };
  portletName.value = portalInfo.portletName;
});
const resourceType = computed(() => {
  const { resourceType } = $attrs['portal-info'];
  if ($attrs['portal-info'] && resourceType == '2') {
    return true;
  } else {
    return false;
  }
});
const $emit = defineEmits(['reloadData', 'updatePortalList', 'closeModal', 'savePortalDesign']);
/** 编辑行标题 */
function handleEditTitle() {
  showEdit.value = true;
}
/** 保存首页名称 */
function handleSavePortalTitle() {
  if (!portletName.value.trim().length) {
    proxy.$message.warning('请输入首页名称！');
    return;
  }
  editNameBtnLoading.value = true;
  let newValues = {
    id: portalInfo.id,
    portletName: portletName.value
  };
  updatePortalInfo(newValues) // 提交
    .then(res => {
      if (res.success) {
        proxy.$message.success('操作成功！');
        $emit('updatePortalList', true); // 更新列表，不关闭设计器窗口
        showEdit.value = false;
      } else {
        proxy.$message.warning(res.message);
      }
      editNameBtnLoading.value = false;
    })
    .catch(() => {
      proxy.$message.error('操作失败！');
      editNameBtnLoading.value = false;
    });
}
/** 取消首页名称编辑 */
function handleCancleEdit() {
  showEdit.value = false;
}
/** 获取授权的小页列表 */
function getAuthPortlets() {
  getPortletList(res => {
    portletList.value = res.map((item, index) => {
      return {
        type: 'smallPage', // 组件类型，保持唯一
        name: item.menuName,
        url: item.menuUrl,
        icon: 'icon-input', //组件展示icon, 如果需要自定义，请参考 如何自定义图标
        options: {
          // 组件配置信息，根据自定义组件自己添加配置
          title: item.menuName, //标题
          titleRequired: item.showTitle === '1' ? true : false, //显示标题
          moreUrl: item.moreUrl, //跳转路由组件地址
          refresh: item.refresh,
          url: item.menuUrl, //组件物理地址
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true, // 显示刷新
          hasAdd: false
        },
        x: 0,
        y: 0,
        w: 24,
        h: item.height != null ? item.height / 10 : 20,
        i: index + '',
        id: item.id
      };
    });
  });
  templateList.value = templateList.value.map(item => {
    return {
      ...item
    };
  });
}
/**预览 */
function handlePreview() {
  previewVisible.value = true;
}

/**开发使用生成 JSON 数据*/
function handleGenerateJson() {
  jsonVisible.value = true;
}
/**清空*/
function handleClear() {
  designContent.list.forEach(item => {
    portletList.value.forEach(tim => {
      if (tim.url == item.url) {
        tim.options.hasAdd = false;
      }
    });
  });
  designContent.list = [];
  selectedPortlet.value = {};
}
/**设置设计内容 */
function setWidgetForm(json) {
  const { list, config } = json;
  designContent.list = list;
  designContent.config = config;
  uadatePortletStatus(list);
}
/** 设置小页状态是否添加 */
function uadatePortletStatus(list) {
  list.forEach(item => {
    portletList.value.forEach(tim => {
      if (item.url == tim.url) {
        tim.options.hasAdd = true;
        item.options.refresh = tim.refresh; //更新刷新频率
        item.options.moreUrl = tim.moreUrl; //更新跳转地址
      }
    });
  });
}
/** 添加门户小页 */
function handleAddPortlet(record) {
  if (record.options.hasAdd) {
    return;
  }
  // 生成Key值
  const timeStamp = new Date();
  const key = timeStamp.getTime() + '_' + Math.ceil(Math.random() * 99999);
  record.options.hasAdd = true;
  let item = {
    ...record,
    x: 0,
    y: 0,
    h: 20,
    w: 24,
    key,
    i: designContent.list.length,
    isSwith: true,
    // 绑定键值
    model: record.type + '_' + key
  };
  designContent.list.forEach(item => {
    item.y = item.y + 20;
  });
  designContent.list.push(item);
}
// /** 添加模板 */
// function handleAddTemp(item) {
//   let widgetData = JSON.parse(item.columns);
//   if (widgetData.list.length > 0) {
//     //权限判断
//     let wlen = widgetData.list.length;
//     let bcLen = portletList.value.length;
//     for (let i = 0; i < wlen; i++) {
//       let isSwith = false;
//       for (let j = 0; j < bcLen; j++) {
//         if (widgetData.list[i].id == portletList.value[j].id) {
//           isSwith = true;
//         }
//       }
//       if (!isSwith) {
//         widgetData.list[i].url = 'avic/pt/system/portLet/portLetCards/401';
//       }
//     }
//   }
//   setWidgetForm(widgetData);
// }
/**删除首页 */
function handleDelete() {
  proxy.$Modal.confirm({
    title: '提示',
    content: '确认删除此门户吗 ?',
    okText: '确定',
    cancelText: '取消',
    closable: true,
    onOk() {
      deletePortal(portalInfo.id);
    },
    onCancel() {}
  });
}
/**删除小页会恢复状态 */
function handleWidgetMove(key) {
  // debugger
  portletList.value.forEach(tim => {
    if (tim.url == key) {
      tim.options.hasAdd = false;
    }
  });
}
/**选择某个小页 */
function handleSelectWidget(selectIndex) {
  selectedPortlet.value = designContent.list[selectIndex];
  rightPaneRef.value.handleCollapse('open');
}

function closeModal() {
  $emit('closeModal');
}

/** 获取门户小页列表*/
function getPortletList(success) {
  getAllPortlet({ uiType: '1' }).then(res => {
    if (res.success) {
      if (success) {
        let list = [];
        res.data.map(tim => {
          if (tim != null) {
            list.push(tim);
          }
        });
        success(list);
      }
    }
  });
}

function handleSaveDesign() {
  let saveFunction = savePortalDesign;
  if (portalInfo.setting == true) {
    // 多栏目门户设计保存
    saveFunction = updatePortletConfig;
  }
  saveDesign(saveFunction);
}
/** 保存门户设计*/
function saveDesign(saveFunction) {
  if (portalInfo.id) {
    let param = {
      id: portalInfo.id,
      content: JSON.stringify(designContent),
      portletName: portletName.value
    };
    saveFunction(param)
      .then(res => {
        if (res.success) {
          // 首次修改系统默认和角色定义的桌面门户时更新首页列表
          if (
            portalInfo.resourceType &&
            (portalInfo.resourceType == 0 || portalInfo.resourceType == 1)
          ) {
            $emit('updatePortalList');
          }
          $emit('reloadData', portalInfo.id); // 更新一下当前数据
          proxy.$message.success('保存成功!');
        } else {
          proxy.$message.success('保存失败!');
        }
        closeModal();
      })
      .catch();
  }
}
/** 删除门户 */
function deletePortal(id) {
  if (id) {
    deletePortalById(id).then(res => {
      if (res.success) {
        proxy.$message.success('删除成功!');
        $emit('updatePortalList');
        closeModal();
      } else {
        proxy.$message.error('删除失败!');
      }
    });
  } else {
    proxy.$message.warning('缺少ID!');
  }
}
defineExpose({
  setWidgetForm
});
</script>
<style lang="less">
@import '../style/index.less';
</style>
