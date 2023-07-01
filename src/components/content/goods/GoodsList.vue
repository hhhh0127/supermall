<template>
  <div class="goods">
    <!-- 每个数据的显示都是固定的，不需要插槽 -->
    <!-- :key需要绑定一个唯一标识 -->
    <!-- v-for 渲染组件列表时应该使用明确的 key 属性来标识每个组件实例，这里使用的时item的id -->
    <goods-list-item v-for="item in goods" :goods-item="item" :key="item.iid"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    /* 设置为wrap，可以根据设置的宽度来一行放几张图片 */
    /* 如果是nowrap 则全部放在一行 */
    flex-wrap: wrap;
    /* 均等分：这个是均等分的是，元素左右两边的margin值，边缘间隙可能会变窄 */
    justify-content: space-around;
    padding: 2px;

    /* 这个均等分不会造成空隙问题 */
    /* justify-content: space-evenly; */
  }


</style>