<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field label="Email" prepend-icon="email" v-model="email" />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            prepend-icon="lock"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
          />
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn type="submit" color="info">Login</v-btn>
            <v-btn text color="success" to="/">Register</v-btn>
            <v-btn text color="success" to="/forget">Forget Password</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
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
<style scoped>
.vcard {
  width: 40%;
  margin: auto;
}
</style>
