import type { DynamicPath } from "~/types";
import type { MyBasicObjectType } from "~/types/base";

export const API_PUBLIC_ROUTES: DynamicPath[] = ["/api/login", "/api/register"];

export const PINIA_STORE_BASE_KEY = "__proranker___";

export const NAVIGATION_DRAWER_ROUTES = [
  {
    title: "Tableau de bord",
    path: "/dashboard",
    icon: "mdi-home",
  },

  {
    title: "Recrutements",
    path: "/recruitments",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Fichiers",
    path: "/files",
    icon: "mdi-file-pdf-box",
  },
  {
    title: "Collaborateurs",
    path: "/collaborators",
    icon: "mdi-account-group",
  },
  {
    title: "Mon Profil",
    path: "/profile",
    icon: "mdi-account",
  },
  // {
  //   title: "Paramètres",
  //   path: "/settings",
  //   icon: "mdi-view-dashboard",
  // },
  // {
  //   title: "Déconnexion",
  //   path: "/settings",
  //   icon: "mdi-view-dashboard",
  // },
];

export const AppPublicRoutes = ["index", "about", "auth"];
