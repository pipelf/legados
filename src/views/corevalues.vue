<template>
    <div class="corevalues phone-viewport">
         <md-subheader>Core Values</md-subheader>
          <md-divider></md-divider>

          <md-list class="md-triple-line">

            <md-list-item v-for="corev in corevalues" :ref="corev['.key']">
                <div class="md-list-text-container">
                    <span>{{corev.title}}</span>
                    <p>{{corev.description}}</p>
                </div>
                
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
                    
                    <md-menu-item v-on:click="deleteCoreValue(corev['.key'])">
                      <md-icon>delete</md-icon>
                      <span>Delete</span>
                    </md-menu-item>
                  </md-menu-content>
                </md-menu>
        
                <md-divider></md-divider>
            </md-list-item>
          </md-list>
        
        <md-dialog md-open-from="#fab-add" md-close-to="#fab-add" ref="addcore-dialog">
            <md-dialog-title>Create new Core Value</md-dialog-title>
            
            <md-dialog-content>
            <form>
              <md-input-container>
                <label>Core Value</label>
                <md-input v-model="newcore"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Description</label>
                <md-textarea v-model="newdescription"></md-textarea>
              </md-input-container>
            </form>
            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('addcore-dialog')">Cancel</md-button>
                <md-button class="md-primary" @click="createCoreValue('addcore-dialog')">Create</md-button>
            </md-dialog-actions>
        </md-dialog>
                
        <md-bottom-bar id="add">
            <md-button id="fab-add" class="md-fab md-fab-bottom-right addcore" @click="openDialog('addcore-dialog')">
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
        createCoreValue(ref) {
            var newcorevalue = {
                title: this.newcore,
                description: this.newdescription
            };
            
            this.$firebaseRefs.corevalues.push(newcorevalue);
            
            this.newcore = '';
            this.newdescription = '';
            
            this.$refs[ref].close();
        },
        deleteCoreValue (key) {
            this.$firebaseRefs.corevalues.child(key).remove();
        }
    },
    data : () => ({
            newcore : '',
            newdescription : '',
            corevalues : {}
    }),
    firebase: {
        corevalues : db.ref('corevalues')
    }
};

</script>

<style>

.addcore {
    bottom:70px !important;
}

#add {
    position: fixed;
    z-index: 100; 
    bottom: 0; 
    left: 0;
    width: 100%;
}

.corevalues {
    margin-bottom:50px;
    padding: 10px;
}

</style>