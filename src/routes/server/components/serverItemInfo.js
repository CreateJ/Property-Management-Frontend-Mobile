import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import styles from '../server.less'
import {routerRedux} from "dva/router";
import {timeTransToFrontend, typeTransToFrontend} from "../../../utils/transformUtils";
import {Button, Steps, WhiteSpace} from "antd-mobile";
import {getSteps} from "../../../Map/stepsMap";

const Step = Steps.Step;

const ServerItemInfo = (props) => {

  const {currentOrder} = props;
  const {order_stage} = currentOrder;
  const [nowStage, setNowStage] = useState(1);
  const [steps, setSteps] = useState([])
  const [stepsCurrent, setStepsCurrent] = useState(0);
  const [showBtnGroup, setShowBtnGroup] = useState(false);

  // 初始化信息，只执行一次
  useEffect(() => {
    let pathname_temp = props.location.pathname.split('/')[2]
    console.log(`正在对id为${pathname_temp}的工单进行查询`)
    props.dispatch({type: 'order/updateCurrentOrder', payload: {order_id: pathname_temp}})
  }, [])

  // 让程序自动运行即可
  useEffect(() => {
    setNowStage(currentOrder.stage)
    setShowBtnGroup(shouldShowBtnGroup(props.userType, nowStage))
  })

  useEffect(() => {
    if (currentOrder.stage) {
      setSteps(getSteps(currentOrder.stage))
    }
  }, [currentOrder])

  useEffect(()=>{
    if (steps.length > 0) {
      for (let i = 0; i < 3; i++) {
        if (steps[i].id === currentOrder.stage) {
          setStepsCurrent(i);
          console.log(i, 'iiiiiiiiiiiiiiiiiiiiiiii')
        }
      }
    }
  },[steps])

  // 这里会对跳转进行处理
  const writeNextStage = (stage) => {
    props.dispatch(routerRedux.push(`/change/${currentOrder.id}/${stage}`));
  }

  const evaluation = () => {
    props.dispatch(routerRedux.push(`/evaluation/${currentOrder.id}`));
  }

  const stateToComponent = {
    1: {
      name: '已发布',
      buttons: (<>
        <button onClick={() => {
          writeNextStage(2)
        }} className={styles.processBtn}>确认信息
        </button>
      </>)
    },
    2: {
      name: '已确认',
      buttons: (<>
        <button onClick={() => {
          writeNextStage(5)
        }} className={styles.processBtn}>终止任务
        </button>
        <button onClick={() => {
          writeNextStage(3)
        }} className={styles.processBtn}>开始进行
        </button>
      </>)
    },
    3: {
      name: '进行中',
      buttons: (<>
        <button onClick={() => {
          writeNextStage(5)
        }} className={styles.processBtn}>终止任务
        </button>
        <button onClick={() => {
          writeNextStage(4)
        }} className={styles.processBtn}>暂停任务
        </button>
        <button onClick={() => {
          writeNextStage(6)
        }} className={styles.processBtn}>完成任务
        </button>
      </>)
    },
    4: {
      name: '暂停中',
      buttons: (<>
        <button onClick={() => {
          writeNextStage(5)
        }} className={styles.processBtn}>终止任务
        </button>
        <button onClick={() => {
          writeNextStage(3)
        }} className={styles.processBtn}>继续进行
        </button>
      </>)
    },
    5: {
      name: '已终止',
      buttons: (<></>)
    },
    6: {
      name: '已完成',
      buttons: (<>
        <button onClick={evaluation} className={styles.processBtn}>评价</button>
      </>)
    },
    7: {
      name: '已评价',
      buttons: (<>
        <button onClick={() => {
          console.log('查看评价详情')
        }} className={styles.processBtn}>查看评价详情
        </button>
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
      <div className={styles.stepContainer}>
        <div className={styles.stepBox}>
          <Steps current={stepsCurrent} direction="horizontal" size="small">
            {
              steps.map((s, i) =>
                <Step key={i} title={s.title} description=''/>)
            }
          </Steps>
        </div>
      </div>

      <ul className={styles.ulContainer}>
        {
          order_stage && order_stage.map((item, index) => {
            return (<li className={styles.liContainer} key={item.id}>
              {
                nowStage > item.stage ?
                  (<div>流程: {stateToComponent[item.stage].name}</div>)
                  : (<div>当前流程: {stateToComponent[item.stage].name}</div>)
              }

              <div>时间:{timeTransToFrontend(item.create_time)}</div>
              <div>备注: {item.note}</div>
              {
                // 最后一个阶段才会显示按钮
                // 同时会区分住户能看到哪些
                // 员工能看到哪些
                (nowStage === item.stage &&
                  index === 0 &&
                  showBtnGroup) &&
                <div className={styles.btnGroup}>
                  {stateToComponent[item.stage].buttons}
                </div>
              }

            </li>)
          })
        }
        <li className={styles.liContainer}>
          <div className={styles.title}>工单详情</div>
          <div>服务工单编号：{currentOrder.id}</div>
          <div>住户：{currentOrder.household_name}</div>
          <div>员工：{currentOrder.employee_name}</div>
          <div>工单类型：{currentOrder.type && typeTransToFrontend(currentOrder.type)}({currentOrder.emergency === 1 ? '不紧急' : '紧急'})</div>
        </li>
        <Button
          className={styles.return}
          onClick={() => {
            props.dispatch(routerRedux.push('/server'))
          }}
        >回到服务页</Button>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userType: state.user.userType,
    currentOrder: state.order.currentOrder,
  }
}

export default connect(mapStateToProps)(ServerItemInfo)
