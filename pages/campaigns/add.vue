<template>
  <v-container>
    <v-card class="pa-5" title="Nouvelle campagne"
      ><v-form>
        <v-col>
          <v-text-field
            label="Nom de la campagne"
            variant="outlined"
          ></v-text-field></v-col
        ><v-col>
          <v-text-field
            label="Intitulé du poste"
            variant="outlined"
          ></v-text-field
        ></v-col>
        <v-col>
          <v-text-field
            label="Description de la campagne"
            variant="outlined"
          ></v-text-field
        ></v-col>
        <div class="text-center">
          <v-btn color="primary">Ajouter</v-btn>
        </div>
      </v-form></v-card
    >
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "user",
});
const route = useRoute();
</script>
