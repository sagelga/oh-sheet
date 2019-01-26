import Vue from 'vue';
import 'normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/th';
import 'material-icons/iconfont/material-icons.css';
import store from './store';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
