import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
var fireconf = require("./fireconf")
 
var legadosapp = firebase.initializeApp(fireconf);

console.log("here "+ legadosapp.name);

// Start the app
new Vue({
  el: '#app',
  render: h => h(App)
})