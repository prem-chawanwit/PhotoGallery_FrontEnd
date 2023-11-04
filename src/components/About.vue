<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row class="d-flex flex-column align-center">
        <p>
          <img
            src="https://i.stack.imgur.com/SBv4T.gif"
            alt="this slowpoke moves"
            width="250"
          />
        </p>

        <div class="container">
          <h3 class="typed">Chawanwit Kanjanasing</h3>
        </div>
        <p>Software Engineer | Full-stack Developer | ETL Specialist</p>
        <br /><br />
        <h3>🚀 About Me 🚀</h3>
        <p>
          Hi there! I'm a passionate software engineer with a keen interest in
          open-source projects and solving complex problems. I specialize in
          full-stack development, ETL tasks, and building web applications and
          window applications. I'm also deeply interested in IoT, SEO, and AI. I
          love to code and build software that makes a difference.
        </p>
        <br /><br />
        <h3>🛠️ Tech Stack 🛠️</h3>
        <p>
          - 💻 Languages: C# (.NET), JavaScript - 🌐 Web Development: HTML, CSS,
          Vue.js - 📦 Databases: SQL - ⚙️ Tools: Git, Visual Studio Code, Visual
          Studio - 🧩 Other: Docker, IIS
        </p>
        <br /><br />
        <h3>🌱 Currently Learning 🌱</h3>
        <p>
          I'm currently focused on improving my skills in algorithmic
          problem-solving and learning more about cloud computing, as well as
          delving deeper into IoT, SEO, and AI.
        </p>
        <br /><br />
        <h3>📫 Contact Me 📫</h3>
        <p>
          <a
            href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BNxvyE8OhTw6vZdCi%2FmqXWQ%3D%3D"
            target="_blank"
          >
            <img
              src="https://www.liveandwingit.com/wp-content/uploads/2020/07/How-to-Create-a-LinkedIn-Company-Page-in-Nigeria.jpg"
              width="30px"
              height="30px"
            />
          </a>
          <a href="mailto:dev.chawanwit@gmail.com">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
              width="30px"
              height="30px"
            />
          </a>
        </p>
        <p>🔥 Happy Coding! 🔥</p>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { VDatePicker } from "vuetify/labs/VDatePicker";
// Make sure to export components
const components = {
  VDatePicker,
};
</script>

<style scoped>
.container {
  font-family: "arial";
  font-size: 24px;
  display: grid;
  place-items: center;
  width: 350px;
}

.typed {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  width: 0;

  animation: typing 1.5s steps(30, end) forwards, blinking 1s infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blinking {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
  100% {
    border-color: transparent;
  }
}
</style>
