<template>
  <div class="rankingList">
    <div class="rankingList-back" @click.self="$router.back()">返回</div>
    <div class="rankingList-search" @click="setShowSearch(true)">
      <div class="rankingList-icon"></div>
      <div class="rankingList-text">搜索</div>
    </div>
    
    <div class="ranking-scroll" ref="ranking">
      <div class="rankingList-content">
        <div class="content-img">
          <img :src="$route.query.topImgUrl" />
        </div>
        <div class="content-list">
          <ul>
            <li class="content-list-item" v-for="(par,i) in particulars" :key="par._id" @click="redirectsDetails(par.title)">
              <div class="item-num">{{i+1}}</div>
              <div class="item-img">
                <img :src="$route.query.img+par.cover" alt />
              </div>
              <div class="item-content">
                <div class="item-content-title">{{par.title}}</div>
                <p class="item-content-author">{{par.author}}</p>
                <div class="item-content-evaluate">
                  <span class="evaluate_score">9.4</span>
                  <Star :size="12" :score="9.4" />
                  <span class="evaluate_num">{{par.latelyFollower}}人今日阅读</span>
                </div>
              </div>
            </li>
            <li class="content-list-item"><span>——已经到底啦——</span></li>
          </ul>
        </div>
      </div>
    </div>
    <HaderSearch :showSearch="showSearch" @show-search="setShowSearch"></HaderSearch>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import HaderSearch from "../components/HaderSearch";
import Star from "../components/Star";
export default {
  data() {
    return {
      showSearch: false,
      particulars: []
    };
  },
  methods: {
    setShowSearch(show) {
      this.showSearch = show;
    },
    instalScroll() {
      if (!this.rankScroller) {
        this.rankScroller = new BScroll(this.$refs.ranking, {
          click: true
        });
      } else {
        this.rankScroller.refresh();
      }
    },
    redirectsDetails(title) {
      this.axios.get(`/pin/?xsname=${title}`).then(res => {
        if (res.data.list) {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].name == title) {
              this.$router.push({
                path: "/details",
                query: { url: res.data.list[i].url, name: title }
              });
              break;
            }
          }
        } else {
          console.log("由于版权问题,暂无该小说资源");
        }
      });
    }
  },
  components: {
    HaderSearch,
    Star
  },

  mounted() {
    this.axios.get(`/zs/ranking/${this.$route.query.id}`).then(res => {
      if (res.data) {
        this.particulars = res.data.ranking.books;
        console.log(this.particulars);
        this.$nextTick(() => {
          this.instalScroll();
        });
      }
    });
  },
  beforeDestroy() {
    if (this.rankScroller) {
      this.rankScroller.destroy();
      this.rankScroller = null;
    }
  }
};
</script>

<style lang="less" scoped>
.rankingList {
  width: 100vw;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #1f2022;
  padding-top: 15px;

  .ranking-scroll {
    width: calc(100vw - 40px);
    height: calc(100vh - 122px);
    overflow: hidden;
    background-color: #1f2022;
  }
}
.rankingList-back {
  position: absolute;
  left: 8px;
  top: 27px;
  color: #2493ee;
}
.rankingList-search {
  position: relative;
  height: 42px;
  border-radius: 30px;
  background-color: #2d2e30;
  margin-bottom: 15px;
  margin-left: 25px;
  .rankingList-icon {
    position: absolute;
    left: 20px;
    top: 13px;
    width: 16px;
    height: 16px;
    background: url("../assets/img/search.png") no-repeat center center;
    background-size: 16px 16px;
  }
  .rankingList-text {
    position: absolute;
    left: 40px;
    top: 13px;
    font-size: 16px;
    color: #8a8c90;
  }
}
.rankingList-content {
  .content-img {
    padding-top: 20px;
    height: 52px;
    margin-bottom: 12px;
    img {
      width: 176px;
      height: 36px;
    }
  }
  .content-list-item {
    display: flex;
    margin-bottom: 24px;
    &:last-child{
      font-size: 12px;
      color: #858c96;
      justify-content: center;
      padding-bottom: 10px;
    }
    .item-num {
      flex: 0 0 28px;
      height: 93px;
      line-height: 93px;
      color: #b2b4b8;
      font-style: 12px;
    }
    .item-img {
      height: 93px;
      flex: 0 0 64px;
      img {
        height: 93px;
        width: 64px;
      }
    }
    .item-content {
      flex: 1;
      padding-left: 16px;
      padding-top: 10px;
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
      color: #b2b4b8;
      margin-top: 10px;
    }
    .item-content-evaluate {
      font-size: 11px;
      color: #858c96;
      margin-top: 10px;
    }
    .evaluate_score {
      padding-right: 5px;
    }
    .evaluate_num {
      padding-left: 10px;
    }
  }
}
</style>