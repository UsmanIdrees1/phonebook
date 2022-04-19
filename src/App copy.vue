<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

<div>
    <!-- <nav class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">Phone book</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Add Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/list">View Contact</router-link>
          </li>
        </ul>
      </div>
    </nav> -->
    <!-- <div class="container mt-5">
      <router-view></router-view>
    </div> -->



    

<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="teal lighten-3"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>


    <!-- <nav class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row"> -->
      <!-- <div class="container">
        <a class="navbar-brand float-left">Phone book</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item-5">
            <router-link class="nav-link pr-4" to="/">Add Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/list">View Contact</router-link>
          </li>
        </ul>
      </div> -->
    <!-- </nav> -->












      <v-spacer></v-spacer>

    </v-app-bar>
    <v-sheet
      max-height="60"
    >
      <v-container style="height: 100px;"></v-container>
    </v-sheet>
  </v-card>
</template>




  </div>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
