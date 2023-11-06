<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-icon icon="mdi mdi-image-multiple"  color="info"/>
      Welcome to Gallery App v.1.0.0
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const menuOpen = ref(false);

// Add a ref to control re-mounting the component

</script>

<style scoped>
/* Add your app bar styles here */
</style>
