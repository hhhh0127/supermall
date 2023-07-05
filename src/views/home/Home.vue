<template>
  <!-- 首页是唯一的 所以设置id="home" -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
      ></tab-control>

    <!-- 实时监控滚动，给子组件传入probeType = 3 -->
    <!-- 是否监听上拉操作pullUpLoad -->
    <!-- 监听子组件的自定义事件scroll(子传父) emit过来的 -->

    <!-- 注意的点：属性的驼峰在html中使用-连接，但是监听的事件如pullingUp，不需要-连接，直接就是驼峰，不然会报错 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 动态绑定banners，数据传递给子组件 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 监听子组件emit过来的tabClick事件 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- <goods-list :goods="goods[currentType].list"/> -->
      <!-- 不要直接在这里取数据，使用计算属性 -->
      <goods-list :goods="showGoods" />
      <!-- 暂时用这种形式做滑动 -->
    </scroll>

    <!-- v-on修饰符 .native 监听组件根元素的原生事件 -->
    <!-- v-show是否显示这个组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入，按顺序和类别，比如组件导入按顺序放一块，网络相关放一块
// 分块，按公共、独立组件等

// 独立子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    // 和导入顺序一致（良好的代码规范）
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // 是否显示回到顶部
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    // console.log('home destroyed');
    // this.saveY = 1000;
  },
  activated() {
    // this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 1000);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log('deactivated');
    // this.saveY = this.$refs.scroll.scroll.y;
    // 保存home的位置信息
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);
  },
  // 组件创建完成后发送请求
  created() {
    // 钩子函数里面最好不要顶故意函数，在methods里面定义，钩子函数里面只做调用
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // this.$refs这里可能拿不到想要的组件，因为还没有挂载，需要在mounted里面做
  },
  mounted() {
    // 产生闭包
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 800);
    // 3.监听item中图片加载完成
    // 直接这样使用的$bus是空的undefined，需要在main.js中添加 Vue.prototype.$bus = new Vue()
    this.$bus.$on("itemImageLoad", () => {
      // 图片加载完成，刷新下
      // console.log('1111');
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    // 将refresh函数传入debounce函数中，生成一个新的函数，之后再调用非常频繁的时候，就使用新生成的函数
    // 而新生成的函数，并不会非常频繁的调用，如果下一次执行来得非常快，那么会将上一次取消掉

    tabClick(index) {
      // console.log(index);
      this.currentType = index == 1 ? "pop" : index == 2 ? "new" : "sell";
      // 点击tabControl，切换类别的时候，currentIndex和index保持一致
      // 这样两个tabControl就一致了
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      
      // 点击tabControl中的项的话,回到顶部
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0);
      // switch (index) {
      //   case 0:
      //     this.currentType = 'pop'
      //     break
      //   case 1:
      //     this.currentType = 'new'
      //     break
      //   case 2:
      //     this.currentType = 'sell'
      //     break
      // }
    },
    backClick() {
      // console.log('1');
      // 父访子
      // this.$refs.scroll拿到scroll子组件对象，然后访问其中的scroll对象
      // 还可以this.$children[1]拿到scroll子组件
      // 500毫秒以内回到顶部，不要太快速
      // this.$children[1].scrollTo(0, 0, 500);
      // 不要直接使用scroll对象调用scrollTo方法，而是做一层封装
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听滚动
    contentScroll(position) {
      // console.log(position);
      // y是负值，不用if语句，需要学习这种写法

      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
      // 有时候图片加载是在计算可滚动高度之后，导致新加载的图片无法滚动(计算的高度不包括这些图片)，这样就会出现bug
      // 需要刷新重新计算可以滚动的高度
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      // 主要是轮播图的加载在影响获取offsetTop属性的准确性
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 保存数据
        // 当前这个箭头函数的this往外找到的是created的this，created的this是当前Home组件对象
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 增加复用
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 每一次上拉结束，都需要调用这个方法，不然无法进行多次下拉
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<!-- scoped是作用域，这里设置的样式只针对于当前组件的元素起作用 -->
<style scoped>
#home {
  /* padding-top: 44px; */
  /* 视口高度 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* home-nav下面的scroll滚动是局部滚动，在固定区域内滚动，那么home-nav就不需要脱离标准流了 */
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动的时候的设置 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
  /* text-align: center; */
}

/* 没做tabControl的吸顶前的设置 */
/* .tab-control {
  使tab-control在屏幕向下滑动到一定的位置时，粘在上方
  position: sticky;
  当滑动没有达到44px时，position:static,达到了会自动替换为position:fixed
  sticky相当于是两个属性结合使用
  top: 44px;
  z-index: 9;
} */

.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
