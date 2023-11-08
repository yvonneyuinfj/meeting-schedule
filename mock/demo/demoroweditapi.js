/** 单表行编辑 */
const Mock = require('mockjs');
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

/**获取表单数据 */
const getDemoRowEditData = Mock.mock({
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

/**删除表单数据 */
const delteDemoRowEditaData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});

module.exports = {
  'POST /demo/template/demorowedits/search-by-page/v1': getDemoRowEditData,
  'DELETE /api/demo/template/demorowedits/delete-by-ids/v1': delteDemoRowEditaData
};
