<template>
  <a-spin :spinning="loading">
    <div class="bpm-start-process">
      <div>
        <div class="start-process-tab-pane">
          <!-- <a-badge :count="favProcessList.length"> -->
          <span>常用流程</span>
          <!-- </a-badge> -->
          <a-tag>{{ favProcessList.length }}</a-tag>
          <a-button class="toggleAdvanced" size="small" @click="toggleAdvanced">
            <avic-icon svg="DoubleRightOutlined" v-if="activeKey" />
            <avic-icon svg="DoubleLeftOutlined" v-else />
          </a-button>
        </div>
        <div
          ref="favProcessBox"
          class="process-tab-content"
          :class="activeKey ? 'common-process' : 'common-process-max-height'"
        >
          <a-list
            :grid="colspan"
            v-if="showType == 'group' || showType == 'list'"
            :data-source="favProcessList"
            rowKey="id"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <div :key="item.pdid" @click="doStartProcess(item.pdid, item.name)">
                  <a-card class="process-model-item">
                    <div class="process-item-icon-bg" :style="{ background: getColor(item.pdid) }">
                      <avic-icon svg="avic-flow-chart" />
                    </div>
                    <div class="process-item-content">
                      <div class="process-item-name" :title="item.name + '-V' + item.version">
                        {{ item.name }}-V{{ item.version }}
                      </div>
                    </div>
                    <div class="process-item-icon">
                      <!-- <avic-icon
                        svg="avic-share-forward-fill"
                        class="process-item-send"
                        @click.stop="doStartProcess(item.pdid, item.name)"
                      /> -->
                      <avic-icon
                        svg="avic-star-fill"
                        class="process-item-fav"
                        @click.stop="saveFavProcessFn(item, '1')"
                        style="color: #faad14"
                      />
                    </div>
                  </a-card>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
      <div style="flex: 1 1 0; height: 0">
        <div class="start-process-tab-pane flex">
          <div class="start-process-tab">
            <!-- <a-badge :count="total"> -->
            <span>全部流程</span>
            <a-tag>{{ total }}</a-tag>
            <!-- </a-badge> -->
          </div>
          <div class="process-tab-search">
            <a-input-search v-model:value="keyword" allow-clear placeholder="请输入流程名称" />
            <a-button-group class="process-show-type">
              <!-- 【6650】 【轻量化1130】【流程中心】全部流程，卡片式展示的名称不对 -->
              <a-button
                :type="showType === 'group' ? 'primary' : 'default'"
                class="process-show-type-btn"
                title="卡片展示"
                @click="changeShowType('group')"
              >
                <appstore-outlined />
              </a-button>
              <a-button
                :type="showType !== 'group' ? 'primary' : 'default'"
                class="process-show-type-btn"
                title="列表展示"
                @click="changeShowType('list')"
              >
                <bars-outlined />
              </a-button>
            </a-button-group>
          </div>
        </div>
        <div class="process-tab-box">
          <AvicSplit>
            <AvicPane size="250px">
              <BpmModelTree
                @onModelTreeSelect="onModelTreeSelect"
                :hasFlow="false"
                type="classicAppTree"
              ></BpmModelTree>
            </AvicPane>
            <AvicPane>
              <!-- <div class="process-tab-content"> -->
              <a-list
                :grid="allProcessColspan"
                v-if="showType === 'group'"
                :data-source="processModelList"
                rowKey="id"
              >
                <template #renderItem="{ item }">
                  <a-list-item>
                    <div
                      v-if="filterProcessByKeyword(item)"
                      :key="item.pdId"
                      @click="doStartProcess(item.pdId, item.name)"
                    >
                      <a-card class="process-model-item">
                        <div
                          class="process-item-icon-bg"
                          :style="{ background: getColor(item.id) }"
                        >
                          <avic-icon svg="avic-flow-chart" />
                        </div>
                        <div class="process-item-content">
                          <div class="process-item-name" :title="item.name + '-V' + item.version">
                            {{ item.name }}-V{{ item.version }}
                          </div>
                          <!-- <div class="process-item-type" :title="item.name">
                              {{ item.desc | processType }}
                            </div> -->
                        </div>
                        <div class="process-item-icon">
                          <!-- <avic-icon
                            svg="avic-share-forward-fill"
                            class="process-item-send"
                            @click.stop="doStartProcess(item.pdId, item.name)"
                          /> -->
                          <avic-icon
                            v-if="checkFavProcess(item.pdId)"
                            svg="avic-star-fill"
                            class="process-item-fav"
                            @click.stop="saveFavProcessFn(item, '1')"
                            style="color: #faad14"
                          />
                          <avic-icon
                            v-else
                            svg="avic-star-line"
                            class="process-item-fav"
                            @click.stop="saveFavProcessFn(item, '0')"
                          />
                        </div>
                      </a-card>
                    </div>
                  </a-list-item>
                </template>
              </a-list>
              <!-- 表格 -->
              <div v-else class="table-wrapper">
                <AvicTable
                  ref="avicTable"
                  :columns="columns"
                  :row-key="record => record.pdId"
                  :data-source="processModelList"
                  :pageParameter="data.pageParameter"
                  :total="data.totalPage"
                  @change="handleTableChange"
                  @refresh="loadData"
                  :showTableSetting="false"
                >
                  <template #bodyCell="{ column, text, record, index }">
                    <template v-if="column.key === 'taskTitle'">
                      {{ record.name + '-V' + record.version }}
                    </template>
                    <template v-if="column.key === 'id'">
                      {{ index + 1 + data.pageParameter.rows * (data.pageParameter.page - 1) }}
                    </template>
                    <template v-if="column.key === 'desc'">
                      {{ record.desc ? record.desc : '暂无描述信息' }}
                    </template>
                    <template v-if="column.key === 'favStatus'">
                      <a-tag
                        v-if="checkFavProcess(record.pdId) == true"
                        color="green"
                        text="已收藏"
                      >
                        已收藏
                        <template #icon>
                          <avic-icon svg="avic-star-fill" />
                        </template>
                      </a-tag>
                      <a-tag v-else color="orange" text="未收藏">
                        未收藏
                        <template #icon>
                          <avic-icon svg="avic-star-line" />
                        </template>
                      </a-tag>
                      <!-- {{ checkFavProcess(record.pdId) ? '已收藏' : '未收藏' }} -->
                    </template>
                    <template v-else-if="column.key === 'action'">
                      <a-button type="link" @click="doStartProcess(record.pdId, record.name)">
                        发起流程
                      </a-button>
                      <a-button
                        v-if="checkFavProcess(record.pdId)"
                        type="link"
                        @click="saveFavProcessFn(record, '1')"
                      >
                        取消收藏
                      </a-button>
                      <a-button v-else type="link" @click="saveFavProcessFn(record, '0')">
                        添加收藏
                      </a-button>
                    </template>
                  </template>
                </AvicTable>
              </div>
              <!-- </div> -->
            </AvicPane>
          </AvicSplit>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script setup lang="ts">
