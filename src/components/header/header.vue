<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="" width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-content">{{seller.bulletin}}</span>
      <i class="bulletin-icon icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="detail-title">粥品香坊（大运村）</h1>
            <div class="detail-content">
              <div class="star-wrapper">
                <Star :size="48" :score="seller.score"></Star>
              </div>
              <div class="center-info">
                <div class="line"></div>
                <div class="line-title">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="supports" v-if="seller.supports">
                <li v-for="item in seller.supports" class="support-item">
                  <Icon :height="16" :width="16" :type="item.type"></Icon>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="center-info">
                <div class="line"></div>
                <div class="line-title">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-close icon-close" @click="closeDetail"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import Star from '../star/star'
  import Icon from '../icon/icon'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail: function () {
        this.detailShow = true
      },
      closeDetail: function () {
        this.detailShow = false
      }
    },
    created: function () {
      this.classMap = ['decrease', 'invoice', 'special', 'discount', 'guarantee']
    },
    components: {
      Star,
      Icon
    }
  }
</script>

<style lang="less">
  @import "../../common/less/mixin.less";
  .header {
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      color: #fff;
      font-size: 0;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        color: #fff;
        font-size: 0;
        vertical-align: top;
        .title {
          .brand {
            vertical-align: top;
            display: inline-block;
            width: 30px;
            height: 18px;
            .bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          font-size: 12px;
          line-height: 12px;
          margin: 8px 0 10px 0;
        }
        .supports {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            vertical-align: top;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('decrease_1')
            }
            &.invoice {
              .bg-image('invoice_1')
            }
            &.guarantee {
              .bg-image('guarantee_1')
            }
            &.discount {
              .bg-image('discount_1')
            }
            &.special {
              .bg-image('special_1')
            }
          }
          .text {
            line-height: 12px;
            font-size: 12px;
          }
        }
      }
      .support-count {
        display: inline-block;
        position: absolute;
        right: 12px;
        bottom: 8px;
        height: 24px;
        line-height: 24px;
        font-size: 0;
        padding: 0 8px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        &.span {
          display: inline-block;
        }
        .count {
          font-size: 10px;
          margin-right: 2px;
        }
        .icon-keyboard_arrow_right {
          line-height: 24px;
          font-size: 10px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      background-color: rgba(7, 17, 27, .2);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #fff;
      .bulletin-title {
        display: inline-block;
        vertical-align: top;
        width: 22px;
        height: 12px;
        .bg-image('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        margin-top: 9px;
      }
      .bulletin-content {
        margin: 0 4px;
        font-size: 10px;
      }
      .bulletin-icon {
        position: absolute;
        top: 8px;
        right: 12px;
        font-size: 10px;
        color: #fff;
        display: inline-block;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      opacity: 1;
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin: 64px auto 0 auto;
          padding-bottom: 64px;
          color: #fff;
          .detail-title {
            line-height: 16px;
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            text-align: center;
          }
          .detail-content {
            .star-wrapper {
              text-align: center;
              margin: 16px auto 28px auto;
            }
            .supports {
              width: 80%;
              margin: 0 auto;
              .support-item {
                font-size: 0;
                margin-bottom: 12px;
                .icon {
                  margin-right: 6px;
                }
                .text {
                  display: inline-block;
                  font-size: 12px;
                  line-height: 16px;
                  color: #fff;
                }
              }
            }
            .bulletin {
              width: 80%;
              margin: 0 auto;
              padding: 0 12px;
              font-size: 12px;
              line-height: 24px;
              color: #fff;
            }
          }
        }
        .center-info {
          width: 80%;
          margin: 28px auto 24px auto;
          font-size: 0;
          display: flex;
          .line {
            position: relative;
            top: -6px;
            flex: 1;
            .border-1px(rgba(255, 255, 255, .2));
          }
          .line-title {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
          }

        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        font-size: 32px;
        color: #fff;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
  }
</style>
