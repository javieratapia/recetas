import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'
import {firebaseConfig} from './config/firebaseConfig'


firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(()=>{
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
})
