export default {
  inject: ['getGraph', 'getNode'],
  mounted() {
    const self = this;
    const node = this.getNode();
    // 监听数据改变事件
    // console.log('start node = ',node)
    node.on('change:data', () => {
      // console.log('node data change')
      self.form = self.getNode().getData();
    });
  },
  data() {
    return {
      form: this.getNode().getData()
    };
  },
  computed: {
    showData() {
      return this.form;
    },
    nodeStatus() {
      // 图标三种状态
      // norun 未运行
      // run 正在运行
      // over 已运行
      return this.form.nodeStatus ? this.form.nodeStatus : '';
    }
  },
  methods: {
    click() {
      // 测试用
      // 获取节点信息以便于节点上做响应操作
      console.log('this.getNode() = ', this.getNode());
    }
  }
};
