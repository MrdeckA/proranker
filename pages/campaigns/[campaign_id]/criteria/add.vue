<template>
  <v-container>
    <v-card class="px-5" title="Ajout d'un nouveau critère">
      <template #append>
        <v-btn class="ma-5" color="primary" @click="router.back()"
          >Retour</v-btn
        >
      </template>
      <v-form>
        <v-row>
          <v-col>
            <v-autocomplete
              label="Type"
              variant="outlined"
              density="comfortable"
              :items="items"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field
              label="Valeur"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="ma-5" color="primary" type="submit">Ajouter</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "user",
});

const router = useRouter();

const route = useRoute();

const items = ref([
  "Nombre de prix",
  "Nombre d'expériences",
  "Nombre d'années d'expériences",
  "Nombre de certifications",
  "Compétences",
  "Nombre minimum de compétences",
  "Langue",
  "Nombre minmim de langues",
  "Diplome minimum",
  "Certifications",
  "Nombre de diplomes",
  "Nombre de compétences",
  "Localisation",
]);
</script>
