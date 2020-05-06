<template>
  <div class="home" ref="home">
    <div class="home-content">
      <WereadHader @destroy-croll="destroyScroll" />
      <Ranking />
      <Ranking
        :id="`5a6844aafc84c2b8efaa6b6e`"
        :topImgUrl="`https://rescdn.qqmail.com/weread/cover/ranklist.rising.chart_title.CnAvfyv8Ls.png`"
        :isBgCorol="false"
      />
      <Ranking
        :id="`564eb878efe5b8e745508fde`"
        :topImgUrl="`https://rescdn.qqmail.com/weread/cover/ranklist.newbook.chart_title.b79dP6cuSC.png`"
      />
      <div class="home-hied"></div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import WereadHader from "../components/WereadHader";
import Ranking from "../components/Ranking";

export default {
  components: {
    WereadHader,
    Ranking
  },
  methods: {
    initalScroll() {
      if (!this.homeScroller) {
        this.homeScroller = new BScroll(this.$refs.home, {
          click: true,
          bounce: false
        });
      } else {
        this.homeScroller.refresh();
      }
    },
    destroyScroll(showSearch) {
      if (showSearch) {
        if (this.homeScroller) {
          this.homeScroller.destroy();
          this.homeScroller = null;
        }
      }else{
        this.initalScroll()
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initalScroll();
    });
  },
  beforeDestroy() {
    if (this.homeScroller) {
      this.homeScroller.destroy();
      this.homeScroller = null;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .home-hied {
    height: 40px;
  }
}
</style>
