<template>
  <div class="search-details" @click="$router.push({path:'/details',query:{url:searchItem.url,name:searchItem.name}})">
    <div class="search-details-img">
      <img :src="searchItem.cover" alt />
    </div>
    <div class="search-details-content">
      <h3 class="content-name" v-html="searchItem.colorName"></h3>
      <div class="content-author">{{searchItem.author}}</div>
      <p class="content-describe">{{searchItem.introduce}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.search-details {
  padding: 25px 0;
  display: flex;
  .search-details-img {
    flex: 0 0 72px;
    height: 103px;
    background: url("https://www.kygso.com/static/image/nocover.jpg") no-repeat
      center center;
    background-size: 72px 103px;
    margin-right: 20px;
    img {
      width: 72px;
      height: 103px;
    }
  }
  .search-details-content {
    font-size: 16px;
    .content-name {
      font-weight: 600;
      margin-top: 10px;
    }
    .content-author {
      margin-top: 12px;
      font-size: 14px;
    }
    .content-describe {
      margin-top: 12px;
      font-size: 14px;
      line-height: 20px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>