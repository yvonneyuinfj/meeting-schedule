/**数列表-树 */
const Mock = require('mockjs');
/** 根据parentId获取子节点 */
const getDemoTreegridData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: [
    {
      demoNotnull: '1',
      demoTitle: '根节点',
      demoUserIdAlias: '平台管理员',
      id: '8a69f2268717eed20187228bd1ec0013',
      parentId: '-1',
      secretLevel: '1',
      treeLeaf: 'N',
      treeLevel: 1,
      treePath: '8a69f2268717eed20187228bd1ec0013',
      treeSort: 1,
      treeSorts: '000001',
      children: [
        {
          demoTitle: '根节点',
          // demoUserId: '1',
          demoUserIdAlias: '平台管理员',
          id: '8a58df8c876e0e6001876f3d494900ce',
          parentId: '8a69f2268717eed20187228bd1ec0013',
          treePath: '8a69f2268717eed20187228bd1ec0013/8a58df8c876e0e6001876f3d494900ce',
          treeSorts: '000001/000000',
          demoNotnull: '1',
          demoRadioButton: '1',
          demoRadioButtonName: '数值',
          demoSwitch: 'Y',
          demoUnique: '11111',
          demoCode: 'DEMO-202306-0110',
          demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
          demoDeptIdAlias: '研发部门',
          demoRoleId: '40288a46384feb2101384ff1ce8e0007',
          demoRoleIdAlias: '一般用户',
          demoGroupId: '8a58df8c875437fe0187548f331800bf',
          demoGroupIdAlias: '测试',
          demoPositionId: '8a69e6668644569e018648b3dc1e069b',
          demoPositionIdAlias: '测试岗位',
          /** 电话(正则) */
          demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
          /** 邮件(正则) */
          demoEmail: 'mm17768528@163.com',
          /** 网址(正则) */
          demoWebsite: 'http://www.baidu.com',
          /** 弹窗 */
          demoModalSelect: '33',
          /**背景样式 */
          demoBackgroundColor: '红色',
          /** 多行文本 */
          demoTextarea: '@cparagraph',
          /**时间日期 */
          demoDateTime: '@datetime',
          children: [
            {
              demoNotnull: '11111',
              demoRadioButton: '1',
              demoRadioButtonName: '数值',
              demoSwitch: 'Y',
              demoTitle: '11111测试0629',
              demoUnique: '11111',
              demoUserId: '8a58df8c875437fe01875553534c41e7',
              id: '40285c8188d6b0000188d88797770059',
              parentId: '8a58df8c876e0e6001876f3d494900ce',
              secretLevel: '1',
              secretLevelName: '非涉密文档',
              treeLeaf: 'N',
              treeLevel: 2,
              treePath:
                '8a69f2268717eed20187228bd1ec0013/8a58df8c876e0e6001876f3d494900ce/40285c8188d6b0000188d88797770059',
              treeSort: 0,
              treeSorts: '000001/000000/000001',
              demoCode: 'DEMO-202306-0110',
              demoUserIdAlias: '一般用户',
              demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
              demoDeptIdAlias: '研发部门',
              demoRoleId: '40288a46384feb2101384ff1ce8e0007',
              demoRoleIdAlias: '一般用户',
              demoGroupId: '8a58df8c875437fe0187548f331800bf',
              demoGroupIdAlias: '测试',
              demoPositionId: '8a69e6668644569e018648b3dc1e069b',
              demoPositionIdAlias: '测试岗位',
              /** 电话(正则) */
              demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
              /** 邮件(正则) */
              demoEmail: 'mm17768528@163.com',
              /** 网址(正则) */
              demoWebsite: 'http://www.baidu.com',
              /** 弹窗 */
              demoModalSelect: '33',
              /**背景样式 */
              demoBackgroundColor: '红色',
              /** 多行文本 */
              demoTextarea: '@cparagraph',
              /**时间日期 */
              demoDateTime: '@datetime',
              children: [
                {
                  demoNotnull: '11111',
                  demoRadioButton: '1',
                  demoRadioButtonName: '数值',
                  demoSwitch: 'Y',
                  demoTitle: '测试0629',
                  demoUnique: '11111',
                  demoUserId: '8a58df8c875437fe01875553534c41e7',
                  id: '8a58df8c876e0e6001876f3efb6100e0',
                  parentId: '40285c8188d6b0000188d88797770059',
                  secretLevel: '1',
                  secretLevelName: '非涉密文档',
                  treeLeaf: 'N',
                  treeLevel: 2,
                  treePath:
                    '8a69f2268717eed20187228bd1ec0013/8a58df8c876e0e6001876f3d494900ce/8a58df8c876e0e6001876f3efb6100e0',
                  treeSort: 0,
                  treeSorts: '000001/000000/000001',
                  demoCode: 'DEMO-202306-0110',
                  demoUserIdAlias: '一般用户',
                  demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
                  demoDeptIdAlias: '研发部门',
                  demoRoleId: '40288a46384feb2101384ff1ce8e0007',
                  demoRoleIdAlias: '一般用户',
                  demoGroupId: '8a58df8c875437fe0187548f331800bf',
                  demoGroupIdAlias: '测试',
                  demoPositionId: '8a69e6668644569e018648b3dc1e069b',
                  demoPositionIdAlias: '测试岗位',
                  /** 电话(正则) */
                  demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
                  /** 邮件(正则) */
                  demoEmail: 'mm17768528@163.com',
                  /** 网址(正则) */
                  demoWebsite: 'http://www.baidu.com',
                  /** 弹窗 */
                  demoModalSelect: '33',
                  /**背景样式 */
                  demoBackgroundColor: '红色',
                  /** 多行文本 */
                  demoTextarea: '@cparagraph',
                  /**时间日期 */
                  demoDateTime: '@datetime'
                }
              ]
            },
            {
              demoNotnull: 'ceshi02',
              demoSwitch: 'N',
              demoTitle: 'ceshi02',
              demoUnique: 'ceshi02',
              demoUserId: '8a69effb888a39e501888a4095870004',
              id: '40285c8188d6b0000188d89751e2005f',
              parentId: '8a58df8c876e0e6001876f3d494900ce',
              treePath:
                '8a69f2268717eed20187228bd1ec0013/8a58df8c876e0e6001876f3d494900ce/40285c8188d6b0000188d89751e2005f',
              lastUpdatedBy: '1',
              secretLevel: '1',
              treeSort: 2,
              treeSorts: '000001/000000/000002',
              treeLeaf: 'Y',
              treeLevel: 3,
              demoUserIdAlias: '一般用户',
              demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
              demoDeptIdAlias: '研发部门',
              demoRoleId: '40288a46384feb2101384ff1ce8e0007',
              demoRoleIdAlias: '一般用户',
              demoGroupId: '8a58df8c875437fe0187548f331800bf',
              demoGroupIdAlias: '测试',
              demoPositionId: '8a69e6668644569e018648b3dc1e069b',
              demoPositionIdAlias: '测试岗位',
              /** 电话(正则) */
              demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
              /** 邮件(正则) */
              demoEmail: 'mm17768528@163.com',
              /** 网址(正则) */
              demoWebsite: 'http://www.baidu.com',
              /** 弹窗 */
              demoModalSelect: '33',
              /**背景样式 */
              demoBackgroundColor: '红色',
              /** 多行文本 */
              demoTextarea: '@cparagraph',
              /**时间日期 */
              demoDateTime: '@datetime'
            },
            {
              demoNotnull: '222',
              demoSwitch: 'Y',
              demoTitle: '222',
              demoUnique: '222',
              demoUserId: '8a69e87187023bfb018703334966079d',
              id: '8a58df8c876e0e600187744aaf141fe4',
              parentId: '8a58df8c876e0e6001876f3d494900ce',
              secretLevel: '1',
              treeLeaf: 'N',
              treeLevel: 3,
              treePath:
                '8a69f2268717eed20187228bd1ec0013/8a58df8c876e0e6001876f3d494900ce/8a58df8c876e0e600187744aaf141fe4',
              treeSort: 22,
              treeSorts: '000001/000000/000022',
              lastUpdatedBy: '1',
              demoUserIdAlias: '一般用户',
              demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
              demoDeptIdAlias: '研发部门',
              demoRoleId: '40288a46384feb2101384ff1ce8e0007',
              demoRoleIdAlias: '一般用户',
              demoGroupId: '8a58df8c875437fe0187548f331800bf',
              demoGroupIdAlias: '测试',
              demoPositionId: '8a69e6668644569e018648b3dc1e069b',
              demoPositionIdAlias: '测试岗位',
              /** 电话(正则) */
              demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
              /** 邮件(正则) */
              demoEmail: 'mm17768528@163.com',
              /** 网址(正则) */
              demoWebsite: 'http://www.baidu.com',
              /** 弹窗 */
              demoModalSelect: '33',
              /**背景样式 */
              demoBackgroundColor: '红色',
              /** 多行文本 */
              demoTextarea: '@cparagraph',
              /**时间日期 */
              demoDateTime: '@datetime'
            }
          ]
        }
      ]
    }
  ]
});
/**编辑表单数据 */
const editDemoTreegridData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: {
    createdBy: '1',
    createdDept: '8a58ab4d4c2141fd014c217cdc5102b6',
    lastUpdatedBy: '1',
    logFormName: 'demo_treegrid',
    logTitle: 'demo_treegrid',
    logType: 'module_operate',
    version: 62,
    orgIdentity: 'ORG_ROOT',
    secretLevel: '1',
    treePath: '8a69f2268717eed20187228bd1ec0013',
    treeSort: 1,
    treeSorts: '000001',
    treeLeaf: 'N',
    treeLevel: 1,
    children: [
      {
        createdBy: '1',
        createdDept: '8a58ab4d4c2141fd014c217cdc5102b6',
        lastUpdatedBy: '1',
        logFormName: 'demo_treegrid',
        logTitle: 'demo_treegrid',
        logType: 'module_operate',
        orgIdentity: 'ORG_ROOT',
        secretLevel: '1',
        treePath: '8a69f2268717eed20187228bd1ec0013',
        treeSort: 0,
        treeSorts: '000001/000000',
        treeLeaf: 'N',
        treeLevel: 2,
        children: [
          {
            createdBy: '1',
            createdDept: '8a58ab4d4c2141fd014c217cdc5102b6',
            lastUpdatedBy: '1',
            logFormName: 'demo_treegrid',
            logTitle: 'demo_treegrid',
            logType: 'module_operate',
            version: 3,
            orgIdentity: 'ORG_ROOT',
            secretLevel: '1',
            treePath: '8a69f2268717eed20187228bd1ec0013',
            treeSort: 1,
            treeSorts: '000001/000000/000001',
            treeLeaf: 'Y',
            treeLevel: 3,
            id: '40285c8188d6b0000188d88797770057',
            parentId: '8a58df8c876e0e6001876f3d494900ce',
            demoNotnull: '测试1',
            demoTitle: 'ceshi01',
            demoCode: 'DEMO-202306-0110',
            demoUnique: '测试1',
            demoUserId: '8a69effb888a39e501888a4095870004',
            demoUserIdAlias: '一般用户',
            demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
            demoDeptIdAlias: '研发部门',
            demoRoleId: '40288a46384feb2101384ff1ce8e0007',
            demoRoleIdAlias: '一般用户',
            demoGroupId: '8a58df8c875437fe0187548f331800bf',
            demoGroupIdAlias: '测试',
            demoPositionId: '8a69e6668644569e018648b3dc1e069b',
            demoPositionIdAlias: '测试岗位',
            /** 电话(正则) */
            demoPhone: '13322223332',
            /** 邮件(正则) */
            demoEmail: 'mm768528@163.com',
            /** 网址(正则) */
            demoWebsite: 'http://lo',
            /** 弹窗 */
            demoModalSelectName: '33',
            /**背景样式 */
            demoBackgroundColor: '红色',
            /** 多行文本 */
            demoTextarea: '小楼昨夜又东风',
            /**时间日期 */
            demoDateTime: '2023-04-17'
          },
          {
            createdBy: '1',
            createdDept: '8a58ab4d4c2141fd014c217cdc5102b6',
            lastUpdatedBy: '1',
            logFormName: 'demo_treegrid',
            logTitle: 'demo_treegrid',
            logType: 'module_operate',
            orgIdentity: 'ORG_ROOT',
            secretLevel: '1',
            treePath: '8a69f2268717eed20187228bd1ec0013',
            treeSort: 2,
            treeSorts: '000001/000000/000002',
            treeLeaf: 'Y',
            treeLevel: 3,
            id: '40285c8188d6b0000188d89751e2005f',
            parentId: '8a58df8c876e0e6001876f3d494900ce',
            demoNotnull: 'ceshi02',
            demoTitle: 'ceshi02',
            demoUnique: 'ceshi02',
            demoUserId: '8a69effb888a39e501888a4095870004',
            demoUserIdAlias: '一般用户',
            demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
            demoDeptIdAlias: '研发部门',
            demoRoleId: '40288a46384feb2101384ff1ce8e0007',
            demoRoleIdAlias: '一般用户',
            demoGroupId: '8a58df8c875437fe0187548f331800bf',
            demoGroupIdAlias: '测试',
            demoPositionId: '8a69e6668644569e018648b3dc1e069b',
            demoPositionIdAlias: '测试岗位',
            /** 电话(正则) */
            demoPhone: '13322223332',
            /** 邮件(正则) */
            demoEmail: 'mm768528@163.com',
            /** 网址(正则) */
            demoWebsite: 'http://lo',
            /** 弹窗 */
            demoModalSelectName: '33',
            /**背景样式 */
            demoBackgroundColor: '红色',
            /** 多行文本 */
            demoTextarea: '小楼昨夜又东风',
            /**时间日期 */
            demoDateTime: '2023-04-17'
          },
          {
            createdBy: '1',
            createdDept: '8a58ab4d4c2141fd014c217cdc5102b6',
            lastUpdatedBy: '1',
            logFormName: 'demo_treegrid',
            logTitle: 'demo_treegrid',
            logType: 'module_operate',
            orgIdentity: 'ORG_ROOT',
            secretLevel: '1',
            treePath: '8a69f2268717eed20187228bd1ec0013',
            treeSort: 2,
            treeSorts: '000001/000000/000002',
            treeLeaf: 'Y',
            treeLevel: 3,
            id: '40285c8188d6b0000188d89751e2005f',
            parentId: '8a58df8c876e0e6001876f3d494900ce',
            demoNotnull: 'ceshi02',
            demoTitle: 'ceshi02',
            demoUnique: 'ceshi02',
            demoUserId: '8a69effb888a39e501888a4095870004',
            demoUserIdAlias: '一般用户',
            demoDeptId: '8a58ab4d4c2141fd014c217cdc5102b6',
            demoDeptIdAlias: '研发部门',
            demoRoleId: '40288a46384feb2101384ff1ce8e0007',
            demoRoleIdAlias: '一般用户',
            demoGroupId: '8a58df8c875437fe0187548f331800bf',
            demoGroupIdAlias: '测试',
            demoPositionId: '8a69e6668644569e018648b3dc1e069b',
            demoPositionIdAlias: '测试岗位',
            /** 电话(正则) */
            demoPhone: '13322223332',
            /** 邮件(正则) */
            demoEmail: 'mm768528@163.com',
            /** 网址(正则) */
            demoWebsite: 'http://lo',
            /** 弹窗 */
            demoModalSelectName: '33',
            /**背景样式 */
            demoBackgroundColor: '红色',
            /** 多行文本 */
            demoTextarea: '小楼昨夜又东风',
            /**时间日期 */
            demoDateTime: '2023-04-17'
          }
        ]
      }
    ]
  }
});
/**保存数据 */
const saveDemoTreegridData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: {
    pageParameter: {
      order: '',
      page: 1,
      rows: 20,
      sort: '',
      totalCount: '',
      totalPage: ''
    },
    result: [
      {
        'id|+1': 1,
        /** 必填 */
        demoNotnull: '@cname()',
        /** 用户 */
        demoUserIdAlias: 'test',
        /** 部门 */
        demoDeptIdAlias: '研发中心',
        /** 角色 */
        demoRoleIdAlias: '一般用户',
        /** 群组 */
        demoGroupIdAlias: '测试',
        /** 岗位 */
        demoPositionIdAlias: '测试岗位',
        /** 单选 */
        demoRadioName: '女',
        /** 单选（按钮样式）*/
        demoRadioButtonName: '数值',
        /** 复选 */
        demoCheckboxName: '数值',
        /** 下拉 */
        demoSelectName: '研究生',
        /** 下拉多选 */
        demoSelectMultipleName: '日期',
        /** 开关 */
        demoSwitch: 'Y',
        /** 小数 */
        demoNumber: '@float',
        /** 整数 */
        demoInteger: '@integer',
        /**日期 */
        demoDate: '@date',
        /** 时间 */
        demoDateTime: '@datetime',
        /** 电话(正则) */
        demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
        /** 邮件(正则) */
        demoEmail: 'mm17768528@163.com',
        /** 网址(正则) */
        demoWebsite: 'http://www.baidu.com',
        /** 唯一值 */
        demoUnique: '@string',
        /** 弹窗 */
        demoModalSelect: '@natural(1,500)',
        /** 多行文本 */
        demoTextarea: '@cparagraph',
        /** 富文本 */
        demoRichtext: '@cparagraph',
        /** 编码 */
        demoCode: 'DEMO-202306-0110',
        /**密级 */
        secretLevelName: '非涉密文档'
      }
    ]
  }
});
/**删除数据 */
const deleteDemoTreegridData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});
module.exports = {
  'GET /demo/template/demotreegrids/search-treegrid/v1': getDemoTreegridData,
  'GET /demo/template/demotreegrids': editDemoTreegridData,
  'POST /demo/template/demotreegrids/save/v1': saveDemoTreegridData,
  'DELETE /demo/template/demotreegrids': deleteDemoTreegridData
};
