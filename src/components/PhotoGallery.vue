<template>
  <v-btn @click="handleRequestGetAll()"> GetAll </v-btn>
  <!-- Dialog -->
  <v-row justify="d-flex justify-end mb-6">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-col sm="2" md="2" lg="2" class="d-flex justify-end text-center mb-0">
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
    <v-col sm="4" md="4" lg="4" class="d-flex justify-end text-center mb-6">
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="ค้นหาผลไม้"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:prepend-inner="onSearch"
      ></v-text-field>
    </v-col>
  </v-row>
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
        <template v-if="this.getImages">
          <div>
            <v-img
              :src="`http://localhost:5063/api/Gallery/GetPhoto?fileName=${images[index].systemfileName}`"
              :lazy-src="`http://localhost:5063/api/Gallery/GetPhoto?fileName=${images[index].systemfileName}`"
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
              >{{ images[index].fileName }}</v-card-title
            >
            <span>{{ cardOffset }}</span>
            <!-- <v-card-title
              class="pt-4 card-title"
              :class="{ 'card-title-hover': isHovered[index] }"
              >{{ cardOffset }}</v-card-title
            > -->
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PhotoService from "@/services/photo.service";
import authHeader from "@/services/auth-header"; // Import the authHeader function
import { useStore } from "vuex";
const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;
export default {
  data() {
    return {
      //.s.----stringPhotoStockAPI----
      API_URL: `${protocol}://${url}:${port}/api/Auth/`,
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
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
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
          //Orangeหฟกหฟกหฟกหฟกฟ
          // Now, iterate through the 'images' array to adjust file names
          // this.images.forEach((image, index) => {
          //   // Check if the index is within bounds and the 'fileName' property is not null
          //   if (index < photos.length && photos[index].fileName !== null) {
          //     // Update the 'fileName' property in the 'images' array with the retrieved file name
          //     image.fileName = photos[index].fileName;

          //     // Check if the length of the file name is less than 19 characters
          //     while (image.fileName.length < 19) {
          //       // Append "x" to the end of the file name
          //       image.fileName += "⠀";
          //     }
          //   }
          // });
          this.getImages = true;
          console.log("this.images", this.images);
        } else {
          this.images = null;
          this.getImages = false;

          // Handle the case where the request was not successful or 'success' is false
          console.error("Failed to get photos:", response.data.message);
        }
      } catch (error) {
        this.images = null;
        this.getImages = false;

        // Handle any errors that occur during the request
        console.error("Error while getting photos:", error);
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
