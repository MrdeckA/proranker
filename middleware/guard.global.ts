// import { useAuthStore } from "@/stores";
// import { useUser } from "~/composables/api";
// import { AppPublicRoutes } from "~/config/constants";
export default defineNuxtRouteMiddleware(async (to, from) => {
  // const authStore = useAuthStore();
  // const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
  // const userComposable = useUser();
  // const startsWithPrefix = AppPublicRoutes.some((prefix) =>
  //   to.name?.toString().startsWith(prefix)
  // );
  // // Si l'utilisateur n'a pas le token et tente d'accéder à une route privée
  // // On le renvoie à la pas de connexion
  // if (!authenticationToken.value && !startsWithPrefix) {
  //   return navigateTo("/auth/login");
  // }
  // if (to.path === "/auth/verify-email" && !to.query.verify_token) {
  //   return navigateTo("/dashboard");
  // }
  // if (!startsWithPrefix) {
  //   await userComposable.loadMe("agency");
  // }
});
