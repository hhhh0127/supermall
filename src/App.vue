<template>
  <div id="app">
    <router-view/>
    <!-- <home></home> -->
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
// import Home from 'views/home/Home'

export default {
  name: 'App',
  components: {
    MainTabBar,
    // Home
  }
}
</script>

<style>
  @import './assets/css/base.css'
</style>
