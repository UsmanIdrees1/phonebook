import Vue from "vue";
import VueRouter from "vue-router";
import ForgetPass from "../views/forgetPassword.vue";
import store from "../store/index";
import VuetifyLogin from "../views/login";
import VuetifySignup from "../views/signup";
import home from "../views/dashboard";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "signup",
      component: VuetifySignup,
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: VuetifyLogin,
    },
    {
      path: "/forget",
      name: "forget",
      component: ForgetPass,
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
