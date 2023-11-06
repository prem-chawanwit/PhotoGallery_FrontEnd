import axios from "axios";

const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;
const API_URL = `${protocol}://${url}:${port}/api/Gallery/`;

class PhotoService {
  // Method to upload a file
  uploadFile(formData) {
    console.log('PhotoService -> ',formData)
    return axios.post(API_URL + "upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Add other methods to interact with your API as needed
}

export default new PhotoService();
