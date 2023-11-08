<!--
 流程意见文本输入框
-->
<template>
  <!-- 自定义表态意见 -->

  <div class="select-count">
    <div
      class="ope-box"
      ref="flowOpinionRef"
      style="display: flex; flex-direction: row-reverse; justify-content: space-between"
    >
      <!-- 自定义表态意见 -->
      <div
        v-if="ideasBySelf != null && ideaList.length > 0"
        style="
          width: 248px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-left: 1px solid #e5e6eb;
        "
      >
        <div
          style="
            padding: 6px 4px;
            background: #eff0f1;
            display: block;
            width: 100%;
            font-weight: normal;
          "
        >
          <span style="color: red; margin: 0 5px 0 2px">*</span>
          <span>自定义表态意见：</span>
          <!-- <a-tooltip title="::::::">
              <a-icon type="question-circle-o" />
            </a-tooltip> -->
        </div>
        <a-radio-group
          :default-value="ideaList[0].content"
          v-model:value="ideaSeleted"
          @change="changeContent"
          style="
            height: 86px;
            overflow: auto;
            display: block;
            width: 100%;
            padding: 4px;
            word-break: break-all;
            word-wrap: break-word;
          "
        >
          <a-radio
            :key="index"
            :value="item.content"
            class="radio-btn"
            v-for="(item, index) in ideaList"
          >
            {{ item.content }}
          </a-radio>
        </a-radio-group>
      </div>
      <div style="flex: 1 1 0; position: relative">
        <div class="tool-box">
          <span class="idea-box">常用意见：</span>
          <div class="button-box">
            <a-tag color="processing" @click="setText('已阅')">
              <template #icon><eye-outlined /></template>
              已阅
            </a-tag>
            <a-tag color="green" @click="setText('同意')">
              <template #icon><check-circle-outlined /></template>
              同意
            </a-tag>
            <a-tag color="error" @click="setText('不同意')">
              <template #icon><close-circle-outlined /></template>
              不同意
            </a-tag>
            <!-- <a-button size="small" @click="setText('已阅')"></a-button> -->
            <!-- <a-button size="small" @click="setText('同意')">
                          <template #icon><check-circle-outlined /></template>
                          同意
                        </a-button>
                        <a-button size="small" @click="setText('不同意')">
                          <template #icon><close-circle-outlined /></template>
                          不同意
                        </a-button> -->
            <a-popover
              placement="top"
              trigger="click"
              :get-popup-container="() => $refs.flowOpinionRef"
              class="flow-show-set"
            >
              <!-- <a-button size="small">
                          <template #icon><caret-down-outlined /></template>
                          常用
                        </a-button> -->
              <a-tag color="default">
                <template #icon><caret-up-outlined /></template>
                常用
              </a-tag>
              <template v-slot:title>
                <span class="delete-box">
                  <avic-delete
                    class="table-handle-button"
                    title="您确定要清空常用意见吗？"
                    @click="clickDelete"
                    @click-confirm="deleteAll"
                  >
                    <a-button type="link" size="small" danger>
                      <template #icon><delete-outlined /></template>
                      <!-- 清空 -->
                    </a-button>
                  </avic-delete>
                </span>
              </template>
              <template v-slot:content>
                <!-- 此处点击输入按钮可输入 点击删除 删除此条信息 -->
                <ul class="popover-box-ul">
                  <li v-for="item in myIdeaList" :key="item.id" @click="setText(item.value)">
                    <span class="text-box" :title="item.value">
                      {{ item.value }}
                    </span>
                    <span class="delete-box">
                      <avic-delete
                        class="table-handle-button"
                        :title="`确定把常用意见“${item.value}”移除吗？`"
                        @click="clickDelete"
                        @click-confirm="deleteById(item.id)"
                      >
                        <avic-icon svg="avic-close" title="删除此项" />
                      </avic-delete>
                    </span>
                  </li>
                </ul>
              </template>
            </a-popover>
          </div>
          <div class="button-box right">
            <a-button :disabled="isAddIdea" size="small" @click="addIdea" type="link">
              <template #icon><star-outlined /></template>
              添加到常用
            </a-button>
          </div>
        </div>
        <div class="input-box">
          <!-- 无法动态修改autoSize属性，只能使用v-if -->
          <a-textarea
            v-if="userSelectVisible"
            ref="flowTextarea"
            v-model:value="text"
            id="flowOpinionTextarea"
            placeholder="请填写审批意见"
            allow-clear
            show-count
            :maxlength="500"
            :auto-size="{ minRows: 4, maxRows: 4 }"
          />
          <a-textarea
            v-if="!userSelectVisible"
            ref="flowTextarea"
            v-model:value="text"
            id="flowOpinionTextarea"
            placeholder="请填写审批意见"
            allow-clear
            show-count
            :maxlength="500"
            :auto-size="{ minRows: 12, maxRows: 12 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Popover } from 'ant-design-vue';
