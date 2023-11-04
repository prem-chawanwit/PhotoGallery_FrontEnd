<!-- src/layouts/default/AppBar.vue -->
<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-icon icon="mdi-source-branch" />
      ver. 2023/11/01
      <span style="color: red">(Under development)</span>
    </v-app-bar-title>
    <v-card-actions>
      <v-btn @click="handleLogout()">Logout</v-btn>
    </v-card-actions>
  </v-app-bar>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // Import the router

const store = useStore();
const router = useRouter(); // Define the router

const handleLogout = () => {
  let loggedIn = localStorage.getItem('user');
  const ParseloggedIn = JSON.parse(loggedIn);
  console.log(ParseloggedIn);
  if (ParseloggedIn) {

    const { user } = ParseloggedIn.data;
    const { username, roles } = user;
    console.log('APP,',username)
    // Dispatch the "auth/logout" action to log the user out
    store.dispatch('auth/logout', username);
    // Redirect to the home page (adjust the route as needed)
    router.push('/login');
  }
};
</script>

<style scoped>
/* Add your app bar styles here */
</style>
