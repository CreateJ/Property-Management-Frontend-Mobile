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
import Cookies from 'js-cookie'
import CheckIn from "../checkIn";
import Reset from "../login/reset";
import ChangeStage from '../server/pages/changeStage'
import Evaluation from '../server/pages/evaluation'
import GrabOrder from '../grabOrder'


function Index(props) {
  useEffect( () => {
    const { get } = Cookies
    const token = get('token')
    const userType = parseInt(get('userType'), 0)
    // 同步到redux中
    if(token){
      props.dispatch({type: 'user/updateUserData'}).then(res=>{
        console.log('登录成功', 'index')
        props.dispatch({type:'user/setUserType', userType: userType})
        props.dispatch({type:'user/setIsLogin', isLogin: true})
        props.dispatch(routerRedux.push('/welcome'))
      }).catch(err=>{
        props.dispatch(routerRedux.push('/login'))
      })
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
        <Route path='/checkIn' exact component={CheckIn} history={props.history}></Route>
        <Route path='/reset' exact component={Reset} history={props.history}></Route>
        <Route path='/change/:orderId/:nextStage' exact component={ChangeStage} history={props.history}></Route>
        <Route path='/evaluation/:orderId' exact component={Evaluation} history={props.history}></Route>
        <Route path='/grabOrder' exact component={GrabOrder} history={props.history}></Route>
      </Switch>
      <TabBarCom history={props.history}></TabBarCom>
    </div>
  );
}

Index.propTypes = {};


export default connect()(Index);
