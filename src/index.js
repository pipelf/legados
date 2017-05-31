import firebase from 'firebase';
var fireconf = require("./fireconf");
 
var legadosapp = firebase.initializeApp(fireconf);

console.log(legadosapp.name);
