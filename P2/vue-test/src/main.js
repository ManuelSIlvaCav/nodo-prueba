import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { routerHistory, writeHistory } from 'vue-router-back-button'

/*
	vue-router installation and configuration
*/

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(VueRouter)
Vue.use(routerHistory)
/*
  vue installation.
*/

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

router.afterEach(writeHistory)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
