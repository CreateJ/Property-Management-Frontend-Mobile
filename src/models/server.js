const initState = {
  currentServer: {}
}


export default {

  namespace: 'server',

  state: initState,

  subscriptions: {},

  effects: {},

  reducers: {
    setCurrentServer(state, {payload}) {
      const _state = JSON.parse(JSON.stringify(state))
      _state.currentServer = payload.data;
      return _state
    },
  }
}
