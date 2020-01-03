import Vue from 'vue'
import App from './App';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//Add middleware
Vue.use(BootstrapVue);
Vue.config.productionTip = false

//Create vue instance
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});