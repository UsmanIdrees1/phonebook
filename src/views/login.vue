<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="mx-auto">Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <b class="black--text">Email Address*</b>
          <v-text-field label="E.g: jonedoe@gmail.com" solo v-model="email" />
          <b class="black--text">Password*</b>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            solo
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
          />
          <v-row>
            <v-col lg="6">
              <v-checkbox
                class="my-0"
                v-model="checkbox"
                label="Remember Me"
              ></v-checkbox>
              <div class="grey--text mb-2">
                Use this option on trusted computers only
              </div>
            </v-col>
            <v-col lg="6">
              <v-btn class="my-0" text color="success" to="/forget"
                >Forget Password</v-btn
              >
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn type="submit" color="info"
              ><v-icon left>lock</v-icon>Login
            </v-btn>
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
      checkbox: true,
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
