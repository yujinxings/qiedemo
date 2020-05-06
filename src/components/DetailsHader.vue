<template>
  <div class="details-hader">
    <div class="hader-content">
      <div class="content-img">
        <img :src="particulars.cover" />
      </div>
      <div class="content-message">
        <h3 class="message-name">{{particulars.name}}</h3>
        <div class="message-author">{{particulars.author}}</div>
        <div class="message-img"></div>
        <div class="message-introduce">
          <span class="message-text">{{particulars.introduce}}</span>
          <div class="message-btn" @click="introduceBool= !introduceBool">更多</div>
        </div>
      </div>
      <div class="hide-introduce" v-show="introduceBool">
        <div class="introduce">
          <div class="hied-but" @click="introduceBool= !introduceBool">
            <span></span>
          </div>
          <div class="introduce-title">简介</div>
          <p class="introduce-title-content text">{{particulars.introduce}}</p>
          <div class="introduce-title">其他</div>
          <div class="title-content" v-if="particulars.tag">
            <span>题材</span>
            <span>{{particulars.tag}}</span>
          </div>
          <div class="title-content" v-if="particulars.num">
            <span>最新章节</span>
            <span>{{particulars.num}}</span>
          </div>
          <div class="title-content" v-if="particulars.time">
            <span>最近更新时间</span>
            <span>{{particulars.time.split(" ")[0]}}</span>
          </div>
          <div class="title-content" v-if="particulars.status">
            <span>状态</span>
            <span>{{particulars.status}}</span>
          </div>
        </div>
        <div class="mask-layer" @click="introduceBool= !introduceBool"></div>
      </div>
    </div>
    <div class="hader-evaluate">
      <div class="evaluate">
        <div>
          <span class="evaluate-grade">{{grade}}</span>
          <Star :score="grade" />
        </div>
        <p class="evaluate-cont">{{numGrade}}人点评</p>
      </div>
      <div class="num-people">
        <span class="evaluate-grade">{{num}}</span>
        <span class="evaluate-text">万人</span>
        <p class="evaluate-cont">阅读此书</p>
      </div>
    </div>
    <div class="hader-wonderful">
      <h3 class="wonderful-title">精彩点评</h3>
      <div class="wonderful-content" v-for="f in wonderful" :key="f.icon">
        <span class="wonderful-content-icon">
          <img :src="f.icon" />
        </span>
        <span class="wonderful-content-name">{{f.name}}</span>
        <span class="wonderful-content-remark">点评</span>
        <Star :size="'14'" :score="f.score" />
        <p class="wonderful-content-text">{{f.text}}</p>
      </div>
      <div class="wonderful-more">查看更多精彩评论</div>
    </div>
  </div>
</template>

