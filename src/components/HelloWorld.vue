<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/img/brand/brand2-white.png" />

      <!-- <div class="text-body-15 font-weight-light mb-n1">Welcome to</div> -->

      <h1 class="text-h2 font-weight-bold">Chawanwit World</h1>
      <main class="container">
        <p style="color: black !important">Hello 👋 I'm</p>
        <section class="animation">
          <div class="first"><div>Prem</div></div>
          <div class="second"><div>Full-Stack</div></div>
          <div class="third"><div>Programmer</div></div>
        </section>
      </main>
      <div class="py-14" />
      <v-row class="d-flex align-center justify-center mt-4">
        <v-btn
          color="success"
          min-width="228"
          rel="noopener noreferrer"
          size="x-large"
          target="_blank"
          variant="flat"
          @click="sendCV()"
        >
          <v-icon icon="mdi-download-outline" size="large" start />
          Download my CV
        </v-btn>
      </v-row>

      <v-row class="d-flex align-center justify-center mt-10">
        <router-link to="about" class="mb-4">
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-comment-question-outline" size="large" start />
            Who am I
          </v-btn>
        </router-link>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"; // Import the router

const store = useStore();
// Define a function to check the login status
const checkLoginStatus = async () => {
  // let loggedIn = localStorage.getItem("user");
  // const ParseloggedIn = JSON.parse(loggedIn);
  // if (ParseloggedIn) {
  //   const { user } = ParseloggedIn.data;
  //   const { username, roles } = user;
  //   store
  //     .dispatch("auth/checkLogin", username)
  //     .then(
  //       (response) => {
  //         console.log('response',response)
  //       },
  //       (error) => {
  //         // Handle the error
  //         console.error(error);
  //       }
  //     );
  // }
};

// Call the checkLoginStatus function when the component mounts
onMounted(checkLoginStatus);

const sendCV = () => {
  // To open a new window with your CV:
  window.open("../../public/files/cv/ChawanwitKan_CV.pdf", "_blank");

  // To trigger a download of your CV:
  const link = document.createElement("a");
  link.href = "../../public/files/cv/ChawanwitKan_CV.pdf";
  link.target = "_blank"; // Open in a new tab
  link.download = "ChawanwitKan_CV.pdf"; // Specify the actual file name
  link.click();
};
// Make sure to export components
const components = {};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:700");

body {
  font-family: "Roboto";
  background-color: #131417;
}
p {
  text-shadow: 0 0 7px rgba(255, 255, 255, 0.3),
    0 0 3px rgba(255, 255, 255, 0.3);
}
body {
  font-family: "Roboto";
  background-color: #131417;
}
.container {
  color: #e5e5e5;
  font-size: 2.2rem;
  text-transform: uppercase;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animation {
  height: 55px;
  overflow: hidden;
  margin-left: 1rem;
}

.animation > div > div {
  padding: 0.25rem 0.75rem;
  height: 2.81rem;
  margin-bottom: 2.81rem;
  display: inline-block;
}

.animation div:first-child {
  animation: text-animation 6s infinite;
}

.first div {
  background-color: #0d7398;
}
.second div {
  background-color: #7410d0;
}
.third div {
  background-color: #e47e0a;
}
.four div {
  background-color: #c10528;
}
.five div {
  background-color: #c10528;
}
.six div {
  background-color: #c10528;
}

@keyframes text-animation {
  0% {
    margin-top: 0;
  }
  10% {
    margin-top: 0;
  }
  20% {
    margin-top: -5.62rem;
  }
  30% {
    margin-top: -5.62rem;
  }
  40% {
    margin-top: -11.24rem;
  }
  60% {
    margin-top: -11.24rem;
  }
  70% {
    margin-top: -5.62rem;
  }
  80% {
    margin-top: -5.62rem;
  }
  90% {
    margin-top: 0;
  }
  100% {
    margin-top: 0;
  }
}
</style>
