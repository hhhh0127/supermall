import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload 新添加的商品
      // 数组常用方法 push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid;
      });

      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品')
      }
    });
  },
};
