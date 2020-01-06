import Vue from 'vue'
import Results from './Results.vue'

Vue.config.productionTip = false
window.VueEventBus = new Vue();

/**
 * Vue instance.
 */
new Vue({
  render: h => h(Results),
}).$mount('#app');