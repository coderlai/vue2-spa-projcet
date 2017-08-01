<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
    <ShopCar></ShopCar>
  </div>
</template>

<script>
  import Header from 'components/header/header'
  import ShopCar from 'components/shopcar/shopcar'

  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    name: 'app',
    created: function () {
      this.$http.get('/api/seller').then((response) => {
        if (response.body.errno === ERR_OK) {
          this.seller = response.body.data
        }
      })
    },
    components: {
      'v-header': Header,
      ShopCar
    }
  }
</script>

<style lang="less">
  @import "./common/less/mixin.less";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-exact-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
  .view {
    position: fixed;
    top: 174px;
    bottom: 48px;
    left: 0;
    right:0;
    width: 100%;
  }

</style>
