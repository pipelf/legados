<template>
  <div class="app">
    <md-toolbar>
      <h1 class="md-title">Legados</h1>
    </md-toolbar>

    
    <main class="main-content" id="legadosviews">
       <div id="corevalues">
          <span class="md-headline">Legacy and Core Values</span>
          <create-core-value/>
          <corevalues></corevalues>

      </div>
     <legados-nav></legados-nav>
    </main>
   
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

