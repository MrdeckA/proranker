<template>
  <v-container>
    <v-card flat border>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-video-input-component"></v-icon>
        <span class="ms-5">Liste des critères</span>

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

        <v-btn color="primary" @click="openFormDialog = true"
          >Ajouter un critère</v-btn
        >
        <!-- :to="'/recruitments/' + route.params.campaign_id + '/criteria/add'" -->
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        v-model:search="search"
        :items="criteres"
      >
        <template v-slot:item.image="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img
              :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
              height="64"
              cover
            ></v-img>
          </v-card>
        </template>
        <template #item.action="{ item }">
          <v-btn
            size="small"
            :to="`/recruitments/${item.id}`"
            icon
            variant="flat"
            ><v-icon color="primary"> mdi-eye </v-icon></v-btn
          >
          <v-btn size="small" icon variant="flat">
            <v-icon color="primary"> mdi-pencil </v-icon>
          </v-btn>

          <v-btn size="small" icon variant="flat">
            <v-icon color="primary"> mdi-delete </v-icon>
          </v-btn>

          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center">
      <v-btn
        class="ma-5"
        color="primary"
        type="submit"
        append-icon="mdi-arrow-right"
        @click="onContinueButtonClick"
        >Continuer</v-btn
      >
    </div>
    <!--Modal form-->
    <v-dialog v-model="openFormDialog" width="750">
      <template v-slot:default="{ isActive }">
        <v-container>
          <v-card class="px-0" title="Ajout d'un nouveau critère">
            <template #append>
              <v-btn
                class="ma-2"
                color="primary"
                @click="isActive.value = false"
                >Retour</v-btn
              >
            </template>
            <v-form @submit.prevent="onFormSubmit">
              <v-row class="mx-2">
                <v-col>
                  <v-autocomplete
                    v-model="campagneToEditType"
                    label="Type"
                    variant="outlined"
                    density="comfortable"
                    :items="criteriaTypes"
                    required
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <!--new-->
                  <v-autocomplete
                    v-if="campagneToEditType === 'A des prix'"
                    v-model="campagneToEdit.has_awards"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="binariesItems"
                    item-title="label"
                    item-value="value"
                    required
                  >
                  </v-autocomplete>
                  <v-autocomplete
                    v-if="campagneToEditType === 'A des certifications'"
                    v-model="campagneToEdit.has_certifications"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="binariesItems"
                    item-title="label"
                    item-value="value"
                    required
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    v-if="campagneToEditType === 'Compétences'"
                    v-model="campagneToEdit.skills"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="['Java', 'Python', 'C', 'C++']"
                    multiple
                    required
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    v-if="campagneToEditType === 'Diplome minimum'"
                    v-model="campagneToEdit.minimum_degree"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="['BAC', 'Licence', 'Master']"
                    required
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    v-if="campagneToEditType === 'Langues'"
                    v-model="campagneToEdit.languages"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="['Français', 'Anglais', 'Chinois']"
                    multiple
                    required
                  >
                  </v-autocomplete>

                  <v-text-field
                    v-if="
                      campagneToEditType === 'Nombre minimum d\'expériences'
                    "
                    v-model="campagneToEdit.minimum_number_of_experiences"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    required
                    type="number"
                  ></v-text-field>
                  <v-text-field
                    v-if="
                      campagneToEditType ===
                      'Nombre minimum d\'années d\'expériences'
                    "
                    v-model="
                      campagneToEdit.minimum_number_of_years_of_experience
                    "
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    required
                    type="number"
                  ></v-text-field>
                  <v-text-field
                    v-if="campagneToEditType === 'Nombre minimum de langues'"
                    v-model="campagneToEdit.minimum_number_of_languages"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    required
                    type="number"
                  ></v-text-field>

                  <!--new-->
                </v-col>
              </v-row>
              <div class="text-center">
                <v-btn class="ma-5" color="primary" type="submit"
                  >Ajouter</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-container>
      </template>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { isArray } from "lodash";
import { type Campagne } from "@/types";
definePageMeta({
  layout: "user",
});

const route = useRoute();

const openFormDialog = ref(false);

const criteriaTypes = ref(
  [
    "A des prix",
    "Nombre minimum d'expériences",
    "Nombre minimum d'années d'expériences",
    "A des certifications",
    "Compétences",
    "Langues",
    "Nombre minimum de langues",
    "Diplome minimum",
  ].sort()
);

interface Critere {
  type: string;
  valeur: string | string[];
}
const criteres: Ref<Critere[]> = ref([]);

const headers = ref([
  { title: "Type", width: "25%", key: "type", align: "start" },
  {
    title: "Value",
    key: "valeur",
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);

const binariesItems = ref([
  {
    label: "Oui",
    value: true,
  },
  {
    label: "Non",
    value: false,
  },
]);

const campagneToEdit = ref({} as Campagne);
const campagneToEditType = ref("");
const onFormSubmit = () => {
  openFormDialog.value = false;

  // const selectedCriteriaTypes = criteres.value?.map(
  //   (criteria) => criteria.type
  // );

  // criteriaTypes.value = criteriaTypes.value.filter(
  //   (criteriaType) => !selectedCriteriaTypes.includes(criteriaType)
  // );
};

const onContinueButtonClick = async () => {
  console.log(campagneToEdit.value, campagneToEditType.value);
  // console.log("contiinons", {
  //   campagne: 14,
  //   criteres: criteres.value,
  // });
  // const { data, pending, error, refresh, execute, status } = await useFetch(
  //   "http://127.0.0.1:8000/api/criteres/create-many/",
  //   {
  //     method: "post",
  //     body: {
  //       campagne: route.params.campaign_id ?? "12",
  //       criteres: criteres.value,
  //     },
  //   }
  // );
  // if (data.value) {
  //   console.log(data.value);
  // }
  // if (error.value) {
  //   console.log(error.value);
  // }
};

/*
async function init() {
  const { data, pending, error, refresh, execute, status } = await useFetch(
    "http://127.0.0.1:8000/api/criteres/",
    {
      query: {
        campagne: route.params.campaign_id,
      },
    }
  );
  const criteriaTypesFromDatabase = ref([] as string[]);
  if (isArray(data.value)) {
    // console.log(Object.keys(data.value), data.value.length);
    criteriaTypesFromDatabase.value = data.value?.map(
      (campagne) => campagne.type
    );
    console.log("Before", criteriaTypesFromDatabase.value);
    criteriaTypes.value = criteriaTypes.value.filter(
      (criteriaType) => !criteriaTypesFromDatabase.value.includes(criteriaType)
    );
    console.log("After", criteriaTypes.value, criteriaTypes.value.length);
    criteres.value = data.value;
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
  }
}
await init();*/

const search = ref("");
</script>
