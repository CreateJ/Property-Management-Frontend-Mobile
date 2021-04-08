import React, {useState} from 'react'
import styles from "../login.less";
import {Flex, Toast} from "antd-mobile";
import {routerRedux} from "dva/router";
import {connect} from "dva";
import {resetPassword} from "../../../services/user";

const Reset = (props) => {
  const [phone,setPhone] = useState('');
  const [idCode, setIdCode] = useState('');
  const [ut, setUt] = useState('')

  const clickRadio = e => {
    setUt(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (phone === '') {
      Toast.fail('请输入手机号', 1)
      return
    }
    if (idCode === '') {
      Toast.fail('请输入身份证', 1)
      return
    }
    if (ut === '') {
      Toast.fail('请选择登录身份', 1)
      return
    }
    const params = {phone: phone, id_code: idCode, user_type: parseInt(ut, 0)}
    console.log(params)
    const success = await resetPassword(params);
    console.log(success, 'resetPassword');
    if(success.code === 200) {
      Toast.success('重置密码成功，即将返回登录页，请使用初始密码登录！',2,()=>{
        returnToLogin()
      })
    }else {
      Toast.fail('手机号和身份证号不对应哦，请重新检查',2)
      return
    }
  }
  const returnToLogin = () => {
    props.dispatch(routerRedux.push('/login'))
  }
  return (
    <Flex direction='column' className={styles.loginContainer}>
      <Flex.Item className={styles.item}>
        <div className={styles.title}>重置密码</div>
      </Flex.Item>
      <Flex.Item className={styles.item}>
        <form onSubmit={e => handleSubmit(e)} className={styles.loginForm} name='login'>
          {/*<label>账号:</label>*/}
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
            }}
            className={styles.text}
            placeholder='手机号'
          />
          <br/>
          {/*<label>密码:</label>*/}
          <input
            type="text"
            value={idCode}
            onChange={(e) => {
              setIdCode(e.target.value)
            }}
            className={styles.text}
            placeholder='身份证号码'
          />
          <br/>
          <span>登录类型: </span>
          <input
            type="radio"
            value={1}
            name='userType'
            onChange={(e) => {
              clickRadio(e)
            }}
            className={styles.loginRadio}/>
          <label htmlFor='household'>住户</label>
          <input
            type="radio"
            value={2}
            name='userType'
            onChange={(e) => {
              clickRadio(e)
            }}
            className={styles.loginRadio}/>
          <label htmlFor='employee'>员工</label>
          <br/>
          <Flex>
            <Flex.Item>
              <input type="button" onClick={returnToLogin} className={styles.loginBtn} value='返回登录页'/>
            </Flex.Item>
            <Flex.Item>
              <input type="submit" className={styles.loginBtn} value='提交'/>
            </Flex.Item>
          </Flex>
        </form>
      </Flex.Item>
      <Flex.Item>
      </Flex.Item>
    </Flex>
  )
}

export default connect()(Reset)
