<template>
    <div class="content phone-viewport">
        <md-subheader>Objectives and Key Results</md-subheader>
        <md-divider></md-divider>
        
        <md-list>
            <md-list-item class="okrlistitem" v-for="(objective, index) in objectives" :ref="objective.key">
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
  
                <md-button class="md-icon-button md-list-action" v-on:click="deleteObjective(objective.key, objective.corevaluekey)">
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

var objectivesdata = {};

var corevref = fireapp.database().ref('corevalues').orderByChild('objectives');

var processobjectives = function(data) {
    let corevalue = data.val().title;
    let corevaluekey = data.key;
    
    for(var key in data.val().objectives) {
        if(objectivesdata[key]) { continue; }
        
        let obj =  data.val().objectives[key];
        obj.key = key;
        obj.corevalue = corevalue;
        obj.corevaluekey = corevaluekey;
        objectivesdata[key] = obj;
    }
};

corevref.on("child_added", processobjectives);
corevref.on("child_changed", processobjectives);

var corevalueoptions = {};

var cvs = fireapp.database().ref('corevalues');

cvs.once("value").then(function(data){
    let corevalues = data.val();
    for(var key in corevalues) {
        corevalueoptions[key] = corevalues[key];
    }
});

export default {
    methods: {
        openDialog(ref) {
            let vm = this;

            
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        createObjective(ref) {
            let newobjective = {
                name: this.newobjective,
            };
            
            fireapp.database().ref().child('corevalues/'+this.corevaluekey+'/objectives').push(newobjective);
            
            this.newobjective = '';
            this.corevaluekey = '';
            
            this.$refs[ref].close();
        },
        deleteObjective (key, corevkey) {
            
            let vm = this;
            fireapp.database().ref('corevalues/'+corevkey+'/objectives').child(key).remove().then(function() {
                delete vm.objectives[key];
                vm.$refs[key][0].$el.remove()
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
        corevalueoptions : corevalueoptions,
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