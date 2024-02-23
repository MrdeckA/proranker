import type { DynamicPath } from "~/types";
import type { MyBasicObjectType } from "~/types/base";

export const API_PUBLIC_ROUTES: DynamicPath[] = ["/api/login", "/api/register"];

export const PINIA_STORE_BASE_KEY = "__proranker___";

export const NAVIGATION_DRAWER_ROUTES = [
  {
    title: "Tableau de bord",
    path: "/dashboard",
    icon: "mdi-view-dashboard",
  },

  {
    title: "Campagnes",
    path: "/campaigns",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Mes fichiers",
    path: "/myfiles",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Collaborateurs",
    path: "/collaborators",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Mon Profil",
    path: "/profile",
    icon: "mdi-view-dashboard",
  },
  // {
  //   title: "Paramètres",
  //   path: "/settings",
  //   icon: "mdi-view-dashboard",
  // },
  {
    title: "Déconnexion",
    path: "/settings",
    icon: "mdi-view-dashboard",
  },
];

export const AppPublicRoutes = ["index", "about", "auth"];
