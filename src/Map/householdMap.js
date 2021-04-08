const household = {
  appsList: [
    {
      key: 'publishOrder',
      appName: '发布工单',
      route: '/publish/1',
      url: require('../assets/appList/全部.png'),
    },
    {
      key: 'urgentOrder',
      appName: '紧急工单',
      route: '/publish/2',
      url: require('../assets/appList/积分.png'),
    },
    {
      key: 'viewOrder',
      appName: '服务进程',
      route: '/server',
      url: require('../assets/appList/流程.png'),
    },
    {
      key: 'commonProblem',
      appName: '常见问题',
      route: '/problem',
      url: require('../assets/appList/资料.png'),
    },
  ]
}

export default household
