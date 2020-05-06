<template>
  <div id="app">
    <div class="nav" v-show="isNavs">
      <router-link tag="div" to="/">首页</router-link>
      <router-link tag="div" to="/classify">分类</router-link>
      <router-link tag="div" to="/bookrack">书架</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNav: true
    };
  },
  computed: {
    isNavs() {
      let name = this.$route.name;
      if (name == "Home" || name == "BookRack" || name=="RankingList" || name=="Classify") {
        return true;
      } else {
        return false
      }
    }
  },
  components: {},
  methods: {}
};
</script>

<style lang="less">
.nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 50px;
  line-height: 50px;
  background-color: rgb(22, 21, 21);
  display: flex;
  z-index: 99;
  div {
    flex: 1;
    text-align: center;
    color: #eef0f4;
    &.router-link-exact-active{
      color: #2493ee;
    }
  }
}
</style>
