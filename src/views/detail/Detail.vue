<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-dev"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <!-- scroll组件的使用：将需要滚动的包裹在scroll组件里面 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 属性需要用-连接驼峰，因为他不区分大小写 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="itemParams"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <!-- 组件的复用，这里推荐使用了goods-list这个组件 -->
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <!-- 监听子组件的addCart，也就是点击子组件的点击 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll";

// 网络请求相关
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "@/common/utils";

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
    DetailBottomBar,
  },
  // 回到顶部也加入混入
  mixins: [itemListenerMixin, backTopMixin],
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
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // 被混入 mixin
      // itemImageListener: null
    };
  },
  // created是不会进行dom渲染的，如果想拿到数据或者实时更新这个数据的话使用nextTick()
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
      this.itemParams = data.itemParams;

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log('commnet', this.commentInfo);
      }

      // 第一次获取，值不对
      // 原因：this.$refs.params.$el没有渲染
      // this.themeTopYs = [];

      // this.themeTopYs.push(0);
      // // offsetTop是负值，需要减去44
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);

      // // 渲染完成之后会回调nextTick函数
      // this.$nextTick(() => {
      //   // 2.第二次获取：值不对
      //   // 原因：图片没有计算在内
      //   // 根据最新的数据，对应的DOM已经是被渲染出来
      //   // 但是图片依然没有加载完
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // });
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // 相当于添加一个哨兵
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  // 在mounted中，这时，子组件有可能还没有加载完成
  mounted() {
    // 被混入了
    // const refresh = debounce(this.$refs.scroll.refresh, 800);
    // this.itemImageListener = () => {
    // refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  updated() {},
  // Detail被排除在keep-alive之外了，所以没有缓存，也就不会执行activated和deactivated两个钩子
  // deactivated() {

  // }
  // 所以需要在destroyed中取消事件的监听
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      // 2.positionY和主题中值进行对比

      for (let i = 0; i < length - 1; i++) {
        // 普通做法
        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
        // hack做法
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3.是否回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 1.购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.decs;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      console.log(product);
      // 2.商品添加到购物车，放入Vuex中管理
      // 不要这样做，任何修改state都要在mutations中
      // this.$store.cartList.push(product)
      console.log(this.$store);
      // this.$store.commit('addCart', product);
      this.$store.dispatch('addCart', product)

    }
  },
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
