/** 项目详细信息表 */
const Mock = require('mockjs');
/**获取列表数据 */
const getDemoSubData = Mock.mock({
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
        /** 项目分类编号 */
        projectClassCode: '@natural(1,500)',
        /** 项目分类名称 */
        projectClassName: '测试',
        /** 项目编号*/
        projectCode: '@natural(1,10000)',
        /** 项目名称 */
        projectName: '测试',
        /** 项目经理 */
        projectManager: '8a69effb888a39e501888a4095870004',
        projectManagerAlias: '一般用户',
        /** 项目组成员 */
        projectMembers: '8a69effb888a39e501888a4095870004',
        projectMembersAlias: '一般用户',
        /** 项目分类级别 */
        projectClassLevel: '1',
        projectClassLevelName: '内部项目分类',
        /** 项目分类管理员 */
        projectClassManager: '8a69e68287ff3fbc0187ff4351be00a7',
        projectClassManagerAlias: '多啦爱梦',
        /** 项目启动时间 */
        projectStartDate: '@date',
        /** 项目分类状态 */
        projectClassStatus: '1',
        projectClassStatusName: '有效',
        /** 项目分类维护时间 */
        projectClassDate: '2023-05-12T00:00:00.000+0000',
        /**项目所属部门 */
        projectDept: '8a58ab4d4c2141fd014c217cdc5102b6',
        projectDeptAlias: '研发中心',
        /** 年度 */
        projectYear: 1,
        /** 项目状态 */
        projectStatus: '1',
        projectStatusName: '有效',
        /** 项目技术 */
        projectTechs: '1',
        projectTechsName: '前端',
        /**密级 */
        secretLevel: '1',
        secretLevelName: '非涉密文档'
      }
    ]
  }
});
/**编辑数据 */
const editDemoSubData = Mock.mock({
  errorDesc: '',
  message: 'ok',
  retCode: '200',
  responseBody: {
    'id|+1': 1,
    /** 项目分类编号 */
    projectClassCode: '@natural(1,500)',
    /** 项目分类名称 */
    projectClassName: '测试',
    /** 项目编号*/
    projectCode: '@natural(1,10000)',
    /** 项目名称 */
    projectName: '测试',
    /** 项目经理 */
    projectManager: '8a69effb888a39e501888a4095870004',
    projectManagerAlias: '一般用户',
    /** 项目组成员 */
    projectMembers: '8a69effb888a39e501888a4095870004',
    projectMembersAlias: '一般用户',
    /** 项目分类级别 */
    projectClassLevel: '1',
    projectClassLevelName: '内部项目分类',
    /** 项目分类管理员 */
    projectClassManager: '8a69e68287ff3fbc0187ff4351be00a7',
    projectClassManagerAlias: '多啦爱梦',
    /** 项目启动时间 */
    projectStartDate: '@date',
    /** 项目分类状态 */
    projectClassStatus: '1',
    projectClassStatusName: '有效',
    /** 项目分类维护时间 */
    projectClassDate: '2023-05-12T00:00:00.000+0000',
    /**项目所属部门 */
    projectDept: '8a58ab4d4c2141fd014c217cdc5102b6',
    projectDeptAlias: '研发中心',
    /** 年度 */
    projectYear: 1,
    /** 项目状态 */
    projectStatus: '1',
    projectStatusName: '有效',
    /** 项目技术 */
    projectTechs: '1',
    projectTechsName: '前端',
    /**密级 */
    secretLevel: '1',
    secretLevelName: '非涉密文档'
  }
});
/**删除数据 */
const deleteDemoSubData = Mock.mock({
  errorDesc: '',
  message: '',
  retCode: '200',
  responseBody: 1
});

module.exports = {
  'POST /oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest/search-sub-by-page/v1': getDemoSubData,
  'GET /oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest': editDemoSubData,
  'DELETE /oa/stock/mpmprojectmaininfo/MpmProjectMainInfoRest/delete-sub-by-ids/v1':
    deleteDemoSubData
};
