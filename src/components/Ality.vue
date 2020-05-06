<template>
  <div class="ality">
    <div class="ality_content" :class="{themecolor:themeColor=='white'}">
      <div
        class="ality_item"
        :class="{themecolor:themeColor=='white'}"
        @click="$router.push({path:'/'})"
      >
        <span></span>
        <span>书城</span>
      </div>
      <div class="ality_item" :class="{themecolor:themeColor=='white'}" @click="goo">
        <span></span>
        <span>目录</span>
      </div>
      <div
        class="ality_item"
        @click="alityColor=!alityColor"
        :class="{themecolor:themeColor=='white'}"
        v-show="$route.name!=`Details`"
      >
        <span></span>
        <span>设置</span>
      </div>
      <div class="ality_addbook" :class="{active:favorite}" @click="setlocation">
        <span>{{favorite?'已加入书架':'加入书架'}}</span>
      </div>
      <div class="set_ality_color" v-show="alityColor" :class="{themecolor:themeColor=='white'}">
        <div
          class="ality_color_item"
          :class="{active:themeColor==='white'}"
          @click="setThemeColor('white')"
        >
          <span></span>
        </div>
        <div
          class="ality_color_item"
          :class="{active:themeColor=='black'}"
          @click="setThemeColor('black')"
        >
          <span></span>
        </div>
      </div>
    </div>
    <div class="ality_hide" v-show="!isCatalogue" @click.self="isCatalogue=true"></div>
    <transition name="hide">
      <div class="ality_catalogue" v-show="!isCatalogue" :class="{themecolor:themeColor=='white'}">
        <div class="catalogue_book">
          <h3 class="book_name" :class="{themecolor:themeColor=='white'}">{{catalogueContent.name}}</h3>
          <p
            class="book_author"
            :class="{themecolor:themeColor=='white'}"
          >{{catalogueContent.author}}</p>
          <p class="book_time" :class="{themecolor:themeColor=='white'}">{{catalogueContent.time}}</p>
        </div>
        <div class="catalogue_sort">
          <img
            @click="sortBool=!sortBool"
            :class="[{positive:sortBool},{inverted:!sortBool}]"
            src="../assets/img/sorl-1.png"
            alt
          />
        </div>
        <div class="catalogue_content" ref="catalogue">
          <ul class="catalogue_content_list" :class="{themecolor:themeColor=='white'}">
            <li
              v-for="cat in catList"
              :key="cat.index"
              @click="newredirects(cat.index)"
              :class="{active:index==cat.index}"
              ref="catalogueList"
            >{{cat.num}}</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
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
      isCatalogue: true, //目录的显示隐藏
      catalogueContent: {},
      catalogueList: [],
      sortBool: true,
      favorite: false,
      alityColor: false
    };
  },
  computed: {
    catList() {
      //通过计算属性实现章节目录的倒序以及正序
      let list = this.catalogueList;
      let bool = this.sortBool;
      if (bool) {
        return list.reverse();
      } else {
        return list.reverse();
      }
    }
  },
  methods: {
    goo() {
      //转跳到当前章节
      this.isCatalogue = !this.isCatalogue;
      if (this.isCatalogue == false) {
        this.$nextTick(() => {
          let catalogueEle = this.$refs.catalogueList[this.index];
          this.catalogueScroller.scrollToElement(catalogueEle, 300, null, true);
        });
      }
    },

    //反向传值修改主题颜色
    setThemeColor(color) {
      console.log(111);

      if (this.themeColor != color) {
        this.$emit("set-theme-color", color);
        let storage = window.localStorage;
        storage.setItem("ThemeColor", color);
      }
    },
    //设置小说内容的滚动
    initalScroll() {
      if (!this.catalogueScroller) {
        this.catalogueScroller = new BScroll(this.$refs.catalogue, {
          click: true
        });
      } else {
        this.catalogueScroller.refresh();
      }
    },
    //判断是否已经加入了书架
    isFavorite() {
      let storage = window.localStorage;
      let result = storage.getItem("books");
      if (result) {
        let arr = JSON.parse(result);
        let item = arr.find(n => n.url === this.url);
        this.favorite = item ? true : false;
      } else {
        this.favorite = false;
      }
    },
    //加入书架 保存在本地缓存
    setlocation() {
      let storage = window.localStorage;
      let result = storage.getItem("books");
      if (this.favorite) {
        //取消加入书架
        result = JSON.parse(result);
        result = result.filter(r => r.url !== this.url);
      } else {
        //判断是否有其他书已经加入书架
        if (result) {
          result = JSON.parse(result);
          result = [
            ...result,
            {
              name: this.catalogueContent.name,
              url: this.url,
              index: this.index
            }
          ];
        } else {
          result = [
            {
              name: this.catalogueContent.name,
              url: this.url,
              index: this.index
            }
          ];
        }
      }
      storage.setItem("books", JSON.stringify(result));
      this.isFavorite();
    },
    //已经加入书架的小说 切换其他章节会更新本地缓存
    updateLocation() {
      if (this.favorite) {
        let storage = window.localStorage;
        let result = storage.getItem("books");
        result = JSON.parse(result);
        for (let i = 0; i < result.length; i++) {
          if (result[i].url == this.url) {
            this.$set(result[i], "index", this.index);
            break;
          }
        }
        storage.setItem("books", JSON.stringify(result));
      }
    },
    //转跳到目录点击的指定章节
    newredirects(index) {
      console.log(index);

      this.$router.replace({
        path: "/fiction",
        query: { url: this.url, index: index }
      });
      if (this.isLocation) {
        this.timer = setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    },
    //过渡到当前章节
    currScroll() {
      this.$nextTick(() => {
        let catalogueEle = this.$refs.catalogueList[this.index];
        this.catalogueScroller.scrollToElement(catalogueEle, 300, null, true);
      });
    }
  },
  mounted() {
    this.axios
      .get(`/pin/?xsurl1=${this.url}`, {
        timeout: 5000
      })
      .then(res => {
        if (res.data && res.data.list && res.data.data) {
          this.catalogueContent = res.data.data; //获取小说信息
          this.catalogueList = res.data.list; //获取小说章节列表
          if (res.data.list) {
            this.catalogueList.map((item, i) => {
              return this.$set(item, "index", i);
            });
            this.catalogueList.reverse();
          }
          this.$nextTick(() => {
            this.updateLocation(); //已加入书架更新本地缓存
            this.initalScroll();
          });
        }
      });
  },
  beforeMount() {
    this.isFavorite();
  },
  beforeDestroy() {
    if (this.catalogueScroller) {
      this.catalogueScroller.destroy();
      this.catalogueScroller = null;
    }
    clearTimeout(this.timer);
  }
};
</script>


