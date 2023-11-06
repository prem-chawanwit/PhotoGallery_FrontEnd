<template>
  <v-footer class="sticky-footer bg-blue-lighten-5 text-center d-flex flex-column" app>
    <!-- Your social media buttons -->
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        class="mx-4"
        :icon="icon.icon"
        :color="icon.color"
        variant="text"
        @click="openSocialMedia(icon.icon)"
      ></v-btn>
    </div>

    <!-- Your tech stack buttons -->
    <div>
      <v-btn
        v-for="icon in iconsTech"
        :key="icon.icon"
        class="mx-4"
        :icon="icon.icon"
        variant="text"
        :color="icon.color"
        enabled="false"
        @click="openTechStack(icon.icon)"
      ></v-btn>
    </div>

    <div class="pt-0"></div>
    <v-divider></v-divider>
    <div>
      {{ new Date().getFullYear() }} — <strong>Chawanwit Kanjanasing</strong>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [{ icon: "mdi-github", color: "" },{ icon: "mdi-linkedin", color: "blue-darken-4" }],
    iconsTech: [
      { icon: "mdi-dev-to", color: "red" },
      { icon: "mdi-language-javascript", color: "amber-accent-4" },
      { icon: "mdi-language-typescript", color: "blue-darken-4" },
      { icon: "mdi-language-csharp", color: "purple" },
      { icon: "mdi-key", color: "deep-orange-accent-3" },
      { icon: "mdi-vuejs", color: "green" },
      { icon: "mdi-vuetify", color: "blue" },
      { icon: "mdi-database", color: "yellow-darken-3" },
    ],
  }),
  methods: {
    openSocialMedia(icon) {
      // Define the URLs for each social media platform
      const socialMediaUrls = {
        "mdi-github": "https://github.com/prem-chawanwit",
        "mdi-linkedin": "https://www.linkedin.com/in/chawanwit-kanjanasing-1757b9297/",
      };
      // Redirect to the corresponding URL when a social media icon is clicked
      window.open(socialMediaUrls[icon], "_blank");
    },
    openTechStack(icon) {
      // Define the URLs for each tech stack
      const techStackUrls = {
        "mdi-dev-to": "http://chawanwit.com",
        "mdi-language-javascript": "https://www.javascript.com/",
        "mdi-language-typescript": "https://www.typescriptlang.org/",
        "mdi-language-csharp": "https://learn.microsoft.com/en-us/dotnet/csharp/",
        "mdi-key": "https://jwt.io/",
        "mdi-vuejs": "https://vuejs.org/",
        "mdi-vuetify": "https://vuetifyjs.com/en/",
        "mdi-database": "https://www.microsoft.com/en-us/sql-server/sql-server-downloads",
      };
      // Check if the clicked icon has a corresponding URL and open it in a new tab
      if (techStackUrls[icon]) {
        window.open(techStackUrls[icon], "_blank");
      } else {
        console.log("URL not found for this tech stack.");
      }
    },
  },
};
</script>

<style>
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
