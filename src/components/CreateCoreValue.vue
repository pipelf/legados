<template>
    <div class="corevalue">
        <b-form-fieldset label="Enter a Core value for your legacy"
            :feedback="feedback" 
            :state="state">
            <b-form-input :state="state" v-model="newcorevalue"></b-form-input>
        </b-form-fieldset>
        
        <b-form-fieldset label="Enter a Description for this core value"
            :feedback="descfeedback">
            <b-form-input textarea="true" v-model="description" rows="5"></b-form-input>
        </b-form-fieldset>
        
        <b-btn size="lg" variant="primary">Save</b-btn>
        
        <hr />
    
        <template v-if="newvalue">
            <b-card :title="newcorevalue" class="mb-2" show-footer>
                <div>{{description}}</div>
                <small slot="footer" class="text-muted">
                     {{timestamp}}
                </small>
            </b-card>
        </template>
    </div>
</template>

<script>
    export default {
        computed: {
            feedback() {
              return this.newcorevalue.length ? '' : '';
            },
            state() {
              return this.newcorevalue.length ? 'success':'warning';
            },
            timestamp() {
                let msg = 'Last updated at ';

                let dt = new Date();
                let utcDate = dt.toLocaleTimeString();
                
                return  this.newcorevalue.length ? msg + dt : '';
            },
            newvalue() {
                return this.newcorevalue.length > 0;
            }
        },
        data: () => ({
            newcorevalue: '', 
            description: ''
        })
    }
</script>

<style>
    
</style>