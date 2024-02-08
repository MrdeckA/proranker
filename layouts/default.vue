<template>
  <v-layout><slot /></v-layout>
</template>
<script lang="ts" setup>
const route = useRoute();
console.log(route.name);
</script>
