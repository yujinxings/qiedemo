<template>
  <div class="pop">
    <div class="pop-content">
      <div class="content-title">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String
    }
  }

}
</script>
<style lang="less" scoped>
.pop{
  width: 100vw;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(7, 17, 27, 0.6);
}
.pop-content{
  position: absolute;
  left: 50%;
  top: 30%;
  width: 70vw;
  padding: 50px 0;
  transform: translateX(-50%) translateY(-50%);
  background-color: aliceblue;
  text-align: center;
}

</style>