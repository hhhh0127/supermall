<template>
  <!-- html中驼峰命名要用-连接 -->
  <tab-bar>
    <!-- 父传子：给子组件传递数据path -->
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
        alt=""
      />
      <!-- img是行内块标签，一行中如有剩余空间，行内块标签允许同其他 行内/行内块 标签公用一行 -->
      <!-- 我的这种纯文字是行内标签，这时候img和文字会出现在一行上，此时需要包裹一层div，使得变为块标签，独占一行 -->
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入组件
// import导入的可以直接使用路径取的别名，但是如果在src属性中，就需要在前面加~
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: 'MainTabBar',
  // 注册组件
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style></style>
