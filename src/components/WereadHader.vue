<template>
  <div class="weread-hader">
    <div class="weread-hader-logo">
      <img src="../assets/img/search_header_logo_small_2x.c3f4f6fd.png" alt />
    </div>
    <div class="weread-hader-search" @click="setShowSearch(true)">
      <div class="hader-search-icon"></div>
      <div class="hader-search-text">搜索</div>
    </div>
    <HaderSearch :showSearch="showSearch" @show-search="setShowSearch"></HaderSearch>
  </div>
</template>

<script>
import HaderSearch from "./HaderSearch";
export default {
  data() {
    return {
      showSearch:false
    }
  },
  methods: {
    setShowSearch(show){
      this.showSearch=show
      this.$emit("destroy-croll", show)
    }
  },
  components: {
    HaderSearch
  }
};
</script>

<style lang="less" scoped>
.weread-hader {
  position: relative;
  width: 100vw;
  height: 250px;
  background-color: #17181a;
  padding: 75px 22px 0 22px;
  box-sizing: border-box;
  .weread-hader-logo {
    padding-bottom: 45px;
    text-align: center;
    img {
      width: 125px;
      height: 27px;
    }
  }
  .weread-hader-search {
    position: relative;
    width: 100%;
    height: 42px;
    border-radius: 30px;
    background-color: #2d2e30;
    .hader-search-icon {
      position: absolute;
      left: 20px;
      top: 13px;
      width: 16px;
      height: 16px;
      background: url("../assets/img/search.png") no-repeat center center;
      background-size: 16px 16px;
    }
    .hader-search-text {
      position: absolute;
      left: 40px;
      top: 13px;
      font-size: 16px;
      color: #8A8C90;
    }
  }
}
</style>