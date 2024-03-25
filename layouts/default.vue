<script lang="ts" setup></script>

<template>
  <v-layout>
    <v-app-bar :elevation="2">
      <v-app-bar-title class="ms-5" @click="goToHome()">
        <v-icon size="50" color="primary">mdi-professional-hexagon</v-icon>
        <span class="app_title">PRORANKER</span></v-app-bar-title
      >
      <v-spacer></v-spacer>

      <template v-slot:append>
        <NuxtLink active-class="nuxt_link_active" to="/"
          ><v-btn
            variant="plain"
            class="font-weight-bold"
            :color="currentPath == '/' ? 'primary' : 'black'"
            >Acceuil</v-btn
          ></NuxtLink
        >
        <NuxtLink active-class="nuxt_link_active" to="/auth/login"
          ><v-btn
            variant="plain"
            :color="currentPath == '/auth/login' ? 'primary' : 'black'"
            class="font-weight-bold"
            >Connexion</v-btn
          ></NuxtLink
        >
        <NuxtLink active-class="nuxt_link_active" to="/auth/register"
          ><v-btn
            :color="currentPath == '/auth/register' ? 'primary' : 'black'"
            variant="plain"
            class="font-weight-bold"
            >Inscription</v-btn
          ></NuxtLink
        >
        <NuxtLink active-class="nuxt_link_active" to="/faq"
          ><v-btn
            variant="plain"
            class="font-weight-bold"
            :color="currentPath == '/faq' ? 'primary' : 'black'"
            >Comment ça marche ?</v-btn
          ></NuxtLink
        >
      </template>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>

    <v-footer class="border d-flex flex-column pa-0" app>
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
const router = useRouter();
// const activeRoute = ref(object.keys(route));
// console.log(objects.keys(route));
const currentPath = ref(route.path);

console.log(currentPath.value);

watch(
  () => route.path,
  () => {
    currentPath.value = route.path;
  }
);
// const currentPath =

const goToHome = () => {
  router.push("/");
};
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
  font-family:
    Questrial,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif !important;
}

a {
  color: black;
}
</style>
