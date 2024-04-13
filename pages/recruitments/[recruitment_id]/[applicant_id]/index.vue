<template>
  <div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid doloremque
    suscipit corrupti sapiente commodi! Atque maxime voluptatem a suscipit dolor
    neque, aspernatur voluptatibus. Id incidunt doloremque temporibus voluptatum
    atque harum!
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "user",
});

const route = useRoute();

const applicant_id = route.params.applicant_id;
const recruitement_id = route.params.recruitement_id;

console.log(applicant_id, recruitement_id);
</script>
