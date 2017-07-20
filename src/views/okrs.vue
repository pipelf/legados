<template>
    <md-whiteframe md-elevation="0" class="content phone-viewport">
        <md-subheader>Objectives and Key Results</md-subheader>
        
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
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">delete</md-icon>
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
                    <md-select name="corevlaue">
                          <md-option value="volvo">Volvo</md-option>
                          <md-option value="saab">Saab</md-option>
                          <md-option value="mercedes">Mercedes</md-option>
                          <md-option value="audi">Audi</md-option>
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
    </md-whiteframe>
</template>

<script>

// import firebase from 'firebase'
// var fireconf = require("../fireconf");
// var fireapp = firebase.initializeApp(fireconf);

var objectivesdata = [
        {
            name : 'Some objective',
            corevalue : 'a core value',
            keyresults : [
                { name: 'This is a long key result which could be common', duedate: '7/20/2017'},
                { name: 'key result 2', duedate: '7/20/2017'},
                { name: 'key result 3', duedate: 'None'},
            ]
        },
        {
            name : 'Some objective',
            corevalue : 'a core value',
            keyresults : [
                { name: 'key result 1', duedate: '7/20/2017'},
                { name: 'key result 2', duedate: '7/20/2017'},
                { name: 'key result 3', duedate: 'None'},
            ]
        },
        {
            name : 'Some objective',
            corevalue : 'a core value',
            keyresults : [
                { name: 'key result 1', duedate: '7/20/2017'},
                { name: 'key result 2', duedate: '7/20/2017'},
                { name: 'key result 3', duedate: 'None'},
            ]
        },
        {
            name : 'Some objective',
            corevalue : 'a core value',
            keyresults : [
                { name: 'key result 1', duedate: '7/20/2017'},
                { name: 'key result 2', duedate: '7/20/2017'},
                { name: 'key result 3', duedate: 'None'},
            ]
        },
        {
            name : 'Some objective',
            corevalue : 'a core value',
            keyresults : [
                { name: 'key result 1', duedate: '7/20/2017'},
                { name: 'key result 2', duedate: '7/20/2017'},
                { name: 'key result 3', duedate: 'None'},
            ]
        }
    ];

// var cvs = fireapp.database().ref('corevalues');

// cvs.on("child_added", function(data){
//     let corev = data.val();
//     corev.key = data.key;
//     corevaluesitems.push(corev);
// });

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
                objective: this.newobjective
            };
            
            //let corekey = fireapp.database().ref().child('objectives').push(newobjective);
            
            this.newobjective = '';
            
            this.$refs[ref].close();
        },
        // deleteCoreValue (m, event) {
        //     let key = event.target.getAttribute('data-key');
        //     fireapp.database().ref('corevalues').child(key).remove().then(function() {
        //         //let filtered = this.corevaluesitems.filter((item) => item.key != key);
        //         event.target.parentNode.parentNode.remove();
        //     });
        // },
        onOpen() {
            console.log('Opened');
        },
        onClose(type) {
            console.log('Closed', type);
        }
    },
    data : () => ({
        objectives : objectivesdata,
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