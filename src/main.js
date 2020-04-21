import Vue from 'vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: 'UA-67412993-2' },
}, router);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
