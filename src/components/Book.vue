<template>
  <div class="book">
      <div class="content-list-item" @click="redirectsFiction">
        <div class="item-num">{{item+1}}</div>
        <div class="item-img">
          <img :src="content.cover" />
        </div>
        <div class="item-content">
          <p class="item-content-title">{{content.name}}</p>
          <p class="item-content-author">{{content.author}}</p>
          <p class="item-content-section">更新至:{{newest.num}}</p>
          <p class="item-content-section">阅读至:{{present.num}}</p>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  props: {
    url: {
      type: String
    },
    index: {
      type: [String, Number]
    },
    item: {
      type: [String, Number]
    }
  },
  data() {
    return {
      content: {},
      newest: {},
      present: {}
    };
  },
  methods: {
    redirectsFiction(){
      this.$router.push({path:"/fiction",query:{url:this.url,index:this.index}})
    }
  },
  mounted() {
    this.axios.get(`/pin/?xsurl1=${this.url}`).then(res => {
      console.log(res.data);
      this.content = res.data.data;
      this.newest = res.data.list[res.data.list.length - 1];
      this.present = res.data.list[this.index];
    });
  }
};
</script>

<style lang="less" scoped>
.content-list-item {
  display: flex;
  margin-bottom: 24px;

  .item-num {
    flex: 0 0 28px;
    height: 93px;
    line-height: 93px;
    color: #b2b4b8;
    font-style: 12px;
  }

  .item-img {
    height: 103px;
    flex: 0 0 70px;
    background: url("https://www.kygso.com/static/image/nocover.jpg") no-repeat
      center center;
    background-size: 72px 103px;
    img {
      height: 103px;
      width: 70px;
    }
  }

  .item-content {
    flex: 1;
    padding-left: 16px;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .item-content-title {
    font-size: 17px;
    line-height: 26px;
    width: 230px;
    height: 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #eef0f4;
  }
  .item-content-author {
    font-size: 14px;
    color: #8a8c90;
    margin-top: 8px;
  }
  .item-content-section {
    width: 220px;
    padding-top: 10px;
    color: #b2b4b8;
  }
}
</style>