import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import {getEmergencyOrder, grabEmergencyOrder} from "../../services/order";
import {Modal, Toast} from "antd-mobile";
import styles from './grabOrder.less'
import OrderItem from "./orderItem";

const prompt = Modal.prompt;

const GrabOrder = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(res => {
    })
  }, [])

  const getOrders = async () => {
    const success = await getEmergencyOrder();
    if (success.code === 200) {
      success.data.order_ids && setOrders(success.data.order_ids)
      console.log(success.data.order_ids)
    } else {
      Toast.fail('请求数据失败，请检查网络情况，或稍后重试', 2)
    }
  }

  const handleGrab = async (id) => {
    prompt('备注', '请输入预期到达时间', [
      {text: '取消'},
      {
        text: '提交', onPress: async value => {
          const success = await grabEmergencyOrder({id:id, note:value})
          console.log(success)
          if (success.code === 200) {
            Toast.success('抢工单成功', 2)
          } else {
            Toast.fail('抢工单失败，该工单可能已经被抢走了', 2)
          }
          await getOrders();
        }
      },
    ], 'default', '')
  }


  return (
    <div className={styles.grabContainer}>
      <div className={styles.header}>抢紧急工单</div>
      <ul className={styles.orderList}>
        {
          orders.map((item, index) => {
            return (
              <li key={item} className={styles.item}>
                <OrderItem id={item} index={index} handleGrab={handleGrab}/>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userState: state.user.userData.state
  }
}

export default connect(mapStateToProps)(GrabOrder);
