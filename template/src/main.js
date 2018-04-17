{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import pagodaComponents from 'pagoda-ui'
import utils from './utils/index'

pagodaComponents.formGroup.registerComponents({
  'bdc-select': {
    component: pagodaComponents.bdcSelect
  }
})
Vue.use(ElementUI, { size: 'small' })
pagodaComponents.erpTable.redirectUrl = 'xxx' // 登录超时，跳转单点登录链接
pagodaComponents.bdcSelect.redirectUrl = 'xxx' // 登录超时，跳转单点登录链接
Vue.use(pagodaComponents)
Vue.use(utils)
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
