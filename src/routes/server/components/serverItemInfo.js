import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import styles from '../server.less'
import {getOrderInfo} from "../../../services/order";
import {routerRedux} from "dva/router";
import {timeTransToFrontend} from "../../../utils/transformUtils";

const ServerItemInfo = (props) => {
  const [nowStage, setNowStage] = useState(1);
  const [stageData, setStageData] = useState([]);
  const [order, setOrder] = useState({});
  const [showBtnGroup, setShowBtnGroup] = useState(false);

  // 初始化信息，只执行一次
  useEffect(() => {
    let pathname_temp = props.location.pathname.split('/')[2]
    console.log(`正在对id为${pathname_temp}的工单进行查询`)
    // 获取路由中的工单id
    // 初始化数据
    getOrderInfo(pathname_temp).then(res => {
      setOrder(res.data.order)
      const stageList = res.data.order.order_stage
      setStageData(stageList.reverse())
      setNowStage(res.data.order.stage)
    }).catch(err=>{
      console.log(err)
    })
  }, [])

  //后面的参数代表了，什么参数变化了需要执行这个effect
  useEffect(() => {
    // 在这里对stageData进行请求
    // 在这里使用setStageData进行更新
    setShowBtnGroup(shouldShowBtnGroup(props.userType, nowStage))
  })

  // 这里会对跳转进行处理
  const writeNextStage = (stage) => {
    props.dispatch(routerRedux.push(`/change/${order.id}/${stage}`));
  }

  const stateToComponent = {
    1: {
      name: '已发布',
      buttons: (<>
        <button onClick={()=>{writeNextStage(2)}} className={styles.processBtn}>确认信息</button>
      </>)
    },
    2: {
      name: '已确认',
      buttons: (<>
        <button onClick={()=>{writeNextStage(5)}} className={styles.processBtn}>终止任务</button>
        <button onClick={()=>{writeNextStage(3)}} className={styles.processBtn}>开始进行</button>
      </>)
    },
    3: {
      name: '进行中',
      buttons: (<>
        <button onClick={()=>{writeNextStage(5)}} className={styles.processBtn}>终止任务</button>
        <button onClick={()=>{writeNextStage(4)}} className={styles.processBtn}>暂停任务</button>
        <button onClick={()=>{writeNextStage(6)}} className={styles.processBtn}>完成任务</button>
      </>)
    },
    4: {
      name: '暂停中',
      buttons: (<>
        <button onClick={()=>{writeNextStage(5)}} className={styles.processBtn}>终止任务</button>
        <button onClick={()=>{writeNextStage(3)}} className={styles.processBtn}>继续进行</button>
      </>)
    },
    5: {
      name: '已终止',
      buttons: (<></>)
    },
    6: {
      name: '已完成',
      buttons: (<>
        <button onClick={()=>{console.log('点击评价功能')}} className={styles.processBtn}>评价</button>
      </>)
    },
    7: {
      name: '已评价',
      buttons: (<>
        <button onClick={()=>{console.log('查看评价详情')}} className={styles.processBtn}>查看评价详情</button>
      </>)
    },
  }


  const shouldShowBtnGroup = (userType, maxStage) => {
    if (maxStage === 7) return true;
    if (userType === 1 && maxStage >= 6) {
      return true;
    }
    if (userType === 2 && maxStage >= 1 && maxStage <= 5) {
      return true;
    }
    return false;
  }

  return (
    <div className={styles.serverItemInfoContainer}>
      <div className={styles.stepBox}>步骤条</div>
      <ul className={styles.ulContainer}>
        {
          stageData && stageData.map((item) => {
            return (<li className={styles.liContainer} key={item.id}>
              {
                nowStage > item.stage ?
                  (<div>流程: {stateToComponent[item.stage].name}</div>)
                  :(<div>当前流程: {stateToComponent[item.stage].name}</div>)
              }

              <div>时间:{timeTransToFrontend(item.create_time)}</div>
              <div>备注: {item.note}</div>
              {
                // 最后一个阶段才会显示按钮
                // 同时会区分住户能看到哪些
                // 员工能看到哪些
                (nowStage === item.stage && showBtnGroup) &&
                <div className={styles.btnGroup}>
                  {stateToComponent[item.stage].buttons}
                </div>
              }

            </li>)
          })
        }
        <li className={styles.liContainer}>
          <div>总的服务详情</div>
          <div>总的服务详情</div>
          <div>总的服务详情</div>
          <div>总的服务详情</div>
          <div>总的服务详情</div>
          <div>总的服务详情</div>
        </li>

      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userType: state.user.userType,
  }
}

export default connect(mapStateToProps)(ServerItemInfo)
