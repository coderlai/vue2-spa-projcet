import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import '!style-loader!css-loader!less-loader!./common/less/index.less'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
Vue.filter('arrFilter', function (value) {
  console.log('选中商品', value)
  return value
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
