import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import {createForm} from "rc-form";
import {Button, Card, Flex, TextareaItem, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import {routerRedux} from "dva/router";
import {changeOrderStage} from "../../../services/order";
import styles from "../server.less";
import {typeTransToFrontend} from "../../../utils/transformUtils";

const ChangeStage = (props) => {
  const stageMap = ['', '已发布', '已确认', '进行中', '暂停中', '已终止', '已完成', '已评价']
  const {currentOrder} = props;
  const [orderId, setOrderId] = useState()
  const [nextStage, setNextStage] = useState()
  useEffect(() => {
    setOrderId(props.location.pathname.split('/')[2])
    setNextStage(props.location.pathname.split('/')[3])
  })

  const onFinish =async () => {
    // 发送修改请求
    const {form, dispatch} = props;
    console.log(form.getFieldValue('note'))
    const params = {
      note: form.getFieldValue('note'),
      stage: parseInt(nextStage, 0),
      order_id: orderId
    }
    const success = await changeOrderStage(params);
    if(success.code === 200){
      Toast.success('更新服务流程成功，即将跳转回服务详情页',1,()=>{
        dispatch(routerRedux.push('/serverInfo/' + orderId))
      })
    }else{
      Toast.fail('更新流程失败，如果有问题请拨打后台管理中心电话：xxxxx',1)
    }
  }

  const goBack = () =>{
    const {dispatch} = props;
    dispatch(routerRedux.push('/serverInfo/' + orderId));
  }

  const {getFieldProps} = props.form;
  return (
    <div className={styles.changeStageConatiner}>
      <div style={{padding: '1rem',margin: '1rem',background:'#ffffff', borderRadius:'0.5rem'}}>
        <h1>说明</h1>
        <div>1.普通工单会在系统中按先来后到的顺序排队。</div>
        <div>2.我们的员工会尽快确认订单。</div>
        <div>3.请在备注中写明家中有人的时间。</div>
        <div>4.若事态紧急，请返回主页选择紧急工单。</div>
        <div>5.物业电话: 123412341234。</div>
      </div>
      <Card full>
        <Card.Header
          title="状态流程确认"
          extra={<span>切换流程为{stageMap[nextStage]}</span>}
        />
        <Card.Body>
          <div>
            <div className={styles.title}>工单详情</div>
            <div>服务工单编号：{currentOrder.id}</div>
            <div>住户：{currentOrder.household_name}</div>
            <div>员工：{currentOrder.employee_name}</div>
            <div>工单类型：{currentOrder.type && typeTransToFrontend(currentOrder.type)}({currentOrder.emergency === 1 ? '不紧急':'紧急'})</div>
          </div>
        </Card.Body>
      </Card>
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


const componentConnectForm = createForm()(ChangeStage)

const mapStateToProps = (state) => {
  return {
    userType: state.user.userType,
    currentOrder: state.order.currentOrder,
  }
}

export default connect(mapStateToProps)(componentConnectForm)
