import React, {useEffect, useState} from 'react'
import {connect} from 'dva';
import Processing from './components/processing'
import Completed from './components/processing'
import styles from './server.less'
import {Flex, Toast} from "antd-mobile";
import {getOrderListData} from "@/services/order";

const Server = (props) => {
  const [serverType, setServerType] = useState('processing')
  const [processingList, setProcessingList] = useState([])
  const [completedList, setCompletedList] = useState([])
  useEffect(() => {
    console.log('useEffect','serverPage')
    // console.log(props,'server props')
    initData().catch(err=>{
      console.log(err)
    })
  }, [])

  const initData = async ()=>{
    const response = await getOrderListData();
    console.log(response)
    if(response.code === 200){
      response.data.complete_list && setCompletedList(response.data.complete_list);
      response.data.processing_list && setProcessingList(response.data.processing_list);
    }else {
      Toast.fail('查询工单失败，请确认网络是否正常')
      setProcessingList([])
      setCompletedList([])
    }
  }

  return (
    <div className={styles.serverBox}>
      <div className={styles.btnBackground}></div>
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
