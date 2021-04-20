import React, {useEffect} from 'react'
import {routerRedux} from "dva/router";
import {connect} from 'dva'
import styles from './welcome.less'
import {Flex} from "antd-mobile";
import household from "@/Map/householdMap";
import employee from "@/Map/employeeMap";
import Banner from "@/routes/welcome/components/banner"
const Welcome = (props) => {
  useEffect(()=>{
    props.dispatch({type:'user/updateUserData'})
  },[])

  const clickApp = (item) => {
    props.dispatch(routerRedux.push(item.route))
  }
  // 通过输入的字符串返回同名对象
  const getAppList = (ut) => {
    switch(ut){
      case 1 : return household;
      case 2 : return employee;
      default: return household;
    }

  }

  return (
    <div style={{height: "100%"}}>
      <div className={styles.banner}>
        <Banner></Banner>
      </div>
      <div style={{padding: '0.5rem 0.5rem'}}>
        <Flex className={styles.btnGroup}>
          {
            // 通过model user获取到当前系统员工登录还是住户登录
            // 通过映射表获取不同的应用列表，进行渲染
            props.userType && getAppList(props.userType).appsList.map((item) => {
              return (
                <Flex.Item key={item.key} onClick={() => {
                  clickApp(item)
                }}>
                  <div className={styles.btnBox}>
                    <div className={styles.white}>
                      <div className={styles.btnImg} style={{background: `url('${item.url}') center center / 80% 80% no-repeat`}}></div>
                      {/*<img src={item.url} className={styles.btnImg} alt=""/>*/}
                    </div>
                    {item.appName}
                  </div>
                </Flex.Item>
              )
            })
          }
        </Flex>
      </div>

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    userType: state.user.userData.user_type
  }
}
export default connect(mapStateToProps)(Welcome);
