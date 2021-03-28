import React, {useEffect, useState} from 'react';
import styles from './tabBar.less'
import {TabBar} from "antd-mobile";
import {routerRedux} from "dva/router";
import {connect} from "dva";


const TabBarCom = (props) => {
  const [selectIcon, setSelectIcon] = useState("welcome");
  useEffect(()=>{

  })
  // tab列表数据
  const tabColumn = [
    {
      title: '首页',
      key: 'welcome',
      Url: require('../../assets/tabBar/home.svg'),
      selectedUrl: require('../../assets/tabBar/home_.svg'),
    },{
      title: '消息',
      key: 'message',
      Url: require('../../assets/tabBar/message.svg'),
      selectedUrl: require('../../assets/tabBar/message_.svg'),
    },
    {
      title: '服务',
      key: 'server',
      Url: require('../../assets/tabBar/order.svg'),
      selectedUrl: require('../../assets/tabBar/order_.svg'),
    },
    {
      title: '个人',
      key: 'personal',
      Url: require('../../assets/tabBar/person.svg'),
      selectedUrl: require('../../assets/tabBar/person_.svg'),
    }
  ];


  const onPressIcon = (item) =>{
    setSelectIcon(item.key)
    new Promise((resolve => {
      props.dispatch(routerRedux.push(`/${item.key}`))
      resolve();
    })).then(_=>{console.log(props.history.location.pathname,'tabBar')})
    // console.log(props)
  }


  return (
    <div className={styles.tabBarContainer} style={props.isLogin ? {visibility:'visible'}:{visibility:'hidden'}}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        noRenderContent={true}
        hidden={false}
        className={styles.tabBarCom}
      >
        {
          tabColumn.map((item) => {
            return (
              <TabBar.Item
                title={item.title}
                key={item.key}
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url('${item.Url}') center center /  21px 21px no-repeat`
                }}

                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${item.selectedUrl}) center center /  21px 21px no-repeat`
                }}
                />
                }
                selected={selectIcon === item.key}
                // badge={1}
                onPress={() => {
                  onPressIcon(item)
                }}
                data-seed="logId"

              >
              </TabBar.Item>
            )
          })
        }
      </TabBar>
    </div>
  )
}

const mapStateToProps=(state)=>{
  return {
    isLogin : state.user.isLogin
  }
}

export default connect(mapStateToProps)(TabBarCom);
