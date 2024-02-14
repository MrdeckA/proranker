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

        <v-btn
          :to="'/campaigns/' + route.params.campaign_id + '/criteria/add'"
          color="primary"
          >Ajouter un critère</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table v-model:search="search" :items="items">
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

        <template v-slot:item.rating="{ item }">
          <v-rating
            :model-value="item.rating"
            color="orange-darken-2"
            density="compact"
            size="small"
            readonly
          ></v-rating>
        </template>

        <template v-slot:item.stock="{ item }">
          <div class="text-end">
            <v-chip
              :color="item.stock ? 'green' : 'red'"
              :text="item.stock ? 'In stock' : 'Out of stock'"
              class="text-uppercase"
              label
              size="small"
            ></v-chip>
          </div>
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
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "user",
});

const route = useRoute();
</script>
