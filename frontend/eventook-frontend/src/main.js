import Buefy from 'buefy';

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';

import 'boxicons';

Vue.config.productionTip = true;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
