/** 项目基础信息表 */
const Mock = require('mockjs');

/**获取表单数据 */
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
    'result|10': [
      {
        'id|+1': 1,
        /** 项目编号 */
        projectClassCode: '@natural(1,500)',
        /** 项目名称 */
        projectClassName: '@ctitle',
        /** 项目分类级别 */
        projectClassLevel: '1',
        projectClassLevelName: '内部项目分类',
        /** 项目分类管理员 */
        projectClassManager: '8a69e68287ff3fbc0187ff4351be00a7',
        projectClassManagerAlias: '多啦爱梦',
        /**项目所属部门 */
        projectDept: '8a58ab4d4c2141fd014c217cdc5102b6',
        projectDeptAlias: '研发中心',
        /** 项目分类状态 */
        projectClassStatus: '1',
        projectClassStatusName: '有效',
        /** 项目状态 */
        projectStatus: '1',
        projectStatusName: '有效',
        /** 项目技术 */
        projectTechs: '1',
        projectTechsName: '前端',
        /** 项目分类维护时间 */
        projectClassDate: '@datetime',
        /** 排序 */
        projectClassOrder: '@natural(1,100)',
        /** 备注 */
        projectClassRemark: '@cparagraph',
        /**密级 */
        secretLevel: '1',
        secretLevelName: '非涉密文档'
      }
    ]
  }
});
/**编辑数据 */
const editDemoMainData = Mock.mock({
  errorDesc: '',
  message: 'ok',
  retCode: '200',
  responseBody: {
    'id|+1': 1,
    /** 项目编号 */
    projectClassCode: '@natural(1,500)',
    /** 项目名称 */
    projectClassName: '@ctitle',
    /** 项目分类级别 */
    projectClassLevel: '1',
    projectClassLevelName: '内部项目分类',
    /** 项目分类管理员 */
    projectClassManager: '8a69e68287ff3fbc0187ff4351be00a7',
    projectClassManagerAlias: '多啦爱梦',
    /**项目所属部门 */
    projectDept: '8a58ab4d4c2141fd014c217cdc5102b6',
    projectDeptAlias: '研发中心',
    /** 项目分类状态 */
    projectClassStatus: '1',
    projectClassStatusName: '有效',
    /** 项目状态 */
    projectStatus: '1',
    projectStatusName: '有效',
    /** 项目技术 */
    projectTechs: '1',
    projectTechsName: '前端',
    /** 项目分类维护时间 */
    projectClassDate: '@datetime',
    /** 排序 */
    projectClassOrder: '@natural(1,100)',
    /** 备注 */
    projectClassRemark: '@cparagraph',
    /**密级 */
    secretLevel: '1',
    secretLevelName: '非涉密文档'
  }
});
/**删除数据 */
const deleteDemoMainData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});

module.exports = {
  'POST /oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest/search-main-by-page/v1':
    getDemoMainData,
  'DELETE /oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest/delete-main-by-ids/v1':
    deleteDemoMainData,
  'GET /oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest': editDemoMainData
};
