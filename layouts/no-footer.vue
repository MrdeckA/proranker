<script lang="ts" setup></script>

<template>
  <v-layout>
    <v-main>
      <slot />
    </v-main>

    <v-footer
      app
      color="primary"
      class="border bg-primary d-flex flex-column pa-0"
    >
      <div class="px-4 py-2 bg-black text-center w-100">
        Copyright {{ new Date().getFullYear() }} — <strong>PRORANKER</strong>
      </div>
    </v-footer>
  </v-layout>
</template>

<script lang="ts" setup>
const icons = ref([
  "mdi-facebook",
  "mdi-twitter",
  "mdi-linkedin",
  "mdi-instagram",
]);

const route = useRoute();
const router = useRouter();
// const activeRoute = ref(object.keys(route));
// console.log(objects.keys(route));
const currentPath = ref(route.path);

console.log(currentPath.value);

watch(
  () => route.path,
  () => {
    currentPath.value = route.path;
  }
);
// const currentPath =

const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.v-layout {
  flex-direction: column;
}

.nuxt_link_active {
  color: #6200ea;
  text-decoration: underline;
}
.app_title {
  font-size: 1.5em;
  position: relative;
  top: 0.15em;
  left: 0.25em;
}

a {
  color: black;
}
</style>
