<template>
  <!-- $ref/$children 获取子组件
    第一个是获取明确的那个子组件，使用this.$refs.refname，获取子组件children是获取所有的直接子组件，返回数组 -->
  <!-- ref也可以使用在普通的元素中，使用this.$refs.refname获取到元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
// import PullUp from "@better-scroll/pull-up";
// import observeDom from "@better-scroll/observeDom";
// BScroll.use(PullUp);

export default {
  name: 'Scorll',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // document.querySelector('.wrapper')查询到的不一定是需要的那个wrapper(存在同名的情况)
    // 使用this.$refs.wrapper获取
    // 这里取得时候用的this，说明只会取到这个组件内部的wrapper
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 监听类似div元素、span等是否被点击，button不用
      observeDom: true
    })
    }, 2000);

  },
  methods: {
    // ES6语法，可以传入默认值
    // 封装scrollTo，体现封装的思想
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style>
  
</style>