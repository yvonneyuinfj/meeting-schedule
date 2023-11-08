/** 树列表-列表 */
const Mock = require('mockjs');

const data = {
  'id|+1': 1,
  /** 必填 */
  demoNotnull: '@cname()',
  /** 用户 */
  demoUserId: '8a69f24b875af27101875f6c2ff21b0a',
  demoUserIdAlias: 'test',
  /** 部门 */
  demoDeptId: '8a58df8c872b271601872b477d68001f',
  demoDeptIdAlias: '研发中心',
  /** 角色 */
  demoRoleId: '40288a46384feb2101384ff1ce8e0007',
  demoRoleIdAlias: '一般用户',
  /** 群组 */
  demoGroupId: '8a58df8c875437fe0187548f331800bf',
  demoGroupIdAlias: '测试',
  /** 岗位 */
  demoPositionId: '8a69e6668644569e018648b3dc1e069b',
  demoPositionIdAlias: '测试岗位',
  /** 单选 */
  demoRadio: '2',
  demoRadioName: '女',
  /** 单选(按钮) */
  demoRadioButton: '1',
  demoRadioButtonName: '数值',
  /** 复选 */
  demoCheckbox: '2',
  demoCheckboxName: '数值',
  /** 下拉 */
  demoSelect: '001',
  demoSelectName: '研究生',
  /** 下拉多选 */
  demoSelectMultiple: '2',
  demoSelectMultipleName: '日期',
  /** 开关 */
  demoSwitch: 'Y',
  /** 小数 */
  demoNumber: 12.0,
  /** 整数 */
  demoInteger: 13,
  /**日期 */
  demoDate: '2023-04-17',
  demoDateBegin: '2023-04-10',
  demoDateEnd: '2023-04-17',
  /** 时间 */
  demoDateTime: '2023-04-17 20:23:15',
  demoDateTimeBegin: '2023-04-10 20:23:15',
  demoDateTimeEnd: '2023-04-17 20:23:15',
  /** 编码 */
  demoCode: 'DEMO-202306-0110',
  /** 电话(正则) */
  demoPhone: '13322223332',
  /** 邮件(正则) */
  demoEmail: 'mm768528@163.com',
  /** 网址(正则) */
  demoWebsite: 'http://lo',
  /** 唯一值 */
  demoUnique: '@word()',
  /** 多行文本 */
  demoTextarea: '小楼昨夜又东风',
  /** 富文本 */
  demoRichtext: '寻寻觅觅,冷冷清清,凄凄惨惨戚戚',
  /** 弹窗 */
  demoModalSelect: '33',
  /** 树节点id */
  demoTreeId: '8a69fbc88634ba25018634ba25160000',
  /**密级 */
  secretLevelName: '非涉密文档'
};
/**获取数列表数据 */
const getDemoRightListData = Mock.mock({
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
    'result|10': [data]
  }
});
/**编辑数据 */
const editDemoRightListData = Mock.mock({
  errorDesc: '',
  message: 'ok',
  retCode: '200',
  responseBody: {
    'id|+1': 1,
    /** 必填 */
    demoNotnull: '@cname()',
    /** 用户 */
    demoUserId: '8a69f24b875af27101875f6c2ff21b0a',
    demoUserIdAlias: 'test',
    /** 部门 */
    demoDeptId: '8a58df8c872b271601872b477d68001f',
    demoDeptIdAlias: '研发中心',
    /** 角色 */
    demoRoleId: '40288a46384feb2101384ff1ce8e0007',
    demoRoleIdAlias: '一般用户',
    /** 群组 */
    demoGroupId: '8a58df8c875437fe0187548f331800bf',
    demoGroupIdAlias: '测试',
    /** 岗位 */
    demoPositionId: '8a69e6668644569e018648b3dc1e069b',
    demoPositionIdAlias: '测试岗位',
    /** 单选 */
    demoRadio: '2',
    demoRadioName: '女',
    /** 单选(按钮) */
    demoRadioButton: '1',
    demoRadioButtonName: '数值',
    /** 复选 */
    demoCheckbox: '2',
    demoCheckboxName: '数值',
    /** 下拉 */
    demoSelect: '001',
    demoSelectName: '研究生',
    /** 下拉多选 */
    demoSelectMultiple: '2',
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
    /** 编码 */
    demoCode: 'DEMO-202306-0110',
    /** 电话(正则) */
    demoPhone: /^1(5|3|7|8)[0-9]{9}$/,
    /** 邮件(正则) */
    demoEmail: 'mm17768528@163.com',
    /** 网址(正则) */
    demoWebsite: 'http://www.baidu.com',
    /** 唯一值 */
    demoUnique: '@word()',
    /** 多行文本 */
    demoTextarea: '@cparagraph',
    /** 富文本 */
    demoRichtext: '@cparagraph',
    /** 弹窗 */
    demoModalSelect: '@natural(1,500)',
    /** 树节点id */
    demoTreeId: '8a69fbc88634ba25018634ba25160000',
    /**密级 */
    secretLevelName: '非涉密文档'
  }
});

/**删除数据 */
const deleteDemoRightListData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});
const saveDemoRightListData = Mock.mock({
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
    result: [data]
  }
});
module.exports = {
  'POST /demo/template/demorightlists/search-by-page/v1': getDemoRightListData,
  'GET /demo/template/demorightlists': editDemoRightListData,
  'DELETE /demo/template/demorightlists/delete-by-ids/v1': deleteDemoRightListData,
  'POST /demo/template/demorightlists/save/v1': saveDemoRightListData
};
