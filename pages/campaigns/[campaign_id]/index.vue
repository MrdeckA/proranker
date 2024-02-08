<template>
  <v-container>
    <v-file-input
      v-model="files"
      color="deep-purple-accent-4"
      counter
      label="File input"
      multiple
      placeholder="Select your files"
      prepend-icon="mdi-paperclip"
      variant="outlined"
      :show-size="1000"
      accept=".pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="(fileName, index) in fileNames" :key="fileName">
          <v-chip
            v-if="index < 2"
            color="deep-purple-accent-4"
            label
            size="small"
            class="me-2"
          >
            {{ fileName }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="text-overline text-grey-darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </template>
    </v-file-input>
  </v-container>
</template>
<script lang="ts" setup>
const route = useRoute();
definePageMeta({
  layout: "user",
});

const files = ref([]);
console.log(route.params.campaign_id);
</script>
