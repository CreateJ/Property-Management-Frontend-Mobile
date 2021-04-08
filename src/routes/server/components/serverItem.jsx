import React from 'react'
import styles from '../server.less'
import {routerRedux} from "dva/router";
import {connect} from "dva";

import {
  houseTransToFrontend,
  timeTransToFrontendWithYYMMHHMM,
  typeTransToFrontend
} from "../../../utils/transformUtils";
import {ClearOutlined, CrownOutlined, SendOutlined, SmileOutlined, SolutionOutlined} from "@ant-design/icons";

const ServerItem = (props) => {
  const stageMap = ['', '已发布', '已确认', '进行中', '暂停中', '已终止', '已完成', '已评价']
  const iconList = [
    <SmileOutlined/>,
    <SendOutlined/>,
    <SolutionOutlined/>,
    <CrownOutlined/>,
    <ClearOutlined/>
  ]

  const handleToServerItemInfo = () => {
    props.dispatch(routerRedux.push('/serverInfo/' + props.item.id))
  }

  const {item, index} = props;
  return (
    <div className={styles.serverItemContainer} onClick={handleToServerItemInfo}>
      <div className={styles.itemTop}>
        <span>{iconList[Math.floor(index % 5)]}</span>
        <span>&nbsp;{typeTransToFrontend(item.type)}</span>
        <span className={styles.time}>
          {timeTransToFrontendWithYYMMHHMM(item.order_stage[item.order_stage.length - 1].create_time)}
        </span>
      </div>
      <div className={styles.title}>
        地址：{item && houseTransToFrontend(item.house_id)}
      </div>
      <div className={styles.describe}>
        <div>住户：{item.household_name}</div>
        <div>当前阶段:{stageMap[item.stage]}</div>
        <div>备注：{item.order_stage[item.order_stage.length-1].note}</div>
      </div>
    </div>
  )
}


export default connect()(ServerItem);
