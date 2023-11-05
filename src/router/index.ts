// src/router/index.ts
// Composables
//import store from '@/store'; // Import your Vuex store
//import { checkTokenValidity } from '@/services/auth';
import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

// import Home from "../components/Home.vue";
// import Login from "../components/Login.vue";
// import Register from "../components/Register.vue";
// import { createWebHistory, createRouter } from "vue-router";
// import Home from "../components/Home.vue";
// import Login from "../components/Login.vue";
// import Register from "../components/Register.vue";
// // lazy-loaded
// const Profile = () => import("../components/Profile.vue")
// const BoardAdmin = () => import("../components/BoardAdmin.vue")
// const BoardModerator = () => import("../components/BoardModerator.vue")
// const BoardUser = () => import("../components/BoardUser.vue")

// const routes = [
//   {
//     path: "/",
//     name: "home",
//     component: Home,
//   },
//   {
//     path: "/home",
//     component: Home,
//   },
//   {
//     path: "/login",
//     component: Login,
//   },
//   {
//     path: "/register",
//     component: Register,
//   },
//   {
//     path: "/profile",
//     name: "profile",
//     // lazy-loaded
//     component: Profile,
//   },
//   {
//     path: "/admin",
//     name: "admin",
//     // lazy-loaded
//     component: BoardAdmin,
//   },
//   {
//     path: "/mod",
//     name: "moderator",
//     // lazy-loaded
//     component: BoardModerator,
//   },
//   {
//     path: "/user",
//     name: "user",
//     // lazy-loaded
//     component: BoardUser,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

const routes = [
  {
    path: "/",
    name: "HomeLayout",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/default/Home.vue"),
        meta: { requiresAuth: true }, // Add this to protect the route
      },
      {
        path: "about", // Add a route for the "About" page
        name: "About",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/default/About.vue"),
        meta: { requiresAuth: true }, // Add this to protect the route
      },
      {
        path: "calendar", // Add a route for the "About" page
        name: "Calendar",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/default/Calendar.vue"),
        meta: { requiresAuth: true }, // Add this to protect the route
      },
    ],
  },
  {
    path: "/login",
    name: "LoginLayout",
    component: () => import("@/layouts/auth/Default.vue"), // Import your login component
    children: [
      {
        path: "",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/auth/Login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  let ParseloggedIn = null;
  if (loggedIn != null) {
    ParseloggedIn = JSON.parse(loggedIn);
  }
  const store = useStore();

  // trying to access a restricted page + not logged in
  // redirect to login page

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    //let check again
    if (ParseloggedIn) {
      const { user } = ParseloggedIn.data;
      const { username, roles } = user;

      store.dispatch("auth/checkLogin", username).then(
        (response) => {
          next();
        },
        (error) => {
          next("/login");
        }
      );
    }else
    {
      next();
    }
  }
});

export default router;
