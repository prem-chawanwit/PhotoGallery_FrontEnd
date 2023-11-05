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
    <v-list-item nav>
      <v-container class="d-flex align-center">
        <v-avatar color="red" class="mr-2">
          <span class="text-h5">{{ modelcutusername }}</span>
        </v-avatar>
        <div>
          <h5 class="mb-1">{{ modelusername }}</h5>
          <p class="text-caption">{{ modelroles }}</p>
        </div>
      </v-container>
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
        title="Gallery App"
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
let modelcutusername = ref("");

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
    if (modelusername.value.length > 0) {
      return (modelcutusername.value = modelusername.value[0]);
    } else {
      modelcutusername.value = ""; // Return an empty string for an empty input
    }
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
