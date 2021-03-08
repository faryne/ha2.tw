import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import numberFormat from "./filters/integer"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.filter(numberFormat)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
