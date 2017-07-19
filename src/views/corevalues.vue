<template>
    <md-whiteframe md-elevation="1" class="corevalues phone-viewport">
         <md-subheader>Core Values</md-subheader>

          <md-list class="md-triple-line">

            <md-list-item v-for="(corev, index) in corevalues">
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">filter_{{index + 1}}</md-icon>
                </md-button>
            
                <div class="md-list-text-container">
                    <span>{{corev.title}}</span>
                    <p>{{corev.description}}</p>
                </div>
        
                <md-divider class="md-inset"></md-divider>
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
    </md-whiteframe>
</template>

<script>

var corevaluesitems = [{
            title: 'Core value 1',
            description: 'this is a core value'
        },
        {
            title: 'core v 2',
            description: 'this is a core value'
        },
        {
            title: 'dkfjk',
            description: 'this is a core value'
        },
        {
            title: 'hello',
            description: 'this is a core value'
        },
        {
            title: 'hello',
            description: 'this is a core value'
        },
    ];

export default {
    methods: {
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        createCoreValue(ref) {
            corevaluesitems.push({
                title: this.newcore,
                description: this.newdescription
            });
            
            this.newcore = '';
            this.newdescription = '';
            
            this.$refs[ref].close();
        },
        onOpen() {
            console.log('Opened');
        },
        onClose(type) {
            console.log('Closed', type);
        }
    },
    data : () => ({
        corevalues : corevaluesitems,
        newcore : '',
        newdescription : ''
    })
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