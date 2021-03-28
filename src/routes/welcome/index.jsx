import React from 'react'
import {routerRedux} from "dva/router";
import {connect} from 'dva'
import styles from './welcome.less'
import {Flex} from "antd-mobile";
import household from "@/Map/householdMap";
import employee from "@/Map/employeeMap";

const Welcome = (props) => {

  const clickApp = (item) => {
    props.dispatch(routerRedux.push(item.route))
  }
  // 通过输入的字符串返回同名对象
  const getAppslist = (str) => {
    switch(str){
      case 'household':return household;
      case 'employee':return employee;
      default: return household;
    }

  }

  return (
    <div style={{height: "100%"}}>
      <div className={styles.banner}>欢迎使用</div>
      <div style={{padding: '0.5rem 0.5rem'}}>
        <Flex>
          {
            // 通过model user获取到当前系统员工登录还是住户登录
            // 通过映射表获取不同的应用列表，进行渲染
            props.userType && getAppslist(props.userType).appsList.map((item) => {
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
    userType: state.user.userType
  }
}

// export default connect(mapStateToProps)(Welcome);
export default connect(mapStateToProps)(Welcome);
