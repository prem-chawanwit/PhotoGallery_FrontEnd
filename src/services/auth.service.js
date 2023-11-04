//Authentication service
//src/services/auth.service.js
import axios from 'axios';

const API_URL = 'http://localhost:5063/api/Auth/Login';

class AuthService {
  login(user) {
    return axios
      .post(API_URL, {
        username: user.username,
        password: user.password,
      })
      .then(response => {
            // Assuming the response contains 'success' and 'data' properties
        const { success, data } = response.data;
        if (success) {
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          return false; // Authentication failed
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
