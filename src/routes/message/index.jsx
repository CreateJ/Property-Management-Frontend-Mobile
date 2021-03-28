import React, {useEffect} from 'react'
import {connect} from "dva";
import styles from './message.less'
import {routerRedux} from "dva/router";

const Message = (props) => {
  useEffect(()=>{
    console.log(props,'messagePage');
  },[])

  const linkToServerItemInfo = (item) => {
    props.dispatch(routerRedux.push('/serverInfo/'+item))
  }
  return (
    <div className={styles.messageContainer}>
      <ul className={styles.ul}>
        {
          [1,2,3,4,5,6,7,8].map((item)=>{
            return (
              <li className={styles.li} key={item} onClick={()=>{linkToServerItemInfo(item)}}>
                <div>这一条是消息内容</div>
                <div>{item}</div>
                <div>{item}</div>
                <div>{item}</div>
                <div>{item}</div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default connect()(Message);
