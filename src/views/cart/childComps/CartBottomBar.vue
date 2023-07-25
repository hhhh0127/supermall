<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-buttton" :is-checked="isSlectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter((item) => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2);
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    // 全选需要自己在mutations中自己写两个方法,不然无法跟踪
    isSlectAll() {
      // if (this.cartList.length === 0) {
      //   return false;
      // }
      // return !this.cartList.find(item => !item.checked);
      // return this.cartList.every(item => item.isChecked);

      return this.cartList.length !== 0 && this.cartList.every(item => item.checked)
    }
  },
  methods: {
    checkClick() {
      // if (this.isSlectAll) {
      //   this.cartList.forEach(item => item.checked = false);
      // } else {
      //   this.cartList.forEach(item => item.checked = true);
      // }

      this.cartList.forEach(item => item.checked = !this.isSlectAll)
    },
    calcClick() {
      if (!this.isSlectAll) {
        
      }
    }
  }
};
</script>

CheckButton
<style scoped>
/* 给父元素设置line-height是影响子内容的 */
/* checkButton会继承这个属性，就会被影响布局 */
.bottom-bar {
  /* 改变布局的放这里 */
  position: relative;
  display: flex;

  /* 盒子模型的东西放这里 */
  height: 40px;
  line-height: 40px;

  /* 颜色其他样式放这里 */
  background-color: #eee;
  font-size: 14px;
  
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
  
}

.check-button {
  width: 20px;
  height: 20px;
  /* 把继承的line-height=40px给覆盖掉 */
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: var(--color-high-text);
  text-align: center;
}
</style>
