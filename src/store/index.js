import Vue from "vue";
import Vuex from "vuex";

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      // payload 新添加的商品
      // 数组常用方法 push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      let oldProduct = state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1;
        state.cartList.push(payload)
      }
      
    }
  }
})

// 3.挂载到Vue实例上
export default store