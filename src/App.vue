<template>
  <div class="app">
     <b-navbar sticky type="inverse" variant="inverse">
        <b-link class="navbar-brand navbar-header text-center" to="#">
          <span>Legados</span>
        </b-link>
    </b-navbar>
    <br />
    <div class="container">    
      <h4>Legacy and Core Values</h4>
      <create-core-value/>
    </div>
    
    <div class="footer">
         <legados-nav></legados-nav>
    </div>
  </div>
</template>

<script>
import CreateCoreValue from './components/CreateCoreValue.vue'
import LegadosNav from './components/LegadosNav.vue'

export default {
  name: 'app',
  components: {
     'create-core-value': CreateCoreValue,
     'legados-nav': LegadosNav 
  },
}
</script>

