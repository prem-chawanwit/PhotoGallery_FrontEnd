<template>
  <v-footer class="bg-blue-lighten-5 text-center d-flex flex-column" app>
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
        @click="openSocialMedia(icon)"
      ></v-btn>
    </div>
    <div>
      <v-btn
        v-for="icon in iconsTech"
        :key="icon"
        class="mx-4"
        :icon="icon.icon"
        variant="text"
        :color="icon.color"
        enabled="false"
        @click="openTechStack(icon)"
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
    icons: ["mdi-github", "mdi-linkedin"],
    iconsTech: [
      { icon: "mdi-dev-to", color: "red" },
      { icon: "mdi-language-javascript", color: "amber-accent-4" },
      { icon: "mdi-language-typescript", color: "blue-darken-4" },
      { icon: "mdi-language-csharp", color: "purple" },
      { icon: "mdi-vuejs", color: "green" },
      { icon: "mdi-vuetify", color: "blue" },
      { icon: "mdi-database", color: "yellow-darken-3" },
    ],

    //iconsTech: [{icon:"mdi-dev-to",color:'red'}, "mdi-language-javascript","mdi-language-typescript","mdi-language-csharp","mdi-vuejs", "mdi-vuetify", "mdi-database"],
  }),
  methods: {
    openSocialMedia(icon) {
      // Define the URLs for each social media platform
      const socialMediaUrls = {
        "mdi-github": "https://www.facebook.com/your-facebook-profile",
        "mdi-linkedin": "https://www.linkedin.com/in/your-linkedin-profile",
      };
      // Redirect to the corresponding URL when a social media icon is clicked
      window.open(socialMediaUrls[icon], "_blank");
    },
    openTechStack(icon) {
      // Define the URLs for each social media platform
      const socialTechUrls = {
        "mdi-facebook": "https://www.facebook.com/your-facebook-profile",
        "mdi-linkedin": "https://www.linkedin.com/in/your-linkedin-profile",
      };
      // Redirect to the corresponding URL when a social media icon is clicked
      window.open(socialTechUrls[icon], "_blank");
    },
  },
};
</script>
