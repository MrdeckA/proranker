// // store/filters.ts
import { defineStore } from "pinia";

export default defineStore(
  "app",
  () => {
    const appName = ref("Pro Ranker app");
    const currentPageTitle = ref("Page Title From Store");

    const setAppName = (_name: string) => {
      appName.value = _name;
    };

    const setCurrentPageTitle = (_title: string) => {
      if (!isEmptyString(currentPageTitle.value))
        currentPageTitle.value = _title;
      else {
        resetStore();
      }
    };

    const resetStore = () => {
      appName.value = "Pro Ranker app";
      currentPageTitle.value = "Page Title From Store";
    };

    return {
      appName,
      currentPageTitle,
      setAppName,
      resetStore,
      setCurrentPageTitle,
    };
  },

  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
