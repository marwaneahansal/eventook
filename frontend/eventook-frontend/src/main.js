import Buefy from 'buefy';

import Vue from 'vue';
import App from './App';
import router from './router';

import 'boxicons';

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
