const serverType = [
  {
    label: '水工',
    value: '01',
    children: [
      {
        label: '水管漏水',
        value: '01-1',
      },
      {
        label: '水龙头坏',
        value: '01-2',
      },
      {
        label: '冲水阀坏',
        value: '01-3',
      },
      {
        label: '水泵坏',
        value: '01-4',
      },
      {
        label: '其他',
        value: '01-5',
      },
    ],
  },
  {
    label: '电工',
    value: '02',
    children: [
      {
        label: '电源插座坏',
        value: '02-1',
      },
      {
        label: '开关跳闸',
        value: '02-2',
      },
      {
        label: '灯坏',
        value: '02-3',
      },
      {
        label: '其他',
        value: '02-4',
      },
    ],
  },
  {
    label: '木工',
    value: '03',
    children: [
      {
        label: '门坏',
        value: '03-1',
      },
      {
        label: '柜子坏',
        value: '03-2',
      },
      {
        label: '窗坏',
        value: '03-3',
      },
      {
        label: '其他',
        value: '03-4',
      },
    ],
  },
  {
    label: '木工',
    value: '04',
    children: [
      {
        label: '厕所堵塞',
        value: '04-1',
      },
      {
        label: '洗手盆水管漏水',
        value: '04-2',
      },
      {
        label: '排水管漏水',
        value: '04-3',
      },
      {
        label: '其他',
        value: '04-4',
      },
    ],
  },
  {
    label: '设备',
    value: '05',
    children: [
      {
        label: '空调漏水',
        value: '05-1',
      },
      {
        label: '排气扇坏',
        value: '05-2',
      },
      {
        label: '电梯异常',
        value: '05-3',
      },
      {
        label: '空调坏',
        value: '05-4',
      },
      {
        label: '其他',
        value: '05-5',
      },
    ],
  },
  {
    label: '土建',
    value: '06',
    children: [
      {
        label: '洗手台坏',
        value: '06-1',
      },
      {
        label: '天花板漏水',
        value: '06-2',
      },
      {
        label: '墙皮脱落',
        value: '06-3',
      },
      {
        label: '瓷砖脱落',
        value: '06-4',
      },
      {
        label: '其他',
        value: '06-5',
      },
    ],
  },
  {
    label: '邻里调解',
    value: '07',
    children: [
      {
        label: '噪音扰民',
        value: '07-1',
      },
      {
        label: '垃圾乱丢',
        value: '07-2',
      },
      {
        label: '小孩恶作剧',
        value: '07-3',
      },
      {
        label: '违章搭建',
        value: '07-4',
      },
      {
        label: '其他',
        value: '07-5',
      },
    ],
  },
  {
    label: '其他',
    value: '08',
    children: [
      {
        label: '其他',
        value: '08-1',
      }
    ],
  },
]

export default serverType;
