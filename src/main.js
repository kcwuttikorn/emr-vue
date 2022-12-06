import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
//import VueWindowSize from 'vue-window-size';
import VueResize from 'vue-resize'

Vue.config.productionTip = false

Vue.config.ignoredElements = ['field', 'block', 'category', 'xml', 'mutation', 'value', 'sep']

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')

//Vue.use(VueWindowSize);
Vue.use(VueResize);