<template>
    <md-whiteframe md-elevation="1" class="content phone-viewport">
        <md-subheader>Objectives and Key Results</md-subheader>
        
        <md-bottom-bar id="add">
            <md-button id="fab-add" class="md-fab md-fab-bottom-right addobj" @click="openDialog('addobjective-dialog')">
                <md-icon>add</md-icon>
            </md-button>
        </md-bottom-bar>
    </md-whiteframe>
</template>

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

</style>