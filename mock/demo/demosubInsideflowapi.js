/** 主子表内嵌流程 */
const Mock = require('mockjs');

const data = {
  'id|+1': 1,
  /**流程当前步骤 */
  activityalias_: '人工',
  /**流程状态 */
  businessstate_: '流转中',
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
  secretLevelName: '非涉密文档',
  /** 主表id */
  demoMainId: '8a69e61e88c7b4700188f5a57a0a03fb'
};
/**获取列表数据 */
const getDemoSubInsideFlowData = Mock.mock({
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
const editDemoSubInsideFlowData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: {
    'id|+1': 1,
    /**流程当前步骤 */
    activityalias_: '人工',
    /**流程状态 */
    businessstate_: '流转中',
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
    secretLevelName: '非涉密文档',
    /** 主表id */
    demoMainId: '8a69e61e88c7b4700188f5a57a0a03fb'
  }
});
/**删除数据 */
const deleteDemoSubInsideFlowData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});

/**保存数据 */
const saveDemoSubInsideFlowData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});
module.exports = {
  'POST /demo/template/demosubflows/search-by-page/v1': getDemoSubInsideFlowData,
  'GET /demo/template/demosubflows': editDemoSubInsideFlowData,
  'DELETE /demo/template/demosubflows': deleteDemoSubInsideFlowData,
  'POST /demo/template/demosubflows/save-sub/v1': saveDemoSubInsideFlowData
};