import BpmModelTree from '../component/BpmModelTree.vue';
import {
  getFavProcess,
  getProcessModel,
  saveFavProcess,
  checkStartProcessRight
} from '@/api/avic/bpm/BpmStartProcessApi';
import bpmUtils from '../bpmutils/FlowUtils';
const { proxy } = getCurrentInstance();
const colspan = { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 5, xxl: 6 },
  allProcessColspan = { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 5 },
  colorList = [
    'linear-gradient(120deg, #84b5ff, #3473fe)',
    'linear-gradient(120deg, #a6a6ff, #6160fa)',
    'linear-gradient(120deg, #ffcaa1, #ff6a00)',
    'linear-gradient(120deg, #00d2b5, #00bea2)',
    'linear-gradient(120deg, #7e78fd, #6961f7)',
    'linear-gradient(120deg, #779fff, #346ffe)',
    'linear-gradient(120deg, #ffd247, #ea9e02)',
    'linear-gradient(120deg, #77e739, #48c019)'
  ],
  columns = [
    {
      title: '序号',
      ellipsis: true,
      width: 56,
      maxWidth: 56,
      align: 'center',
      key: 'id'
    },
    {
      title: '流程名称',
      ellipsis: true,
      dataIndex: 'name',
      key: 'taskTitle',
      resizable: true,
      minwidth: 320
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'desc',
      key: 'desc',
      resizable: true,
      width: 240,
      minwidth: 240
    },
    {
      title: '收藏状态',
      dataIndex: 'favStatus',
      align: 'center',
      width: 160,
      maxWidth: 160,
      resizable: true,
      key: 'favStatus'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 160,
      maxWidth: 160,
      align: 'center'
    }
  ];
