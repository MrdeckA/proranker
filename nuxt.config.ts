// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "assets/styles/main.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  pages: true,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3001",
      ENV: process.env.ENV || "dev",
    },
  },
});
