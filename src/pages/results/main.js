import Vue from 'vue'
import Results from './Results.vue'

Vue.config.productionTip = false
window.VueEventBus = new Vue();

/**
 * Debugging tools.
 */
window.results = function() {
  return JSON.parse(localStorage.getItem('submissions-jan'));
}

/**
 * Vue instance.
 */
new Vue({
  render: h => h(Results),
}).$mount('#app');