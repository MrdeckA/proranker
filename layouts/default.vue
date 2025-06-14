<script lang="ts" setup>
const icons = ref([
  "mdi-facebook",
  "mdi-twitter",
  "mdi-linkedin",
  "mdi-instagram",
]);

const route = useRoute();
const router = useRouter();
const currentPath = ref(route.path);
const drawer = ref(false);

watch(
  () => route.path,
  () => {
    currentPath.value = route.path;
  }
);

const goToHome = () => {
  router.push("/");
};
</script>

<template>
  <v-layout>
    <v-app-bar :elevation="2">
      <v-app-bar-title class="ms-2 ms-md-5 cursor-pointer" @click="goToHome()">
        <v-icon size="40" color="primary">mdi-professional-hexagon</v-icon>
        <span class="app_title">PRORANKER</span>
      </v-app-bar-title>

      <v-spacer />

      <!-- Menu Desktop -->
      <template v-if="$vuetify.display.mdAndUp">
        <NuxtLink active-class="nuxt_link_active" to="/">
          <v-btn
            variant="plain"
            class="font-weight-bold"
            :color="currentPath == '/' ? 'primary' : 'black'"
          >
            Accueil
          </v-btn>
        </NuxtLink>

        <NuxtLink active-class="nuxt_link_active" to="/auth/login">
          <v-btn
            variant="plain"
            class="font-weight-bold"
            :color="currentPath == '/auth/login' ? 'primary' : 'black'"
          >
            Connexion
          </v-btn>
        </NuxtLink>

        <NuxtLink active-class="nuxt_link_active" to="/auth/register">
          <v-btn
            variant="plain"
            class="font-weight-bold"
            :color="currentPath == '/auth/register' ? 'primary' : 'black'"
          >
            Inscription
          </v-btn>
        </NuxtLink>

        <NuxtLink active-class="nuxt_link_active" to="/faq">
          <v-btn
            variant="plain"
            class="font-weight-bold"
            :color="currentPath == '/faq' ? 'primary' : 'black'"
          >
            Comment ça marche ?
          </v-btn>
        </NuxtLink>
      </template>

      <!-- Burger Menu Mobile -->
      <template v-else>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
    </v-app-bar>

    <!-- Drawer Mobile -->
    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list nav>
        <v-list-item
          v-for="link in [
            { to: '/', text: 'Accueil' },
            { to: '/auth/login', text: 'Connexion' },
            { to: '/auth/register', text: 'Inscription' },
            { to: '/faq', text: 'Comment ça marche ?' }
          ]"
          :key="link.to"
          @click="router.push(link.to); drawer = false"
        >
          <v-list-item-title
            :class="{
              'text-primary': currentPath === link.to,
              'font-weight-bold': true
            }"
          >
            {{ link.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>

    <v-footer class="border d-flex flex-column pa-0" app>
      <div class="bg-primary d-flex w-100 align-center px-4">
        <strong>Optimisez vos recrutements grâce à l'IA !</strong>
        <v-spacer />
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-2"
          :icon="icon"
          variant="plain"
          size="small"
        />
      </div>
      <div class="px-4 py-2 bg-black text-center w-100 text-white">
        {{ new Date().getFullYear() }} — <strong>PRORANKER</strong>
      </div>
    </v-footer>
  </v-layout>
</template>

<style scoped>
.nuxt_link_active {
  color: #6200ea;
  text-decoration: underline;
}
.app_title {
  font-size: 1.3em;
  margin-left: 0.4em;
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
</style>
