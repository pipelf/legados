import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var fireconf = require("./fireconf");
 
 
var legadosapp = firebase.initializeApp(fireconf);



// Start the app
new Vue({
  el: '#app',
  render: h => h(App)
})