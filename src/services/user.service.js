//src/services/user.service.js
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5063/api/Auth/';

class UserService {
  getIsUserLogin(username) {
    return axios.get(API_URL + `Checkuser?username=${username}`, { headers: authHeader() });
  }

  // Other methods for accessing protected resources
}

export default new UserService();
