<template>
  <div>
    <button @click="logout">Logout</button>
    <p>{{ email }}</p>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        this.email = user.email;
      } else {
        // User is signed out
        // ...

        console.log("logged out");
      }
    });
  },
  methods: {
    logout() {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
      // deleteUser(user)
      //   .then(() => {
      //     // Sign-out successful.
      //     this.$router.push("/login");
      //   })
      //   .catch((error) => {
      //     // An error happened.
      //     alert(error);
      //   });
    },
  },
};
</script>

<style></style>
