<template>
  <v-main>
    <v-container>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <template v-if="showSuccess">
          <v-alert
            type="success"
            title="Successfully login!"
            text=""
          ></v-alert>
        </template>
        <template v-else-if="showError">
          <v-alert
            type="error"
            title="Wrong Username or Pasasword"
            text=""
          ></v-alert>
        </template>
        <template v-else >
          <v-alert
            type="info"
            title="Sign in"
            text="You can sign in with guest"
          ></v-alert>
        </template>

        <br /><br />
        <v-form
          v-model="form"
          @submit.prevent="handleLogin(this.username, this.password)"
        >
          <v-text-field
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Username"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            type="password"
            placeholder="Enter your password"
          ></v-text-field>

          <br />

          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </v-main>
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
      //aleart
      showSuccess: false,
      showError: false,
      //form
      form: false,
      username: "guest",
      password: "123456789",
      //
      loading: false,
      message: "",
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
    // onSubmit() {
    //   if (!this.form) return;

    //   this.loading = true;

    //   setTimeout(() => (this.loading = false), 2000);
    // },
    required(v) {
      return !!v || "Field is required";
    },
    handleLogin(username, password) {
      const userData = {
        username: this.username, // Make sure you have username and password data in your component's data
        password: this.password,
      };
      this.loading = true;

      this.$store.dispatch("auth/login", userData).then(
        (response) => {
          console.log("response", response);
          if (response.Success || response) {
            console.log("ok");
            this.showSuccess = true;
            this.showError = false;
          } else {
            console.log("false");

            this.showSuccess = false;
            this.showError = true;
          }
          this.loading = false;

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
