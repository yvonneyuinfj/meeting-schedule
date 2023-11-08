/** 单表 */
const Mock = require('mockjs');

/**数据源 */
const data = {
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
};
/**获取列表数据*/
const getDemoMainData = Mock.mock({
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
    'result|5': [data]
  }
});
/**删除数据 */
const deleteDemoMainData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});
/**保存数据 */
const saveDemoMainData = Mock.mock({
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
/**编辑数据 */
const editDemoMainData = Mock.mock({
  errorDesc: '',
  message: 'ok',
  retCode: '200',
  responseBody: {
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
});

/**保存并启动流程 */
const saveFormAndStartProcessData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: {
    defineId: '8a69e6c38899d5ca01889dc3f4290b30-1',
    entryId: '8a69d412890a3af40189113a991a25ac',
    executionId: '8a69e6c38899d5ca01889dc3f4290b30.8a69d412890a3af40189113a991a25ac',
    formId: '8a69e88c8905ea510189113a99060383',
    taskId: '8a69d412890a3af40189113a99b625f8',
    taskTitle: '拟稿',
    taskUrl:
      'views/avic/demo/demomaininsideflow/DemoMainInsideFlowDetail?entryId=8a69d412890a3af40189113a991a25ac&id=8a69e88c8905ea510189113a99060383&executionId=8a69e6c38899d5ca01889dc3f4290b30.8a69d412890a3af40189113a991a25ac&taskId=8a69d412890a3af40189113a99b625f8&formId=8a69e88c8905ea510189113a99060383'
  }
});

module.exports = {
  'POST  /demo/template/demomainflows/search-by-page/v1': getDemoMainData,
  'GET /demo/template/demomainflows': editDemoMainData,
  'DELETE /demo/template/demomainflows/delete-by-ids/v1': deleteDemoMainData,
  'POST /demo/template/demomainflows/save/v1': saveDemoMainData,
  'POST /demo/template/demomainflows/save-and-start-process/v1': saveFormAndStartProcessData
};
