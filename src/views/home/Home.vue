<template>
  <!-- 首页是唯一的 所以设置id="home" -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 动态绑定banners，数据传递给子组件 -->
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
// 导入，按顺序和类别，比如组件导入按顺序放一块，网络相关放一块
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

import {getHomeMultidata} from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  // 组件创建完成后发送请求
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // 保存数据
      // 当前这个箭头函数的this往外找到的是created的this，created的this是当前Home组件对象
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: fff
  }
</style>