import React, {useEffect, useState} from 'react'
import {connect} from 'dva';
import Processing from './components/processing'
import Completed from "./components/completed";
import styles from './server.less'
import {Flex} from "antd-mobile";
import {getOrderList} from "@/services/server";

const Server = (props) => {
  const [serverType, setServerType] = useState('processing')
  const [processingList, setProcessingList] = useState([])
  const [completedList, setCompletedList] = useState([])
  useEffect(() => {
    console.log('useEffect','serverPage')
    // console.log(props,'server props')
    // 将获取到的数据放在两个列表中
    getOrderList().then(res => {
      const listA = res.data.orderList.filter(item => { return item.stage < 5 })
      setProcessingList(listA)
      const listB = res.data.orderList.filter(item => { return item.stage >= 5 })
      setCompletedList(listB)
    })
  }, [])

  return (
    <div className={styles.serverBox}>
      <div className={styles.btnGroup}>
        <Flex className={styles.btnBox}>
          {['processing', 'completed'].map((item) => {
            return (
              <Flex.Item key={item}>
                <div
                  className={serverType === item ?
                    styles.serverBtnSelected :
                    styles.serverBtn}
                  onClick={() => {
                    setServerType(item)
                  }}
                >
                  {item === 'processing' ? '进行中' : '已完成'}
                </div>
              </Flex.Item>
            )
          })}
        </Flex>
      </div>
      {serverType === 'processing' ?
        <Processing ordreList={processingList}/>
        : <Completed ordreList={completedList}/>}
    </div>
  )
}

export default connect()(Server);
