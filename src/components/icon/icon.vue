<template>
  <div ref="abc" class="icon" :class="iconType"></div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      height: {
        type: Number
      },
      width: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    computed: {
      iconType: function () {
        return this.classMap[this.type]
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted: function () {
      this.$refs.abc.style.backgroundSize = this.width + 'px ' + this.height + 'px'
      this.$refs.abc.style.width = this.width + 'px'
      this.$refs.abc.style.height = this.height + 'px'
    }
  }
</script>

<style lang="less">
  @import '../../common/less/mixin.less';

  .icon {
    display: inline-block;
    vertical-align: top;
    background-repeat: no-repeat;
    &.decrease {
      .bg-image('decrease_2')
    }
    &.invoice {
      .bg-image('invoice_2')
    }
    &.guarantee {
      .bg-image('guarantee_2')
    }
    &.discount {
      .bg-image('discount_2')
    }
    &.special {
      .bg-image('special_2')
    }
  }
</style>
