<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      // 如果有image就展示image，没有就展示show.img
      return this.goodsItem.image || this.goodsItem.show.img
      // return (this.goodsItem.show && this.goodsItem.show.img) || this.goodsItem.image;
    }
  },
  methods: {
    imageLoad() {
      // if (this.$route.path.indexOf('/home') ) {
      //   this.$bus.$emit('homeItemImageLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }

      this.$bus.$emit('itemImageLoad')
      
    },
    itemClick() {
      // 跳转到详情页,并且也把商品的id传递过去
      // 用push,而不是用repalce,是因为详情页还需要back回去
      // 1.使用动态路由的方式,注意index.js中也要配置好动态路由
      this.$router.push('/detail/' + this.goodsItem.iid) // http://localhost:8080/detail/id

      // 2.query方式传递参数 http://localhost:8080/detail?id=22
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     id: '22'
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  /* 样式挺重要的 */


  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

<!-- .goods-item {
  padding-bottom: 40px;
  /* 子绝父相 */
  position: relative;
  width: 48%;
}

.good-item img {
  width: 100%;
  border-radius: 5px;
  /* border:3px solid var(--color-tint); */
}

/* 定位到图片的下方 */
.goods-info {
  font-style: 12px;
  /* 子元素的绝对定位会参照最近的开启了相对定位的祖先元素 */
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;  /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号表示被截断的文本(溢出的文本) */
  white-space: nowrap; /* 禁止换行 */
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

/* 使用伪元素 */
/* "::before" 是 CSS 伪元素之一，用于在目标元素的内容前插入一个虚拟元素 */
.goods-info .collect::before {
  /* content为空 告诉浏览器在此伪元素的位置插入内容 */
  content: ''; 
  /* 虚拟元素的css样式 */
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background-color: url('~assets/img/common/collect.svg') 0 0/14px 14px;
} -->