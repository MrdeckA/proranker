import { defineStore } from "pinia";
import { type TTenant } from "@/types";
export default defineStore(
  "auth",
  () => {
    const authenticationToken = ref<string | undefined>(undefined);

    const authenticatedUser = ref<TTenant | undefined>(undefined);

    function updateAuthenticationToken(_authenticationToken: string) {
      authenticationToken.value = _authenticationToken;
    }
    function updateAuthenticatedUser(_user: Record<string, any>) {
      authenticatedUser.value = _user;
    }

    function resetStore() {
      authenticationToken.value = undefined;
      authenticatedUser.value = undefined;
    }

    return {
      authenticationToken,
      authenticatedUser,
      updateAuthenticationToken,
      updateAuthenticatedUser,
      resetStore,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
