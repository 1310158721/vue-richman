import 'reset.css'
import '@/assets/js/rem'
import '@/assets/css/transition.css'

import Vue from 'vue'
import Activity from './Activity.vue'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  render: h => h(Activity)
}).$mount('#app')
