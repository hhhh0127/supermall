<template>
  <!-- 首页是唯一的 所以设置id="home" -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scorll class="content" ref="scroll">
      <!-- 动态绑定banners，数据传递给子组件 -->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 监听子组件emit过来的tabClick事件 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <!-- <goods-list :goods="goods[currentType].list"/> -->
      <!-- 不要直接在这里取数据，使用计算属性 -->
      <goods-list :goods="showGoods" />
      <!-- 暂时用这种形式做滑动 -->
    </scorll>

    <!-- v-on修饰符 .native 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick"></back-top>
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
import Scorll from "components/common/scroll/Scorll";
import BackTop from "components/content/backTop/BackTop";

// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";

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
    Scorll,
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
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
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
  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    tabClick(index) {
      // console.log(index);
      this.currentType = index == 1 ? "pop" : index == 2 ? "new" : "sell";
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
      });
    },
  },
};
</script>

<!-- scoped是作用域，这里设置的样式只针对于当前组件的元素起作用 -->
<style scoped>
#home {
  padding-top: 44px;
  /* 视口高度 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  /* text-align: center; */
}

.tab-control {
  /* 使tab-control在屏幕向下滑动到一定的位置时，粘在上方 */
  position: sticky;
  /* 当滑动没有达到44px时，position:static,达到了会自动替换为position:fixed */
  /* sticky相当于是两个属性结合使用 */
  top: 44px;
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
