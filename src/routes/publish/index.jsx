import React, {useEffect, useState} from 'react'
import {Link, routerRedux} from "dva/router";
import {connect} from "dva";
import {List, Picker, TextareaItem, WingBlank} from "antd-mobile";
import styles from './publish.less'
import {createForm} from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';
import serverTypeList from "@/Map/serverTypeMap";

const PublishOrder = (props) => {
  const [emergency, setEmergency] = useState('0');
  const [houseList, setHouseList] = useState([{value: '101101'}]);
  useEffect(() => {
    const pathname = props.history.location.pathname;
    const isEmergency = pathname.split('/')[pathname.split('/').length - 1]
    if (isEmergency === '0') {
      console.log('正在填写普通工单')
    } else {
      console.log('正在填写紧急工单')
    }
    setEmergency(isEmergency)

    const temp_houseList = [];
    // 获取住户所拥有的住宅
    ['101101', '101102'].map((item) => {
      let tmp = {label: `${item[0]}单元${item[1] + item[2]}栋${item[3] + item[4] + item[5]}号`, value: item}
      temp_houseList.push(tmp);
    })
    // 填充到list中
    setHouseList(temp_houseList)

    console.log(props, 'publishPage')
  }, [])

  const publishOrder = () => {


    props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });

    // 在这里发送请求
    props.dispatch(routerRedux.push('/welcome'))
  }

  const {getFieldProps} = props.form;
  return (
    <div className={styles.publishContainer}>
      <WingBlank size='md' className={styles.inputGroup}>
        <h1>说明</h1>
        <div>1.普通工单会在系统中按先来后到的顺序排队。</div>
        <div>2.我们的员工会尽快确认订单。</div>
        <div>3.请在备注中写明家中有人的时间。</div>
        <div>4.若事态紧急，请返回主页选择紧急工单。</div>
        <div>5.物业电话: 123412341234。</div>
      </WingBlank>
      <WingBlank size='md' className={styles.inputGroup}>
        <List renderHeader={() => '请填写工单'}>
          <Picker
            extra="请选择"
            data={houseList}
            cols={1}
            title="请选择住宅"
            {...getFieldProps('householdId', {
              initialValue: [houseList[0].value],
            })}
            onOk={e => console.log('ok', e)}
            onDismiss={e => console.log('dismiss', e)}
          >
            <List.Item arrow="horizontal">住宅</List.Item>
          </Picker>
          <Picker
            extra="请选择"
            data={serverTypeList}
            title="请选择服务"
            {...getFieldProps('serverType', {
              initialValue: ['01', '01-1'],
            })}
            onOk={e => console.log('ok', e)}
            onDismiss={e => console.log('dismiss', e)}
          >
            <List.Item arrow="horizontal" className={styles.listItem}>服务类型</List.Item>
          </Picker>
          <TextareaItem
            {...getFieldProps('note', {
              initialValue: '',
            })}
            title={'备注'}
            rows={5}
            count={100}
            onBlur={(e) => {
              console.log(e)
            }}
          />
        </List>
        <div className={styles.btnBox}>
          <button onClick={publishOrder}>发布工单</button>
        </div>
      </WingBlank>
    </div>
  )
}
const componentConnectForm = createForm()(PublishOrder)

export default connect()(componentConnectForm);
