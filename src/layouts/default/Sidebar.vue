<!-- src/layouts/default/Sidebar.vue -->

<template>
  <v-navigation-drawer
    app
    class="bg-blue-grey-darken-4"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item prepend-avatar="../../assets/img/profile/me.jpg" nav
      >
      <h5>Hello : {{ modelusername }}</h5>
      <h5>Roles : {{ modelroles }}</h5>

      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="App"
        value="home"
        @click="checkAndNavigate('home')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let modelusername = ref("Unknown");
let modelroles = ref("Unknown");

const drawer = ref(true);
const rail = ref(true);

const getUsername = () => {
  let loggedIn = localStorage.getItem("user");
  if (!loggedIn) {
    return;
  }
  const ParseloggedIn = JSON.parse(loggedIn);
  if (ParseloggedIn) {
    const { user } = ParseloggedIn.data;
    const userObj = user; // Use a different variable name
    const { username, roles } = userObj; // Assign the username from userObj
    modelusername.value = username;
    modelroles.value = roles;
  }
};

const checkAndNavigate = (selectedValue: string) => {
  if (selectedValue === "home") {
    router.push({ name: "Home" });
  }
};

onMounted(() => {
  getUsername();
});
</script>




<style scoped>
/* Add your sidebar styles here */
</style>
