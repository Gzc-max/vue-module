import Vue from 'vue'
import Router from 'vue-router'
import datePicker from '../static/js/dataPicker'
Vue.use(Router)
Vue.use(datePicker)

export default new Router({
  routes: [
    {
      path: '/switch',
      name: 'switch', 
      components: {
        "subPage": resolve => require(["../components/switch.vue"], resolve)
      }
    },{
      path: '/list',
      name: 'list', 
      components: {
        "subPage": resolve => require(["../components/list.vue"], resolve)
      }
    },{
      path: '/timeControl',
      name: 'timeControl', 
      components: {
        "subPage": resolve => require(["../components/timeControl.vue"], resolve)
      }
    },{
      path: '/redPacket',
      name: 'redPacket', 
      components: {
        "subPage": resolve => require(["../components/redPacket.vue"], resolve)
      }
    }
  ]
})
