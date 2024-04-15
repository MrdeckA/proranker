<template>
  <v-container>
    <!--Dialog-->
    <v-card
      width="80%"
      class="pa-5 mx-auto"
      :title="`${isUpdate ? 'Modifier recruitement : ' : 'Détails recruitement : '} ${isUpdate ? '' : '(Lecture seule)'} ${campagneToEdit.nom}`"
    >
      <template #append>
        <v-btn
          v-if="!isUpdate && !isNotRankedRecruitment"
          class="me-5"
          color="primary"
          @click="openFormDialog = true"
          >Afficher résultats</v-btn
        >
        <v-btn
          v-if="!isUpdate && isNotRankedRecruitment && !noUpdate"
          color="primary"
          @click="startPrediction()"
          icon="mdi-play"
        ></v-btn>

        <v-btn
          v-if="!isUpdate && !noUpdate"
          variant="text"
          icon
          @click="isUpdate = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-form @submit.prevent="onRecruitmentFormSumbit">
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

        <v-col class="border">
          <v-list>
            <v-list-subheader
              >Critères
              <v-btn
                v-if="isUpdate"
                @click="openDefineCriteriaFormDialog = true"
                class="ms-5"
                color="primary"
                size="x-small"
                icon
                ><v-icon>mdi-plus</v-icon></v-btn
              ></v-list-subheader
            >

            <v-list-item v-if="isDefinedValue(campagneToEdit.certifications)"
              >Certifications : {{ campagneToEdit.certifications }}

              <template #append>
                <v-btn
                  v-if="isUpdate"
                  @click="removeCriteria('certifications')"
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </v-list-item>

            <v-list-item v-if="isDefinedValue(campagneToEdit.degrees)"
              >Diplomes : {{ campagneToEdit.degrees }}

              <template #append>
                <v-btn
                  v-if="isUpdate"
                  @click="removeCriteria('degrees')"
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item
              v-if="isDefinedValue(campagneToEdit.minimum_number_of_languages)"
              >Nombre Minimum de langues :
              {{ campagneToEdit.minimum_number_of_languages }}

              <template #append>
                <v-btn
                  v-if="isUpdate"
                  @click="removeCriteria('minimum_number_of_languages')"
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.minimum_number_of_experiences"
              >Nombre minimum d'experience :
              {{ campagneToEdit.minimum_number_of_experiences }}

              <template #append>
                <v-btn
                  v-if="isUpdate"
                  @click="removeCriteria('minimum_number_of_experiences')"
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.languages"
              >Langues : {{ campagneToEdit.languages }}

              <template #append>
                <v-btn
                  v-if="isUpdate"
                  @click="removeCriteria('languages')"
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.skills"
              >Compétences : {{ campagneToEdit.skills }}

              <template #append>
                <v-btn
                  v-if="isUpdate"
                  @click="removeCriteria('skills')"
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>

        <div
          class="text-center d-flex justify-space-around"
          v-if="!isUpdate && !noUpdate"
        >
          <v-btn
            color="primary"
            @click="isUpdate = true"
            prepend-icon="mdi-pencil"
            >Modifier</v-btn
          >
          <v-btn color="red" prepend-icon="mdi-delete">Supprimer</v-btn>
        </div>

        <div class="text-center" v-if="isUpdate">
          <v-btn
            class="me-10"
            color="red"
            @click="isUpdate = false"
            prepend-icon="mdi-pencil"
            >Annuler</v-btn
          >
          <v-btn
            color="primary"
            @click="onUpdateSave"
            prepend-icon="mdi-content-save"
            :loading="loading"
            >Sauvegarder</v-btn
          >
        </div>
      </v-form>
    </v-card>

    <v-dialog scrollable v-model="openFormDialog">
      <template v-slot:default="{ isActive }">
        <v-container>
          <v-card
            id="my-card"
            ref="cardRef"
            width="99%"
            title="Classement des candidats"
            class="mx-auto"
          >
            <template #append>
              <v-btn icon variant="text" @click="onPrinterClick()"
                ><v-icon size="30">mdi-download</v-icon></v-btn
              >
              <v-btn icon variant="text" @click="onPrinterClick()"
                ><v-icon size="30">mdi-printer</v-icon></v-btn
              >
            </template>
            <v-data-table
              class="border shadow-lg"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="sorteredRanking.length"
              :items="sorteredRanking"
              :search="search"
              item-value="name"
              height="500"
            >
              <template #item.id="{ item, index }">
                <span class="text-truncate">{{ index + 1 }}</span>
                <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
              </template>
              <template #item.action="{ item }">
                <!-- <v-btn
                  size="small"
                  :href="`${API_BASE_URL}${item.fichier_sauvegarde}`"
                  icon
                  target="_blank"
                  variant="flat"
                >
                  <v-icon color="primary"> mdi-eye </v-icon></v-btn
                > -->
                <!-- <v-btn size="small" icon variant="flat">
                  <v-icon color="primary"> mdi-pencil </v-icon>
                </v-btn>

                <v-btn size="small" icon variant="flat">
                  <v-icon color="primary"> mdi-delete </v-icon>
                </v-btn>

                <v-btn icon variant="flat">
                  <v-icon color="primary"> mdi-dots-vertical </v-icon>
                </v-btn> -->
              </template>
            </v-data-table>
          </v-card>
        </v-container>
      </template>
    </v-dialog>

    <div class="pa-4 text-center">
      <v-dialog v-model="dialog" max-width="320" persistent>
        <!-- <v-list class="py-2" color="primary" elevation="12" rounded="lg">
          <v-list-item
            prepend-icon="$vuetify-outline"
            title="Refreshing Application..."
          >
            <template v-slot:prepend>
              <div class="pe-4">
                <v-icon color="primary" size="x-large"></v-icon>
              </div>
            </template>

            <template v-slot:append>
            
            </template>
          </v-list-item>
        </v-list> -->
        <v-card
          height="200"
          width="500"
          class="py-2"
          elevation="12"
          rounded="lg"
          title="Classement en cours..."
          prepend-icon="mdi-time-sand"
        >
          <div class="text-center pa-10">
            <v-progress-linear
              color="primary"
              indeterminate
              size="1"
              height="5"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <!-- <pre>
      {{ sorteredRanking }}
    </pre> -->

    <!-- Criteria Dialog-->

    <v-dialog v-model="openDefineCriteriaFormDialog" width="750">
      <template v-slot:default="{ isActive }">
        <v-container>
          <v-card class="px-0" title="Ajout d'un nouveau critère">
            <!-- <template #append>
              <v-btn
                class="ma-2"
                color="primary"
                @click="isActive.value = false"
                >Retour</v-btn
              >
            </template> -->
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
                    v-if="campagneToEditType === 'Certifications'"
                    v-model="campagneToEdit.certifications"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="[
                      'google',
                      'cisco',
                      'amazon',
                      'Oracle',
                      'facebook',
                      'Blockchain developper',
                    ]"
                    multiple
                    required
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    v-if="campagneToEditType === 'Compétences'"
                    v-model="campagneToEdit.skills"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="[
                      'Java',
                      'Python',
                      'Langage C',
                      'Node js',
                      'MongoDB',
                      'HTML',
                      'CSS',
                      'C++',
                      'Next',
                      'React',
                      'Typescript',
                      'JavaScript',
                      'ethers.js',
                      'IPFS',
                      'Web3.js',
                    ]"
                    multiple
                    required
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    v-if="campagneToEditType === 'Diplomes'"
                    v-model="campagneToEdit.degrees"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="['BAC', 'Licence', 'Master']"
                    multiple
                    required
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    v-if="campagneToEditType === 'Langues'"
                    v-model="campagneToEdit.languages"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                    :items="[
                      'Français',
                      'Anglais',
                      'Mandarin',
                      'Espagnol',
                      'Portugais',
                      'Japonais',
                      'Espagnol',
                    ]"
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
import { VCard } from "vuetify/components";
import jsPDF from "jspdf";
import { useAppStore, useAuthStore } from "~/store";
// import VueExcelTable from "vue-excel-table";

