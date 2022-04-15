import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/AppHome.vue";
import SignupView from "../views/AppSignup";
import LoginView from "../views/AppLogin";
import ForgetPass from "../views/ForgetPassword.vue";
import store from "../store/index";
// import { getAuth } from "firebase/auth";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "signup",
      component: SignupView,
      // beforeEnter(to, from, next) {
      //   firebase.auth().onAuthStateChanged((user) => {
      //     if (user) {
      //       next("/secure");
      //     } else {
      //       next();
      //     }
      //   });
      // },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      // beforeEnter(to, from, next) {
      //   firebase.auth().onAuthStateChanged((user) => {
      //     if (user) {
      //       next("/home");
      //     } else {
      //       next();
      //     }
      //   });
      // },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
      // beforeEnter(to, from, next) {
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     next();
      //   } else {
      //     next("/login");
      //   }
      // });
      // },
    },
    {
      path: "/forget",
      name: "forget",
      component: ForgetPass,
      // beforeEnter(to, from, next) {
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     next();
      //   } else {
      //     next("/login");
      //   }
      // });
      // },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(store.getters.getUser);
  if (store.getters.getUser == null && to.meta.requiresAuth) {
    // redirect the user to the login page
    next({ name: "login" });
  } else if (
    (to.name == "login" || to.name == "forget" || to.name == "signup") &&
    store.getters.getUser !== null
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});
export default router;