<script>
import Star from "./Star";
export default {
  data() {
    return {
      particulars: {},
      introduceBool: false, //更多按钮 显示隐藏详情页
      isAlity: false,
      wonderful: [
        {
          icon:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQ04Q2d0iaF3RZiaBYmGxicP2UXupicUicbg3LPdG6WSnPEpqYv2AmNxC9UicuFhd1GWv0QEQw21bE6S7A/46",
          name: "菠萝 Joyce",
          score: 8,
          text:
            "终是庄周梦了蝶，你是恩赐也是劫；终是李白醉了酒，你是孤独也是愁；终是荆轲刺了秦，一代君王一世民；终是妲己惑了国，万里江山诉蹉跎；终是玉环听了曲，无人再懂琵琶语；终是韩信放下枪，也是宿命也是殇；终是悟空成了佛，你一堕落便是魔；终是霸王别了姬，弃了江山负了你；终是后羿断了箭，此生注定难相见"
        },
        {
          icon:
            "https://res.weread.qq.com/wravatar/WV0004-rSRqiMeSbwZZU0IcWAxr7a3/96",
          name: "酸柠檬",
          score: 7,
          text:
            "有没有书友想进无限卡抽奖群的，想弄一个群方便每周六抽奖，有兴趣的私聊一下呀[嘿哈][嘿哈][嘿哈]"
        },
        {
          icon:
            "https://res.weread.qq.com/wravatar/WV0030-PufuAVUh36JAIyF8qfnoO9b/96",
          name: "吃鸡",
          score: 10,
          text:
            "妈呀，太魔性了，看着看着突然没了🙈，情绪戛然而止，我也太难过了[捂脸]“我们都活成了梦想中的样子，我们都还没忘记彼此”初次看到这句话，只觉得很文艺，并不懂，直到看完这个故事，才明白它所有的含义，心酸动人。这是第一次感受女主的性格很疏离，有些无法理解，可能是因为星座的关系？！不过还是被她的呆萌可爱吸引了。除却那些不是人干的事，我可真的是太太太喜欢孑哥了！“他对我很好，他在我身边的时候，我什么都不需要想，我可以活成小朋友，可他离开了我，我还是能活得很好，因为他教会了我怎么对我自己好。”这样的男人谁不喜欢呢？无论在与不在身边，都会给你足够的安全感，即使有一天不在身边，也不会感受到心慌无措，那是一种希望你永久好的人，不会自私的将之捆绑，给你自由，更给你安全感，酷死了好不好！生活哪有什么岁月静好~只是有人在为你负重前行。当然还有我们孑哥的人设，简直不要太正能量好吗！虽然到了骚气都可以和正义感并驾齐驱的地步，但还是要夸一句，应该不会有第二个像你这么牛的人(我很认真的夸了[微笑])小说里，因为心结，错过好多年，好在他依旧等你；生活里，没有那么多曲折离奇，可也难有这么钟情的人吧。💞“ 哥哥，对于世界，你是一个人，但对于我而言，你却是整个世界，你在时，你是一切，你不在时，一切是你。”你走的太快了，能不能放慢脚步，等等我？众生皆草木，唯你是星辰。“等到了花开，在等结果。”——等瓜熟蒂落。"
        }
      ]
    };
  },
  props: {
    url: {
      type: String,
    },
    grade: {
      type: [Number,String],
      default: 8.0
    },
    num: {
      type: [Number,String],
      default: 12.8
    },
    numGrade: {
      type: [Number,String],
      default: 6.7
    }
  },
  mounted() {
    if (this.url) {
      this.axios.get(`/pin/?xsurl1=${this.url}`).then(res => {
        if (res.data.data) {
          this.particulars = res.data.data;
        }
      });
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="less" scoped>
.details-hader {
  padding: 30px 25px 0 25px;
  box-sizing: border-box;
  .hader-content {
    display: flex;
  }
  .content-img {
    width: 108px;
    height: 155px;
    background: url("https://www.kygso.com/static/image/nocover.jpg") no-repeat
      center center;
    background-size: 108px 155px;
    margin-right: 20px;
    img {
      width: 108px;
      height: 155px;
    }
  }
  .content-message {
    .message-name {
      margin: 10px 0;
      font-size: 20px;
      font-weight: 700;
      color: #eef0f4;
    }
    .message-author {
      font-size: 15px;
      color: #0097ff;
      padding-top: 10px;
    }
    .message-img {
      width: 78px;
      height: 22px;
      background: url("../assets/img/reader_ranklist_novel_2x.e34f331f.png")
        no-repeat center center;
      background-size: 78px 22px;
      margin-top: 15px;
    }
  }
  .message-introduce {
    position: relative;
    margin-top: 10px;
    font-size: 13px;
    color: #8a8c90;
    .message-text {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
    }
    .message-btn {
      position: absolute;
      right: 0;
      top: 18px;
      height: 23px;
      line-height: 23px;
      background-image: linear-gradient(
        90deg,
        rgba(31, 32, 34, 0),
        rgb(31, 32, 34) 50%,
        rgb(31, 32, 34)
      );
      padding: 0px 1px 0px 40px;
    }
  }
  .mask-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(9, 10, 10, 0.8);
  }
  .introduce {
    position: fixed;
    top: 11vh;
    left: 40px;
    width: calc(100vw - 80px);
    max-height: 80vh;
    background-color: #2f2f2f;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px 30px 40px 30px;
    border-radius: 20px;
    z-index: 99;
    .hied-but {
      text-align: right;
      height: 20px;
      margin-top: 15px;
      span {
        display: inline-block;
        height: 20px;
        width: 20px;
        background: url("../assets/img/dialog_close.a5f40ec8.png") no-repeat
          center center;
        background-size: 20px 20px;
      }
    }
    .introduce-title {
      margin-bottom: 25px;
    }
    .introduce-title {
      color: #e9ebef;
      font-size: 16px;
      font-weight: bold;
    }
    .introduce-title-content {
      color: #aaacb0;
      font-size: 14px;
    }
    .introduce-title-content.text {
      line-height: 22px;
      letter-spacing: 2px;
      padding-bottom: 40px;
    }
    .title-content {
      display: flex;
      justify-content: space-between;
      color: #aaacb0;
      margin-bottom: 12px;
      font-size: 14px;
      height: 21px;
      line-height: 21px;
    }
  }
  .hader-evaluate {
    margin-top: 40px;
    display: flex;
    color: #b2b4b8;
    border-bottom: 1px solid #232426;
    padding-bottom: 30px;
    .evaluate {
      flex: 0 0 145px;
    }
    .evaluate-grade {
      display: inline-block;
      height: 35px;
      font-size: 26px;
      margin-top: -6px;
      padding-right: 5px;
    }
    .num-people {
      flex: 1;
      padding-left: 25px;
    }
    .evaluate-text {
      font-size: 14px;
    }
    .evaluate-cont {
      font-size: 10px;
      color: #8a8c90;
    }
  }
  .hader-wonderful {
    margin-top: 30px;
    .wonderful-title {
      font-size: 20px;
      color: #eef0f4;
      font-weight: bold;
      margin-bottom: 35px;
    }
    .wonderful-content {
      margin-bottom: 30px;
    }
    .wonderful-content-icon {
      float: left;
      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }
    }
    .wonderful-content-name {
      font-size: 14px;
      color: #8a8c90;
      font-weight: bold;
      line-height: 20px;
      margin-left: 8px;
    }
    .wonderful-content-remark {
      font-size: 14px;
      color: #626468;
      margin-left: 8px;
    }
    .star-14 {
      vertical-align: middle;
      margin-left: 8px;
    }
    .wonderful-content-text {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 16px;
      line-height: 22px;
      margin-top: 10px;
      color: #d0d3d8;
    }
    .wonderful-more {
      color: #0097ff;
      font-size: 15px;
      font-weight: bold;
      padding-bottom: 45px;
      border-bottom: 1px solid #232426;
    }
  }
}
</style>