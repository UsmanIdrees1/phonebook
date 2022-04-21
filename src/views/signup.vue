<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-toolbar dark dense color="primary">
        <v-toolbar-title class="mx-auto">Registration</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="submit" v-model="valid">
          <b class="black--text">Name*</b>
          <v-text-field
            solo
            label="E.g: Jane Doe"
            v-model="Username"
            :rules="nameRules"
            :counter="20"
            required
          />
          <b class="black--text">Company*</b>
          <v-text-field
            solo
            label="E.g: My Company LLC"
            v-model="company"
            :rules="nameRules"
            :counter="20"
            required
          />
          <b class="black--text">Email Address*</b>
          <v-text-field
            solo
            label="E.g: jonedoe@gmail.com"
            v-model="email"
            :rules="emailRules"
            required
          />
          <b class="black--text">Password*</b>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            solo
            v-model="password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            :rules="passRules"
            counter
            required
          />
          <b class="black--text">Confirm Password*</b>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            solo
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="showPassword = !showPassword"
            :rules="confirmPasswordRules"
            required
          />
          <b class="black--text">How do you hear Us*</b>
          <v-select
            :items="items"
            label="Please select One"
            v-model="refrence"
            solo
            append-icon="arrow_drop_down"
            :rules="selectRules"
            required
          ></v-select>
          <div>
            <p class="font-weight-bold black--text">
              By clicking "Register" you agree to our
              <span class="green--text">Terms of Use</span> and our
              <span class="green--text">Privacy Policy</span>
            </p>
          </div>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :disabled="!valid" type="submit" color="success">
              <v-icon left>lock</v-icon>
              Register
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>
<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
export default {
  data() {
    return {
      db: null,
      showPassword: false,
      Username: "",
      company: "",
      email: "",
      refrence: "",
      password: "",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      // validation
      valid: false,
      nameRules: [
        (v) => !!v || "required",
        (v) => v.length <= 20 || "Name must be less than 20 characters",
      ],
      passRules: [
        (v) => !!v || "required",
        (v) => v.length >= 8 || "Min 8 characters",
      ],
      emailRules: [
        (v) => !!v || "required",
        // (v) => /.+@.+/.test(v) || "E-mail must be valid",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      confirmPasswordRules: [
        (v) => !!v || "type confirm password",
        (v) =>
          v === this.password || "The password confirmation does not match.",
      ],
      selectRules: [(v) => !!v || "Item is required"],
      ////////
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await this.firestoreSubmit(user.uid + "USER");
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
    async firestoreSubmit(userid) {
      try {
        const docRef = await addDoc(collection(this.db, userid), {
          company: this.company,
          refrence: this.refrence,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
  async mounted() {
    this.db = getFirestore();
  },
};
</script>
<style scoped></style>
