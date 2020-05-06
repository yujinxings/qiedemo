<template>
  <div class="article" :class="{themecolor:themeColor=='white'}">
    <div class="article_content" @click.self="isAlity=!isAlity">
      <h3 class="article_title" :class="{themecolor:themeColor=='white'}">{{fictionContent.num}}</h3>
      <ul class="article_list" :class="{themecolor:themeColor=='white'}">
        <li class="article_list_item" v-for="(f,i) in fictionContent.content" :key="i">
          <p class="article_list_item_text" v-if="i!=0 && i!=fictLength-1&&i!=fictLength-2">{{f}}</p>
        </li>
      </ul>
      <div class="cut_article" :class="{themecolor:themeColor=='white'}" @click="redirects(index)">
        <span>下一章</span>
      </div>
    </div>
    <Loading :loading="loading" />
    <Pop :title="title" v-if="isPop" />
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Pop from "../components/Pop";

export default {
  props: {
    url: {
      type: String
    },
    index: {
      type: [Number, String]
    },
    isLocation: {
      type: Boolean,
      default: true
    },
    themeColor: {
      type: String,
      default: "black"
    }
  },
  data() {
    return {
      fictionContent: {},
      locationIndex: 0,
      loading: false, //是否显示加载动画
      isAlity: false, //是否显示Ality组件
      title: "因为网络原因或者版权问题,暂无该小说章节内容,请再试次",
      isPop: false
    };
  },
  methods: {
    redirects(index) {
      //转跳到下一章节
      index++;
      this.$router.replace({
        path: "/fiction",
        query: { url: this.url, index: index }
      });
      if (this.isLocation) {
        window.location.reload();
      }
    }
  },
  components: {
    Loading,
    Pop
  },
  mounted() {
    this.loading = true; //表示正在请求数据
    let { CancelToken } = this.axios;
    this.axios
      .get(`/pin/?xsurl1=${this.url}`, {
        timeout: 5000,
        CancelToken: new CancelToken(c => {
          this.axiosCancel = c;
        })
      })
      .then(res => {
        console.log("外", res);
        if (res.data.list) {
          this.axios
            .get(`/pin/?xsurl2=${res.data.list[this.index].url}`, {
              timeout: 5000
            })
            .then(res => {
              if (res.data.content) {
                console.log("里", res);
                this.fictionContent = res.data;
                this.fictLength = this.fictionContent.content.length;
                this.loading = false;
                if (this.fictLength == 0) {
                  console.log("由于版权问题,暂无该小说章节内容");
                  this.isPop = true;
                  this.popTimer = setTimeout(() => {
                    this.isPop = false;
                  }, 1000);
                }
              } else {
                console.log("由于版权问题,暂无该小说章节内容");
                this.loading = false;
                this.isPop = true;
                clearTimeout(this.popTimer);
                this.popTimer = setTimeout(() => {
                  this.isPop = false;
                }, 1000);
              }
            });
        } else {
          this.loading = false;
          this.isPop = true;
          clearTimeout(this.popTimer);
          this.popTimer = setTimeout(() => {
            this.isPop = false;
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
        this.isPop = true;
        clearTimeout(this.popTimer);
        this.popTimer = setTimeout(() => {
          this.isPop = false;
        }, 1000);
        // alert("暂无该小说章节", this.$router.back());
      });
  },
  beforeDestroy() {
    clearTimeout(this.popTimer);
    if (this.loading) {
      this.axiosCancel();
    }
  }
};
</script>

<style lang="less" scoped>
.article.themecolor {
  background-color: #fff !important;
}
.article_title.themecolor {
  color: #0d141e !important;
}
.article_list.themecolor {
  p {
    color: #0d141e !important;
  }
}
.article {
  box-sizing: border-box;
  padding-top: 40px;
  padding: 40px 25px 0 25px;
  background-color: #1f2022;
  overflow: hidden;
  .article_title {
    padding-bottom: 10px;
    color: #eef0f4;
    font-size: 20px;
    font-weight: bold;
  }
  .article_list_item {
    padding-bottom: 20px;
  }
  .article_list_item_text {
    color: #d0d3d8;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 1px;
  }
  .cut_article {
    text-align: center;
    padding-bottom: 30px;
    color: #eef0f4;
    span {
      display: inline-block;
      width: calc(100% - 50px);
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    &.themecolor{
      color: #333;
      span{
        background-color: rgb(212, 212, 212);
      }
    }
  }
}
</style>