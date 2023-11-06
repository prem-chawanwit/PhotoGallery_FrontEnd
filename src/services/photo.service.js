import axios from "axios";
import authHeader from "@/services/auth-header"; // Import the authHeader function

const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;
const API_URL = `${protocol}://${url}:${port}/api/Gallery/`;

class PhotoService {
  // Method to upload a file
  uploadFile(formData) {
    console.log('PhotoService -> ',formData)
    console.log(authHeader())
    // Use the authHeader function to get the authorization header
    const headers = {
      ...authHeader(), // Merge the authorization header with other headers
      "Content-Type": "multipart/form-data",
    };

    return axios.post(API_URL + "UploadPhoto", formData, {
      headers: headers, // Pass the headers to the request
    });
  }

// Method to get all photos for a user
getAllPhotos(username) {
  // Use the authHeader function to get the authorization header
  const headers = {
    ...authHeader(),
  };

  return axios.get(API_URL + `GetPhotoIdAll?username=${username}`, {
    headers: headers, // Pass the headers to the request
  });
}
}

export default new PhotoService();
