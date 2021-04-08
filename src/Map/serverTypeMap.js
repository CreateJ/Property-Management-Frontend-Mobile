const serverType = [
  {
    label: '水工',
    value: '1',
    children: [
      {
        label: '水管漏水',
        value: '1-01',
      },
      {
        label: '水龙头坏',
        value: '1-02',
      },
      {
        label: '冲水阀坏',
        value: '1-03',
      },
      {
        label: '水泵坏',
        value: '1-04',
      },
      {
        label: '其他',
        value: '1-05',
      },
    ],
  },
  {
    label: '电工',
    value: '2',
    children: [
      {
        label: '电源插座坏',
        value: '2-01',
      },
      {
        label: '开关跳闸',
        value: '2-02',
      },
      {
        label: '灯坏',
        value: '2-03',
      },
      {
        label: '其他',
        value: '2-04',
      },
    ],
  },
  {
    label: '木工',
    value: '3',
    children: [
      {
        label: '门坏',
        value: '3-01',
      },
      {
        label: '柜子坏',
        value: '3-02',
      },
      {
        label: '窗坏',
        value: '3-03',
      },
      {
        label: '其他',
        value: '3-04',
      },
    ],
  },
  {
    label: '设备',
    value: '5',
    children: [
      {
        label: '空调漏水',
        value: '5-01',
      },
      {
        label: '排气扇坏',
        value: '5-02',
      },
      {
        label: '电梯异常',
        value: '5-03',
      },
      {
        label: '空调坏',
        value: '5-04',
      },
      {
        label: '其他',
        value: '5-05',
      },
    ],
  },
  {
    label: '土建',
    value: '6',
    children: [
      {
        label: '洗手台坏',
        value: '6-01',
      },
      {
        label: '天花板漏水',
        value: '6-02',
      },
      {
        label: '墙皮脱落',
        value: '6-03',
      },
      {
        label: '瓷砖脱落',
        value: '6-04',
      },
      {
        label: '其他',
        value: '6-05',
      },
    ],
  },
  {
    label: '邻里调解',
    value: '7',
    children: [
      {
        label: '噪音扰民',
        value: '7-01',
      },
      {
        label: '垃圾乱丢',
        value: '7-02',
      },
      {
        label: '小孩恶作剧',
        value: '7-03',
      },
      {
        label: '违章搭建',
        value: '7-04',
      },
      {
        label: '其他',
        value: '7-05',
      },
    ],
  },
  {
    label: '其他',
    value: '8',
    children: [
      {
        label: '其他',
        value: '8-01',
      }
    ],
  },
]

export default serverType;
