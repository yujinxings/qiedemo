<template>
  <div class="classify">
    <div class="classify-content">
      <div class="classify-list" ref="classifylist">
        <ul>
          <li
            v-for="(list,i) in classifyList"
            :key="list.name"
            :class="{active:isIndex==i}"
            @click="setIsIndex(i,list.name)"
          >{{list.name}}</li>
        </ul>
      </div>
      <div class="classify-list-content" ref="classifycontent">
        <ul>
          <li class="content-list-title">{{titleName}}</li>
          <li
            class="content-list-item"
            v-for="(item,i) in list"
            @click="redirectsDetails(item.title)"
            :key="i"
          >
            <div class="item-num">{{i+1}}</div>
            <div class="item-img">
              <img :src="imgUrl+item.cover" />
            </div>
            <div class="item-content">
              <p class="item-content-title">{{item.title}}</p>
              <p class="item-content-author">{{item.author}}</p>
              <div class="item-content-evaluate">
                <span class="evaluate_score">9.4</span>
                <Star :size="12" :score="9.4" />
              </div>
            </div>
          </li>
          <li class="loading" v-show="isLoading">
            <img src="../assets/img/timg.png" alt />
          </li>
          <li class="finish" v-show="isfinish">—— 已经到底啦 ——</li>
          <li class="bottom"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "../components/Star";
export default {
  data() {
    return {
      isIndex: 0, //当前选中了哪个小说分类
      titleName: "", //当前选中了小说分类的名字
      classifyList: [], //小说分类
      limit: 20,
      contentList: [], //小说内容
      imgUrl: "http://statics.zhuishushenqi.com", //小说图片地址前缀
      isLoading: false, //上拉加载动画
      isfinish: false //判断小说内容是否已经全部加载完毕
    };
  },
  computed: {
    list() {
      return this.contentList;
    }
  },
  watch: {
    //监听名字改变重新获取小说内容
    titleName(newVal, oldVal) {
      if (newVal != oldVal) {
        this.limit = 20;
        this.getClassifyItem(newVal);
        if (this.contentScroller) {
          this.contentScroller.scrollTo(0, 0);
        }
      }
    }
  },
  components: {
    Star
  },
  methods: {
    setIsIndex(index, title) {
      this.isIndex = index;
      this.titleName = title;
      this.isfinish = false;
    },
    //获取小说内容
    getClassifyItem(name) {
      let listLength = this.contentList.length;
      this.axios
        .get(
          `/zs/book/by-categories?gender=male&type=hot&major=${name}&minor=&start=0&limit=${this.limit}`
        )
        .then(res => {
          if (res.data) {
            this.contentList = res.data.books;
            //判断小说内容是否全部加载完毕
            if (listLength == this.contentList.length) {
              this.isfinish = true;
            }
          }
        });
    },
    //转跳到小说详情页
    redirectsDetails(title) {
      this.axios.get(`/pin/?xsname=${title}`).then(res => {
        if (res.data.list) {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].name == title) {
              console.log(res.data.list[i].name);
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
    },
    instalScroll() {
      //创建左边分类滚动
      if (!this.listScroller) {
        this.listScroller = new BScroll(this.$refs.classifylist, {
          click: true
        });
      } else {
        this.listScroller.refresh();
      }
      //创建右边分类对应内容滚动
      if (!this.contentScroller) {
        this.contentScroller = new BScroll(this.$refs.classifycontent, {
          click: true,
          probeType: 2
        });
        //滚动监听上拉加载
        this.contentScroller.on("touchEnd", pos => {
          clearTimeout(this.timer);
          if (
            pos.y < this.contentScroller.maxScrollY &&
            this.isLoading != true &&
            this.isfinish != true
          ) {
            this.isLoading = true;
            this.timer = setTimeout(() => {
              this.limit += 20;
              this.getClassifyItem(this.titleName);
              this.contentScroller.refresh();
              this.isLoading = false;
            }, 1500);
          }
        });
      } else {
        //已创建滚动则刷新
        this.contentScroller.refresh();
      }
    }
  },
  mounted() {
    //获取分类列表数据
    this.axios.get("/zs/cats/lv2/statistics").then(res => {
      if (res.data) {
        this.classifyList = res.data.male;
        this.titleName = this.classifyList[0].name;
        this.$nextTick(() => {
          this.instalScroll();
        });
      }
    });
  },
  beforeDestroy() {
    //清除滚动已经定时器
    if (this.listScroller) {
      this.listScroller.destroy();
      this.listScroller = null;
    }
    if (this.contentScroller) {
      this.contentScroller.destroy();
      this.contentScroller = null;
    }
    clearTimeout(this.timer);
  }
};
</script>

<style lang="less" scoped>
.classify-content {
  display: flex;
  width: 100vw;
  height: calc(100vh - 49px);
  background-color: #1f2022;
  box-sizing: border-box;
  padding-right: 20px;
}
.classify-list {
  flex: 0 0 80px;
  height: calc(100vh - 50px);
  overflow: hidden;
  border-right: 1px solid hsla(0, 0%, 90%, 0.05);
  padding-top: 1px;
  li {
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    padding: 10px 0;
    text-align: center;
    color: #b2b4bb;
    &.active {
      background-color: #2493ee;
      color: #fff;
    }
  }
}
.classify-list-content {
  flex: 1;
  overflow: hidden;
  padding-bottom: 100px;
  .content-list-title {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #eef0f4;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
    margin-bottom: 10px;
    text-align: center;
  }
  .content-list-item {
    display: flex;
    margin-bottom: 24px;
    width: 100%;
    &:last-child {
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
      text-align: center;
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
      p {
        width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .item-content-title {
      font-size: 17px;
      line-height: 26px;
      height: 26px;
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
.loading {
  text-align: center;
  img {
    width: 20px;
    height: 20px;
    animation: loading 2s linear infinite;
  }
}
.finish {
  text-align: center;
  color: #b2b4bb;
  font-size: 12px;
}
.bottom {
  height: 20px;
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