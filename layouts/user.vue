<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" class="bg-primary">
      <!--  -->
      <v-list>
        <v-list-item>
          <!-- <img height="60em" src="@/assets/images/logo.png" alt="logo" /> -->

          <v-btn variant="text" class="mb-5 mt-2">
            <template #prepend>
              <v-icon size="50" icon="mdi-professional-hexagon"></v-icon>
            </template>
            <h1 class="text-center text-h5">PRORANKER</h1></v-btn
          >

          <!-- <v-icon size="50" color="primary">mdi-professional-hexagon</v-icon> -->
          <!-- <span class="app_title">PRORANKER</span> -->
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="route in NAVIGATION_DRAWER_ROUTES"
          :prepend-icon="route.icon"
          :title="route.title"
          :to="route.path"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- icon="mdi-arrow-left" -->

      <v-app-bar-title>Collaborateurs</v-app-bar-title>
      <v-btn prepend-icon="mdi-home" class="me-5">Accueil</v-btn>
      <!-- <v-btn prepend-icon="mdi-bell" class="me-5">Notification</v-btn> -->
      <v-avatar color="primary" class="me-5">MA</v-avatar>

      <template #append>
        <v-btn icon><v-icon size="35">mdi-power</v-icon></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <!--  -->
      <slot /> </v-main
  ></v-layout>
</template>
<script lang="ts" setup>
import { NAVIGATION_DRAWER_ROUTES } from "@/constants";
const drawer = ref(true);
</script>

<style scoped></style>
