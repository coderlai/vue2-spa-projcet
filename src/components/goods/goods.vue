<template>
  <div class="goods-wrapper">
    <!--左侧菜单分类-->
    <div class="names" ref="nameWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="name-item" @click="selectedMenu(index,$event)"
            :class="{'current':index === currentIndex}">
        <span class="text">
          <icon :width="16" :height="16" v-show="item.type>0" :type="item.type"></icon>
          {{item.name}}
        </span>
        </li>
      </ul>
    </div>
    <!--左侧菜单分类结束-->
    <!--右侧商品列表-->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul class="foods-list">
        <li v-for="item in goods" class="food-item-hook">
          <!--菜品类别-->
          <h1 class="title">{{item.name}}</h1>
          <!--菜品类别结束-->
          <!--菜单详情-->
          <div class="list-wrapper" v-show="item.foods">
            <router-link class="food-item" @click="show(index)" v-for="(food,index) in item.foods" to="/detail"
                         :key="index">
              <img :src="food.icon" alt="icon" class="icon">
              <div class="content">
                <!--菜品名称-->
                <h1 class="food-name">{{food.name}}</h1>
                <!--菜品名称结束-->
                <!--菜品描述-->
                <div class="description">{{food.description}}</div>
                <!--菜品描述结束-->
                <!--销量评价-->
                <div class="count-rating">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <!--销量评价结束-->
                <!--价格-->
                <div class="price clearfix">
                  <span class="current-price"> ¥{{food.price}}</span>
                  <span class="old-price" v-show="food.oldPrice">¥<del>{{food.oldPrice}}</del></span>
                  <!--添加购物车按钮结束-->
                  <i class="icon-add_circle"></i>
                  <!--添加购物车按钮结束-->
                  <!--删除购物车按钮-->
                  <i class="icon-remove_circle_outline"></i>
                  <!--删除购物车按钮-->
                </div>
                <!--价格结束-->
              </div>

            </router-link>
          </div>
          <!--菜单详情结束-->
        </li>
      </ul>
    </div>
    <!--右侧商品列表结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Icon from 'components/icon/icon'
  import BScroll from 'better-scroll'

  const ERR_OK = 0
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    methods: {
      show(index) {
        alert(index)
      },
      selectedMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let el = this.$refs.foodsWrapper.getElementsByClassName('food-item-hook')[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.nameWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-item-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      }
    },
    created: function () {
      this.$http.get('/api/goods').then((response) => {
        if (response.body.errno === ERR_OK) {
          this.goods = response.body.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="less">
  @import '../../common/less/mixin.less';
  .goods-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    border-top: 1px solid rgba(7, 17, 27, .1);
    .names {
      flex: 0 0 80px;
      width: 80px;
      height: 100%;
      overflow: auto;
      &.names::-webkit-scrollbar {
        display: none;
      }
      .name-item {
        display: table;
        height: 54px;
        width: 100%;
        padding: 0 12px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: #f3f5f7;
        &.current {
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background: #fff;
          .text {
            border-bottom: none;
          }
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          color: #333;
          line-height: 14px;
          .border-1px(rgba(7, 17, 27, .1));
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      max-height: 100%;
      overflow: auto;
      &.foods-wrapper::-webkit-scrollbar {
        display: none;
      }
      .foods-list {
        .title {
          height: 52px;
          line-height: 52px;
          padding-left: 14px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          background: #f3f5f7;
          border-left: 1px solid #d9dde1;
        }
        .list-wrapper {
          padding: 0 18px;
          .food-item {
            display: flex;
            padding: 18px 0;
            font-size: 0;
            border-bottom: 1px solid rgba(7, 17, 27, .1);
            &.food-item:last-child {
              border-bottom: none;
            }
            .icon {
              flex: 0 0 57px;
              width: 57px;
              height: 57px;
              margin-right: 10px;
            }
            .content {
              flex: 1;
              margin-top: 2px;
              .food-name {
                line-height: 14px;
                font-size: 14px;
                color: rgb(7, 17, 27);
              }
              .description {
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 10px;
                margin: 8px 0;
              }
              .count-rating {
                font-size: 10px;
                line-height: 10px;
                color: rgb(147, 153, 159);
                .rating {
                  margin-left: 12px;
                }
              }
              .price {
                font-size: 0;
                width: 100%;
                margin-top: 8px;
                color: rgb(240, 20, 20);
                .current-price {
                  float: left;
                  height: 24px;
                  line-height: 24px;
                  font-size: 14px;
                  font-weight: 700;
                  margin-right: 8px;
                }
                .old-price {
                  float: left;
                  height: 24px;
                  line-height: 24px;
                  font-size: 10px;
                  color: rgb(147, 153, 159);
                  font-weight: normal;
                  del {
                    font-weight: 700;
                  }
                }
                .icon-remove_circle_outline, .icon-add_circle {
                  float: right;
                  height: 24px;
                  line-height: 24px;
                  font-size: 24px;
                  color: rgb(0, 160, 220);
                }
                .icon-remove_circle_outline {
                  margin-right: 24px;
                }
              }
            }
          }

        }
      }
    }
  }
</style>
