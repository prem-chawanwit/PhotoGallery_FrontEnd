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
    <v-list-item
      prepend-avatar="../../assets/img/profile/me.jpg"
      title="Chawanwit Kanjanasing"
      nav
    >
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
        title="Home"
        value="home"
        @click="checkAndNavigate('home')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Who am I ?"
        value="about"
        @click="checkAndNavigate('about')"
      ></v-list-item>
      <!-- <v-list-item
        prepend-icon="mdi-calendar"
        title="Calendar"
        value="calendar"
        @click="checkAndNavigate('calendar')"
      ></v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
  methods: {
    checkAndNavigate(selectedValue) {
      // Check the selected value and perform routing action
      if (selectedValue === "home") {
        this.$router.push({ name: "Home" });
      }
      else if (selectedValue === "about") {
        this.$router.push({ name: "About" });
      }
      else if (selectedValue === "calendar") {
        this.$router.push({ name: "Calendar" });
      }
    },
  },
};
</script>

<style scoped>
/* Add your sidebar styles here */
</style>
