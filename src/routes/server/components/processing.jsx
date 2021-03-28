import React from 'react'
import {connect} from "dva";
import styles from '../server.less'
import ServerItem from './serverItem'

const Processing = (props) => {

  return (
    <div className={styles.serverSubPage}>
      {
        props.ordreList && props.ordreList.map((item) => {
          return (<ServerItem key={item.id} item={item}/>)
        })
      }
    </div>
  )
}

export default connect()(Processing);
