import Vue from 'vue'
import '../css/style.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
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


// Start the app
new Vue({
  el: '#app',
  render: h => h(App)
})