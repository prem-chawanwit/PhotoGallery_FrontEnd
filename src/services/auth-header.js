//src/services/auth-header.js
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log('user ' , user)

  if (user) {
    // If a user is logged in with an access token, return the Authorization header.
    const { data } = user;
    return { Authorization: "Bearer " + user.data.data };
  } else {
    // If no user is logged in or no access token is available, return an empty object.
    return {};
  }
}
