import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import {createForm} from "rc-form";
import {Button, Card, Flex, Picker, List, TextareaItem, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import {routerRedux} from "dva/router";
import {evaluation} from "../../../services/order";
import styles from "../server.less";
import {typeTransToFrontend} from "../../../utils/transformUtils";

const Evaluation = (props) => {
  const {currentOrder} = props;
  const [orderId, setOrderId] = useState()
  useEffect(() => {
    setOrderId(props.location.pathname.split('/')[2])
  })

  const evaluationMap = [
    {
      label: '不满意',
      value: 1,
    },
    {
      label: '不太满意',
      value: 2,
    },
    {
      label: '一般般',
      value: 3,
    },
    {
      label: '比较满意',
      value: 4,
    },
    {
      label: '非常满意',
      value: 5,
    },
  ]


  const onFinish = async () => {
    // 发送修改请求
    const {form, dispatch} = props;

    const params = {
      note: form.getFieldValue('note'),
      order_id: parseInt(orderId, 10),
      level: form.getFieldValue('level')[0],
      timely_score: form.getFieldValue('timely_score')[0],
    }
    console.log(params)
    const success = await evaluation(params);
    if (success.code === 200) {
      Toast.success('评价成功，即将跳转回服务详情页', 1, () => {
        dispatch(routerRedux.push('/serverInfo/' + orderId))
      })
    } else {
      Toast.fail('评价失败，请稍后重试', 1, () => {
        dispatch(routerRedux.push('/serverInfo/' + orderId))
      })
    }
  }

  const goBack = () => {
    const {dispatch} = props;
    dispatch(routerRedux.push('/serverInfo/' + orderId));
  }

  const {getFieldProps} = props.form;
  return (
    <div>
      <div style={{padding: '1rem', margin: '1rem', background: '#ffffff', borderRadius: '0.5rem'}}>
        <h1>说明</h1>
        <div>1.普通工单会在系统中按先来后到的顺序排队。</div>
        <div>2.我们的员工会尽快确认订单。</div>
        <div>3.请在备注中写明家中有人的时间。</div>
        <div>4.若事态紧急，请返回主页选择紧急工单。</div>
        <div>5.物业电话: 123412341234。</div>
      </div>
      <Card full>
        <Card.Header
          title="对物业服务进行评价"
        />
        <Card.Body>
          <div>
            <div className={styles.title}>工单详情</div>
            <div>服务工单编号：{currentOrder.id}</div>
            <div>住户：{currentOrder.household_name}</div>
            <div>员工：{currentOrder.employee_name}</div>
            <div>工单类型：{currentOrder.type && typeTransToFrontend(currentOrder.type)}({currentOrder.emergency === 1 ? '不紧急' : '紧急'})</div>
          </div>
        </Card.Body>
      </Card>
      <Picker data={evaluationMap} cols={1} {...getFieldProps('level')}>
        <List.Item arrow="horizontal">总评价</List.Item>
      </Picker>
      <Picker data={evaluationMap} cols={1} {...getFieldProps('timely_score')}>
        <List.Item arrow="horizontal">及时度</List.Item>
      </Picker>
      <TextareaItem
        {...getFieldProps('note', {
          initialValue: '',
        })}
        title={'备注'}
        rows={5}
        count={100}
        onBlur={(e) => {
        }}
        label={'备注'}
      />
      <WhiteSpace size="lg"/>
      <WingBlank>
        <Flex>
          <Flex.Item>
            <Button
              onClick={goBack}>
              返回上一页
            </Button>
          </Flex.Item>
          <Flex.Item>
            <Button
              type={"primary"}
              onClick={onFinish}>
              确认
            </Button>
          </Flex.Item>
        </Flex>
      </WingBlank>


    </div>
  )
}


const componentConnectForm = createForm()(Evaluation)
const mapStateToProps = (state) => {
  return {
    userType: state.user.userType,
    currentOrder: state.order.currentOrder,
  }
}

export default connect(mapStateToProps)(componentConnectForm)
