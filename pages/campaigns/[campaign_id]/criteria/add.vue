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
              :items="['item 1', 'item 2', 'item 3', 'item 4', '1', 'ff', 'kk']"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field
              label="Valeur"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Limite"
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
</script>
