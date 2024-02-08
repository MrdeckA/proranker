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
];

export const AppPublicRoutes = ["index", "about", "auth"];
