import React, {useEffect} from 'react'
import {routerRedux} from "dva/router";
import {connect} from "dva";
import {Button, Modal, Toast, WingBlank} from "antd-mobile";
import {changePassWord} from "../../services/user";
import Cookies from 'js-cookie'
import styles from './personal.less'
import user from "../../models/user";
import {sexTransToFrontend, skillListToFrontend, timeTransToFrontend} from "../../utils/transformUtils";

const prompt = Modal.prompt;

const Personal = (props) => {
  const {dispatch} = props;
  useEffect(() => {
    // 初始化数据
    dispatch({type: 'user/updateUserData'})
  }, [])

  // 退出登录
  const logOut = () => {
    // 将登录状态切换回未登录
    props.dispatch({type: 'user/setIsLogin', isLogin: false})
    props.dispatch(routerRedux.push('/login'))
    const {remove} = Cookies;
    remove('userType', '')
    remove('token', '')
  }

  // 修改密码模态框提交
  const modifyPasswordSubmit = async (pw) => {
    console.log(pw)
    const success = await changePassWord({password: pw + ''})
    console.log(success)
    if (success.code === 200) {
      Toast.success('修改密码成功，即将跳转到登录页面，请重新登录！', 2, () => {
        logOut();
      })
    }
  }
  const sexMap = ['', '男', '女']
  const userTypeMap = ['', '住户', '物业员工']
  const stateMap = ['', '休息中', '上班中']
  const {userData} = props;

  return (
    <div className={styles.personalBox}>
      <div className={styles.userInfoBox}>
        <div className={styles.name}>{userData.name}</div>
        <div className={styles.otherInfo}>
          {`${sexMap[userData.sex]} | ${userTypeMap[userData.user_type]}`}
          {userData.user_type === 2 && ' | ' + stateMap[userData.state]}
        </div>
        <div className={styles.otherInfo}>
          {`身份证：${(userData.id_code + '').slice(0, 4)}**********${(userData.id_code + '').slice(14, 18)}`}
          {/*{`身份证：${userData.id_code}`}*/}
        </div>
        <div className={styles.otherInfo}>
          {`微信号：${userData.wechat}`}
        </div>
        <div className={styles.otherInfo}>
          {`手机号：${userData.phone}`}
        </div>
        <div className={styles.otherInfo}>
          {`生日：${timeTransToFrontend(userData.birthday + '')}`}
        </div>
        {
          userData.user_type === 1 && (
            <>
              <div className={styles.otherInfo}>家庭人口数：{userData.num}</div>
            </>
          )}
        {
          userData.user_type === 2 && (
            <>
              <div className={styles.otherInfo}>
                技能：{skillListToFrontend(userData.skills)}
              </div>
            </>
          )
        }

      </div>

      <WingBlank size={"sm"}>
        <Button
          onClick={() => prompt(
            '修改密码',
            'You can custom buttons',
            [
              {text: '取消'},
              {text: '提交', onPress: password => modifyPasswordSubmit(password)},
            ],
            'secure-text',
          )
          }
          className={styles.resetPw}
        >
          修改密码
        </Button>
        <Button onClick={logOut} type='warning'>退出登录</Button>
      </WingBlank>

    </div>
  )
}

const mapStateWithProps = (state) => {
  return {
    userData: state.user.userData
  }
}

export default connect(mapStateWithProps)(Personal);
