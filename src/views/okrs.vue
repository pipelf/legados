<template>
    <div class="content phone-viewport">
        <md-subheader>Objectives and Key Results</md-subheader>
        <md-divider></md-divider>
        
        <md-list>
            <md-list-item class="okrlistitem" v-for="(objective, index) in objectives">
                <div class="md-list-text-container">
                    <span class="md-body-2">{{objective.name}}</span>
                    <span class="md-caption">{{objective.corevalue}}</span>
                </div>
                <span></span>
                <md-list-expand>
                     <md-list>
                        <md-list-item class="key-result" v-for="(keyresult, index) in objective.keyresults">
                            <div class="md-list-text-container">
                                <span>{{keyresult.name}}</span>
                                <span class="md-caption">{{keyresult.duedate}}</span>
                            </div>

                            <md-button class="md-icon-button md-list-action">
                                <md-icon class="md-primary">more_vert</md-icon>
                            </md-button>
         
                        </md-list-item>
                    
                        <md-list-item class="key-result">
                            <md-input-container>
                                <md-input placeholder="Enter a new Key Result"></md-input>
                                <md-button class="md-icon-button md-mini">
                                    <md-icon>navigate_next</md-icon>
                                </md-button>
                            </md-input-container>
                        </md-list-item>
                    </md-list>
                </md-list-expand>
  
                <md-button class="md-icon-button md-list-action" v-on:click="deleteObjective('this', $event)">
                    <md-icon class="md-primary" :data-key="objective.key">delete</md-icon>
                </md-button>
                <md-divider></md-divider>
            </md-list-item>
        </md-list>
        
        
        <md-dialog md-open-from="#fab-add" md-close-to="#fab-add" ref="addobjective-dialog">
            <md-dialog-title>Create new Objective</md-dialog-title>
            <md-dialog-content>
            <form>
                <md-input-container>
                    <label for="corevalue">Core Value</label>
                    <md-select name="corevlaue" v-model="corevaluekey">
                          <md-option v-for="option in corevalueoptions" v-bind:value="option.key">{{ option.title }}</md-option>
                    </md-select>
                </md-input-container>
                <md-input-container>
                    <label>Objective</label>
                    <md-textarea v-model="newobjective"></md-textarea>
                </md-input-container>
            </form>
            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('addobjective-dialog')">Cancel</md-button>
                <md-button class="md-primary" @click="createObjective('addobjective-dialog')">Create</md-button>
            </md-dialog-actions>
        </md-dialog>
        
        <md-bottom-bar id="add">
            <md-button id="fab-add" class="md-fab md-fab-bottom-right addobj" @click="openDialog('addobjective-dialog')">
                <md-icon>add</md-icon>
            </md-button>
        </md-bottom-bar>
    </div>
</template>

<script>

import firebase from 'firebase'
var fireconf = require("../fireconf");
var fireapp = firebase.app();

var objectivesdata = [
        // {
        //     name : 'Some objective',
        //     corevaluekey : '-ksdkjddjkld',
        //     corevalue : 'a core value',
        //     keyresults : [
        //         { name: 'This is a long key result which could be common', duedate: '7/20/2017'},
        //         { name: 'key result 2', duedate: '7/20/2017'},
        //         { name: 'key result 3', duedate: 'None'},
        //     ]
        // }
    ];

var objs = fireapp.database().ref('objectives').orderByChild('corevaluekey');

objs.on("child_added", function(data){
    let obj = data.val();
    obj.key = data.key;
    
    let cv = fireapp.database().ref('corevalues/' + obj.corevaluekey).once('value').then(function(snapshot) {
      obj.corevalue = snapshot.val().title;
    }).then(function () {
        objectivesdata.push(obj);
    });
});


var corevaluesdata = [];

var cvs = fireapp.database().ref('corevalues');

cvs.on("child_added", function(data){
    let corev = data.val();
    corev.key = data.key;
    corevaluesdata.push(corev);
});

export default {
    methods: {
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        createObjective(ref) {
            let newobjective = {
                name: this.newobjective,
                corevaluekey: this.corevaluekey
            };
            
            let newobject = fireapp.database().ref().child('objectives').push(newobjective);
            
            this.newobjective = '';
            this.corevaluekey = '';
            
            this.$refs[ref].close();
        },
        deleteObjective (m, event) {
            let key = event.target.getAttribute('data-key');
            fireapp.database().ref('objectives').child(key).remove().then(function() {
                event.target.parentNode.parentNode.parentNode.remove();
            });
        },
        onOpen() {
            console.log('Opened');
        },
        onClose(type) {
            console.log('Closed', type);
        }
    },
    data : () => ({
        objectives : objectivesdata,
        corevalueoptions : corevaluesdata,
        corevaluekey : '',
        newobjective : ''
    })
};
</script>


<style>

.addobj {
    bottom:70px !important;
}

#add {
    position: fixed;
    z-index: 100; 
    bottom: 0; 
    left: 0;
    width: 100%;
}

.content {
    margin-bottom:50px;
    padding: 10px;
}

.okrlistitem {
    margin-top:10px;
}

.key-result {
    padding-left:10px;
}

</style>