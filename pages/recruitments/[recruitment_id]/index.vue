<template>
  <v-container>
    <!--Dialog-->
    <v-card
      width="80%"
      class="pa-5 mx-auto"
      title="Détails recruitement (Lecture seule)"
    >
      <template #append>
        <v-btn class="me-5" color="primary" @click="openFormDialog = true"
          >Afficher résultats</v-btn
        >
        <v-btn
          color="primary"
          @click="startPrediction()"
          icon="mdi-play"
        ></v-btn>

        <v-btn variant="text" icon @click="isUpdate = true">
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

        <v-col class="pa-0 ma-0">
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

            <v-list-item v-if="isDefinedValue(campagneToEdit.degrees)"
              >Diplomes : {{ campagneToEdit.degrees }}

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

            <v-list-item v-if="isDefinedValue(campagneToEdit.certifications)">
              Certifications : {{ campagneToEdit.certifications }}

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
              <!-- <template #item.action="{ item }">
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

          <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> 
        </template> -->
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
  </v-container>
</template>
<script lang="ts" setup>
import { type Campagne } from "@/types";
import axios from "axios";
import { isUndefined, isNull } from "lodash";
import { VCard } from "vuetify/components";
import jsPDF from "jspdf";
import { useAuthStore } from "~/store";
// import VueExcelTable from "vue-excel-table";

definePageMeta({
  layout: "user",
});

const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

const dialog = ref(false);
const { $toast } = useNuxtApp();
const route = useRoute();
const tableData = ref([
  // Vos données de tableau ici
]);

const tableColumns = ref([
  // Vos colonnes de tableau ici
]);
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
  `http://localhost:8000/api/campagnes/${route.params.recruitment_id}/`,
  {
    headers: {
      Authorization: "Bearer " + authenticationToken.value,
    },
  }
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

const ranks = ref({});

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
</script>
