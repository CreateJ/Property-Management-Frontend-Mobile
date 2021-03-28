import Mock from 'mockjs'

const getServerList = (req, res) => {
  let data = Mock.mock({
    'orderList|10': [
      {
        'id|+1': 100000,
        'type|1': [1,2,3,4,5,6,7],
        'stage|1': [1,2,3,4,5,6,7],
      }
    ]
  })
  res.json(data)
}

export default {
  'GET /api/get_server': getServerList
}
