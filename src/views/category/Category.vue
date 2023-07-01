<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
      <li>分类列表33</li>
      <li>分类列表34</li>
      <li>分类列表35</li>
      <li>分类列表36</li>
      <li>分类列表37</li>
      <li>分类列表38</li>
      <li>分类列表39</li>
      <li>分类列表40</li>
      <li>分类列表41</li>
      <li>分类列表42</li>
      <li>分类列表43</li>
      <li>分类列表44</li>
      <li>分类列表45</li>
      <li>分类列表46</li>
      <li>分类列表47</li>
      <li>分类列表48</li>
      <li>分类列表49</li>
      <li>分类列表50</li>
    </ul>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";

BScroll.use(PullUp);

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  created() {
    // 组件创建后执行created
    // 此时模板template还没有被挂载，无法获取dom元素
    // new BScroll(".wrapper");
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      // 默认情况下BScroll是不可以实时的监听滚动的位置
      // probe 侦测
      // 0，1都是不侦测实时的位置
      // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动不侦测
      // 3: 只要滚动，都侦测
      probeType: 3,
      pullUpLoad: true,
    });

    this.scroll.on("scroll", (position) => {
      console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
};
</script>

<style>
.wrapper {
  height: 150px;
  background-color: pink;
  /* overflow-y: scroll; */
  overflow: hidden;
}
</style>
