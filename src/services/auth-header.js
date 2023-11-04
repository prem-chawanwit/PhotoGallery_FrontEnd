//src/services/auth-header.js
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.data) {
    // If a user is logged in with an access token, return the Authorization header.
    return { Authorization: 'Bearer ' + user.data };
  } else {
    // If no user is logged in or no access token is available, return an empty object.
    return {};
  }
}
