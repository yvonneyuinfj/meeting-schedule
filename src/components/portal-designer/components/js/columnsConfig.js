/**  常用门户小页模板的 Json 数据**/
export const columnsData = {
  columns1: {
    list: [
      {
        type: 'smallPage',
        name: '我的待办',
        url: 'views/avic/portal/homepage/portletcards/MyTask',
        icon: 'icon-input',
        options: {
          title: '我的待办',
          titleRequired: false,
          remoteFunc: 'func_1594629696000_95696',
          fontWeight: 1, // 文字加粗
          moreUrl: '/bpmtaskmanage', //跳转路由组件地址
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 0,
        y: 14,
        w: 24,
        h: 35,
        i: '5',
        id: '8a58b2a576264169017627cd0f874434',
        key: '1609238801000_7712',
        model: 'smallPage_1594629696000_95696',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '常用流程',
        url: 'views/avic/portal/homepage/portletcards/CommonProcesses',
        icon: 'icon-input',
        options: {
          title: '常用流程',
          titleRequired: true,
          remoteFunc: 'func_1594629774000_60514',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          moreUrl: '/bpmstartprocess', //跳转路由组件地址
          isShowRefresh: true // 显示刷新
        },
        x: 0,
        y: 96,
        w: 24,
        h: 32,
        i: '8',
        id: '8a58b2a576264169017627cf0ae147ab',
        key: '1609238801000_82712',
        model: 'smallPage_1594629774000_60514',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '快捷入口',
        url: 'views/avic/portal/homepage/portletcards/QuickAccess',
        icon: 'icon-input',
        options: {
          title: '快捷入口',
          titleRequired: true,
          remoteFunc: 'func_1594629719000_18252',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 12,
        y: 70,
        w: 12,
        h: 26,
        i: '7',
        id: '8a58b2a576264169017627cfc46b4941',
        key: '1609238801000_81230',
        model: 'smallPage_1594629719000_18252',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '仪表盘',
        url: 'views/avic/portal/homepage/portletcards/DashboardChart',
        icon: 'icon-input',
        options: {
          title: '仪表盘',
          titleRequired: false,
          remoteFunc: 'func_1594629704000_64021',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 12,
        y: 49,
        w: 12,
        h: 21,
        i: '6',
        id: '8a58b2a576264169017627ce8b97462d',
        key: '1609238801000_27692',
        model: 'smallPage_1594629704000_64021',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '项目金额',
        url: 'views/avic/portal/homepage/portletcards/AmountStatistics',
        icon: 'icon-input',
        options: {
          title: '项目金额',
          titleRequired: false,
          remoteFunc: 'func_1594629663000_76739',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 6,
        y: 0,
        w: 6,
        h: 14,
        i: '4',
        id: '8a58b2a576264169017627cb9a9d4422',
        key: '1609238801000_34212',
        model: 'smallPage_1594629663000_76739',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '任务完成总览',
        url: 'views/avic/portal/homepage/portletcards/TaskCompletionStatistics',
        icon: 'icon-input',
        options: {
          title: '任务完成总览',
          titleRequired: false,
          remoteFunc: 'func_1594629653000_58595',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 12,
        y: 0,
        w: 6,
        h: 14,
        i: '3',
        id: '8a58b2a576264169017627cc5cea4428',
        key: '1609238801000_97617',
        model: 'smallPage_1594629653000_58595',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '访问量',
        url: 'views/avic/portal/homepage/portletcards/TrafficStatistics',
        icon: 'icon-input',
        options: {
          title: '访问量',
          titleRequired: false,
          remoteFunc: 'func_1594629641000_24224',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 18,
        y: 0,
        w: 6,
        h: 14,
        i: '2',
        id: '8a58b2a576264169017627cca9e64430',
        key: '1609238801000_50517',
        model: 'smallPage_1594629641000_24224',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '关注项目',
        url: 'views/avic/portal/homepage/portletcards/FocusProject',
        icon: 'icon-input',
        options: {
          title: '关注项目',
          titleRequired: true,
          remoteFunc: 'func_1594629402000_30830',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 0,
        y: 49,
        w: 12,
        h: 47,
        i: '0',
        id: '8a58b2a576264169017627ce361b4626',
        key: '1609238801000_95166',
        model: 'smallPage_1594629402000_30830',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '任务统计',
        url: 'views/avic/portal/homepage/portletcards/TaskTotalStatistics',
        icon: 'icon-input',
        options: {
          title: '任务统计',
          titleRequired: false,
          remoteFunc: 'func_1594629408000_36102',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          isShowRefresh: true // 显示刷新
        },
        x: 0,
        y: 0,
        w: 6,
        h: 14,
        i: '1',
        id: '8a58b2a576264169017627cc0db74425',
        key: '1609238801000_67057',
        model: 'smallPage_1594629408000_36102',
        rules: [],
        moved: false
      }
    ],
    config: {
      labelWidth: 100,
      labelPosition: 'right',
      size: 'small',
      id: '4028b88176ae0f3a0176ae1a675401ba'
    }
  },
  columns2: {
    list: [
      {
        type: 'smallPage',
        name: '仪表盘',
        url: 'views/avic/portal/homepage/portletcards/DashboardChart',
        icon: 'icon-input',
        options: {
          title: '仪表盘',
          titleRequired: false,
          remoteFunc: 'func_1594342883000_73403',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40'
        },
        x: 12,
        y: 0,
        w: 12,
        h: 21,
        i: '2',
        id: '8a58b2a576264169017627ce8b97462d',
        key: '1594629855000_50368',
        model: 'smallPage_1594342883000_73403',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '常用流程',
        url: 'views/avic/portal/homepage/portletcards/CommonProcesses',
        icon: 'icon-input',
        options: {
          title: '常用流程',
          titleRequired: true,
          remoteFunc: 'func_1594346678000_93465',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40',
          moreUrl: '/bpmstartprocess' //跳转路由组件地址
        },
        x: 0,
        y: 47,
        w: 24,
        h: 32,
        i: '4',
        id: '8a58b2a576264169017627cf0ae147ab',
        key: '1594629855000_90136',
        model: 'smallPage_1594346678000_93465',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '快捷入口',
        url: 'views/avic/portal/homepage/portletcards/QuickAccess',
        icon: 'icon-input',
        options: {
          title: '快捷入口',
          titleRequired: true,
          remoteFunc: 'func_1594342904000_7703',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40'
        },
        x: 12,
        y: 21,
        w: 12,
        h: 26,
        i: '3',
        id: '8a58b2a576264169017627cfc46b4941',
        key: '1594629855000_33962',
        model: 'smallPage_1594342904000_7703',
        rules: [],
        moved: false
      },
      {
        type: 'smallPage',
        name: '关注项目',
        url: 'views/avic/portal/homepage/portletcards/FocusProject',
        icon: 'icon-input',
        options: {
          title: '关注项目',
          titleRequired: true,
          remoteFunc: 'func_1594342876000_71385',
          fontWeight: 1, // 文字加粗
          italic: 0, // 文字倾斜
          fontSize: '14', // 文字大小
          fontColor: '#333333', // 文字颜色
          lineHeight: '40'
        },
        x: 0,
        y: 0,
        w: 12,
        h: 47,
        i: '1',
        id: '8a58b2a576264169017627ce361b4626',
        key: '1594629855000_72007',
        model: 'smallPage_1594342876000_71385',
        rules: [],
        moved: false
      }
    ],
    config: {
      labelWidth: 100,
      labelPosition: 'right',
      size: 'small',
      id: '8a69ec68732bbfa201732c350cf02fe2'
    }
  }
};
