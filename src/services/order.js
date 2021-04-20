import request from "../utils/request";

export function createOrder(params){
  return request('/order/create',{
    method: 'POST',
    data: params
  })
}

export const getOrderListData = () => {
  return request('/user/order')
}

export function getOrderInfo(params){
  return request(`/order/${params}`)
}

export function changeOrderStage(params){
  const {order_id, stage, note} = params
  return request(`/order/${order_id}`, {
    method: 'POST',
    data: {
      stage,
      note
    }
  })
}

export function getEmergencyOrder(){
  return request('/order/emergency')
}

export function grabEmergencyOrder(params){
  const { id, note } = params;
  return request(`/order/emergency/${id}`,{
    method: 'PUT',
    data: {note:note}
  })
}


export function evaluation(params){
  return request(`/order/evaluation/${params.order_id}`, {
    method: 'POST',
    data: params
  })
}
