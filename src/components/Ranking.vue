<template>
  <div class="ranking" :class="{active:isBgCorol}">
    <div class="ranking-img">
      <img :src="topImgUrl" />
    </div>
    <div class="ranking-list">
      <ul>
        <li class="ranking-list-item" v-for="(par,i) in particulars" :key="par._id" @click="redirectsDetails(par.title)">
          <div class="item-img">
            <img :src="par.cover" />
          </div>
          <div class="item-content">
            <p class="item-content-title">
              <span class="item-content-title-num">{{i+1}}</span>
              {{par.title}}
            </p>
            <p class="item-content-author">{{par.author}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="ranking-more" @click="$router.push({path:'/rankingList',query:{topImgUrl:topImgUrl,id:id,img:img}})">查看全部</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "http://statics.zhuishushenqi.com", //相应小说图片前缀
      particulars: [],
    };
  },
  props: {
    id: {
      type: String,
      default: "54d42d92321052167dfb75e3"
    },
    topImgUrl: {
      type: String,
      default:
        "https://rescdn.qqmail.com/weread/cover/ranklist.all.chart_title.1BkPxuARY8.png"
    },
    isBgCorol: {
      type: Boolean,
      default: true
    }
  },
 
  methods: {
    redirectsDetails(title){
      this.axios.get(`/pin/?xsname=${title}`).then(res=>{
        if(res.data.list){
          console.log(res.data.list);
          
          for(let i=0;i<res.data.list.length;i++){
            if(res.data.list[i].name==title){
              this.$router.push({path:'/details',query:{url:res.data.list[i].url,name:title}})
              break
            }
          }
        }else{
          console.log("由于版权问题,暂无该小说资源");
        }
      })
    }
  },

  mounted() {
    this.axios.get(`/zs/ranking/${this.id}`).then(res => {
      let books = res.data.ranking.books.slice(0, 3);
      for (let i = 0; i < books.length; i++) {
        this.$set(books[i], "cover", this.img + books[i].cover);
      }
      this.particulars = books;
    });
  }
};
</script>


<style lang="less" scoped>
.ranking {
  width: 100vw;
  padding: 10px 20px 8px;
  box-sizing: border-box;
  margin-top: -1px;
  background-color: #17181a;
  &.active {
    background-color: #1f2022;
  }
  .ranking-img {
    padding-top: 12px;
    img {
      width: 150px;
      height: 30px;
    }
  }
  .ranking-list {
    .ranking-list-item {
      display: flex;
      padding-top: 16px;
    }
    .item-img {
      flex: 0 0 56px;
      width: 56px;
      height: 81px;
      background: url("https://www.kygso.com/static/image/nocover.jpg")
        no-repeat center center;
      background-size: 108px 155px;
    }
    img {
      width: 56px;
      height: 81px;
    }
    .item-content {
      flex: 1;
      margin-top: 25px;
      margin-left: 20px;
    }
    .item-content-title {
      font-size: 15px;
      font-weight: 500;
      color: #eef0f4;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      word-wrap: normal;
      .item-content-title-num {
        padding-right: 7px;
      }
    }
    .item-content-author {
      margin: 6px 0 0 18px;
      font-size: 12px;
      color: #8a8c90;
    }
  }
  .ranking-more {
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #1b88ee;
    border-radius: 10px;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
    margin-top: 22px;
    margin-bottom: 20px;
  }
}
</style>