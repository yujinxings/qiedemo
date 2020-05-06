<template>
  <div class="fiction">
    <div class="fiction_content" :class="{themecolor:themeColor=='white'}" ref="fiction" @click="isAlity=!isAlity">
      <Article :url="this.$route.query.url" :index="this.$route.query.index" :themeColor="themeColor" />
    </div>
    <transition name="ality">
      <Ality v-show="isAlity" :themeColor="themeColor" :url="this.$route.query.url" :index="this.$route.query.index" @set-theme-color="setThemeColor" />
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Article from "../components/Article";
import Ality from "../components/Ality";
export default {
  data() {
    return {
      isAlity: false, //Ality组件的显示隐藏
      themeColor:"black", //当前小说阅读的主题颜色 
    };
  },
  components: {
    Article,
    Ality
  },
  methods: {
    setThemeColor(color){
      this.themeColor=color
    },
    instalScroll() {
      if (!this.fictScroller) {
        this.fictScroller = new BScroll(this.$refs.fiction, {
          click: true,
          bounce: false
        });
        this.fictScroller.on("scroll", this.locationAlity);
      } else {
        this.fictScroller.refresh();
      }
    }
  },
  mounted() {
    let result=window.localStorage.getItem('ThemeColor')
    this.themeColor=result
    this.$nextTick(() => {
      this.instalScroll();
    });
  },
  beforeDestroy() {
    if (this.fictScroller) {
      this.fictScroller.destroy();
      this.fictScroller = null;
    }
  }
};
</script>

<style lang="less" scoped>
.fiction {
  .fiction_content {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: #1f2022;
    &.themecolor{
      background-color:#fff
    }
  }
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
  
}
</style>