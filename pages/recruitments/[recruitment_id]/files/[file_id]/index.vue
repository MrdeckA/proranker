<template>
  <v-container>
    <v-card width="90%" class="mx-auto">
      <v-list-item
        prepend-icon="mdi-file"
        v-for="(file, key) in campagne.files"
        :key="key"
        :value="file"
        :title="file.original_name"
        subtitle="350 Ko"
      >
        <template #append>
          <v-btn size="small" icon="mdi-eye" variant="text"></v-btn>
          <v-btn size="small" icon="mdi-download" variant="text"></v-btn>
          <v-btn size="small" icon="mdi-delete" variant="text"></v-btn>
        </template>
      </v-list-item>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil aspernatur
      suscipit asperiores, eligendi quae adipisci eveniet error temporibus
      maxime omnis modi praesentium, corrupti cum sit impedit ratione saepe
      deserunt sunt!
    </v-card>
    <v-divider></v-divider>
  </v-container>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store";

definePageMeta({
  layout: "user",
});
const campagne = ref({} as any);
const selectedCampagne = ref();
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
const route = useRoute();

onMounted(async () => {
  const { data: resData, error: resError } = await useFetch(
    `http://127.0.0.1:8000/api/campagnes/${route.params.recruitment_id}/`,
    {
      // query: {
      //   user: "1",
      // },

      onRequest({ request, options }) {
        //
      },
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (resData.value) {
    campagne.value = resData.value;
    console.log(resData.value);
    campagne.value.files = JSON.parse(campagne.value.files);
  }

  if (resError.value) {
    console.log("error : ", resError.value?.data);
    console.log(resError.value);
  }
});
</script>