definePageMeta({
  layout: "user",
});

const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

const applicants = ref([] as any[]);

const appStore = useAppStore();

const { currentAppBarTitle } = storeToRefs(appStore);

const dialog = ref(false);
const { $toast } = useNuxtApp();
const route = useRoute();
const tableData = ref([
  // Vos données de tableau ici
]);
const router = useRouter();
const { API_BASE_URL } = useRuntimeConfig().public;
const loading = ref(false);
const openDefineCriteriaFormDialog = ref(false);

const tableColumns = ref([
  // Vos colonnes de tableau ici
]);
const criteriaTypes = ref(
  [
    "Nombre minimum d'expériences",
    "Certifications",
    "Compétences",
    "Langues",
    "Nombre minimum de langues",
    "Diplomes",
  ].sort()
);

const isUpdate = ref(false);
const noUpdate = ref(false);

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
const isNotRankedRecruitment = ref(false);

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

const ranks = ref({});

async function init() {
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `http://localhost:8000/api/campagnes/${route.params.recruitment_id}/`,
    {
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data.value) {
    campagneToEdit.value = data.value;
    campagneToEdit.value.certifications = JSON.parse(
      campagneToEdit.value.certifications
    );
    campagneToEdit.value.skills = JSON.parse(campagneToEdit.value.skills);
    campagneToEdit.value.degrees = JSON.parse(campagneToEdit.value.degrees);
    campagneToEdit.value.languages = JSON.parse(campagneToEdit.value.languages);

    console.log(data.value);
    appStore.setCurrentAppBarTitle(
      `Détails sur le recrutement ${campagneToEdit.value.nom}`
    );
    // serverItems.value = data.value;
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
  }

  const { data: data1, error: error1 } = await useFetch(
    `http://localhost:8000/api/candidats/?campagne=${route.params.recruitment_id}`,
    {
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data1.value) {
    console.log(data1.value);
    ranks.value = data1.value.results;

    console.log(data1.value.results);
    if (data1.value.count == 0) {
      isNotRankedRecruitment.value = true;
    }
  }

  if (error1.value) {
    console.log(error1.value.data);
  }
}

await init();

const sorteredRanking = ref(
  Object.values(ranks.value)
    .sort((a, b) => a.score - b.score)
    .reverse()
);

watch(ranks, () => {
  sorteredRanking.value = Object.values(ranks.value)
    .sort((a: any, b: any) => a.score - b.score)
    .reverse();
});

const itemsPerPage = ref(15);

const headers = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Nom", width: "25%", key: "nom_complet", align: "start" },

  {
    title: "Email",
    width: "25%",
    key: "email",
    align: "start",
  },
  {
    title: "Score",
    width: "25%",
    key: "score",
    align: "start",
  },
  {
    title: "Téléphone",
    width: "25%",
    key: "telephone",
    align: "start",
  },
  {
    title: "Fichier",
    width: "25%",
    key: "fichier",
    align: "start",
  },

  // { title: "Action", key: "action", align: "center" },
]);

