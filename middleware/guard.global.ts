import { useAuthStore } from "@/store";
import { AppPublicRoutes } from "@/configs/constants";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

  const isPubicRoute = AppPublicRoutes.some((prefix) =>
    to.name?.toString().startsWith(prefix)
  );

  // Si l'utilisateur n'a pas le token et tente d'accéder à une route privée
  // On le renvoie à la pas de connexion

  if (!authenticationToken.value && !isPubicRoute) {
    return navigateTo("/auth/login");
  }

  // if (to.path === "/auth/verify-email" && !to.query.verify_token) {
  //   return navigateTo("/dashboard");
  // }
});
