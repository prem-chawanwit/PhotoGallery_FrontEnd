//Authentication service
//src/services/auth.service.js
import axios from "axios";

//const API_URL = "http://kanjanasing.thddns.net:3383/api/Auth/";
const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;

const API_URL = `${protocol}://${url}:${port}/api/Auth/`;
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "Login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // Assuming the response contains 'success' and 'data' properties
        const { success, data } = response.data;
        if (success) {
          localStorage.setItem("user", JSON.stringify(response));
        } else {
          console.log("fail");
          return response;
        }
        return response;
      })
      .catch((error) => {
        return false;
      });
  }
  logout(username) {
    return axios
      .post(API_URL + "Logout", null, {
        params: {
          username: username,
        },
      })
      .then(() => {
        console.log("remove");
        localStorage.removeItem("user");
        console.log(localStorage.getItem("user"));
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Handle the error if needed, e.g., show an error message.
      });
  }
  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
  checkLogin(username) {
    return axios
      .get(API_URL + `Checkuser?username=${username}`, {
        // headers: authHeader(),
      })
      .then((response) => {
        if (!response.data.data) {
          console.log("expired");
          localStorage.removeItem("user");
        } else {
          console.log("valid token");
        }
        return response.data;
      });
  }
}

export default new AuthService();
