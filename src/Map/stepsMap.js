const stepsMap = [
  0,
  {
    id: 1,
    title: '发布',
  },
  {
    id: 2,
    title: '确认',
  },
  {
    id: 3,
    title: '进行',
  },
  {
    id: 4,
    title: '暂停',
  },
  {
    id: 5,
    title: '终止',
  },
  {
    id: 6,
    title: '完成',
  },
  {
    id: 7,
    title: '评价',
  }
]

export function getSteps(num){
  switch (num) {
    case 1 : return [stepsMap[1],stepsMap[2],stepsMap[3]];
    case 2 : return [stepsMap[1],stepsMap[2],stepsMap[3]];
    case 3 : return [stepsMap[2],stepsMap[3],stepsMap[6]];
    case 4 : return [stepsMap[3],stepsMap[4],stepsMap[3]];
    case 5 : return [stepsMap[3],stepsMap[4],stepsMap[5]];
    case 6 : return [stepsMap[3],stepsMap[6],stepsMap[7]];
    case 7 : return [stepsMap[3],stepsMap[6],stepsMap[7]];
  }
}

