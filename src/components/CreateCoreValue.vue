<template>
    <div class="corevalue">
        <b-form-fieldset
            description="Enter a Core value for your legacy"
            label="Enter a Core Value"
            :feedback="feedback" 
            :state="state">
            
            <b-form-input :state="state" textarea="true" v-model="newcorevalue" rows=5 ></b-form-input>
        </b-form-fieldset>
        
        <div>{{newcorevalue}}</div>
        
        <b-btn size="lg" variant="primary">Add</b-btn>
        
        <slot></slot>
    </div>
</template>

<script>
    export default {
        computed: {
            feedback() {
              return this.newcorevalue.length ? '' : 'Please enter something';
            },
            state() {
              return this.newcorevalue.length ? 'success':'warning';
            },
        },
        data: () => ({
            newcorevalue: ''
        })
    }
</script>

<style>
    
</style>