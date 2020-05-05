import Vue from 'vue'
import Router from 'vue-router'
import switchCheck from '@/components/switch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'switch',
      component: switchCheck
    }
  ]
})
