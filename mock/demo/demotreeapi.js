/** 单表树 */
var Mock = require('mockjs');
var DemoTreeData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: [
    {
      id: '8a58df8c875458660187545866740000',
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
        treePath: '8a58df8c875458660187545866740000'
      },
      children: [
        {
          id: '8a58df8c87545d370187546a1fe60002',
          parentId: '8a58df8c875458660187545866740000',
          title: 'gtest1',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a58df8c875458660187545866740000'
          }
        },
        {
          id: '8a69d4d9878e11680187c2533f0803c3',
          parentId: '8a58df8c875458660187545866740000',
          title: 'gmx',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a58df8c875458660187545866740000'
          }
        },
        {
          id: '8a69ef5a876efaec01876f0e90360012',
          parentId: '8a58df8c875458660187545866740000',
          title: '子节点02',
          selectable: true,
          disableCheckbox: false,
          isLeaf: true,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'Y',
            treePath: '8a58df8c875458660187545866740000'
          }
        },
        {
          id: '8a69efa68823111901884cdef5980295',
          parentId: '8a58df8c875458660187545866740000',
          title: '的胜多负少的',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a58df8c875458660187545866740000'
          }
        },
        {
          id: '8a58da02875659150187565e215d000c',
          parentId: '8a58df8c875458660187545866740000',
          title: '访问3',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a58df8c875458660187545866740000'
          }
        },
        {
          id: '8a69e6bf8898f05d018899a5f2c9006c',
          parentId: '8a58df8c875458660187545866740000',
          title: 'wefwef',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a58df8c875458660187545866740000'
          }
        },
        {
          id: '8a58df8c8755192b0187554c1fbc007b',
          parentId: '8a58df8c875458660187545866740000',
          title: '根节点的子节点',
          selectable: true,
          disableCheckbox: false,
          isLeaf: false,
          disabled: false,
          orgIdentity: 'ORG_ROOT',
          attributes: {
            treeLevel: 2,
            treeLeaf: 'N',
            treePath: '8a58df8c875458660187545866740000'
          }
        }
      ]
    }
  ]
});
module.exports = {
  'GET /demo/template/demotrees': DemoTreeData
};
