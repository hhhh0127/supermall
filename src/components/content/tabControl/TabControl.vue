<template>
  <div class="tab-control">
    <!-- 只是文字不一样就不用使用插槽 -->
    <div v-for="(item, index) in titles" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // 子传父，将点击事件传给父组件
      // 将点击谁传给父组件，然后父组件再将相应的数据传递给子组件
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    /* 放统一的样式 */
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;

  }

  .tab-control-item span {
    padding: 5px;
  }

  .active{
    color: var(--color-high-text);
    
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>