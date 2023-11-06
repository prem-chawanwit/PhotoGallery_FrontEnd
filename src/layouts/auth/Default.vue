<!-- src/auth/Default.vue -->
<template>
  <v-app>
    <AppBar />
    <Footer />
    <MainView />
  </v-app>
</template>

<script setup>
  import AppBar from './AppBar.vue';
  import Footer from './Footer.vue';
  import MainView from './View.vue';
</script>
