import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import DaySpanVuetify from 'dayspan-vuetify';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.use( DaySpanVuetify, {
  // options is vue definition, the resulting reactive component is stored in components as
  // this.$dayspan or Vue.$dayspan
  data: {
    // data or computed to override
  },
  computed: {
    // data or computed to override
  },
  methods: {
    getDefaultEventColor: () => '#1976d2',
  },
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
