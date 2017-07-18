<template>
    <div class="corevalues phone-viewport">
        <h2>Core Values</h2>
        
          <md-list class="md-triple-line">
            <md-list-item class="">
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">filter_1</md-icon>
                </md-button>
            
                <div class="md-list-text-container">
                    <span>This is a core value</span>
                    <p>I'll be in your neighborhood doing errands...</p>
                </div>
        
                <md-divider class="md-inset"></md-divider>
            </md-list-item>
            
            <md-list-item class="">
                <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">filter_2</md-icon>
                </md-button>
            
                <div class="md-list-text-container">
                    <span>This is a core value</span>
                    <p>I'll be in your neighborhood doing errands...</p>
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
                <md-textarea></md-textarea>
              </md-input-container>
            </form>
            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog('addcore-dialog')">Cancel</md-button>
                <md-button class="md-primary" @click="closeDialog('addcore-dialog')">Create</md-button>
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
export default {
    methods: {
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        onOpen() {
            console.log('Opened');
        },
        onClose(type) {
            console.log('Closed', type);
        }
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

</style>