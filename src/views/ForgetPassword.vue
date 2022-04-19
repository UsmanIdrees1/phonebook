<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field label="Email" prepend-icon="email" v-model="email" />
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn type="submit" color="info">Login</v-btn>
            <v-btn text color="success" to="/">Register</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
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
