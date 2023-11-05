//src/services/user.service.js
import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://kanjanasing.thddns.net:3383/api/Auth/';
const protocol = import.meta.env.VITE_SERVER_PROTOCOL;
const url = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_PORT;

const API_URL = `${protocol}://${url}:${port}/api/Auth/`;
class UserService {
  getIsUserLogin(username) {
    return axios.get(API_URL + `Checkuser?username=${username}`, { headers: authHeader() });
  }

  // Other methods for accessing protected resources
}

export default new UserService();
