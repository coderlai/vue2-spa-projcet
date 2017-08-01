<template>
  <div class="seller">
    <div class="seller-header">
      <div class="seller-title">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-count">
          <star :size="36" :score="seller.score"></star>
          <span class="count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="collect">
          <i class="icon-favorite"></i>
          <p class="text">已收藏</p>
        </div>
      </div>
      <ul class="seller-service clearfix">
        <li>
          <h1 class="type">起送价</h1>
          <div class="detail"><span class="number">{{seller.minPrice}}</span>元</div>
        </li>
        <li>
          <h1 class="type">商家配送</h1>
          <div class="detail"><span class="number">{{seller.deliveryPrice}}</span>元</div>
        </li>
        <li>
          <h1 class="type">平均配送时间</h1>
          <div class="detail"><span class="number">{{seller.deliveryTime}}</span>分钟</div>
        </li>
      </ul>
    </div>
    <div class="bulletin-support">
      <h1 class="bulletin-title title">公告与活动</h1>
      <p class="bulletin-text">{{seller.bulletin}}</p>
      <ul class="supports" v-show="seller.supports">
        <li class="support-item" v-for="support in seller.supports"><icon :height="16" :width="16" :type="support.type"></icon>{{support.description}}</li>
      </ul>
    </div>
    <div class="seller-pics">
      <h1 class="title">商家实景</h1>
      <div class="img-list clearfix" v-show="seller.pics">
        <img :src="img" alt="" v-for="img in seller.pics">
      </div>
    </div>
    <div class="seller-info">
        <h1 class="title">商家信息</h1>
        <ul class="info-list">
          <li v-for="info in seller.infos">{{info}}</li>
        </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import icon from 'components/icon/icon'
  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created: function () {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.seller = res.body.data
        }
      })
    },
    components: {
      star,
      icon
    }
  }
</script>

<style lang="less">
  .seller{
    width:100%;
    max-height:100%;
    overflow: auto;
    &.seller::-webkit-scrollbar{
      display:none;
    }
    .title {
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
      margin-bottom: 8px;
    }
    .seller-header {
      padding: 18px;
      border-bottom: 1px solid rgb(143, 153, 159);
      .seller-title {
        position: relative;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .star-count {
          .count {
            margin-left: 12px;
          }
        }
        .collect {
          position: absolute;
          right: 0;
          top: 0;
          text-align: center;
          .icon-favorite {
            line-height: 24px;
            font-size: 24px;
            color: rgb(240, 20, 20);
          }
          .text {
            line-height: 10px;
            font-size: 10px;
            color: rgb(77, 85, 93);
            margin-top: 4px;
          }
        }
      }
      .seller-service {
        display: flex;
        padding:18px 0;
        li {
          float: left;
          flex: 1;
          border-left: 1px solid rgb(143, 153, 159);
          &:first-child{
            border-left:none;
          }
          .type{
            line-height:10px;
            font-size:10px;
            text-align: center;
            margin-bottom:4px;
          }
          .detail{
            margin-top:4px;
            font-size:10px;
            line-height:24px;
            color:rgb(7,17,27);
            text-align: center;
            .number{
              font-size:24px;
            }
          }
        }
      }
    }
    .bulletin-support{
      padding:18px 18px 0 18px;
      .bulletin-title{
        line-height:14px;
        font-size:14px;
        margin-bottom:8px;
      }
      .bulletin-text{
        padding:0 12px;
        line-height:24px;
        font-size:12px;
        color:rgb(240,20,20);
      }
      .supports{
        margin-top:16px;
        .support-item{
          padding:16px 12px;
          font-size:12px;
          color:rgb(7,17,27);
          line-height:16px;
          border-top:1px solid rgba(7,17,27,.1);
          .icon{
            margin-right:6px;
          }
        }
      }

    }
    .seller-pics{
      padding:18px 0 18px 18px;
      .img-list{
        margin-top:12px;
        img{
          float:left;
          width:120px;
          height:90px;
          margin:0 6px 6px 0;
        }
      }
    }
    .seller-info{
      padding:18px;
      .info-list{
        margin-top:12px;
        li{
          padding:16px 12px;
          line-height:16px;
          font-size:12px;
          color:rgb(7,17,27);
          border-top:1px solid rgba(7,17,27,.1);
        }
      }
    }
  }

</style>
