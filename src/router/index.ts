import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

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
