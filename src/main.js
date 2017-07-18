import Vue from 'vue'
import VueRouter from 'vue-router'
import '../css/style.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
// import 'vue-material-home/vue-material.css'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.config.productionTip = false
//http://vuematerial.io/#/

// Vue.use(VueMaterial.MdCore) //Required to boot vue material
// Vue.use(VueMaterial.MdButton)
// Vue.use(VueMaterial.MdIcon)
// Vue.use(VueMaterial.MdSidenav)
// Vue.use(VueMaterial.MdToolbar)


import App from './App.vue'
import firebase from 'firebase'

var fireconf = require("./fireconf");
 
 
var legadosapp = firebase.initializeApp(fireconf);


import Home from './views/home.vue';
import CoreValues from './views/corevalues.vue';
import Okrs from './views/okrs.vue';
import FocusOn from './views/focuson.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/corevalues',
        name: 'corevalues',
        component: CoreValues
    },
    {
        path: '/okrs',
        name: 'okrs',
        component: Okrs
    },
    {
        path: '/focuson',
        name: 'focuson',
        component: FocusOn
    }]
});

// Start the app
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})