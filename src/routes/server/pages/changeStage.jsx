import React, {useEffect, useState} from 'react'
import {connect} from "dva";
import {createForm} from "rc-form";
import {Button, Card, Flex, TextareaItem, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import {routerRedux} from "dva/router";
import {changeOrderStage} from "../../../services/order";

const ChangeStage = (props) => {
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
    <div>
      <div style={{padding: '1rem',margin: '1rem',background:'#ffffff', borderRadius:'0.5rem'}}>
        <p>这里是注意事项</p>
        <p>这里是注意事项</p>
        <p>这里是注意事项</p>
        <p>这里是注意事项</p>
      </div>
      <Card full>
        <Card.Header
          title="状态流程确认"
          extra={<span>切换流程为{nextStage}</span>}
        />
        <Card.Body>
          <div>这里放目前的工单详情</div>
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


export default connect()(componentConnectForm)
