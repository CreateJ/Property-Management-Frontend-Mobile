import React, {useEffect} from 'react'
import {routerRedux} from "dva/router";
import {connect} from "dva";
import {Button, List, Modal, Toast, WingBlank} from "antd-mobile";
import {changePassWord, feedBack} from "../../services/user";
import Cookies from 'js-cookie'
import styles from './personal.less'
import user from "../../models/user";
import {sexTransToFrontend, skillListToFrontend, timeTransToFrontend} from "../../utils/transformUtils";

const prompt = Modal.prompt;
const Item = List.Item;

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
    const success = await changePassWord({password: pw + ''})
    if (success.code === 200) {
      Toast.success('修改密码成功，即将跳转到登录页面，请重新登录！', 2, () => {
        logOut();
      })
    }
  }

  const submitFeedBack = async (text) => {
    const success = await feedBack({ content: text })
    console.log(success)
    if (success.code === 200) {
      Toast.success('提交反馈成功', 2, )
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

      <List>
        <Item arrow="horizontal" onClick={
          () => prompt(
            '修改密码',
            '请输入六位以上的密码',
            [
              {text: '取消'},
              {text: '提交', onPress: password => modifyPasswordSubmit(password)},
            ],
            'secure-text',
          )}>
          修改密码
        </Item>
        <Item arrow="horizontal" onClick={
          () => prompt(
            '填写反馈',
            '我们会认真听取您的意见',
            [
              {text: '取消'},
              {text: '提交', onPress: text => submitFeedBack(text)},
            ],
            'text',
          )}>
          填写反馈
        </Item>
      </List>

      <WingBlank size={"sm"}>
        {/*<Button*/}
        {/*  onClick={}*/}
        {/*  className={styles.resetPw}*/}
        {/*>*/}
        {/*  修改密码*/}
        {/*</Button>*/}
        <Button style={{marginTop:'1rem'}} onClick={logOut} type='warning'>退出登录</Button>
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
