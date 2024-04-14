<template>
  <v-container>
    <v-card>
      <v-card-title> Nom : {{ applicant.nom_complet }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <div>Téléphone : {{ applicant.telephone }}</div>
          </v-col>
          <v-col cols="6">
            <p>Nom du Recrutement : {{ recruitement.nom }}</p>
          </v-col>
          <v-col cols="6">
            <p class="mb-2">Email : {{ applicant.email }}</p>
          </v-col>
          <v-col cols="6">
            <p class="mb-2">
              Curriculum Vitae :
              <a
                :href="`${API_BASE_URL}/${applicant.fichier_sauvegarde}`"
                target="_blank"
                >{{ applicant.fichier }} <v-icon>mdi-open-in-new</v-icon>
              </a>
            </p></v-col
          >
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <div class="mb-3">Correspondances :</div>
              </v-col>
              <v-col cols="6">
                <div class="mb-3">Score : {{ applicant.score }}</div>
              </v-col>
            </v-row>
            <v-list>
              <v-list-item
                v-for="(match, index) in applicant.matches"
                :key="index"
                ><v-chip class="mr-2">
                  {{ match.source }} => {{ match.dest }}
                </v-chip></v-list-item
              >
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import { useAppStore, useAuthStore } from "~/store";

definePageMeta({
  layout: "user",
});

const { API_BASE_URL } = useRuntimeConfig().public;
const appStore = useAppStore();

const { currentAppBarTitle, currentPageTitle } = storeToRefs(appStore);
const route = useRoute();

const applicant_id = route.params.applicant_id;
const recruitement_id = route.params.recruitment_id;

const applicant = ref({} as any);
const recruitement = ref({} as any);

const { $toast } = useNuxtApp();
const authStore = useAuthStore();

const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

async function init() {
  const { data, error } = await useFetch(
    `http://localhost:8000/api/candidats/${applicant_id}/`,
    {
      onRequest({ request, options }) {
        //
        // console.log(request, options);
      },
      watch: false,
      timeout: 6000,
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data.value) {
    console.log(data.value);
    applicant.value = data.value;
  }

  if (error.value) {
    console.log(error.value.data);
    return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
  }
  const { data: data1, error: error1 } = await useFetch(
    `http://localhost:8000/api/campagnes/${recruitement_id}/`,
    {
      onRequest({ request, options }) {
        //
        // console.log(request, options);
      },
      watch: false,
      timeout: 6000,
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data1.value) {
    console.log(data1.value);
    recruitement.value = data1.value;
  }

  if (error1.value) {
    console.log(error1.value.data);
    return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
  }
}

await init();

appStore.setCurrentAppBarTitle(
  `Détails Candidat, Recruitement : ${recruitement.value.nom}`
);

console.log(applicant_id, recruitement_id);
</script>
