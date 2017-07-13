<template>
  <div class="app">
    <md-toolbar>
      <h1 class="md-title">Legados</h1>
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