const data = reactive({
  activeKey: 'favProcess',
  keyword: '',
  showType: 'list',
  favProcessList: [],
  processModel: [],
  list: [], //表格数据
  // 请求表格数据参数
  pageParameter: {
    page: 1, // 页数
    rows: 20 // 每页条数
  },
  totalPage: 0,
  total: 0
});
const activeKey = ref<boolean>(false);
const loading = ref<boolean>(false);
const favProcessBox = ref(null);
let { keyword, showType, favProcessList, processModel, total } = toRefs(data);

// 全部流程数据
const processModelList = computed(() => {
  let data = [];
  processModel.value.forEach(process => {
    if (filterProcessByKeyword(process)) {
      let item = { ...process };
      item.favStatus = checkFavProcess(item.pdId);
      data.push(item);
    }
  });
  return data;
});

onMounted(() => {
  loadData();
});

function loadData() {
  getFavProcessInfo();
}

/** 表格排序 */
function handleTableChange(pagination) {
  data.pageParameter.page = pagination.current;
  data.pageParameter.rows = pagination.pageSize;
  loadData();
}
// tree数据
function onModelTreeSelect(node) {
  getProcessModelInfo(node.nodeId, node.nodeType);
}
//卡片显示/隐藏
function changeShowType(type: string) {
  showType.value = type;
}
function toggleAdvanced() {
  activeKey.value = !activeKey.value;
  nextTick(() => {
    favProcessBox.value.scrollTop = 0;
  });
}
function getFavProcessInfo() {
  loading.value = true;
  getFavProcess({})
    .then((res: any) => {
      if (res.success) {
        favProcessList.value = res.data.data;
      } else {
        favProcessList.value = [];
      }
    })
    .finally(() => {
      loading.value = false;
    })
    .catch(() => {
      favProcessList.value = [];
    });
}
function filterProcessByKeyword(params) {
  return params.name.indexOf(keyword.value) !== -1;
}
// 发起流程
function doStartProcess(pdId: string, name: string) {
  checkStartProcessRight(pdId)
    .then((res: any) => {
      if (res.success) {
        if (res.data) {
          bpmUtils
            .addListStart(pdId, name)
            .then(data => {
              console.log('启动成功', data);
            })
            .catch(() => {
              proxy.$message.warning('启动流程失败!');
            });
        } else {
          proxy.$message.warning('暂无权限启动该流程!');
        }
      }
    })
    .catch(() => {
      proxy.$message.error('校验流程失败!');
    });
}

function checkFavProcess(pdId: string) {
  let result = false;
  favProcessList.value.map(item => {
    if (item.pdid === pdId) {
      result = true;
    }
  });
  return result;
}
// 取消收藏/收藏
function saveFavProcessFn(process, actType) {
  const { name, version, isUflow, pdId, pdid } = process;
  let value;
  if (pdId) {
    value =
      pdId + '@@' + name + 'V' + version + '(' + (isUflow === '2' ? '自由流程' : '固定流程') + ')';
  }
  if (pdid) {
    value = pdid + '@@' + name;
  }
  handleSaveFavProcess(value, actType);
}

function handleSaveFavProcess(data, actType) {
  let param = {
    act: actType == '0' ? 'follow' : 'unfollow',
    value: data
  };
  saveFavProcess(param)
    .then((res: any) => {
      if (res.success) {
        if (actType == '0') {
          proxy.$message.success('收藏成功');
        } else if (actType == '1') {
          proxy.$message.success('取消收藏');
        }
        getFavProcessInfo();
      }
    })
    .catch(() => {});
}

function getProcessModelInfo(nodeId: string, nodeType: string) {
  let params = {
    nodeId: nodeId,
    nodeType: nodeType
  };
  getProcessModel(params)
    .then((res: any) => {
      if (res.success) {
        processModel.value = res.data;
        if (total.value === 0) {
          total.value = res.data.length;
        }
      } else {
        processModel.value = [];
      }
    })
    .catch(() => {});
}

