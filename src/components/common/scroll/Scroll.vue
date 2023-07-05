<template>
  <!-- $ref/$children 获取子组件
    第一个是获取明确的那个子组件，使用this.$refs.refname，获取子组件children是获取所有的直接子组件，返回数组 -->
  <!-- ref也可以使用在普通的元素中，使用this.$refs.refname获取到元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import PullUp from "@better-scroll/pull-up";
// import observeDom from "@better-scroll/observeDom";
// BScroll.use(PullUp);

export default {
  name: "Scroll",
  // 是不是实时监听，需要在使用中传递过来，而且不同的组件使用Scroll，需求不同
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BSroll对象
    // document.querySelector('.wrapper')查询到的不一定是需要的那个wrapper(存在同名的情况)
    // 使用this.$refs.wrapper获取
    // 这里取得时候用的this，说明只会取到这个组件内部的wrapper
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 监听类似div元素、span等是否被点击，button不用
      observeDom: true,
      // 根据图片的高度动态刷新高度
      observeImage: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 3.监听上拉事件 pullingUp，滚动到底部的时候会回调
    // 加上if 代码更加严谨以及更加灵活
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多');
        // 监听到拉动到页面的底部，需要emit到父组件来做加载更多
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // ES6语法，可以传入默认值
    // 封装scrollTo，体现封装的思想
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 出现过找不到refresh的错误
    // 原因：img加载太快，可能会出现组件创建成功的时候，this.scroll还没有初始化，因为this.scroll是在挂载的时候生成的
    // 这时候未初始化就找refresh是找不到的
    refresh() {
      // this.scroll有值的时候再做刷新操作
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
};
</script>

<style></style>
