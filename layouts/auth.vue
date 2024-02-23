<script lang="ts" setup></script>

<template>
  <v-layout>
    <v-app-bar :elevation="2">
      <v-app-bar-title class="ms-10">
        <v-icon color="primary">mdi-home</v-icon> PRORANKER</v-app-bar-title
      >

      <template v-slot:append>
        <v-btn icon="mdi-heart"></v-btn>

        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>

    <v-footer app class="border d-flex flex-column pa-0">
      <div class="bg-primary d-flex w-100 align-center px-4">
        <strong>Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="plain"
          size="small"
        ></v-btn>
      </div>

      <div class="px-4 py-2 bg-black text-center w-100">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </v-layout>
</template>

<script lang="ts" setup>
const icons = ref([
  "mdi-facebook",
  "mdi-twitter",
  "mdi-linkedin",
  "mdi-instagram",
]);
</script>

<style scoped>
.v-layout {
  flex-direction: column;
}
</style>