<style lang="less" scoped>
.ality_content.themecolor {
  background-color: #fff !important;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .ality_item{
    color: #5d646e !important;
  }
}
.ality_catalogue.themecolor {
  background-color: #fff !important;
  .catalogue_content_list.themecolor {
    li {
      color: #353c46 !important;
      &.active {
        color: #1b88ee !important;
      }
    }
  }
  .book_name.themecolor {
    color: #212832 !important;
  }
  .book_author.themecolor,
  .book_time.themecolor {
    color: #5d646e !important;
  }
}
.set_ality_color.themecolor {
  background-color: #fff !important;
}

.ality {
  .ality_content {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 56px;
    width: 100vw;
    background-color: #101418;
    z-index: 99;
  }
  .ality_item {
    flex: 1;
    text-align: center;
    color: #b2b4bb;
    font-size: 12px;
    line-height: 56px;
  }
  .ality_addbook {
    flex: 0 0 120px;
    margin: 8px 15px;
    color: #fff;
    text-align: center;
    height: 40px;
    background: linear-gradient(90deg, #0087fc, #28b7ff);
    border-radius: 20px;
    line-height: 40px;
    &.active {
      background: linear-gradient(90deg, #7b94aa, #658ea3);
    }
  }
  .ality_hide {
    height: calc(100vh - 56px);
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .ality_catalogue {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #1f2022;
    z-index: 10;
    &.hide-enter,
    &.hide-leave-to {
      transform: translateY(467px);
      opacity: 0;
    }
    &.hide-enter-active,
    &.hide-leave-active {
      transition: all 0.3s linear;
    }
    &.hide-enter-to,
    &.hide-leave {
      transform: translateY(0);
      opacity: 1;
    }
    .catalogue_book {
      padding-top: 20px;
    }
    .book_name {
      font-size: 16px;
      font-weight: bold;
      color: #eef0f4;
      height: 25px;
      line-height: 25px;
    }
    .book_author {
      font-size: 12px;
      color: #b2b4b8;
      margin-top: 7px;
      height: 18px;
      line-height: 18px;
    }
    .book_time {
      font-size: 14px;
      color: #8a8c90;
      margin-top: 6px;
      height: 21px;
      line-height: 21px;
    }
    .catalogue_sort {
      height: 40px;
      line-height: 40px;
      text-align: right;
      img {
        width: 16px;
        height: 16px;
      }
      img.inverted {
        transform: rotate(180deg);
        transition: all 0.3s linear;
      }
      img.positive {
        transform: rotate(360deg);
        transition: all 0.3s linear;
      }
    }
  }
  .catalogue_content {
    height: 330px;
    overflow: hidden;
  }
  .catalogue_content_list {
    li {
      height: 52px;
      line-height: 52px;
      border-top: 1px solid rgba(148, 139, 139, 0.048);
      color: #eef0f4;
      font-size: 15px;
      color: #8a8c90;
    }
    li.active {
      color: #0097ff;
    }
  }
  .set_ality_color {
    position: absolute;
    left: 0;
    top: 1px;
    transform: translateY(-100%);
    width: 100vw;
    padding: 23px 0;
    background-color: #17181a;
    text-align: center;
  }
  .ality_color_item {
    width: 45vw;
    height: 24px;
    border-radius: 6px;
    display: inline-block;
    border: 1px solid #fff;
    span {
      display: inline-block;
      height: 20px;
      width: 20px;
      text-align: center;
      padding-top: 1px;
    }
    &:nth-child(1) {
      border-color: #fff;
      background-color: #fff;
      span {
        background: url("../assets/img/reader_setting_panel_white_2x.e3c94740.png")
          no-repeat center center;
        background-size: 20px 20px;
      }
    }
    &:nth-child(2) {
      border-color: #10141b;
      background-color: #10141b;
      margin-left: 5px;
      span {
        background: url("../assets/img/reader_setting_panel_black_white_2x.b534d209.png")
          no-repeat center center;
        background-size: 20px 20px;
      }
    }
    &:nth-child(1).active {
      border-color: #0097ff;
      background-color: #fff;
      span {
        background: url("../assets/img/reader_setting_panel_white_white_2x.2e8f061d.png")
          no-repeat center center;
        background-size: 20px 20px;
      }
    }
    &:nth-child(2).active {
      border-color: #0097ff;
      background-color: #10141b;
      span {
        background: url("../assets/img/reader_setting_panel_black_2x.5f0df325.png")
          no-repeat center center;
        background-size: 20px 20px;
      }
    }
  }
}
</style>