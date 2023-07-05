<template>
  <swiper>
      <!-- ESlint限制，必须加上绑定key??? -->
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <!-- 为了获取到tabControl的offsetTop属性：监听轮播图的加载 -->
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  // 父传banners给子组件
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 记录轮播图加载状态，初始为未加载
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // 如果你直接用once，那只是让主页调用了一次该事件的回调，可是子组件还是发出了四次
      // 只需要向父组件发送一次事件即可，不需要每张轮播图加载完就发送
      if (!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style>

</style>