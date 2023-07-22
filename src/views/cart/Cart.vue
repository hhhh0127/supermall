<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部的汇总 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }

    // 将vux中的getters，也就是store中的getters转化为计算属性
    // 两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: "cartLength",
      cartList: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart {
  /* 一个视口高度 */
  height: 100vh;
}
.nav-bar {
  background-color: var(--color--tint);
  /* color: #fff; */
  font-weight: 700;
}
</style>
