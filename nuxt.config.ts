// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.ts
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "assets/styles/main.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  ssr: false,
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Questrial&display=swa",
        },
      ],
    },
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
    "@sidebase/nuxt-pdf",
  ],
  pages: true,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || "http://localhost:8000",
      ENV: process.env.ENV || "dev",
    },
  },
});
