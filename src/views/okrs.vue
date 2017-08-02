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
                            <md-list-item class="key-result" v-for="(keyresult, keyresultkey) in objective.keyresults">
                                <div class="md-list-text-container">
                                    <span>{{keyresult.name}}</span>
                                    <span class="md-caption">{{keyresult.duedate}}</span>
                                </div>
                                
                                <md-menu>
                                  <md-button class="md-icon-button" md-menu-trigger>
                                    <md-icon>more_vert</md-icon>
                                  </md-button>
                                
                                  <md-menu-content>
                                      
                                      <!--onclick open dialog with <datepicker></datepicker>-->
                                    <md-menu-item  @click="openDialog('set-duedate-dialog')"> 
                                      <md-icon>date_range</md-icon>
                                      <span>Due Date</span>
                                    </md-menu-item>
                                    
                                    <md-menu-item>
                                      <md-icon>pageview</md-icon>
                                      <span>view</span>
                                    </md-menu-item>
                                
                                    <md-menu-item>
                                      <md-icon>edit</md-icon>
                                      <span>Edit</span>
                                    </md-menu-item>
                                    
                                    <md-menu-item v-on:click="deleteKeyResult(objkey, corevalue['.key'], keyresultkey)">
                                      <md-icon>delete</md-icon>
                                      <span>Delete</span>
                                    </md-menu-item>
                                  </md-menu-content>
                                </md-menu>
             
                            </md-list-item>
                        
                            <md-list-item class="key-result">
                                <md-input-container>
                                    <md-input placeholder="Enter a new Key Result" v-model="newkeyresult" v-on:keyup.enter.native="addKeyResult(corevalue['.key'], objkey)"></md-input>
                                    <md-button class="md-icon-button md-mini" v-on:click="addKeyResult(corevalue['.key'], objkey)">
                                        <md-icon>navigate_next</md-icon>
                                    </md-button>
                                </md-input-container>
                            </md-list-item>
                        </md-list>
                    </md-list-expand>
                    
                    <md-menu>
                      <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>more_vert</md-icon>
                      </md-button>
                    
                      <md-menu-content>
                          
                        <md-menu-item>
                          <md-icon>pageview</md-icon>
                          <span>view</span>
                        </md-menu-item>
                    
                        <md-menu-item>
                          <md-icon>edit</md-icon>
                          <span>Edit</span>
                        </md-menu-item>
                        
                        <md-menu-item v-on:click="deleteObjective(objkey, corevalue['.key'])">
                          <md-icon>delete</md-icon>
                          <span>Delete</span>
                        </md-menu-item>
                      </md-menu-content>
                    </md-menu>
                    
                    <!--<md-divider></md-divider>-->
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
        
         <md-dialog md-open-from="#dateaction" md-close-to="#dateaction" ref="set-duedate-dialog">
            <md-dialog-title>Set Due Date</md-dialog-title>
            <md-dialog-content>
            <form>
                <!--<md-input-container>-->
                <!--    <label for="recuring">How often</label>-->
                <!--    <md-select name="corevlaue" v-model="corevaluekey">-->
                <!--          <md-option v-for="option in corevalues" v-bind:value="option['.key']">{{ option.title }}</md-option>-->
                <!--    </md-select>-->
                <!--</md-input-container>-->
                <md-input-container>
                     <label>Due Date</label>
                     <md-input></md-input>
                     <!--<datepicker v-model="date"></datepicker>-->
                </md-input-container>
            </form>
            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('set-duedate-dialog')">Cancel</md-button>
                <md-button class="md-primary" @click="saveDueDate('set-duedate-dialog')">Save</md-button>
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
// import DatePicker from 'vue-date'

export default {
    components: {
    //  'datepicker': DatePicker
    },
    methods: {
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        createObjective(ref) {
            var newobjective = {
                name: this.newobjective,
            };
            
            this.$firebaseRefs.corevalues.child(this.corevaluekey).child('objectives').push(newobjective);
            
            this.newobjective = '';
            this.corevaluekey = '';
            
            this.$refs[ref].close();
        },
        deleteObjective (key, corevkey) {
            this.$firebaseRefs.corevalues.child(corevkey).child('objectives').child(key).remove();
        },
        addKeyResult (corevkey, objkey) {
            var keyresult = { name : this.newkeyresult };
            
            this.$firebaseRefs.corevalues.child(corevkey)
                .child('objectives').child(objkey).child('keyresults').push(keyresult);
            
            this.newkeyresult = '';
        },
        deleteKeyResult (key, corevkey, keyresultkey) {
            this.$firebaseRefs.corevalues.child(corevkey).child('objectives').child(key)
                .child('keyresults').child(keyresultkey).remove();
        },
    },
    data : () => ({
        corevalues : {},
        corevaluekey : '',
        newobjective : '',
        newkeyresult : '',
        date: ''
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

.md-dialog {
    max-width: 100% !important;
    max-height: 100% !important;
    width: 100% !important;
    height: 100% !important;
}
</style>