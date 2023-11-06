<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-icon icon="mdi mdi-image-multiple" />
      Gallery App v.1.0.0
    </v-app-bar-title>
    <v-card-actions>
      <v-btn @click="handleLogout">Logout</v-btn>
    </v-card-actions>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const menuOpen = ref(false);

const user = {
  initials: "JD",
  fullName: "John Doe",
  email: "john.doe@doe.com",
};

const handleLogout = () => {
  let loggedIn = localStorage.getItem("user");
  if (!loggedIn) {
    return;
  }
  const ParseloggedIn = JSON.parse(loggedIn);
  if (ParseloggedIn) {
    const { user } = ParseloggedIn.data;
    const { username, roles } = user;
    // Dispatch the "auth/logout" action to log the user out
    store.dispatch("auth/logout", username);
    // Redirect to the home page (adjust the route as needed)
    router.push("/login");
  }
};
</script>

<style scoped>
/* Add your app bar styles here */
</style>
