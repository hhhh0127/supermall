<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 每个tab-bar-item中的图标和图片不同，不能写死，使用插槽具名slot -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
  
    <!-- isActive是true时，动态绑定active这个类，不是则不绑定 -->
    <!-- 插槽是直接被替换，在插槽上设置样式是没有用的 :class="{active: isActive}没用 -->
    <!-- 解决方法是外部嵌套一个div用来设置class -->
    <!-- <slot :class="{active: isActive}" name="item-text"></slot> -->

    <!-- <div :class="{active: isActive}">
      <slot name="item-text"></slot>
    </div> -->

    <!-- 封装，颜色外部传入 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" /> -->
    <!-- img是行内块标签，一行中如有剩余空间，行内块标签允许同其他 行内/行内块 标签公用一行 -->
    <!-- 我的这种纯文字是行内标签，这时候img和文字会出现在一行上，此时需要包裹一层div，使得变为块标签，独占一行 -->
    <!-- <div>我的</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 接受父组件传来的数据
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true,
      // 这样写path直接写死了，但是每一个item的path是不一样的，此时的path需要从外部的父组件传入，使用props
      // path: '/home'
    }
  },
  computed: {
    // 不确定的属性使用计算属性
    isActive() {
      // $route 中是最活跃的路由，拿到当前最活跃路由的path
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // 给活跃的item对应的颜色
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('itemClick');
      // catch(err => err) 解决重复点击相同路径重复的错误，这样有点问题
      // 使用if判断一下
      if (this.path !== this.$route.path)
        this.$router.replace(this.path)
    }
  }
};
</script>

<style>
.tab-bar-item {
  /* 
      flex属性是flex-grow、flex-shrink和flex-basis的简写，默认为0 1 auto，后两个属性可选、
      flex-grow 项目的放大比例
      flex-shrink 项目的缩小比例
      如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）
    */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: center;
  margin-top: 2px;
}

.active {
  color: red;
}
</style>
