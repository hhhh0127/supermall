import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    // 加入购物车，商品的checked属性就设置为true
    payload.checked = true
    state.cartList.push(payload)
  }
}