<template>
  <div>
    <v-app-bar v-if="isContentVisible">
      <v-app-bar-title>
        <v-icon icon="mdi mdi-image-multiple" color="info" />
        Welcome to Gallery App v.1.0.0
      </v-app-bar-title>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const menuOpen = ref(false);

// Add a ref to control re-mounting the component
const isContentVisible = ref(true);

// Function to toggle content visibility based on screen size
function toggleContentVisibility() {
  isContentVisible.value = window.innerWidth > 1000; // Adjust the screen size breakpoint if needed
}

// Add event listeners for screen size changes
onMounted(() => {
  toggleContentVisibility(); // Initial visibility check
  window.addEventListener("resize", toggleContentVisibility);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", toggleContentVisibility);
});
</script>

<style scoped>
/* Add your app bar styles here */
</style>
