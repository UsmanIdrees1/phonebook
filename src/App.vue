<template>
  <v-app>
    <app-navbar />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from "./components/Navbar.vue";
export default {
  components: {
    AppNavbar,
  },
};
</script>
<style></style>
