import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// test env
import plugins from '../plugins'
Vue.use(plugins,'YYYY')

// prod env
// import TutClipClock from 'tut-clip-clock'
// Vue.use(TutClipClock)

new Vue({
  render: h => h(App),
}).$mount('#app')
