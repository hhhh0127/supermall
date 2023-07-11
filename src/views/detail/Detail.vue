<template>
  <div id="detail">
    <detail-nav-bar class="detail-dev"></detail-nav-bar>
    <!-- scroll组件的使用：将需要滚动的包裹在scroll组件里面 -->
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="itemParams"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <!-- 组件的复用，这里推荐使用了goods-list这个组件 -->
      <goods-list :goods="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from '../../components/content/goods/GoodsList.vue';

import Scroll from "components/common/scroll/Scroll";

// 网络请求相关
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
import {itemListenerMixin} from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  // data主要是为了保存想要的数据
  data() {
    return {
      iid: null,
      topImages: [],
      // 这里要为{}空对象，而不能为null，如果是null，则Object.keys(goods)会报错，null没有keys
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: {},
      // 被混入 mixin
      // itemImageListener: null
    };
  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.id;

    // 2.根据id请求数据，返回的是Promise对象
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // res 是比较复杂的数据，需要抽取对应的数据显示
      // 1.获取顶部的图片轮播数据
      const data = res.result;

      // 2.获取轮播图信息
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);

      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.获取店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      // 用类包装数据，推荐写法
      // this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 直接使用
      this.itemParams = data.itemParams

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
        // console.log('commnet', this.commentInfo);
      }

    });
    
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list
    })
  },
  mounted() {
    // 被混入了
    // const refresh = debounce(this.$refs.scroll.refresh, 800);
    // this.itemImageListener = () => {
      // refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  // Detail被排除在keep-alive之外了，所以没有缓存，也就不会执行activated和deactivated两个钩子
  // deactivated() {

  // }
  // 所以需要在destroyed中取消事件的监听
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
};
</script>

<!-- 注意要加上scoped，就是该样式只属于当前这个组件，实现组件私有化 -->
<!-- 防止将样式应用到其他子组件中的同名样式中去，而导致当前样式失效，但也存在弊端，不好修改公共组件的样式 -->
<style scoped>
/* 通过设计层级覆盖住tabBar */
#detail {
  position: relative;
  /* 层级的使用需要定位 */
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-dev {
  /* 尽量使用相对定位进行微调，因为相对定位还在那个位置上，而不是使用绝对位置或者fixed */
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
