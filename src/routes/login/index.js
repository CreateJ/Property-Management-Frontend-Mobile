import React, {useState} from 'react'
import {routerRedux} from "dva/router";
import {connect} from "dva";
import {Flex, Toast} from "antd-mobile";
import styles from './login.less'
import cookieUtil from '@/utils/cookie'


const Login = (props) => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [ut, setUt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id === '') {
      Toast.fail('请输入账号', 1)
      return
    }
    if (pw === '') {
      Toast.fail('请输入密码', 1)
      return
    }
    if (ut === '') {
      Toast.fail('请选择登录身份', 1)
      return
    }
    console.log('id:' + id, 'pw:' + pw, 'userType:' + ut)
    // 发送请求
    new Promise((resolve, reject)=>{
      Toast.loading('验证账号密码中...',2)
      setTimeout(()=>{
        resolve({code:'200'})
      },2000)
    }).then(res=>{
      Toast.success('登录成功,当前身份为'+ut,1,()=>{
        cookieUtil.setCookie('token',id);
        cookieUtil.setCookie('userType',ut);
        // 同步到redux中
        props.dispatch({type:'user/setUserType', userType: ut})
        props.dispatch({type:'user/setIsLogin', isLogin: true})
        props.dispatch(routerRedux.push('/welcome'))
      })
    })
  }

  const clickRadio = e => {
    setUt(e.target.value)
  }

  return (
    <Flex direction='column' className={styles.loginContainer}>
      <Flex.Item className={styles.item}>
        <div className={styles.title}>智慧物业服务</div>
      </Flex.Item>
      <Flex.Item className={styles.item}>
        <form onSubmit={e => handleSubmit(e)} className={styles.loginForm} name='login'>
          {/*<label>账号:</label>*/}
          <input
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value)
            }}
            className={styles.text}
            placeholder='账号'
          />
          <br/>
          {/*<label>密码:</label>*/}
          <input
            type="text"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
            }}
            className={styles.text}
            placeholder='密码'
          />
          <br/>
          <span>登录类型: </span>
          <input
            type="radio"
            value='household'
            name='userType'
            onChange={(e) => {
              clickRadio(e)
            }}
            className={styles.loginRadio}/>
          <label htmlFor='household'>住户</label>
          <input
            type="radio"
            value='employee'
            name='userType'
            onChange={(e) => {
              clickRadio(e)
            }}
            className={styles.loginRadio}/>
          <label htmlFor='employee'>员工</label>
          <br/>
          <Flex>
            <Flex.Item>
              <input type="submit" className={styles.loginBtn} value='登录'/>
            </Flex.Item>
            <Flex.Item>
              <input type="button" className={styles.loginBtn} value='忘记密码'/>
            </Flex.Item>
          </Flex>
        </form>
      </Flex.Item>
      <Flex.Item>
      </Flex.Item>
    </Flex>

  )
}

export default connect()(Login);