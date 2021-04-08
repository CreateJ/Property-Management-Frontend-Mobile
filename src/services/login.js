import request from "../utils/request";

export const login = async(params) => {
  return request('/user/login',{
    method: 'POST',
    data: params
  })
}
