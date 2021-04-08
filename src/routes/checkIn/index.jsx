import React from 'react'
import {connect} from "dva";
import {changeCheckIn} from "../../services/user";
import styles from './checkIn.less'
import {ArrowLeftOutlined} from "@ant-design/icons";
import {routerRedux} from "dva/router";

const CheckIn = (props) => {
  const {userState, dispatch} = props;

  const onClickBtn = async() => {
    const response = await changeCheckIn();
    console.log(response)
    if(response.code === 200){
      dispatch({type: 'user/updateUserData'})
    }
  }
  const handleBack = () => {
    props.dispatch(routerRedux.push('/welcome'))
  }

  return (
    <div className={styles.checkInContainer}>
      <div className={styles.title}>打卡状态</div>
      <div className={styles.btn} onClick={onClickBtn}>
        <div className={styles.state}>{userState === 2 ? '上班中' : '休息中'}</div>
      </div>
      <div className={styles.back} onClick={handleBack}><ArrowLeftOutlined/></div>
    </div>
  )
}

const mapStateToProps = (state) =>
{
  return {
    userState: state.user.userData.state
  }
}

export default connect(mapStateToProps)(CheckIn);
