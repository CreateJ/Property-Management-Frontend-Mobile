const employee = {
  appsList: [
    {
      key: 'checkIn',
      appName: '上班打卡',
      route: '/checkIn',
      url: require('../assets/appList/打卡.png'),
    },
    {
      key: 'grabOrder',
      appName: '抢工单',
      route: '/grabOrder',
      url: require('../assets/appList/流程.png'),
    },
    {
      key: 'viewOrder',
      appName: '服务进程',
      route: '/server',
      url: require('../assets/appList/查看.png'),
    },
    {
      key: 'commonProblem',
      appName: '常见问题',
      route: '/problem',
      url: require('../assets/appList/资料.png'),
    },
  ]
}
export default employee;
