<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" app>
      <v-list nav dense>
        <!-- =========== not atuhenticated ========== -->
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          v-model="group"
          v-if="!authenticated"
        >
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>face</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/login">
            <v-list-item-action>
              <v-icon>lock_open</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <!-- ===========atuhenticated============ -->
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          v-model="group"
          v-if="authenticated"
        >
          <v-list-item to="/home">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="deep-purple" dark app>
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Phone Book</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- =========== Not Authenticated============ -->
      <div v-if="!authenticated">
        <v-btn text class="hidden-xs-only">
          <v-icon left dark>face</v-icon>Register
        </v-btn>
        <v-btn text class="hidden-xs-only">
          <v-icon left dark>lock_open</v-icon>Login
        </v-btn>
      </div>
      <!-- =============Authenticated============= -->
      <div v-if="authenticated">
        <v-btn text class="hidden-xs-only">
          <v-icon left dark>face</v-icon>Home
        </v-btn>
        <v-btn @click="logout" text class="hidden-xs-only">
          <v-icon left dark>logout</v-icon>Logout
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  data() {
    return {
      appTitle: "Awesome App",
      drawer: false,
      group: null,
      authenticated: false,
    };
  },
  created() {
    if (this.$store.getters.getUser !== null) {
      this.authenticated = true;
    }
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
    },
  },
};
</script>

<style></style>
