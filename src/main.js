import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyA2Byr7tTvgQ2nCzbU0CGJgcK6PB2FfSzM",
  authDomain: "vuejs-b6b7f.firebaseapp.com",
  databaseURL: "https://vuejs-b6b7f-default-rtdb.firebaseio.com",
  projectId: "vuejs-b6b7f",
  storageBucket: "vuejs-b6b7f.appspot.com",
  messagingSenderId: "523459296499",
  appId: "1:523459296499:web:ddde9befdd18dd92d28b86",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log(db.type);
onAuthStateChanged(auth, (user) => {
  store.dispatch("user_auth", user);
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
