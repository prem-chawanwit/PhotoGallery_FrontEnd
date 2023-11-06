<template>
  <!-- Dialog -->
  <v-row justify="d-flex justify-end mb-6">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-col
          sm="6"
          md="4"
          lg="2"
          xl="1"
          class="d-flex justify-end text-center mb-0"
        >
          <v-btn block rounded="lg" size="large" color="primary" v-bind="props"
            >เพิ่มผลไม้</v-btn
          >
        </v-col>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="form">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Name"
                    :rules="[required]"
                    v-model="selectedFileName"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-file-input
                    :rules="[required]"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    label="Photo"
                    @change="handlePhotoUpload"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" sm="1" md="1">
                  <v-btn
                    :loading="loading"
                    color="success"
                    variant="elevated"
                    @click="handleRequestUpload()"
                  >
                    Save
                  </v-btn>
                </v-col>
                <v-col cols="3" sm="1" md="1">
                  <v-btn
                    color=""
                    variant="elevated"
                    @click="handlePhotoUploadClose()"
                  >
                    Close
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <!-- <v-spacer></v-spacer>
          <v-btn color="" variant="elevated" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="success" variant="elevated" @click="dialog = false">
            Save
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- Gallery -->
  <v-row class="d-flex justify-end mb-6">
    <v-col sm="6" md="4" lg="2" class="d-flex justify-end text-center mb-6">
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="ค้นหาผลไม้"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="search"
        @click:prepend-inner="onSearch"
      ></v-text-field>
    </v-col>
  </v-row>
  <template v-if="this.getImages">
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        class="d-flex child-flex justify-center"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <v-card
          max-height="1800px"
          max-width="1800px"
          @mouseover="isHovered[index] = true"
          @mouseout="isHovered[index] = false"
          @click="handleCardClick(index)"
        >
          <template v-if="this.getImages">
            <div>
              <v-img
                :src="getAuthorizedImageURL(index)"
                :lazy-src="getAuthorizedImageURL(index)"
                aspect-ratio="1"
                cover
                class="bg-grey-lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
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
                >{{ images[index].fileName }}</v-card-title
              >
              <template v-if="1">
                <v-card-subtitle class="pt-4">
                  Id : {{ images[index].fileId }}</v-card-subtitle
                >
                <v-card-subtitle class="pt-4">
                  Size : {{ images[index].fileSize }} mb.</v-card-subtitle
                >
              </template>
              <span>{{ cardOffset }}</span>

              <v-card-title
                class="pt-4 card-title"
                :class="{ 'card-title-hover': isHovered[index] }"
              >
                <v-btn prepend-icon="mdi-lead-pencil" :disabled="false" size="small">
                  <template v-slot:prepend>
                    <v-icon color="warning"></v-icon>
                  </template>
                  Edit
                </v-btn>
                <v-btn prepend-icon="mdi-delete" :="false" size="small">
                  <template v-slot:prepend>
                    <v-icon color="red-darken-3"></v-icon>
                  </template>
                  Delete
                </v-btn>
              </v-card-title>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </template>
</template>

<script>
import axios from "axios";
import PhotoService from "@/services/photo.service";
import authHeader from "@/services/auth-header"; // Import the authHeader function
import { useStore } from "vuex";
const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],

      search: "",
      //.s.----stringPhotoStockAPI----
      API_URL: `${protocol}://${url}:${port}/api/Gallery`,
      //.e.----stringPhotoStockAPI----
      //.s.----userCert----
      username: "Unknown",
      //.e.----userCert----
      //.s.----fileinput----
      rules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "Photo size should be less than 2 MB!"
          );
        },
      ],
      selectedFileName: null,
      selectedFile: null,
      //.e.----fileinput----
      //.s.----dialog----
      dialog: false,
      //.e.----dialog----
      loaded: false,
      loading: false,
      //.s.----card----
      isHovered: [false, false, false, false, false], // Add one entry for each card

      getImages: false,
      images: [
        { fileId: null, fileName: null, systemfileName: null, fileSize: null },
        // Add more image data as needed
      ],
      cardOffset: "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      //.e.----card----
    };
  },
  mounted() {
    this.getUserCert();
    this.handleRequestGetAll();
  },
  methods: {
    getUserCert() {
      const loggedIn = localStorage.getItem("user");
      let ParseloggedIn = null;
      if (loggedIn != null) {
        ParseloggedIn = JSON.parse(loggedIn);
      }
      const store = useStore();
      if (ParseloggedIn) {
        const { user } = ParseloggedIn.data;
        const { username, roles } = user;
        this.username = username;
      } else {
        //donothing
      }
    },
    required(v) {
      return !!v || "Field is required";
    },
    onSearch() {
      if (this.search === null || this.search === "") {
        console.log("Getall");
        this.handleRequestGetAll();
      } else {
        console.log("Getfilter");
        //get filter
      }
    },
    handleCardClick(photoIndex) {},
    handlePhotoUpload(event) {
      console.log(event);
      const files = event.target.files;
      if (files.length > 0) {
        console.log(files[0]);
        const file = files[0];
        this.selectedFile = file;
        console.log("Selected file:", file.name);
        console.log("File size:", file.size);
      } else {
        console.log("No file selected");
      }
    },
    handlePhotoUploadClose() {
      this.selectedFile = null;
      this.dialog = false;
      console.log("close dialog");
    },
    async handleRequestUpload() {
      if (this.selectedFile) {
        console.log("user->", this.username);
        const formData = new FormData();
        formData.append("requestUsername", this.username);
        formData.append("requestFileName", this.selectedFileName);
        formData.append("requestFile", this.selectedFile);

        // Use the authHeader function to get the authorization header
        const headers = {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        };

        try {
          this.loading = true;
          // Make the API request using the PhotoService
          const response = await PhotoService.uploadFile(formData, headers);
          console.log("File upload response:", response.data);
          this.loading = false;

          // Reset the selected file
          this.selectedFile = null;

          // Optionally, you can update your images or gallery with the newly uploaded image data
          // Update this.images and this.imagesDesc as needed
        } catch (error) {
          console.error("File upload error:", error);
          this.loading = false;
        }
      } else {
        console.log("No file selected");
      }
    },
    async handleRequestGetAll() {
      try {
        this.loading = true;
        // Use the PhotoService to make the API request to get the list of photos
        const response = await PhotoService.getAllPhotos(this.username);
        this.images = null;
        this.getImages = false;
        // Check if the request was successful
        if (response.status === 200 && response.data.success) {
          // Extract the list of photos from the response data
          const photos = response.data.data; // Access the 'data' property in the response

          // Update the 'images' array with the retrieved photos
          this.images = photos;
          this.getImages = true;
          this.loading = false;
          console.log("this.images", this.images);
        } else {
          this.images = null;
          this.getImages = false;
          this.loading = false;

          // Handle the case where the request was not successful or 'success' is false
          console.error("Failed to get photos:", response.data.message);
        }
      } catch (error) {
        this.images = null;
        this.getImages = false;
        this.loading = false;

        // Handle any errors that occur during the request
        console.error("Error while getting photos:", error);
      }
    },
    getAuthorizedImageURL(index) {
      const headers = authHeader();
      console.log("headers", headers.Authorization);

      // Assuming this.images is an array of image objects
      const fileName = this.images[index].systemfileName;

      const imageUrl = `${this.API_URL}/GetPhoto?fileName=${fileName}&username=${this.username}`;

      // Construct the image URL with authorization headers in the query parameters
      const authorizedImageUrl = imageUrl;

      return authorizedImageUrl;
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