/** 颜色 */
function getColor(uuid) {
  if (typeof uuid === 'string' && uuid.length) {
    let sum = 0;
    for (let i = 0; i < uuid.length; i++) {
      sum += uuid.charAt(i).charCodeAt(0);
    }
    let cIndex = sum % colorList.length;
    return colorList[cIndex];
  } else if (typeof uuid === 'number') {
    return colorList[uuid % colorList.length];
  } else {
    return colorList[0];
  }
}
</script>
<style lang="less" scoped>
// @import './style/base.less';
:deep(.ant-badge) {
  display: flex;
  align-items: center;
  .ant-badge-count {
    background-color: @primary-4;
    position: initial;
    transform: initial;
    margin-left: 4px;
    transition: none;
    transform-origin: unset;
    transition: none 0s ease 0s;
  }
}
.bpm-start-process {
  display: flex;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  background: #fff;

  .start-process-tab-pane {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    font-weight: 600;
    font-size: 16px;
    .start-process-tab {
      display: flex;
      align-items: center;
    }
    .ant-tag {
      margin: 0 4px;
      padding: 0 10px;
      color: #fff;
      border-radius: 12px;
      line-height: 19px;
      background-color: @primary-color;
      border: @primary-color;
    }
    .process-tab-search {
      display: flex;
      .process-show-type {
        margin-left: 8px;
        .ant-btn {
          padding: 0 8px;
        }
      }
    }
    .toggleAdvanced {
      width: 20px;
      height: 20px;
      margin-left: 8px;
      padding: 0 2px;
      font-size: 12px;
      font-size: 12px;
      background: #e6e9ed;
      border-color: #e6e9ed;
      .avic-icon {
        transform: rotate(-90deg);
      }
    }
  }
  .flex {
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
  }
  .common-process {
    flex: auto;
  }
  .process-tab-content {
    max-height: 240px;
    padding: 0 16px 0 16px;
    overflow: auto;
  }
  .common-process-max-height {
    height: 84px;
    overflow: hidden;
  }
  .process-model-item {
    border: 0;
    border-radius: 4px;
    box-shadow: 4px 4px 8px 0 rgba(55, 99, 170, 0.1), -4px -4px 8px 0 #fff;
    &:hover {
      background-color: #f8f9fa;
      box-shadow: inset 8px 8px 20px 0 rgba(55, 99, 170, 0.11), inset -8px -8px 20px 0 #fff;
    }
    .process-item-icon-bg {
      display: flex;
      flex: 0 0 32px;
      align-items: center;
      justify-content: center;
      height: 32px;
      color: #ffffff;
      font-size: 1.4em;
      border-radius: 4px;
      :deep(.svg-icon) {
        vertical-align: -0.125em;
      }
    }
    .process-item-content {
      max-width: calc(100% - 44px);
      padding-left: 8px;
      .process-item-name {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .process-item-icon {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 16px;
      margin-left: auto;
      font-size: 1.2em;
      vertical-align: middle;
      cursor: pointer;
      .process-item-send {
        margin-left: 4px;
        color: @text-color-less;
        &:hover {
          color: @primary-color;
        }
      }

      .process-item-fav {
        color: @text-color-less;
        &:hover {
          color: @warning-color;
        }
      }
    }
  }
}
:deep(.bpm-start-process) {
  height: 100%;
  .ant-list-grid .ant-col > .ant-list-item {
    margin-bottom: 16px;
    cursor: pointer;
    &:hover .ant-card-bordered {
      border-color: @primary-color;
    }
  }
  .inner-table-wrapper {
    margin: 0;
  }
  .ant-card-body {
    display: flex;
    align-items: center;
    padding: 16px;
  }
  .process-tab-box {
    height: calc(100% - 56px);
    margin: 0 8px;
    padding: 0;
    border: 1px solid #e5e6eb;
    .avic-content {
      padding: 8px 0 0 8px;
    }
    .tree_content {
      padding: 8px;
    }
    .ant-list {
      height: 100%;
      padding: 8px;
      overflow: auto;
    }
    .table-wrapper {
      padding: 8px;
    }
  }
  .avic-content {
    .ant-row {
      flex: 1 1 auto;
      align-content: flex-start;
      height: 0;
      overflow-y: auto;
    }
  }
}
</style>
