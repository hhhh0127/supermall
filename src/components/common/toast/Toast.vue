<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    // 给duration一个默认值
    show(message='', duration=2000) {

      // ES6之前的写法，给duration一个默认值
      // duration = duration || 2000

      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.message = '';
        this.isShow = false;
      }, duration);
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  /* 垂直水平居中 */
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);

  color: white;
  background-color: rgba(0, 0, 0, .75);

  z-index: 999;
}
</style>
