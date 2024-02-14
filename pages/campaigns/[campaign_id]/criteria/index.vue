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
        <!-- :to="'/campaigns/' + route.params.campaign_id + '/criteria/add'" -->
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        v-model:search="search"
        :items="criteres"
      >
        <template v-slot:header.stock>
          <div class="text-end">Stock</div>
        </template>

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
          <v-btn size="small" :to="`/campaigns/${item.id}`" icon variant="flat"
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
                    v-model="newCriteria.type"
                    label="Type"
                    variant="outlined"
                    density="comfortable"
                    :items="itemsList"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="newCriteria.value"
                    label="Valeur"
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
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
definePageMeta({
  layout: "user",
});

const route = useRoute();

const openFormDialog = ref(false);

const itemsList = ref([
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

const newCriteria = ref({} as Critere);

interface Critere {
  type?: String;
  value?: String;
}
const criteres: Ref<Critere[]> = ref([
  {
    type: "One",
    value: "True",
  },
]);

const headers = ref([
  { title: "Type", width: "25%", key: "type", align: "start" },
  {
    title: "Value",
    key: "value",
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);

const onFormSubmit = () => {
  console.log(newCriteria.value);
  criteres.value.push(newCriteria.value);
  newCriteria.value = {};
  openFormDialog.value = false;
};
</script>