import AvicDelete from '../avic-buttons/AvicDelete.vue';
import bpmUtils from '../../../bpmutils/FlowUtils';
import request from '@/utils/request';
export default {
  components: {
    AButton: Button,
    APopover: Popover,
    AvicDelete
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonData: {
      required: false,
      type: Object,
      default: () => {}
    },
    height: {
      type: Number,
      required: false,
      default: 100
    },
    //流程实例
    bpmInstanceObject: {
      type: Object
    },
    //默认意见
    defaultOpinion: {
      required: false,
      type: String,
      default: ''
    },
    userSelectVisible: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      ideaSeleted: '',
      ideasBySelf: null,
      ideaList: [],
      text: this.defaultOpinion, //文本内容
      showSet: false, // 设置
      selectedIds: [], // 设置选中的值
      myIdeaList: [], //设置的列表
      oftenVisible: false,
      // 获取收藏的列表
      getMyIdeaListParam: {
        url: bpmUtils.baseurl + '/business/getMyIdeaList/v1',
        parameter: {},
        method: 'post'
      },
      // 删除收藏
      deleteMyIdeaParam: {
        url: '/appsys/console/customed/deleteApprovalOptionList/v1',
        method: 'post'
      },
      // 添加收藏
      addMyIdeaParam: {
        url: '/appsys/console/customed/insertOrUpdateApprovalOptionList/v1',
        method: 'post'
      }
    };
  },
  computed: {
    indeterminate() {
      return !!this.selectedIds.length && this.selectedIds.length < this.myIdeaList.length;
    },
    checkAll() {
      return this.selectedIds.length === this.myIdeaList.length;
    },
    isAddIdea() {
      return (
        !this.text ||
        !(
          this.myIdeaList.length === 0 ||
          this.myIdeaList.filter(item => item.value === this.text).length === 0
        )
      );
    }
  },
  created() {
    this.init();
  },
  methods: {
    //初始化函数
    init() {
      this.getMyIdeaList();
      this.ideasBySelf = this.bpmInstanceObject.bpmEditor.ideasBySelf;
      if (this.ideasBySelf != null) {
        this.getIdeasBySelf();
      }
    },
    changeContent(e) {
      this.ideaSeleted = e.target.value;
    },
    getIdeasBySelf() {
      let outcome = this.bpmInstanceObject.bpmSubmit.outcome;
      //outcome=1表示仅提交可见的意见，outcome=2，表示仅退回可见的意见，outcome=0表示提交退回都可见的意见
      // if (outcome) {
      //   this.ideasBySelf.forEach(item => {
      //     if (item.outcome != '2') {
      //       this.ideaList.push(item);
      //     }
      //   });
      // } else {
      //   this.ideasBySelf.forEach(item => {
      //     if (item.outcome != '1') {
      //       this.ideaList.push(item);
      //     }
      //   });
      // }
      // 【6943】人工节点，自定义表态，限定流向的过滤作用不生效
      let buttonData = this.getButtonData();
      console.log('buttonData', buttonData);
      if (buttonData.buttonData.event == 'dosubmit') {
        this.ideasBySelf.forEach(item => {
          if (item.outcome == '0') {
            this.ideaList.push(item);
          }
        });
      } else if (
        ['doretreattodraft', 'doretreattoprev', 'doretreattowant', 'doretreattoactivity'].includes(
          buttonData.buttonData.event
        )
      ) {
        this.ideasBySelf.forEach(item => {
          if (item.outcome == '1') {
            this.ideaList.push(item);
          }
        });
      }
      if (this.ideaList.length > 0) this.ideaSeleted = this.ideaList[0].content;
    },
    //添加收藏
    addMyIdeaHttp(newTxt) {
      if (newTxt !== '') {
        let data = [
          {
            value: newTxt,
            processType: '1',
            processIds: '',
            processTypeName: '全部'
          }
        ];
        request({ url: this.addMyIdeaParam.url, data, method: this.addMyIdeaParam.method }) // 提交
          .then(res => {
            if (res.success) {
              this.getMyIdeaList();
              this.$message.success('已收藏');
            }
          })
          .catch(() => {});
      }
    },
    //删除我的收藏
    deleteMyIdeaHttp(ids) {
      if (ids.length > 0) {
        request({
          url: this.deleteMyIdeaParam.url,
          data: ids,
          method: this.deleteMyIdeaParam.method
        }) // 提交
          .then(res => {
            if (res.success) {
              this.$message.success('删除成功!');
              this.deleteSuccess(ids);
            }
          })
          .catch(() => {
            this.$message.error('删除失败!');
          });
      }
    },
    //添加收藏
    addIdea() {
      let str = this.text.replace(/\s/g, '');
      if (str == '') {
        this.$message.warning('内容为空!');
        return;
      }
      if (str.replace(/[^\0x00-\xff]/g, '*').length > 30) {
        this.$message.warning('收藏意见内容不可超过30字符！');
        return;
      }
      this.addMyIdeaHttp(str);
    },
    deleteById(id) {
      this.deleteMyIdeaHttp([id]);
    },
    //删除选中
    deleteAll() {
      this.onCheckAllChange();
      this.deleteMyIdeaHttp(this.selectedIds);
    },
    //点击删除按钮
    clickDelete() {
      this.showSet = false;
    },
    setText(e) {
      // 点击常用意见不带着自定义表态意见
      // this.text = this.ideaSeleted + e;
      this.text = e;
      // this.$refs.flowTextarea.checkWord(e);
    },
    getText() {
      return this.ideaSeleted + ' ' + this.text; // 给自定义表态意见后增加一个空格再合并用户输入的意见
    },
    // 【7555】人工节点-意见，提交意见配置和退回意见必填两个配置不应该受到自定义表态的影响
    getInputText() {
      return this.text;
    },
    //获取按钮数据
    getButtonData() {
      if (this.visible) {
        return { buttonData: this.buttonData, submitFuncName: '' };
      } else {
        return this.bpmInstanceObject.bpmCommonSelect;
      }
    },
    //获取设置数据
    getMyIdeaList() {
      if (this.bpmInstanceObject.bpmModel.defineId) {
        let parameter = {
          defineId: this.bpmInstanceObject.bpmModel.defineId
        };
        // this.$sdk
        //   .http(this.getMyIdeaListParam.url, parameter, this.getMyIdeaListParam.method) // 提交
        request({
          url: this.getMyIdeaListParam.url,
          data: parameter,
          method: this.getMyIdeaListParam.method
        })
          .then(res => {
            if (res.success) {
              res.data.map(tim => {
                tim.checked = false;
              });
              this.myIdeaList = res.data;
            }
          })
          .catch(() => {});
      }
    },
    deleteSuccess(ids) {
      this.myIdeaList = this.myIdeaList.filter(item => {
        return ids.indexOf(item.id) === -1;
      });
      this.selectedIds = this.selectedIds.filter(item => {
        return ids.indexOf(item) === -1;
      });
    },
    onChange(e) {
      if (e.target.checked) {
        this.selectedIds.push(e.target.value);
      } else {
        let tgtIdx = -1;
        this.selectedIds.map((item, index) => {
          if (item == e.target.value) {
            tgtIdx = index;
          }
        });
        this.selectedIds.splice(tgtIdx, 1);
      }
    },
    onCheckAllChange() {
      this.selectedIds = [];
      this.myIdeaList.map(item => {
        this.selectedIds.push(item.id);
      });
    },
    //设置的显示与隐藏
    setShowChange() {
      this.showSet = !this.showSet;
    }
  }
};
</script>
<style lang="less" scoped>
:deep(.ant-tag) {
  font-size: @font-size-base;
  padding: 2px 8px;
}
</style>
