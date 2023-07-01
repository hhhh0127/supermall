<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    // backClick() {
    //   // 1. 可以使用父子组件通信解决（监听div的点击），较麻烦  2. 监听组件的点击，组件不能直接监听点击，需要加上修饰符.native
    //   // this.$emit('backClick')
    // }
  }
};
</script>

<style>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
