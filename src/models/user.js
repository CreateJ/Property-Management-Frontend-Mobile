import {getUserData} from "../services/user";
import {Toast} from "antd-mobile";
import {routerRedux} from "dva/router";

const initState = {
  userType: 1,
  isLogin: false,
  userData: {},
}


export default {

  namespace: 'user',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *updateUserData(_,{put, call}){
      const response = yield call(getUserData)
      console.log(response)
      if(response.code === 200){
        yield put({type:'setUserData',payload: response.data.user})
      }else {
        Toast.fail('更新用户信息失败,请重新登录',1, ()=>{
          put(routerRedux.push('/login'))
        });
      }
    }
  },

  reducers: {
    setUserType(state, payload){
      const _state = JSON.parse(JSON.stringify(state));
      _state.userType = payload.userType;
      return _state
    },
    setIsLogin(state,payload){
      const _state = JSON.parse(JSON.stringify(state));
      console.log('已登录,userPage', )
      _state.isLogin = payload.isLogin;
      return _state
    },
    setUserData(state, {payload}){
      const _state = JSON.parse(JSON.stringify(state));
      _state.userData = payload;
      console.log(_state)
      return _state;
    }
  },

};
