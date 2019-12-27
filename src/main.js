import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
window.VueEventBus = new Vue();

/**
 * Debugging tools.
 */
window.reset = function() {
  localStorage.removeItem('quiz');
}

window.dev = true;

/**
 * Vue instance.
 */
new Vue({
  render: h => h(App),
}).$mount('#app');
