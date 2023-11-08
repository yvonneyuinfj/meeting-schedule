/**数列表-树 */
const Mock = require('mockjs');
/**获取树数据 */
const DemoLeftTreeData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: [
    {
      id: '8a69fbc88634ba25018634ba25160000',
      parentId: '-1',
      title: '根节点',
      selectable: true,
      disableCheckbox: false,
      isLeaf: false,
      disabled: false,
      orgIdentity: 'ORG_ROOT',
      attributes: {
        treeLevel: 1,
        treeLeaf: 'N',
        treePath: '8a69fbc88634ba25018634ba25160000'
      },
      children: [
        {
          id: '8a69e8c28768d02d018769dc13cd0056',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: 'gmx',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        },
        {
          id: '8a69fbc88634ba2501863523d6e3003a',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: '一级0121',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        },
        {
          id: '8a69efb1865ced3f01865d4f8fe70045',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: 'ceshi',
          selectable: true,
          disableCheckbox: false,
          isLeaf: true,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'Y',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        },
        {
          id: '8a69f28b86597ee7018659be7fd30038',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: '的胜多负少的',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        },
        {
          id: '8a69c51b8643ad8e0186447d435700d2',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: '的胜多负少的',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        },
        {
          id: '8a69c51b8643ad8e01864478c83b00c0',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: '访问3',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        },
        {
          id: '8a69c51b8643ad8e0186447d435700d2',
          parentId: '8a69fbc88634ba25018634ba25160000',
          title: '2dd3322',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a69fbc88634ba25018634ba25160000'
          }
        }
      ]
    }
  ]
});

module.exports = {
  'GET /demo/template/demolefttrees': DemoLeftTreeData
};
