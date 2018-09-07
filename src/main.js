import Vue from 'vue';
import 'normalize.css';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.use(Vuesax);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
