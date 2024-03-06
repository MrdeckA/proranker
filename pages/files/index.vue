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

        <!-- <v-btn :to="'/campaigns/add'" color="primary">Ajouter un Fichier</v-btn> -->
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        class="border shadow-lg"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
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
          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>
        <template #item.action="{ item }">
          <v-btn size="small" :to="`/files/${item.id}`" icon variant="flat"
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
definePageMeta({
  layout: "user",
});
const route = useRoute();

const serverItems = ref([] as Campagne[]);
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
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);

const { data, pending, error, refresh, execute, status } = await useFetch(
  "http://127.0.0.1:8000/api/campagnes/"
);
const totalItems = ref(0);

if (data.value) {
  console.log(data.value);
  serverItems.value = data.value;
  totalItems.value = ref(data.value.length);
  // console.log(JSON.parse(serverItems.value[8].files));

  // serverItems.vaue.for

  serverItems.value[0].numberoffiles = 16;
  serverItems.value[1].numberoffiles = 5;
  serverItems.value[2].numberoffiles = 13;
  serverItems.value[3].numberoffiles = 19;
  serverItems.value[4].numberoffiles = 14;
  serverItems.value[5].numberoffiles = 12;
  serverItems.value[6].numberoffiles = 20;
  serverItems.value[7].numberoffiles = 15;
  serverItems.value[8].numberoffiles = 10;
  console.log(serverItems.value[0]);
  // serverItems.value.forEach((element) => {
  //   console.log(`${element.nom} => ${element.files}`);
  // });
}

if (error.value) {
  // console.log("error : ", error.value?.data);
  console.log(error.value);
}

const itemsPerPage = ref(15);
const search = ref("");
</script>
