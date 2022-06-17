import Vue from 'vue'
// import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'
import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'
import ApiService from '@/services/api.service'
import BootstrapVue from 'bootstrap-vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'
// Axios Mock Adapter
import '@/@fake-db/db'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
axios.defaults.baseURL = "http://customspr-api.apptest.uz/api/";
const token = localStorage.getItem('auth_token')
if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
// console.log(axios.defaults.headers.common['Authorization'])
ApiService.mount401Interceptor()
// BSV Plugin Registration
// Vue.use(ToastPlugin)
// Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)
Vue.use(BootstrapVue)
// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
