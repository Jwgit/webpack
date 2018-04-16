import http from './http'
export default {
  install(Vue, options) {
    /**
     * 注册http
     */
    Vue.prototype.$http = http
  }
}
