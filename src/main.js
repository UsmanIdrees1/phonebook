import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj2lXu5b9Kd2oV9ZR5N62j-kiOCTM4UTo",
  authDomain: "posts-web-project.firebaseapp.com",
  databaseURL: "https://posts-web-project-default-rtdb.firebaseio.com",
  projectId: "posts-web-project",
  storageBucket: "posts-web-project.appspot.com",
  messagingSenderId: "663846338457",
  appId: "1:663846338457:web:e28b2b2d26d1b94fe3dd08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  store.dispatch("user_auth", user);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
