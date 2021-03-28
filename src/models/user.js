const initState = {
  userType: 'household',
  isLogin: false,
}


export default {

  namespace: 'user',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {

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
    }
  },

};
