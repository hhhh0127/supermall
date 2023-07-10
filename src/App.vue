<template>
  <div id="app">
    <!-- 因为keep-alive了，所以不会销毁，再次进来的时候就不会执行created方法了，不过会执行actived方法 -->
    <!-- 那么detail页面就一直没有变化，所以不需要把detail保持活跃，需要它销毁，，需要设置exclude="Detail" -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
  @import './assets/css/base.css'
</style>
