<template>
  <transition name="fade">
    <div class="detail">
      <div class="detailImg">
        <img :src="goodInfo.image" alt="">
      </div>
      <div class="good-price">
        <h1 class="name title">{{goodInfo.name}}</h1>
        <p class="count-ratings">
          <span class="count">月售{{goodInfo.sellCount}}</span>
          <span class="rating">好评率{{goodInfo.rating}}</span>
        </p>
        <div class="price-add clearfix">
          <span class="price"><span class="price-icon">¥</span>{{goodInfo.price}}</span>
          <span class="old-price" v-show="goodInfo.oldPrice"><span class="price-icon">¥</span>{{goodInfo.oldPrice}}</span>
          <span class="add" @click="addToShopCar">加入购物车</span>
        </div>
      </div>
      <div class="introduction">
        <h1 class="intro-title title">商品介绍</h1>
        <p class="good-intro">{{goodInfo.info}}</p>
      </div>
      <div class="good-ratings">
        <div class="comments">
          <div class="type-wrapper">
            <h1 class="rating-title title">商品评价</h1>
            <ul class="rating-type clearfix">
              <li class="all">全部</li>
              <li class="good">满意</li>
              <li class="bad">不满意</li>
            </ul>
            <div class="see-type">
              <i class="icon-check_circle"></i>只看有内容的评论
            </div>
          </div>
        </div>
        <div class="rating-list">
          <div class="rating-item" v-for="rate in ratingList">
            <div class="user-info clearfix">
              <span class="time">{{rate.rateTime}}</span>
              <img class="avatar" :src="rate.avatar" alt="">
              <span class="username">{{rate.username}}</span>
            </div>
            <div class="rate-content clearfix">
              <i :class="rateClass[rate.rateType]" class="icon"></i>
              <p class="rate-text">{{rate.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        goodInfo: {},
        rateClass: ['icon-thumb_down', 'icon-thumb_up']
      }
    },
    methods: {
      addToShopCar() {
        alert('test for add shopCar')
      }
    },
    created: function () {
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.goodInfo = res.body.data[0].foods[0]
        }
      })
    },
    computed: {
      ratingList: function () {
        var result = []
        var ratingList = this.goodInfo.ratings || []
        for (let i = 0; i < ratingList.length; i++) {
          if (ratingList[i].text) {
            result.push(ratingList[i])
          }
        }
        console.log(ratingList)
        return result
      }
    }
  }
</script>

<style lang="less">
  @import '../../common/less/mixin';
  .detail {
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    bottom:48px;
    width: 100%;
    max-height: 100%;
    overflow: auto;
    background-color:#fff;
    z-index:100;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }
    .detailImg {
      position: relative;
      padding-top: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .good-price {
      padding: 18px;
      .name {
        font-weight: 700;
      }
      .count-ratings {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
        margin: 8px 0 18px 0;
        .count {
          margin-right: 12px;
        }
      }
      .price-add {
        .price {
          font-size: 14px;
          color: rgb(240, 20, 20);
          line-height: 24px;
          font-weight: 700;
        }
        .old-price {
          font-size: 10px;
          font-weight: 700;
          line-height: 24px;
          color: rgb(147, 153, 159);
          .price-icon {
            font-weight: normal;
          }
        }
        .add {
          float: right;
          height: 24px;
          line-height: 12px;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 10px;
          color: rgb(255, 255, 255);
          background-color: rgb(0, 160, 220);
          box-sizing: border-box;
        }
      }
    }
    .introduction {
      padding: 18px;
      .good-intro {
        padding: 6px 8px 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        line-height: 24px;
      }
    }
    .good-ratings {
      .comments {
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .type-wrapper {
          padding: 0 18px;
          .rating-type {
            padding: 18px 0;
            border-bottom: 1px solid rgba(7, 17, 27, .1);
            li {
              float: left;
              padding: 10px 12px;
              margin-right: 10px;
              font-size: 12px;
            }
            .all {
              color: #fff;
              background: rgb(0, 160, 220);
            }
            .good {
              background: rgb(204, 236, 248);
              color: #000;
            }
            .bad {
              background: rgb(233, 235, 236);
              color: #000;
            }
          }
          .see-type {
            padding: 18px 0;
            font-size: 14px;
            color: rgb(183, 187, 191);
            .icon-check_circle {
              margin-right: 6px;
            }
          }
        }
      }
      .rating-list {
        padding: 0 18px;
        .rating-item {
          padding: 16px 0;
          .user-info {
            height: 12px;
            margin-bottom: 6px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(143, 153, 159);
            .time {
              float: left;
            }
            .username {
              float: right;
            }
            .avatar {
              float: right;
              width: 12px;
              height: 12px;
              margin-left: 6px;
              border-radius: 50%;
            }
          }
          .rate-content {
            .icon {
              float: left;
              margin-right: 4px;
              font-size: 12px;
              line-height: 24px;
              &.icon-thumb_down {
                color: rgb(147, 153, 159);
              }
              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }
            }
            .rate-text {
              float: left;
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 16px;
            }
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
