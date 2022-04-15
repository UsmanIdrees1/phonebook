<template>
  <div>
    <form @submit.prevent="submit">
      <label for="email">Email</label>
      <input type="email" v-model="email" />

      <button value="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          // Password reset email sent!
          alert("Verification Email is sent to your Email");
          this.$router.push("/login");
          // ..
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
