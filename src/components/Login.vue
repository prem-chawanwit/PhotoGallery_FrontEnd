<template>
  <div>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field v-model="username" label="Username"></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="handleLogin(this.username, this.password)"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
      message: "",
      username: "",
      password: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(username, password) {
      const userData = {
        username: this.username, // Make sure you have username and password data in your component's data
        password: this.password,
      };
      this.loading = true;

      this.$store.dispatch("auth/login", userData).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped></style>
