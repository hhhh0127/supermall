<template>
  <div id="tab-bar">
    <slot></slot>

  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /* fixed是特殊版的absolute，fixed元素总是相对于body定位的 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 对象选择器 {box-shadow:X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色 投影方式 } */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}


</style>
