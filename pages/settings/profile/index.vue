<template>
  <v-container> settings/PROFILE/index </v-container>
</template>
<script setup lang="ts">
const { appName } = useAppConfig();

useHead({
  title: `Profil  - ${appName}`,
});

definePageMeta({
  layout: "user",
});
</script>

<style scoped></style>
