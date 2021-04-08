import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import {List, Picker, TextareaItem, Toast, WingBlank} from "antd-mobile";
import styles from './publish.less'
import {createForm} from 'rc-form';
import serverTypeList from "@/Map/serverTypeMap";
import {createOrder} from "../../services/order";

const PublishOrder = (props) => {
  const [emergency, setEmergency] = useState('1');
  const [houseList, setHouseList] = useState([{value: '101101'}]);
  useEffect(() => {
    console.log(props)
    const pathname = props.history.location.pathname;
    const isEmergency = pathname.split('/')[pathname.split('/').length - 1]
    if (isEmergency === '1') {
      console.log('正在填写普通工单')
    } else {
      console.log('正在填写紧急工单')
    }
    setEmergency(isEmergency)

    // 获取住户所拥有的住宅
    const temp_houseList = props.userData.house_id.map((item) => {
      let tmp = {label: `${item[0]}单元${item[1] + item[2]}栋${item[3] + item[4] + item[5]}号`, value: item}
      return tmp
    })
    // 填充到list中
    setHouseList(temp_houseList)
  }, [])

  const publishOrder = async () => {
    let params = {};
    props.form.validateFields(async (error, values) => {
      if (!error) {
        params.type = values.serverType[1];
        params.house_id = parseInt(values.house_id[0], 0);
        params.emergency = parseInt(emergency, 0);
        params.note = values.note
        // 这里要添加任务的level，通过map映射获取
        console.log(params, '发布工单的参数')
        const success = await createOrder(params);
        console.log(success)
        if(success.code === 200){
          Toast.success('发布工单成功，即将返回首页，您可以在服务页看到您发布的工单')
        }else {
          Toast.fail('发布失败，暂未匹配到员工！',1)
        }
      } else {
        console.log('error', error, values);
        Toast.fail('发布失败，暂未匹配到员工！',1)
      }
    });
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
            {...getFieldProps('house_id', {
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
            onBlur={(e) => {}}
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

const stateMapToProps = (state) => {
  return {
    userData: state.user.userData,
  }
}

export default connect(stateMapToProps)(componentConnectForm);
