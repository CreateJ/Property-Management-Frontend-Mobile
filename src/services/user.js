import request from "../utils/request";

export const getUserData = () => {
  return request('/user/message')
}

export const changeCheckIn = () => {
  return request('/user/click',{
    method: 'PUT'
  })
}

export const changePassWord = (params) => {
  return request('/user/personal',{
    method: 'POST',
    data: params,
  })
}

export const resetPassword = (params) => {
  return request('/user/reset',{
    method: 'PUT',
    data: params,
  })
}


export const feedBack = (params) => {
  return request('/feedback/create', {
    method: 'POST',
    data: params
  })
}
