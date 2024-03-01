<template>
  <v-container>
    <v-card width="80%" class="pa-5 mx-auto" title="Détails recruitement"
      ><v-form @submit.prevent="onRecruitmentFormSumbit">
        <v-col>
          <v-text-field
            v-model="campagneToEdit.nom"
            label="Nom"
            variant="outlined"
            :readonly="!isUpdate"
          ></v-text-field></v-col
        ><v-col>
          <v-text-field
            v-model="campagneToEdit.intitule_poste"
            label="Intitulé du poste"
            variant="outlined"
            :readonly="!isUpdate"
          ></v-text-field
        ></v-col>
        <v-col>
          <v-textarea
            v-model="campagneToEdit.description_poste"
            label="Description du poste"
            variant="outlined"
            :readonly="!isUpdate"
          ></v-textarea
        ></v-col>

        <v-col>
          <v-list>
            <v-list-subheader>
              Critères
              <!-- <v-btn
                @click="openFormDialog = true"
                class="ms-5"
                color="primary"
                size="x-small"
                icon
                ><v-icon>mdi-plus</v-icon></v-btn
              > -->
            </v-list-subheader>

            <v-list-item v-if="isDefinedValue(campagneToEdit.minimum_degree)"
              >Diplome minimum : {{ campagneToEdit.minimum_degree }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item
              v-if="isDefinedValue(campagneToEdit.minimum_number_of_languages)"
              >Nombre Minimum de langues :
              {{ campagneToEdit.minimum_number_of_languages }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.minimum_number_of_experiences"
              >Nombre minimum d'experience :
              {{ campagneToEdit.minimum_number_of_experiences }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.languages"
              >Langues : {{ campagneToEdit.languages }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.skills"
              >Compétences : {{ campagneToEdit.skills }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item
              v-if="isDefinedValue(campagneToEdit.has_certifications)"
            >
              A des Certification : {{ campagneToEdit.has_certifications }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="isDefinedValue(campagneToEdit.has_awards)">
              A des Prix : {{ campagneToEdit.has_awards }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <div class="text-center" v-if="!isUpdate">
          <v-btn
            color="primary"
            @click="isUpdate = true"
            prepend-icon="mdi-pencil"
            >Modifier</v-btn
          >
        </div>
        <div class="text-center" v-else>
          <v-btn
            class="me-10"
            color="red"
            @click="isUpdate = false"
            prepend-icon="mdi-pencil"
            >Annuler</v-btn
          >
          <v-btn
            color="primary"
            @click="isUpdate = true"
            prepend-icon="mdi-pencil"
            >Sauvegarder</v-btn
          >
        </div>
      </v-form></v-card
    >

    <!--Dialog-->

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
            <v-form @submit.prevent="onNewCriteriaFormSubmit">
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
                <v-btn
                  class="ma-5"
                  color="primary"
                  @click="openFormDialog = false"
                  >Ok</v-btn
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
import { type Campagne } from "@/types";
import axios from "axios";
import { isUndefined, isNull } from "lodash";
definePageMeta({
  layout: "user",
});
const route = useRoute();

const criteriaTypes = ref(
  [
    "A des prix",
    "Nombre minimum d'expériences",
    "A des certifications",
    "Compétences",
    "Langues",
    "Nombre minimum de langues",
    "Diplome minimum",
  ].sort()
);

const isUpdate = ref(false);

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
const openFormDialog = ref(false);
const campagneToEdit = ref({} as Campagne);
const campagneToEditType = ref("");

const onFormSubmit = () => {
  openFormDialog.value = false;
};

interface Critere {
  type: string;
  valeur: string;
}
const criteres: Ref<Critere[]> = ref([]);

const onNewCriteriaFormSubmit = () => {};

const onRecruitmentFormSumbit = async () => {
  // console.log(campagneToEdit.value);
  let data = new FormData();
  campagneToEdit.value.fichiers?.forEach((file, index) => {
    console.log(index);
    data.append(file.name, campagneToEdit.value.fichiers[index]);
  });
  data.append("model", JSON.stringify({ ...campagneToEdit.value, user: "1" }));
  console.log(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    data: {
      ...data,
    },
    Headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await axios
    .post("http://127.0.0.1:8000/api/campagnes/", data, config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
const search = ref("");

function isDefinedValue(value: any): boolean {
  return !isUndefined(value);
}

enum Correspondance {
  "Nombre minimum de langues" = "minimum_number_of_languages",
  "Nombre minimum d'expériences" = "minimum_number_of_experiences",
  "Nombre minimum d'années d'expérience" = "minimum_number_of_years_of_experience",
  "Diplome minimum" = "minimum_degree",
  "Langues" = "languages",
  "Compétences" = "skills",
  "A des prix" = "has_awards",
  "A des certifications" = "has_certifications",
}

watch(campagneToEdit.value, () => {
  criteriaTypes.value = filtrerClésDéfinies(
    criteriaTypes.value,
    campagneToEdit.value
  ).sort();

  console.log(criteriaTypes.value);
  // criteriaTypes.value.forEach((criteria) => {
  //   if (isDefinedValue(campagneToEdit.value[criteria])) {
  //     console.log(criteria);
  //   }
  // });
});
function filtrerClésDéfinies(tableau: string[], objet: any): string[] {
  // Filtrer les clés du tableau qui sont définies dans l'objet
  const clésDéfinies = tableau.filter((clé) => {
    return isUndefined(objet[Correspondance[clé]]);
  });

  return clésDéfinies;
}

// console.log(isDefinedValue(campagneToEdit.value["has_awards"]));

// onBeforeMount(async () => {
//   await axios
//     .get("http://127.0.0.1:8000/api/campagnes/" + route.params.recruitment_id)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

const { data, pending, error, refresh, execute, status } = await useFetch(
  "http://localhost:8000/api/campagnes/10/"
);

if (data.value) {
  campagneToEdit.value = data.value;
  console.log(data.value);
  // serverItems.value = data.value;
}

if (error.value) {
  // console.log("error : ", error.value?.data);
  console.log(error.value);
}
</script>
