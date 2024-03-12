<script lang="ts" setup></script>

<template>
  <v-layout>
    <v-app-bar :elevation="2">
      <v-app-bar-title class="ms-10">
        <v-icon size="50" color="primary">mdi-professional-hexagon</v-icon>
        <span class="app_title">PRORANKER</span></v-app-bar-title
      >

      <template v-slot:append>
        <NuxtLink active-class="nuxt_link_active" to="/"
          ><v-btn :variant="currentPath == '/' ? 'tonal' : 'text'"
            >Acceuil</v-btn
          ></NuxtLink
        >
        <NuxtLink active-class="nuxt_link_active" to="/auth/login"
          ><v-btn :variant="currentPath == '/auth/login' ? 'tonal' : 'text'"
            >Connexion</v-btn
          ></NuxtLink
        >
        <NuxtLink active-class="nuxt_link_active" to="/auth/register"
          ><v-btn :variant="currentPath == '/auth/register' ? 'tonal' : 'text'"
            >Inscription</v-btn
          ></NuxtLink
        >
        <NuxtLink active-class="nuxt_link_active" to="/faq"
          ><v-btn :variant="currentPath == '/faq' ? 'tonal' : 'text'"
            >FAQ</v-btn
          ></NuxtLink
        >
      </template>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>

    <v-footer class="border d-flex flex-column pa-0">
      <div class="bg-primary d-flex w-100 align-center px-4">
        <strong> Optimisez vos recrutements grâce à l'IA !</strong>

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
        {{ new Date().getFullYear() }} — <strong>PRORANKER</strong>
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

const route = useRoute();
// const activeRoute = ref(object.keys(route));
// console.log(objects.keys(route));
const currentPath = ref(route.path);

console.log(currentPath.value);

watch(
  () => route.path,
  () => {
    currentPath.value = ref(route.path);
  }
);
// const currentPath =
</script>

<style scoped>
.v-layout {
  flex-direction: column;
}

.nuxt_link_active {
  color: #6200ea;
  text-decoration: underline;
}
.app_title {
  font-size: 1.5em;
  position: relative;
  top: 0.15em;
  left: 0.25em;
}

a {
  color: black;
}
</style>
