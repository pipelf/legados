<template>
    <div class="corevalues phone-viewport">
        <md-subheader>Focus On</md-subheader>
        <md-divider></md-divider>
        
        <!--<md-list>-->
        <!--    <md-list-item v-for="keyr in getkeyresults">-->
        <!--        <div class="md-list-text-container">-->
        <!--            <span class="md-body-2">{{keyr.name}}</span>-->
        <!--        </div>-->
        <!--    </md-list-item>-->
        <!--</md-list>-->
        
        <md-list>
            <!--<div v-for="corevalue in corevalues">-->
                <!--<div v-for="(objective, objkey) in corevalue.objectives">-->
                    <md-list-item v-for="keyresult in getkeyresults">
                    <!--<md-list-item v-for="(keyresult, keyresultkey) in objective.keyresults">-->
                        <div class="md-list-text-container">
                            <span class="md-body-2">{{keyresult.name}}</span>
                            <!--<span>{{objective.name}}</span>-->
                            <!--<span class="md-caption">{{corevalue.title}}</span>-->
                        </div>
                        <md-divider></md-divider>
                    </md-list-item>
                <!--</div>-->
            <!--</div>-->
        </md-list>
     </div>
</template>

<script>
    import firebase from 'firebase'
    var db = firebase.app().database();
    
    export default {
        computed: {
          getkeyresults: function () {
             
             var vm = this;   
             this.corevalues.forEach(function(item) {

                for(var objkey in item.objectives) {
                    var obj = item.objectives[objkey];
                    
                    for(var key in obj.keyresults) {
                        var keyresult = obj.keyresults[key];
                        
                        vm.keyresults.push(keyresult);    
                    }
                }
              })
              return this.keyresults;
          }  
        },
        methods: {
            
        },
        data: () => ({
            corevalues: {},
            keyresults: []
        }),
        firebase: {
            corevalues : db.ref('corevalues')
        }
    }
    
</script>