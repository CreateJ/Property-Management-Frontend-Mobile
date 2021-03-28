import React from 'react'
import styles from '../server.less'
import {routerRedux} from "dva/router";
import {connect} from "dva";


const ServerItem = (props) => {
  const typeMap = ['','水工','电工','排污','土建','木工','设备','邻里调解']
  const stageMap = ['','已发布','已确认','进行中','暂停中','已终止','已完成','已评价']


  const handleToServerItemInfo = () => {
    console.log(props,'serverItem props')
    props.dispatch(routerRedux.push('/serverInfo/'+props.item.id))
  }

  return (
    <div className={styles.serverItemContainer} onClick={handleToServerItemInfo}>
      <div>{`类型:${typeMap[props.item.type]}`}</div>
      <div>{`描述:${typeMap[props.item.type]}`}</div>
      <div>{`当前阶段:${stageMap[props.item.stage]}`}</div>
    </div>
  )
}



export default connect()(ServerItem);
