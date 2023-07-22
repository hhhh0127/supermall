<template>
  <div class="cart-list">
    <scroll class="content">
      <!-- scroll使用需要用一个根元素，并且只有一个根元素 -->
      <div>
        <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item>
      </div>
      
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem.vue';

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>
