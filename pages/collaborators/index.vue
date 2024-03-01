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

        <v-btn @click="onCollaboratorAddClick" color="primary"
          >Ajouter un collaborateur</v-btn
        >
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
        <template #item.action="{ item, index }">
          <v-btn
            size="small"
            @click="openFormDialogForCampagne(item, index)"
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
    <v-dialog v-model="openFormDialog" width="750">
      <template v-slot:default="{ isActive }">
        <v-container>
          <v-card class="px-0" :title="`Collaborateurs de la campagne`">
            <v-form @submit.prevent="console.log('v')">
              <v-row class="mx-2">
                <v-col cols="12">
                  <v-autocomplete
                    variant="outlined"
                    label="Recrutement"
                    :items="campagnesList"
                    item-title="nom"
                    item-value="id"
                    v-model="selectedCampagne"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    label="Adresse email du collaborateur. Ex : email@gmail.com"
                  ></v-text-field>
                </v-col>

                <v-col class="text-center">
                  <v-btn class="mt-3" color="primary">Inviter</v-btn>
                </v-col>
              </v-row>
              <!-- <div class="text-center">
                <v-btn
                  class="ma-5"
                  color="primary"
                  @click="openFormDialog = false"
                  >Ok</v-btn
                >
              </div> -->
            </v-form>

            <v-col>
              <v-list>
                <v-list-subheader>
                  <h2>Collaborateurs</h2>
                  <!-- <v-btn
                @click="openFormDialog = true"
                class="ms-5"
                color="primary"
                size="x-small"
                icon
                ><v-icon>mdi-plus</v-icon></v-btn
              > -->
                </v-list-subheader>

                <v-list-item
                  v-for="(item, key) in serverItems[selectedCampagneIndex]
                    .collaborateurs"
                >
                  <v-list>
                    <v-list-item
                      :title="`Nom : ${item.user_full_name}`"
                      :subtitle="`Role : ${item.role}`"
                    >
                      Statut invitation :
                      {{ item.statut_invitation }}
                    </v-list-item>
                  </v-list>

                  <template #append>
                    <v-btn icon="mdi-delete" variant="text"></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-card>
        </v-container>
      </template>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "user",
});
const route = useRoute();
const openFormDialog = ref(false);

const serverItems = ref([] as any[]);
const headers = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Campagne", width: "25%", key: "nom_campagne", align: "start" },

  {
    title: "Nombre de collaborateurs",
    width: "25%",
    key: "total",
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);

const { data, pending, error, refresh, execute, status } = await useFetch(
  "http://127.0.0.1:8000/api/liste-campagnes-collaborateurs/?user=1"
);

const totalItems = ref(0);
const itemsPerPage = ref(10);
const search = ref("");
if (data.value) {
  console.log(data.value);
  serverItems.value = data.value;
  totalItems.value = data.value.length;
}

if (error.value) {
  console.log("error : ", error.value?.data);
  console.log(error.value);
}
const selectedCampagneIndex = ref(0);
function openFormDialogForCampagne(item: any, index: number) {
  selectedCampagne.value = item;
  selectedCampagneIndex.value = index;
  console.log(index);
  openFormDialog.value = true;
}

const campagnesList = ref([] as never[]);
onBeforeMount(async () => {
  const { data: resData, error: resError } = await useFetch(
    "http://127.0.0.1:8000/api/campagnes/",
    {
      query: {
        user: "1",
      },

      onRequest({ request, options }) {
        //
      },
    }
  );

  const selectedCampagne = ref();

  if (resData.value) {
    campagnesList.value = resData.value;
    console.log(data.value);
  }

  if (resError.value) {
    console.log("error : ", error.value?.data);
    console.log(error.value);
  }
});

const onCollaboratorAddClick = () => {
  openFormDialog.value = true;
};
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
</script>
