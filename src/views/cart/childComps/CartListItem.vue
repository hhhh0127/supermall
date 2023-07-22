<template>
  <div>
    {{ product }}
  </div>
</template>

<script>
export default {
  name: 'CartListItem',
  // 接受父组件传递过来的数据
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>

</style>