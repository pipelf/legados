<template>
  <div class="app">
     <b-navbar sticky type="inverse" variant="inverse">
        <b-link class="navbar-brand navbar-header text-center" to="#">
          <span>Legados</span>
        </b-link>
    </b-navbar>
    <br />
    
    <div id="legadosviews" class="container" style="height:100vh;">
       <div id="corevalues">
          <h4>Legacy and Core Values</h4>
          <create-core-value/>
          <corevalues></corevalues>
          <corevalues></corevalues>
          <corevalues></corevalues>
          <corevalues></corevalues>
          <corevalues></corevalues>
      </div>
        
        <div id="okrs">
           <h4>Objectives and Key Results</h4>
           <corevalues></corevalues>
           <corevalues></corevalues>
           <corevalues></corevalues>
        </div>
        
        <div id="focuson">
          <h4>Priorities to Focus On</h4>
          <corevalues></corevalues>
          <corevalues></corevalues>
          <corevalues></corevalues>
          <corevalues></corevalues>
          <corevalues></corevalues>
        </div>
    </div>
   
    
    <div class="footer">
         <legados-nav></legados-nav>
    </div>
  </div>
</template>

<script>
import CreateCoreValue from './components/CreateCoreValue.vue'
import LegadosNav from './components/LegadosNav.vue'
import CoreValues from './components/CoreValues.vue'

export default {
  name: 'app',
  components: {
     'create-core-value': CreateCoreValue,
     'legados-nav': LegadosNav,
     'corevalues' : CoreValues
  },
}
</script>

