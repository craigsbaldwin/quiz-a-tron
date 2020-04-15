import Vue from 'vue'
import Leaderboard from './Leaderboard.vue'

Vue.config.productionTip = false
window.VueEventBus = new Vue();

/**
 * Debugging tools.
 */
window.leaderboard = function() {
  return JSON.parse(localStorage.getItem('leaderboard'));
}

/**
 * Vue instance.
 */
new Vue({
  render: h => h(Leaderboard),
}).$mount('#app');