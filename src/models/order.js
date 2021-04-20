import {getOrderInfo} from "../services/order";

const initState = {
  currentOrder: {}
}


export default {

  namespace: 'order',

  state: initState,

  subscriptions: {},

  effects: {
    * updateCurrentOrder({payload}, {put, call}) {
      const success = yield call(getOrderInfo, payload.order_id)
      yield put({
          type: 'setCurrentOrder',
          payload: {
            order: success.data.order
          }
        }
      )
    }
  },

  reducers: {
    setCurrentOrder(state, {payload}) {
      const _order = JSON.parse(JSON.stringify(payload.order))
      _order.order_stage = _order.order_stage.reverse()
      return {...state, currentOrder:_order}
    }
  },

};
