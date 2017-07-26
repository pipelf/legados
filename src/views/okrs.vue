<template>
    <div class="content phone-viewport">
        <md-subheader>Objectives and Key Results</md-subheader>
        <md-divider></md-divider>
        
        <md-list>
            <div v-for="corevalue in corevalues">
                <md-list-item class="okrlistitem" v-for="(objective, objkey) in corevalue.objectives" :ref="objkey">
                    <div class="md-list-text-container">
                        <span class="md-body-2">{{objective.name}}</span>
                        <span class="md-caption">{{corevalue.title}}</span>
                    </div>
                    <span></span>
                    <md-list-expand>
                         <md-list>
                            <md-list-item class="key-result" v-for="keyresult in objective.keyresults">
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
      
                    <md-button class="md-icon-button md-list-action" v-on:click="deleteObjective(objkey, corevalue['.key'])">
                        <md-icon class="md-primary">delete</md-icon>
                    </md-button>
                    <md-divider></md-divider>
                </md-list-item>
            </div>
        </md-list>
        
        
        <md-dialog md-open-from="#fab-add" md-close-to="#fab-add" ref="addobjective-dialog">
            <md-dialog-title>Create new Objective</md-dialog-title>
            <md-dialog-content>
            <form>
                <md-input-container>
                    <label for="corevalue">Core Value</label>
                    <md-select name="corevlaue" v-model="corevaluekey">
                          <md-option v-for="option in corevalues" v-bind:value="option['.key']">{{ option.title }}</md-option>
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
var db = firebase.app().database();

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
            };
            
            this.$firebaseRefs.corevalues.child(this.corevaluekey).child('objectives').push(newobjective);
            
            this.newobjective = '';
            this.corevaluekey = '';
            
            this.$refs[ref].close();
        },
        deleteObjective (key, corevkey) {
            this.$firebaseRefs.corevalues.child(corevkey).child('objectives').child(key).remove();
        }
    },
    data : () => ({
        corevalues : {},
        corevaluekey : '',
        newobjective : ''
    }),
    firebase: {
        corevalues : db.ref('corevalues')
    }
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