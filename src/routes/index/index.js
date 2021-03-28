import React, {useEffect} from 'react';
import {connect} from 'dva';
import styles from './index.less';
import {routerRedux} from 'dva/router'
import {Route, Switch} from 'dva/router';
import ServerPage from '../server';
import Welcome from "../welcome";
import Personal from "../personal";
import Message from "../message";
import PublishOrder from "../publish";
import TabBarCom from '@/components/tabBar/index'
import ServerItemInfo from "@/routes/server/components/serverItemInfo";
import Login from '../login'
import Problem from "../problem";
import cookieUtil from '@/utils/cookie'


function Index(props) {
  useEffect(()=>{
    let token = cookieUtil.getCookie("token");
    let userType = cookieUtil.getCookie("userType");
    // 同步到redux中
    if(token !== '' && userType !==''){
      props.dispatch({type:'user/setUserType', userType: userType})
      props.dispatch({type:'user/setIsLogin', isLogin: true})
      props.dispatch(routerRedux.push('/welcome'))
    }else {
      props.dispatch(routerRedux.push('/login'))
    }
  },[])

  return (
    <div className={styles.outerMostContainer}>
      <Switch>
        <Route path='/server' exact component={ServerPage} history={props.history}></Route>
        <Route path='/welcome' exact component={Welcome}></Route>
        <Route path='/personal' exact component={Personal}></Route>
        <Route path='/serverInfo/:serverId' exact component={ServerItemInfo} history={props.history}></Route>
        <Route path='/message' exact component={Message} history={props.history}></Route>
        <Route path='/publish/:emergency' exact component={PublishOrder} history={props.history}></Route>
        <Route path='/login' exact component={Login} history={props.history}></Route>
        <Route path='/problem' exact component={Problem} history={props.history}></Route>
      </Switch>
      <TabBarCom history={props.history}></TabBarCom>
    </div>
  );
}

Index.propTypes = {};


export default connect()(Index);
