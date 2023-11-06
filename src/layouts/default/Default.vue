<!-- src/layouts/default/Default.vue -->

<template>
  <v-app>
    <Sidebar />
    <AppBar />
    <MainView />
  </v-app>
</template>

<script setup>
  import AppBar from './AppBar.vue';
  import Sidebar from './Sidebar.vue';
  import MainView from './View.vue';
</script>
