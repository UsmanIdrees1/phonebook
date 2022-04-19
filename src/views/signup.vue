<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Signup form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            label="Username"
            prepend-icon="person"
            v-model="Username"
          />
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
            <v-btn type="submit" color="success">Register</v-btn>
            <v-btn text color="info" to="/login">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>
<script>
// export default {
//   data() {
//     return {
//       showPassword: false,
//     };
//   },
// };
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
export default {
  data() {
    return {
      showPassword: false,
      Username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential + "user U" + user);
          ///////
          updateProfile(auth.currentUser, {
            displayName: this.Username,
          })
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
          /////////
          this.$store.dispatch("register");
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
<style scoped></style>
