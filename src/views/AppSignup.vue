<template>
  <div>
    <form @submit.prevent="submit">
      <label for="email">Email</label>
      <input type="email" v-model="email" />

      <label for="password">Password</label>
      <input type="password" v-model="password" />

      <button value="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential + "user U" + user);
          this.$router.push("/login");
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode + " " + errorMessage);
          // ..
        });
    },
  },
};
</script>

<style></style>
