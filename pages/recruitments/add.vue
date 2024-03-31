<template>
  <v-container>
    <v-card width="80%" class="pa-5 mx-auto" title="Nouveau recrutement"
      ><v-form ref="formRef" @submit.prevent="onRecruitmentFormSumbit">
        <v-col>
          <v-text-field
            v-model="campagneToEdit.nom"
            label="Nom"
            variant="outlined"
            :rules="[ruleRequired]"
          ></v-text-field></v-col
        ><v-col>
          <v-text-field
            v-model="campagneToEdit.intitule_poste"
            label="Intitulé du poste"
            variant="outlined"
            :rules="[ruleRequired]"
          ></v-text-field
        ></v-col>
        <v-col>
          <v-textarea
            v-model="campagneToEdit.description_poste"
            label="Description du poste"
            variant="outlined"
            :rules="[ruleRequired]"
          ></v-textarea
        ></v-col>

        <v-col>
          <v-file-input
            v-model="campagneToEdit.fichiers"
            color="primary"
            counter
            label="Fichiers des CV"
            placeholder="Sélectionner vos cv"
            prepend-icon="mdi-paperclip"
            variant="outlined"
            :show-size="1000"
            accept="application/pdf"
            multiple
            maxlength="20"
            persistent-hint
            hint="*format PDF"
            required
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="(fileName, index) in fileNames" :key="fileName">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple-accent-4"
                  label
                  size="small"
                  class="me-2"
                >
                  {{ fileName }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline text-grey-darken-3 mx-2"
                >
                  +{{ campagneToEdit?.fichiers?.length - 2 }} Fichiers(s)
                </span>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col class="border">
          <v-list>
            <v-list-subheader
              >Critères
              <v-btn
                @click="openFormDialog = true"
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
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>

            <v-list-item v-if="isDefinedValue(campagneToEdit.degrees)"
              >Diplomes : {{ campagneToEdit.degrees }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item
              v-if="isDefinedValue(campagneToEdit.minimum_number_of_languages)"
              >Nombre Minimum de langues :
              {{ campagneToEdit.minimum_number_of_languages }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.minimum_number_of_experiences"
              >Nombre minimum d'experience :
              {{ campagneToEdit.minimum_number_of_experiences }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.languages"
              >Langues : {{ campagneToEdit.languages }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.skills"
              >Compétences : {{ campagneToEdit.skills }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item
              v-if="isDefinedValue(campagneToEdit.has_certifications)"
            >
              A des Certification : {{ campagneToEdit.has_certifications }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="isDefinedValue(campagneToEdit.has_awards)">
              A des Prix : {{ campagneToEdit.has_awards }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <div class="text-center">
          <v-btn color="primary" type="submit">Ajouter</v-btn>
        </div>
      </v-form></v-card
    >

    <!--Dialog-->

    <v-dialog v-model="openFormDialog" width="750">
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
import { useAuthStore } from "~/store";
import { ruleRequired } from "~/helpers/rules";
import type { VForm } from "vuetify/components/VForm";
definePageMeta({
  layout: "user",
});

const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

const { $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
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
const formRef: Ref<VForm | undefined> = ref();

const criteres: Ref<Critere[]> = ref([]);

const onNewCriteriaFormSubmit = () => {};

const onRecruitmentFormSumbit = async () => {
  // console.log(campagneToEdit.value);
  const isFormValid = (await formRef.value?.validate())?.valid;

  if (isFormValid) {
    if (
      !campagneToEdit.value?.fichiers?.length ||
      campagneToEdit.value?.fichiers?.length < 2
    ) {
      return $toast.error("Minimum 2 fichiers requis");
    }
    let data = new FormData();
    campagneToEdit.value.fichiers?.forEach((file, index) => {
      console.log(index);
      data.append(file.name, campagneToEdit.value.fichiers[index]);
    });

    data.append(
      "model",
      JSON.stringify({
        ...campagneToEdit.value,
        user: authenticatedUser.value?.id,
      })
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      data: {
        ...data,
      },
      Headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + authenticationToken.value,
      },
    };

    await axios
      .post("http://127.0.0.1:8000/api/campagnes/", data, config)
      .then((response) => {
        router.push(`/recruitments/${response.data.campagne.id}?created=true`);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
const search = ref("");

function isDefinedValue(value: any): boolean {
  return !isUndefined(value);
}

enum Correspondance {
  "Nombre minimum de langues" = "minimum_number_of_languages",
  "Nombre minimum d'expériences" = "minimum_number_of_experiences",
  "Nombre minimum d'années d'expérience" = "minimum_number_of_years_of_experience",
  "Diplomes" = "degrees",
  "Langues" = "languages",
  "Compétences" = "skills",
  "Certifications" = "certifications",
}

watch(campagneToEdit.value, () => {
  criteriaTypes.value = filtrerClésDéfinies(
    criteriaTypes.value,
    campagneToEdit.value
  ).sort();

  // console.log(criteriaTypes.value);
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
</script>
