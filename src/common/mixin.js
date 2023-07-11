import { debounce } from "./utils";

export const itemListenerMixin = {
  // 注意这里如果混入对象中的data数据的键名与组件data数据的键名冲突优先使用组件的
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    // 产生闭包
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 800);
    // 3.监听item中图片加载完成
    // 直接这样使用的$bus是空的undefined，需要在main.js中添加 Vue.prototype.$bus = new Vue()

    // 对监听的事件进行保存
    this.itemImageListener = () => {
      // 图片加载完成，刷新下
      // console.log('1111');
      // this.$refs.scroll.refresh();
      refresh();
    };

    this.$bus.$on("itemImageLoad", this.itemImageListener);
    console.log('mixin');
  },
};
