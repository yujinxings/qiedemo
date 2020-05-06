<template>
  <div class="details">
    <div class="details_scroll" ref="Details">
      <div class="details_content" @click="isAlity=!isAlity">
        <DetailsHader :url="this.$route.query.url" :grade="grade" :num="num" :numGrade="numGrade" />
        <Article
          @click="isAlity=!isAlity"
          :url="this.$route.query.url"
          :index="0"
          :isLocation="isLocation"
        />
      </div>
    </div>
    <transition name="back">
      <div class="details_back" v-show="isAlity" @click="$router.back()">
        <div class="details_back_icon"></div>
      </div>
    </transition>
    <transition name="ality">
      <Ality v-show="isAlity" :url="this.$route.query.url" :index="0" />
    </transition>
  </div>
</template>


<script>
import BScroll from "better-scroll";
import DetailsHader from "../components/DetailsHader";
import Article from "../components/Article";
import Ality from "../components/Ality";
export default {
  data() {
    return {
      grade: 0,
      num: 0,
      numGrade: 0,
      isLocation: false, //是否显示加载动画
      isAlity: true //是否显示Ality模块
    };
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    initalScroll() {
      if (!this.DetaScroller) {
        this.DetaScroller = new BScroll(this.$refs.Details, {
          click: true,
          bounce: false
        });
      } else {
        this.DetaScroller.refresh();
      }
    }
  },
  mounted() {
    
    let name = this.$route.query.name;
    this.axios.get(`/zs/book/fuzzy-search?query=${name}`).then(res => {
      if (res.data.books[0].title == name) {
        this.axios.get(`/zs/book/${res.data.books[0]._id}`).then(res => {
          this.grade = res.data.rating.score;
          this.numGrade = res.data.rating.count;
          this.num = this.randomNum(0, 30) + this.randomNum(1, 9) / 10;
        });
      } else {
        this.grade = this.randomNum(2, 9) + this.randomNum(1, 9) / 10;
        this.numGrade = this.randomNum(1500, 10000);
        this.num = this.randomNum(0, 30) + this.randomNum(1, 9) / 10;
      }
    });

    this.$nextTick(() => {
      this.initalScroll();
    });
  },
  components: {
    DetailsHader,
    Article,
    Ality
  },
  beforeDestroy() {
    if (this.DetaScroller) {
      this.DetaScroller.destroy();
      this.DetaScroller = null;
    }
  }
};
</script>
<style lang="less" scoped>
.details {
  width: 100vw;
  height: 100vh;
  background-color: #1f2022;
  overflow: hidden;
  .ality-enter,
  .ality-leave-to {
    transform: translateY(56px);
    opacity: 0;
  }
  .ality-enter-active,
  .ality-leave-active {
    transition: all 0.3s linear;
  }
  .ality-enter-to,
  .ality-leave {
    transform: translateY(0);
    opacity: 1;
  }
  .details_scroll {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #1f2022;
  }
  .details_back {
    position: fixed;
    left: 0px;
    top: 0px;
    height: 40px;
    width: 100vw;
    background-color: #101418;
    background-image: linear-gradient(180deg, #101418, #16191d, #1e2429);
    &.back-enter,
    &.back-leave-to {
      transform: translateY(-40px);
      opacity: 0;
    }
    &.back-enter-active,
    &.back-leave-active {
      transition: all 0.3s linear;
    }
    &.back-enter-to,
    &.back-leave {
      transform: translateY(0px);
      opacity: 1;
    }
    .details_back_icon {
      width: 20px;
      height: 20px;
      background: url("../assets/img/back.png") no-repeat center center;
      background-size: 20px 20px;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>