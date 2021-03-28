import request from "../utils/request";

export const getOrderList = () =>{
  return request('api/get_server')
}
