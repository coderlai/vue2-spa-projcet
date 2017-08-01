<template>
  <div class="star" :class="starType">
    <span v-for="item in starClass" :class="item" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const CLS_OFF = 'off'
  const CLS_HALF = 'half'
  const CLS_ON = 'on'
  const LENGTH = 5
  export default {
    props: {
      size: {
        type: Number,
        required: true
      },
      score: {
        type: Number
      }
    },
    computed: {
      starClass: function () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      },
      starType: function () {
        return 'star-' + this.size
      }
    }
  }
</script>

<style lang="less">
  @import '../../common/less/mixin';

  .star {
    display: inline-block;
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.off {
          .bg-image('star48_off');
        }
        &.half {
          .bg-image('star48_half');
        }
        &.on {
          .bg-image('star48_on')
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.off {
          .bg-image('star36_off');
        }
        &.half {
          .bg-image('star36_half');
        }
        &.on {
          .bg-image('star36_on')
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.off {
          .bg-image('star24_off');
        }
        &.half {
          .bg-image('star24_half');
        }
        &.on {
          .bg-image('star24_on')
        }
      }
    }
  }
</style>
