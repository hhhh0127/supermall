import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions"
import getters from "./getters";

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一点
  // 分开写是为了便于跟踪
  mutations: mutations,
  actions: actions,
  getters: getters,
})

// 3.挂载到Vue实例上
export default store