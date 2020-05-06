<template>
  <transition name="search">
    <div class="hader-search" v-show="showSearch">
      <div class="search">
        <input
          type="text"
          v-model.trim="text"
          @input="dataSearchRequest"
          autofocus="autofocus"
          placeholder="搜索"
        />
        <div class="search-icon"></div>
        <span class="search-back" @click="clickShowSearch">取消</span>
      </div>
      <div class="search-list" v-show="searchsList">
        <ul>
          <li
            v-for="slist in searchsList"
            :key="slist.url"
            @click="clickSearchItem(slist)"
            v-html="slist.colorName"
          ></li>
        </ul>
        <div class="search-list-no" v-show="searchsBool">暂未有该小说资源</div>
      </div>
      <div class="search-list" v-show="itemBool">
        <SearchDetails :searchItem="searchItem" />
      </div>
    </div>
  </transition>
</template>

<script>
import SearchDetails from "./SearchDetails";
export default {
  props: {
    showSearch: {
      type: Boolean
    }
  },
  data() {
    return {
      text: "",
      searchs: [],
      searchsBool: false, //搜索内容是否有资源
      searchItem: {},
      itemBool: false, //是否显示搜索内容的列表
      loading:true
    };
  },
  computed: {
    searchsList() {
      //给获取的数据重新添加一个新的colorName让搜索结果的关键字高亮
      if (this.text && this.searchs) {
        let colorName = "";
        let nameStr = `<span class="search-list-name" style="color:#2493ee">${this.text}</span>`;
        let nameReg = new RegExp(this.text, "g");
        for (let i = 0; i < this.searchs.length; i++) {
          colorName = this.searchs[i].name.replace(nameReg, nameStr);
          this.$set(this.searchs[i], "colorName", colorName);
        }
        return this.searchs;
      } else {
        return "";
      }
    }
  },
  methods: {
    clickShowSearch() {//点击取消 隐藏搜索组件
      this.$emit("show-search", false);
      this.text = "";
      this.searchs = [];
      this.searchsBool = false;
      this.itemBool = false;
    },
    dataSearchRequest() {
      this.searchs = [];
      this.searchsBool = false;
      this.itemBool = false;
      //根据输入框的值获取数据
      clearTimeout(this.timerOut);
      this.timerOut = setTimeout(() => {
        if (this.text) {
          this.axios.get("/pin/?xsname=" + this.text + "").then(res => {
            if (res) {
              if (res.data.list) {
                if (res.data.list.length > 8) {
                  this.searchs = res.data.list.slice(0, 9);
                } else {
                  this.searchs = res.data.list;
                }
              } else {
                this.searchsBool = true;
              }
            }
          });
        }
      }, 1000);
    },
    clickSearchItem(data) {//点击搜索结果显示 点击结果的信息 替换关键字颜色
      this.searchsBool = false;
      this.searchs = [];
      this.itemBool = true;
      this.text = data.name;
      let colorName=`<span class="search-list-name" style="color:#2493ee">${this.text}</span>`
      this.$set(data, "colorName", colorName);
      console.log(data);
      
      this.searchItem = data;
    }
  },
  components: {
    SearchDetails
  },
  beforeDestroy() {
    clearTimeout(this.timerOut);
  }
};
</script>

<style lang="less" scoped>
.hader-search {
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #1f2022;
  padding: 16px 22px 0 22px;
  &.search-enter,
  &.search-leave-to {
    opacity: 0;
  }
  &.search-enter-active,
  &.search-leave-active {
    transition: opacity 0.5s linear;
  }
  &.search-enter-to,
  &.search-leave {
    opacity: 1;
  }
  .search {
    position: relative;
    display: flex;
    width: 100%;
    input {
      flex: 1;
      border-radius: 30px;
      background-color: #2d2e30;
      border: 0;
      padding: 0;
      padding-left: 45px;
      font-size: 16px;
      color: #fff;
      outline: 0;
    }
    .search-icon {
      position: absolute;
      left: 20px;
      top: 13px;
      width: 16px;
      height: 16px;
      background: url("../assets/img/search.png") no-repeat center center;
      background-size: 16px 16px;
    }
    .search-back {
      flex: 0 0 35px;
      padding-left: 16px;
      font-size: 16px;
      line-height: 42px;
      color: #2493ee;
    }
  }
  .search-list {
    margin-top: 20px;
    padding: 0 25px;
    background-color: #29292b;
    border-radius: 10px;
    font-size: 16px;
    color: #8a8c90;
    li {
      height: 36px;
      line-height: 36px;
      &:first-child {
        padding-top: 15px;
      }
      &:last-child {
        padding-bottom: 15px;
      }
    }
    .search-list-no {
      height: 36px;
      line-height: 36px;
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
}
</style>