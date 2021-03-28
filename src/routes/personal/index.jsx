import React from 'react'
import {Link, routerRedux} from "dva/router";
import {connect} from "dva";
import cookieUtil from '@/utils/cookie'

const Personal = (props) => {
  const logOut = () => {
    // 将登录状态切换回未登录
    props.dispatch({type:'user/setIsLogin', isLogin: false})
    props.dispatch(routerRedux.push('/login'))
    cookieUtil.setCookie('userType','')
    cookieUtil.setCookie('token','')
  }
  return (
    <div>
      <h1 style={{margin:0}}>个人信息页面</h1>
      <button onClick={logOut}>退出登录</button>
    </div>
  )
}

export default connect()(Personal);