// console.log();

const cardRef: Ref<VCard | null> = ref(null);

function onPrinterClick() {
  if (process.client) {
    const prtHtml = cardRef.value?.$el.innerHTML;
    const mycard = document.getElementById("my-card");
    // // const prtHtml = cardContent.value.$el.innerHTML;
    // const WinPrint = window.open(
    //   "",
    //   "",
    //   "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    // );
    // WinPrint?.document.write(prtHtml);
    // WinPrint?.document.close();
    // WinPrint?.focus();
    // WinPrint?.print();
    // WinPrint?.close();
    // window.open();
    // window.print;
    exportToPDF("my-pdf-file.pdf", mycard);
  }
}

onBeforeMount(() => {
  if (route.query.created === "true") {
    $toast.success("Recrutement créé avec succès !");
  }
  if (route.query.update === "true") {
    isUpdate.value = true;
  }
  if (route.query.noUpdate === "true") {
    noUpdate.value = true;
  }
});

// watch(dialog, () => {
//   if (!dialog.value) return;

//   setTimeout(() => (dialog.value = false), 4000);
// });

async function startPrediction() {
  dialog.value = true;
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `http://localhost:8000/api/campagnes/start/ranking?campagne=${route.params.recruitment_id}`,
    {
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );
  dialog.value = false;

  if (data.value) {
    dialog.value = false;
    ranks.value = data.value.response;
    openFormDialog.value = true;

    console.log(ranks.value);
    // serverItems.value = data.value;
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
  }
}

const removeCriteria = (key: string) => {
  campagneToEdit.value[key] = [];
};

const onUpdateSave = async () => {
  loading.value = true;
  console.log(campagneToEdit.value);
  const copyOfcampagneToEdit = ref(campagneToEdit.value);
  copyOfcampagneToEdit.value.certifications = JSON.stringify(
    campagneToEdit.value.certifications
  );
  copyOfcampagneToEdit.value.degrees = JSON.stringify(
    campagneToEdit.value.degrees
  );
  copyOfcampagneToEdit.value.skills = JSON.stringify(
    campagneToEdit.value.skills
  );
  copyOfcampagneToEdit.value.languages = JSON.stringify(
    campagneToEdit.value.languages
  );
  const { data: resData, error: resError } = await useFetch(
    `${API_BASE_URL}/api/campagnes/${route.params.recruitment_id}/`,
    {
      // query: {
      //   user: "1",
      // },
      method: "patch",
      onRequest({ request, options }) {
        //
      },
      body: copyOfcampagneToEdit.value,
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );
  loading.value = false;

  if (resData.value) {
    console.log(resData.value);
    $toast.success("Recrutement mis à jour avec succès");
    setTimeout(() => {
      reloadNuxtApp();
    }, 2000);
  }

  if (resError.value) {
    console.log(resError.value.data);
  }
};
</script>
