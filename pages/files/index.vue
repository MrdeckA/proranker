<template>
  <v-container>
    <v-card flat border>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-file"></v-icon>
        <span class="ms-5">Mes fichiers</span>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Recherche"
          single-line
          flat
          hide-details
          variant="solo-filled"
          class="me-5"
        ></v-text-field>

        <!-- <v-btn :to="'/recruitments/add'" color="primary">Ajouter un Fichier</v-btn> -->
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        class="border shadow-lg"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="campagnes.length"
        :items="campagnes"
        :search="search"
        item-value="name"
      >
        <template #item.description_poste="{ item }">
          <span class="text-truncate">{{ item.description_poste }}</span>
          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>

        <template #item.id="{ item, index }">
          <span class="text-truncate">{{ index + 1 }}</span>
        </template>
        <template #item.numberoffiles="{ item, index }">
          <span>{{ item.files.length }}</span>
        </template>
        <template #item.action="{ item }">
          <v-btn
            size="small"
            :to="`/recruitments/${item.id}/files/`"
            icon
            variant="flat"
            ><v-icon color="primary"> mdi-eye </v-icon></v-btn
          >

          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template></v-data-table
      ></v-card
    >
  </v-container>
</template>

<script lang="ts" setup>
import { type Campagne } from "@/types";
import { useAuthStore } from "~/store";
definePageMeta({
  layout: "user",
});
const route = useRoute();
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
const campagnes = ref([] as any[]);
const headers = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Campagne", width: "25%", key: "nom", align: "start" },

  {
    title: "Nombre de fichiers",
    width: "25%",
    key: "numberoffiles",
    align: "center",
  },
  { title: "Action", key: "action", align: "center" },
]);

const { data, pending, error, refresh, execute, status } = await useFetch(
  `http://127.0.0.1:8000/api/campagnes/?user=${authenticatedUser.value?.id}`,
  {
    headers: {
      Authorization: "Bearer " + authenticationToken.value,
    },
  }
);

const totalItems = ref(0);

if (data.value) {
  campagnes.value = data.value.results;
  campagnes.value = campagnes.value.map((c) => {
    return { ...c, files: JSON.parse(c.files) };
  });
  console.log(campagnes.value);
}

if (error.value) {
  // console.log("error : ", error.value?.data);
  console.log(error.value);
}

const itemsPerPage = ref(15);
const search = ref("");
</script>
