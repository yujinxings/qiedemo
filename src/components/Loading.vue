<template>
  <div class="loading" v-if="loading">
      <div class="loading_content">
        <img src="../assets/img/timg.png" alt />
      </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: true },
  }
};
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(7, 17, 27, 0.6);
  z-index: 999;
}
.loading_content {
  position: absolute;
  top: 30vh;
  left: calc(50vw - 25px);
  animation: loading 2s linear infinite;
  img {
    width: 50px;
    height: 50px;
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>