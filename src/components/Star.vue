<template>
  <span class="star-container" :class="'star-'+size">
    <span class="star-item" v-for="(s,i) in starArr" :key="i" :class="s"></span>
  </span>
</template>

<script>
const ARR_LENGHT = 5;
const STAR_OFF = "off";
const STAR_HALF = "half";
const STAR_ON = "on";
export default {
  props: {
    size: {
      type: [Number,String],
      default: "16"
    },
    score: {
      type: [Number,String],
      default: 0
    }
  },
  computed: {
    starArr() {
      let score = Math.floor(this.score) / 2;
      let result = [];
      for (let i = 0; i < ARR_LENGHT; i++) {
        if (Math.floor(score) > i) {
          result.push(STAR_OFF);
        } else if (Math.floor(score) === i && score > i) {
          result.push(STAR_HALF);
        } else {
          result.push(STAR_ON);
        }
      }
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
.star-container {
  display: inline-block;
  vertical-align: top;
  .star-item {
    display: inline-block;
  }
}

.star-16 {
  .star-item {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    vertical-align: top;
    &:last-child {
      margin-right: 0;
    }

    &.on {
      background: url("../assets/img/star_selected_2x.on.png") no-repeat center
        center;
      background-size: 16px 16px;
    }

    &.off {
      background: url("../assets/img/star_selected_2x.off.png") no-repeat center
        center;
      background-size: 16px 16px;
    }

    &.half {
      background: url("../assets/img/star_selected_2x.half.png") no-repeat
        center center;
      background-size: 16px 16px;
    }
  }
}

.star-14 {
  .star-item {
    width: 14px;
    height: 14px;
    margin-right: 3px;
    vertical-align: top;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      background: url("../assets/img/star_selected_2x.on.png") no-repeat center
        center;
      background-size: 14px 14px;
    }

    &.off {
      background: url("../assets/img/star_selected_2x.off.png") no-repeat center
        center;
      background-size: 14px 14px;
    }

    &.half {
      background: url("../assets/img/star_selected_2x.half.png") no-repeat
        center center;
      background-size: 14px 14px;
    }
  }
}

.star-12 {
  .star-item {
    width: 12px;
    height: 12px;
    margin-right: 2px;
    vertical-align: top;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      background: url("../assets/img/star_selected_2x.on.png") no-repeat center
        center;
      background-size: 12px 12px;
    }

    &.off {
      background: url("../assets/img/star_selected_2x.off.png") no-repeat center
        center;
      background-size: 12px 12px;
    }

    &.half {
      background: url("../assets/img/star_selected_2x.half.png") no-repeat
        center center;
      background-size: 12px 12px;
    }
  }
}
</style>