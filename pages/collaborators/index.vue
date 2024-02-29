<template>
  <v-container>
    <v-card flat border>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-account-multiple"></v-icon>
        <span class="ms-5">Liste des collaborateurs</span>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          single-line
          flat
          hide-details
          variant="solo-filled"
          class="me-5"
        ></v-text-field>

        <v-btn :to="'/campaigns/add'" color="primary"
          >Ajouter un Recrutement</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table-server
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
          <v-btn size="small" :to="`/campaigns/${item.id}`" icon variant="flat"
            ><v-icon color="primary"> mdi-eye </v-icon></v-btn
          >

          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template></v-data-table-server
      ></v-card
    >
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "user",
});
const route = useRoute();

const serverItems = ref([] as any[]);
const headers = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Campagne", width: "25%", key: "nom", align: "start" },

  {
    title: "Nombre de collaborateurs",
    width: "25%",
    key: "intitule_poste",
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);

const { data, pending, error, refresh, execute, status } = await useFetch(
  "http://127.0.0.1:8000/api/campagnes/"
);

if (data.value) {
  console.log(data.value);
  serverItems.value = data.value;
}

if (error.value) {
  // console.log("error : ", error.value?.data);
  console.log(error.value);
}
</script>
<script lang="ts">
const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: "0",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: "6",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: "16",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: "22",
  },
];

export default {
  data: () => ({
    itemsPerPage: 5,

    search: "",
    totalItems: 0,
  }),
};
</script>
