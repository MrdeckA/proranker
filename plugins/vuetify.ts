// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { fr } from "vuetify/locale";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: LIGHT_THEME,
      themes: {
        light,
        dark,
      },
    },
    locale: {
      locale: "fr",
      fallback: "fr",
      messages: { fr },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
