<template>
  <div class="app">
    <md-toolbar class="fixed">
      <md-button class="md-icon-button" href="/#/">
        <md-icon>home</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Legados</h2>
    </md-toolbar>
    
    <main class="main-content" id="legadosviews">
      <router-view></router-view>
    </main>
    
    <legados-nav></legados-nav>
  </div>
</template>

<script>
import LegadosNav from './components/LegadosNav.vue'

export default {
  name: 'app',
  components: {
     'legados-nav': LegadosNav,
  },
}
</script>

<style>

.fixed {
  position:sticky;
  position: -webkit-sticky;
  top:0;
  z-index: 100;
}
  
</style>

