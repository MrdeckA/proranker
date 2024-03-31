<template>
  <v-container>
    <v-card flat border>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-view-list"></v-icon>
        <span class="ms-5">Liste des Recrutements</span>

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

        <v-btn :to="'/recruitments/add'" color="primary"
          >Nouveau Recrutement</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        class="border shadow-lg"
        v-model:items-per-page="itemsPerPage"
        :headers="tableHeaders"
        :items-length="serverItems.length"
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
        </template></v-data-table
      ></v-card
    >
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
const serverItems = ref([] as any[]);
const tableHeaders = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Nom", width: "25%", key: "nom", align: "start" },

  {
    title: "Intitulé du poste",
    width: "25%",
    key: "intitule_poste",
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);
const { data, pending, error, refresh, execute, status } = await useFetch(
  `http://127.0.0.1:8000/api/campagnes/?user=${authenticatedUser.value.id}`,
  {
    onResponseError({ request, response, options }) {
      //
    },

    headers: {
      Authorization: "Bearer " + authenticationToken.value,
    },
  }
);

if (data.value) {
  console.log(data.value);
  serverItems.value = data.value.results;
}

if (error.value) {
  // console.log("error : ", error.value?.data);
  console.log(error.value);
}

const mocks = [
  {
    nom: "Recrutement développeur Blockchain",
    description_poste:
      "Contribuez à la conception et au développement de solutions blockchain innovantes.",
    intitule_poste: "Développeur Blockchain",
    minimum_number_of_languages: 2,
    minimum_number_of_experiences: 3,
    minimum_degree: "Bac+4 en informatique",
    languages: "Solidity, JavaScript",
    certifications: "Certification Ethereum Developer",
    skills: "Smart Contracts, Développement d'applications décentralisées",
    user: 6,
    files: ["CV.pdf", "Lettre_motivation.pdf"],
  },
  {
    nom: "Recrutement ingénieur en intelligence artificielle",
    description_poste:
      "Participez à la conception et à l'implémentation de solutions d'intelligence artificielle avancées.",
    intitule_poste: "Ingénieur IA",
    minimum_number_of_languages: 3,
    minimum_number_of_experiences: 4,
    minimum_degree: "Bac+5 en intelligence artificielle",
    languages: "Python, TensorFlow, PyTorch",
    certifications: "Certification Machine Learning",
    skills: "Apprentissage profond, Traitement du langage naturel",
    user: 7,
    files: ["CV.pdf", "Lettre_motivation.pdf"],
  },
  {
    nom: "Recrutement architecte cloud",
    description_poste:
      "Concevez et implémentez des solutions cloud robustes pour répondre aux besoins de l'entreprise.",
    intitule_poste: "Architecte Cloud",
    minimum_number_of_languages: 2,
    minimum_number_of_experiences: 5,
    minimum_degree: "Bac+4 en informatique",
    languages: "Java, Python",
    certifications: "Certification AWS Solutions Architect",
    skills: "Architecture cloud, Déploiement automatisé",
    user: 8,
    files: ["CV.pdf", "Lettre_motivation.pdf"],
  },
  {
    nom: "Recrutement analyste en cybersécurité",
    description_poste:
      "Assurez la sécurité des systèmes informatiques en identifiant et en prévenant les menaces potentielles.",
    intitule_poste: "Analyste Cybersécurité",
    minimum_number_of_languages: 2,
    minimum_number_of_experiences: 4,
    minimum_degree: "Bac+5 en cybersécurité",
    languages: "Python, C, C++",
    certifications: "Certification CISSP, Certification CEH",
    skills: "Analyse des vulnérabilités, Gestion des incidents",
    user: 9,
    files: ["CV.pdf", "Lettre_motivation.pdf"],
  },
  {
    nom: "Recrutement développeur DevOps",
    description_poste:
      "Automatisez les processus de développement, de déploiement et de gestion d'infrastructures.",
    intitule_poste: "Développeur DevOps",
    minimum_number_of_languages: 2,
    minimum_number_of_experiences: 3,
    minimum_degree: "Bac+3 en informatique",
    languages: "Shell, Python",
    certifications: "Certification DevOps",
    skills: "Automatisation, CI/CD, Gestion d'infrastructures",
    user: 10,
    files: ["CV.pdf", "Lettre_motivation.pdf"],
  },
];
const itemsPerPage = ref(15);
const search = ref("");
</script>
