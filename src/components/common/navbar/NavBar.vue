<template>
  <!-- id最好唯一 -->
  <!-- 不用id，因为导航很多页面都有，使用class -->
  <div class="nav-bar">
    <!-- 将插槽用div包裹起来，便于设计样式 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    /* line-height属性设置的行高也就是定义的两行文字基线之间的距离，注意是文字的基线 */
    /* 如果没有文字的话就称不开空间，需要添加文字或者其他内容 */
    line-height: 44px;
    height: 44px;
    text-align: center;
    /* 添加阴影 */
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }

  .left, .right {
    width: 60px;
  }

  .center {
    /* 使得中间的插件占据剩余的空间 */
    flex: 1;
    /* background-color: blue; */
  }
</style>