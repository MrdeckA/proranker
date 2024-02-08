import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { PINIA_STORE_BASE_KEY } from "@/constants";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = <any>nuxtApp.$pinia;

  pinia.use(
    createPersistedState({
      key: (storeId: string) => `${PINIA_STORE_BASE_KEY}${storeId}`,
      storage: localStorage,
    })
  );
});
