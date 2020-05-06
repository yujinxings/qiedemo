<template>
  <div class="bookrack">
    <div class="bookrack-content">
      <div class="bookrack-content-title">我的收藏</div>
      <div class="bookrack-scroll" ref="book">
        <div class="bookrackList-content">
          <div class="content-item" v-for="(book,i) in books" :key="book.url">
            <Book :url="book.url" :index="book.index" :item="i" />
          </div>
          <div class="content-null" v-if="isBooks">
            暂无收藏小说,快去查找喜欢的小说吧
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BScroll from "better-scroll";
import Book from "../components/Book";
export default {
  data() {
    return {
      books: [],
      isBooks: false
    };
  },
  methods: {
    instalScroll() {
      if (!this.bookScroller) {
        this.bookScroller = new BScroll(this.$refs.book, {
          click: true
        });
      } else {
        this.bookScroller.refresh();
      }
    }
  },
  components: {
    Book
  },
  mounted() {
    let storage = window.localStorage;
    let result = storage.getItem("books");
    this.books = JSON.parse(result);
    this.books.reverse();
    if (this.books.length == 0) {
      this.isBooks=true
    }
    console.log(this.books);

    this.$nextTick(() => {
      this.instalScroll();
    });
  },

  beforeDestroy() {
    if (this.bookScroller) {
      this.bookScroller.destroy();
      this.bookScroller = null;
    }
  }
};
</script>

<style lang="less" scoped>
.bookrack {
  width: 100vw;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #17181a;
}
.bookrack-content-title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #eef0f4;
  background-color: #161515;
}
.bookrack-scroll {
  width: calc(100vw - 40px);
  height: calc(100vh - 65px);
  overflow: hidden;
  background-color: #17181a;
}
.bookrackList-content {
  padding-top: 10px;
}
.content-null{
  font-size: 18px;
  text-align: center;
  color: #fff;
  padding-top: 20px;
}
</style>