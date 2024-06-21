<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" width="300" class="bg-primary">
      <!--  -->
      <v-list>
        <v-list-item>
          <!-- <img height="60em" src="@/assets/images/logo.png" alt="logo" /> -->

          <v-btn
            @click="$router.push('/dashboard')"
            variant="text"
            class="mb-5 mt-2"
            :ripple="false"
          >
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
      <template #prepend>
        <v-btn v-if="showGoBackIcon" @click="router.back()" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <v-app-bar-nav-icon
        v-if="!showGoBackIcon"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!-- icon="mdi-arrow-left" -->

      <v-app-bar-title>{{ currentAppBarTitle }}</v-app-bar-title>
      <v-btn prepend-icon="mdi-home" class="me-5" to="/dashboard"
        >Accueil</v-btn
      >
      <!-- <v-btn prepend-icon="mdi-bell" class="me-5">Notification</v-btn> -->
      <v-btn icon to="/profile" class="me-5">
        <v-avatar color="primary"
          >{{ logolify(authenticatedUser?.nom_complet as string) }}
        </v-avatar></v-btn
      >

      <template #append>
        <v-btn @click="onPowerButtonClick" icon
          ><v-icon size="35">mdi-power</v-icon></v-btn
        >
      </template>
    </v-app-bar>

    <v-main>
      <!--  -->
      <slot /> </v-main
  ></v-layout>
</template>
<script lang="ts" setup>
import { NAVIGATION_DRAWER_ROUTES } from "@/constants";
import { useAppStore, useAuthStore } from "~/store";

const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
const drawer = ref(true);
const router = useRouter();
const route = useRoute();

const appStore = useAppStore();
const { currentAppBarTitle } = storeToRefs(appStore);

const showGoBackIcon = ref(true);

const onPowerButtonClick = () => {
  authStore.resetStore();
  router.replace("/auth/login");
};

onBeforeMount(async () => {
  const currentRouteMatchingDrawerRoutes = NAVIGATION_DRAWER_ROUTES.find(
    (drawer_route) => drawer_route.path == route.fullPath
  );
  showGoBackIcon.value = true;

  if (currentRouteMatchingDrawerRoutes) {
    appStore.setCurrentAppBarTitle(currentRouteMatchingDrawerRoutes.title);
    showGoBackIcon.value = false;
  }
});

watch(
  () => route.fullPath,
  () => {
    const currentRouteMatchingDrawerRoutes = NAVIGATION_DRAWER_ROUTES.find(
      (drawer_route) => drawer_route.path == route.fullPath
    );
    showGoBackIcon.value = true;

    if (currentRouteMatchingDrawerRoutes) {
      appStore.setCurrentAppBarTitle(currentRouteMatchingDrawerRoutes.title);
      showGoBackIcon.value = false;
    }
  }
);
</script>

<style scoped></style>
