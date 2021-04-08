import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import {getOrderInfo} from "../../services/order";
import {ClearOutlined, CrownOutlined, SendOutlined, SmileOutlined, SolutionOutlined} from "@ant-design/icons";
import styles from './grabOrder.less'
import {houseTransToFrontend, timeTransToFrontendWithYYMMHHMM, typeTransToFrontend} from "../../utils/transformUtils";

const OrderItem = (props) => {
  const {id, index} = props
  const [order, setOrder] = useState()
  const iconList = [
    <SmileOutlined/>,
    <SendOutlined/>,
    <SolutionOutlined/>,
    <CrownOutlined/>,
    <ClearOutlined/>
  ]
  useEffect(() => {
    async function init(id) {
      const res = await getOrderInfo(id)
      if (res.code === 200) {
        return res.data.order
      }
    }

    if(id !== ''){
      init(id).then(data => {
        setOrder(data)
        console.log(data)
      })
    }
  }, [])


  const grab = async (id) => {
    await props.handleGrab(id)
  }

  return (
    <div>
      {
        order && (
          <>
            <div className={styles.itemTop}>
              <span>{iconList[Math.floor(index % 5)]}</span>
              <span className={styles}>&nbsp;{typeTransToFrontend(order.type)}</span>
              <span className={styles.time}>
                {timeTransToFrontendWithYYMMHHMM(order.order_stage[order.order_stage.length-1].create_time)}
              </span>
            </div>
            <div className={styles.title}>
              地址：{order && houseTransToFrontend(order.house_id)}
            </div>
            <div className={styles.describe}>
              <div>住户：{order.household_name}</div>
              <div>备注：{order.order_stage[order.order_stage.length-1].note}</div>
            </div>
            <div className={styles.btnBox}>
              <button onClick={()=>grab(order.id)} className={styles.btn}>抢订单</button>
            </div>
          </>
        )
      }
      {
        !order && <div>获取不到数据</div>
      }
    </div>
  )
}

export default connect()(OrderItem)
