import { createApp } from 'vue';
import { Store as store } from '../../../bpmutils/sdkTool';
// 构造组件
const AvicModalConstructor = createApp({
  name: 'AvicModalDiv',
  components: {},
  store,
  template: `
        <AvicModal
                ref="avicBpmModal"
                :modalTitle="modalTitle"
                :setModalBodyStyle="setModalBodyStyle"
                :visible="visible"
                :footer="null"
                :modalHeight="modalHeight"
                :destroyOnClose="true"
                :modalWidth="modalHeight"
                :modalCutHeight="modalCutHeight"
                :fullScreen="true"
                @ok="handleClose"
                @cancel="handleClose"
                @modalResize="modalResized"
        >
          <component :is="detailVueCompnent" :viewMode="viewMode" :params="params" ref="avicBpmModalFlowDetail" />
      </AvicModal>
  `,
  data: function () {
    return {
      modalTitle: '',
      visible: true,
      modalWidth: 0.8,
      modalHeight: 0.9,
      modalCutHeight: 48,
      params: {},
      setModalBodyStyle: {
        padding: 0,
        overflowY: 'hidden'
      },
      viewMode: '',
      iframeUrl: '',
      detailVueCompnent: ''
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
      this.$destroy();
    },
    modalResized() {
      this.$nextTick(() => {
        let bodyHeight =
          this.$refs.avicBpmModal.$children[0].$el.childNodes[1].children[0].offsetHeight;
        this.$refs.avicBpmModalFlowDetail.inModalResize(bodyHeight);
      });
    }
  }
});

const AvicModalDiv = options => {
  console.log('AvicModalDiv opt = ', options);
  // 实例化组件
  const instance = new AvicModalConstructor({
    el: document.createElement('div'),
    store: Vue.prototype.$sdk.getVuex(),
    // 组件参数
    ...options
  });

  // 在body添加组件
  document.body.appendChild(instance.$el);
  return instance;
};
AvicModalDiv.install = Vue => Vue.component(AvicModalDiv.name, AvicModalDiv);

export default AvicModalDiv;

export { AvicModalDiv };
