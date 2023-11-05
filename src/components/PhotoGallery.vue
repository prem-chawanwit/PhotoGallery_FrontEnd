<template>
  <v-row class="d-flex justify-end mb-6"> <v-col sm="2" md="2" lg="2" class="d-flex justify-end text-center mb-6">
    <v-btn block rounded="lg" size="large" color="primary">เพิ่มผลไม้</v-btn>
  </v-col></v-row>
  <v-row>
    <v-col
      v-for="(image, index) in images"
      :key="index"
      class="d-flex child-flex justify-center"
      cols="12"
      sm="6"
      md="4"
      lg="4"
    >
      <v-card
        max-height="1500px"
        max-width="1500px"
        @mouseover="isHovered[index] = true"
        @mouseout="isHovered[index] = false"
        @click="handleCardClick(index)"
      >
        <template v-if="index != -1">
          <div>
            <v-img
              :src="`https://picsum.photos/500/300?image=${image.id}`"
              :lazy-src="`https://picsum.photos/10/6?image=${image.id}`"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title
              class="pt-4 card-title"
              :class="{ 'card-title-hover': isHovered[index] }"
              >{{ imagesDesc[index] }}</v-card-title
            >
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
  <br /><br />
</template>

<script>
export default {
  data() {
    return {
      isHovered: [false, false, false, false, false], // Add one entry for each card
      images: [
        { id: 15 },
        { id: 20 },
        { id: 25 },
        { id: 30 },
        { id: 35 },
        // Add more image data as needed
      ],
      imagesDesc: [
        "Orangeหฟกหฟกหฟกหฟกฟ",
        "Orangeหฟกหฟกหฟกหฟกฟ",
        "Orangeหฟกหฟกหฟกหฟกฟ",
        "Orangeหฟกหฟกหฟกหฟกฟ",
        "Orangeหฟกหฟกหฟกหฟกฟ",
      ],
    };
  },
  methods: {
    handleCardClick(reportIndex) {
      if (reportIndex == 0) {
        this.$router.push({
          name: "productionPlanReport",
        });
      } else if (reportIndex == 1) {
        this.$router.push({
          name: "lateordersReport",
        });
      } else if (reportIndex == 2) {
        this.$router.push({
          name: "materialUsageReport",
        });
      } else if (reportIndex == 3) {
        this.$router.push({
          name: "bwhInputReport",
        });
      } else if (reportIndex == 4) {
        this.$router.push({
          name: "waferInputReport",
        });
      } else {
        // do nothing
      }
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.4s, box-shadow 0.4s;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  transform: scale(1.03);
}

.card-title {
  text-decoration: none; /* Remove underline effect on the title when the card is not hovered */
}
</style>
