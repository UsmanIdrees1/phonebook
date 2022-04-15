<template>
  <div>
    <form @submit.prevent="submit">
      <label for="email">Email</label>
      <input type="email" v-model="email" />

      <label for="password">Password</label>
      <input type="password" v-model="password" />

      <button value="submit">Submit</button>
      <router-link to="/forget" style="text-decoration: none; color: green"
        ><em> &nbsp; &nbsp; &nbsp; Forget Password</em></router-link
      >
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Signed in
          // const user = userCredential.user;
          // console.log(userCredential + "user U");
          this.$router.push("/home");

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode + " " + errorMessage);
        });
    },
  },
};
</script>

<style></style>
