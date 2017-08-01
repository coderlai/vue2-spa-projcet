<template>
  <div class="ratings">
    <div class="score-service clearfix">
      <div class="score">
        <h1 class="final-score">{{seller.score}}</h1>
        <div class="text">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="service">
        <div class="service-ratings clearfix">
          <span class="text">服务态度</span>
          <star :size="36" :score="seller.serviceScore"></star>
        </div>
        <div class="food-ratings clearfix">
          <span class="text">菜品口味</span>
          <star :size="36" :score="seller.foodScore"></star>
        </div>
        <div class="delivery-time clearfix">
          <span class="text">送达时间</span>
          <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="type-wrapper">
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
    <div class="comment-list">
      <div class="comment-item" v-for="comment in comments">
        <div class="avatar"><img :src="comment.avatar" alt=""></div>
        <div class="content">
          <h1 class="username">{{comment.username}}</h1>
          <div class="score-time">
            <star :size="24" :score="comment.score"></star>
            <span class="time">{{comment.deliveryTime}}分总送达</span>
          </div>
          <p class="text">{{comment.text}}</p>
          <div class="recommend clearfix" v-show="comment.recommend.length>0">
            <div class="icon-thumb_up"></div>
            <div class="recommend-wrapper">
              <span class="recommend-item" v-for="recommend in comment.recommend">{{recommend}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {},
        comments: []
      }
    },
    created: function () {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.seller = res.body.data
        }
      })
      this.$http.get('/api/ratings').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.comments = res.body.data
        }
      })
    },
    components: {
      star
    }
  }
</script>

<style lang="less">
  .ratings {
    max-height:100%;
    overflow: auto;
    &.ratings::-webkit-scrollbar{
      display: none;
    }
    .score-service {
      width: 100%;
      padding: 18px 24px 18px 0;
      box-sizing: border-box;
      .score {
        float: left;
        width: 37%;
        border-right: 1px solid rgba(7, 17, 27, .1);
        box-sizing: border-box;
        .final-score {
          height: 28px;
          line-height: 28px;
          font-size: 24px;
          text-align: center;
          color: rgb(255, 153, 0);
        }
        .text {
          height: 12px;
          margin: 6px 0 8px 0;
          line-height: 12px;
          text-align: center;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rankRate {
          height: 10px;
          margin-bottom: 6px;
          line-height: 10px;
          font-size: 10px;
          text-align: center;
          color: rgba(7, 17, 27, 0.5);
        }
      }
      .service {
        float: right;
        width: 63%;
        padding-left: 24px;
        font-size: 0;
        box-sizing: border-box;
        .text {
          float: left;
          height: 18px;
          margin-right: 12px;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .icon {
          float: left;
        }
        .service-ratings {
          margin-bottom: 8px;
        }
        .food-ratings {
          margin-bottom: 8px;
        }
        .delivery-time {
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
    .comments {
      .type-wrapper {
        padding: 0 18px;
        .rating-type {
          padding: 18px 0;
          border-bottom: 1px solid #ccc;
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
    .comment-list {
      padding: 0 18px;
      box-sizing: border-box;
      border-top: 2px solid #eee;
      .comment-item {
        display: flex;
        margin-top: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid #eee;
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            width: 100%;
            height: 28px;
            border-radius: 50%;
          }
        }
        .content {
          flex: 1;
          .username {
            height: 12px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .score-time {
            font-size: 0;
            margin: 4px 0 6px 0;
            .time {
              height: 12px;
              margin-left: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            margin-top: 8px;
            display: flex;
            .icon-thumb_up {
              flex: 0 0 16px;
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              color: rgb(0, 160, 220);
            }
            .recommend-wrapper {
              flex: 1;
              .recommend-item {
                float: left;
                padding: 6px;
                margin: 0 0 4px 8px;
                line-height: 16px;
                font-size: 9px;
                color: rgb(147, 153, 159);
                background: #fff;
                border: 1px solid rgba(7, 17, 27, .1);
                border-radius: 2px;
              }
            }

          }
        }
      }
    }
  }
</style>
