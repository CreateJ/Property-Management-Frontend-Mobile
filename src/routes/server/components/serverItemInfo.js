import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import styles from '../server.less'

const ServerItemInfo = (props) => {
  const [maxStage, setMaxStage] = useState(1);
  const [stageData, setStageData] = useState([7, 6, 5, 4, 3, 2, 1]);
  const [showBtnGroup, setShowBtnGroup] = useState(false);
  const [pathname, setPathname] = useState('');

  // 初始化信息，只执行一次
  useEffect(() => {
    let pathname_temp = props.location.pathname.split('/')[2]
    setPathname(pathname_temp);
    console.log(`正在对id为${pathname_temp}的工单进行查询`)
    // 获取路由中的工单id
    // 初始化数据
    console.log('useEffect1 serverItemInfo')
    // 获取当前流程
    let max_tmp = 0;
    for (let i = 0; i < stageData.length; i++) {
      if (max_tmp < stageData[i]) {
        max_tmp = stageData[i]
      }
    }
    setMaxStage(max_tmp)
  }, [])

  //后面的参数代表了，什么参数变化了需要执行这个effect
  useEffect(() => {
    // 在这里对stageData进行请求
    // 在这里使用setStageData进行更新
    console.log('useEffect2 serverItemInfo')
    setShowBtnGroup(shouldShowBtnGroup(props.userType, maxStage))
    // 这个effect要监听maxStage,这样的话
  }, [maxStage])

  const stateToComponent = {
    1: {
      name: '已发布',
      buttons: (<>
        <button className={styles.processBtn}>确认信息</button>
      </>)
    },
    2: {
      name: '已确认',
      buttons: (<>
        <button className={styles.processBtn}>终止任务</button>
        <button className={styles.processBtn}>开始进行</button>
      </>)
    },
    3: {
      name: '进行中',
      buttons: (<>
        <button className={styles.processBtn}>终止任务</button>
        <button className={styles.processBtn}>暂停任务</button>
        <button className={styles.processBtn}>完成任务</button>
      </>)
    },
    4: {
      name: '暂停中',
      buttons: (<>
        <button className={styles.processBtn}>终止任务</button>
        <button className={styles.processBtn}>继续进行</button>
      </>)
    },
    5: {
      name: '已终止',
      buttons: (<></>)
    },
    6: {
      name: '已完成',
      buttons: (<>
        <button className={styles.processBtn}>评价</button>
      </>)
    },
    7: {
      name: '已评价',
      buttons: (<>
        <button className={styles.processBtn}>查看评价详情</button>
      </>)
    },
  }


  const shouldShowBtnGroup = (userType, maxStage) => {
    if (maxStage === 7) return true;
    if (userType === 'household' && maxStage >= 6) {
      return true;
    }
    if (userType === 'employee' && maxStage >= 1 && maxStage <= 5) {
      return true;
    }
    return false;
  }

  return (
    <div className={styles.serverItemInfoContainer}>
      <div className={styles.stepBox}>步骤条</div>
      <ul className={styles.ulContainer}>
        {
          stageData.map((item) => {
            return (<li className={styles.liContainer} key={item}>
              {
                maxStage > item ?
                  <div>当前流程: {stateToComponent[item].name}</div> :
                  <div>流程: {stateToComponent[item].name}</div>
              }

              <div>备注: 这里是一大段备注</div>
              {
                // 最后一个阶段才会显示按钮
                // 同时会区分住户能看到哪些
                // 员工能看到哪些
                (maxStage === item && showBtnGroup) &&
                <div className={styles.btnGroup}>
                  {stateToComponent[item].buttons}
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
