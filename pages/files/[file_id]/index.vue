<template>
  <v-container>
    <v-card :title="campagne.nom">
      <template #append>
        <v-btn :to="'/campaigns/add'" color="primary">Ajouter un Fichier</v-btn>
      </template>
      <v-list>
        <v-list-item
          prepend-icon="mdi-file"
          v-for="(file, key) in campagne.files"
          :key="key"
          :value="file"
          :title="file.original_name"
          subtitle="350 Ko"
        >
          <template #append>
            <v-btn size="small" icon="mdi-download" variant="text"></v-btn>
            <v-btn size="small" icon="mdi-delete" variant="text"></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
    <v-divider></v-divider>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "user",
});
const campagne = ref({} as any);
const selectedCampagne = ref();

onBeforeMount(async () => {
  const { data: resData, error: resError } = await useFetch(
    "http://127.0.0.1:8000/api/campagnes/19/",
    {
      // query: {
      //   user: "1",
      // },

      onRequest({ request, options }) {
        //
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
