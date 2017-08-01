<template>
  <div class="shopcar">
    <div class="count">
      <div class="shop-icon" @click="showShopList">
        <i class="icon-shopping_cart" :class="{'icon-active':iconActive}"></i>
      </div>
      <div class="total-money">¥{{totalMoney}}</div>
    </div>
    <div class="delivery-price">
      <div class="text">另需配送费4元</div>
    </div>
    <div class="delivery-min-price">¥20元起送</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        totalMoney: 0,
        iconActive: false,
        shopList: []
      }
    },
    methods: {
      showShopList() {
        this.iconActive = !this.iconActive
      }
    }
  }
</script>
<style lang="less">
  .shopcar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 48px;
    padding: 11px 0 12px 0;
    background: #141d27;
    font-size: 0;
    box-sizing: border-box;
    .count {
      flex: 1;
      .shop-icon {
        display: inline-block;
        position: absolute;
        left: 15px;
        top: -11px;
        width: 50px;
        height: 50px;
        padding: 6px;
        border-radius: 50%;
        box-sizing: border-box;
        background: #141d27;
        text-align: center;
        .icon-shopping_cart {
          display: inline-block;
          width: 38px;
          height: 38px;
          line-height: 38px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.2);
          text-align: center;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
          &.icon-active {
            color: #fff;
            background: rgb(0, 160, 220);
          }
        }
      }
      .total-money {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        margin-left: 80px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        letter-spacing: 3px;
      }
    }
    .delivery-price {
      flex: 2;
      padding-left: 12px;
      .text {
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, .4);
        border-left: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    .delivery-min-price {
      flex: 1;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
      text-align: center;
    }

  }
</style>
