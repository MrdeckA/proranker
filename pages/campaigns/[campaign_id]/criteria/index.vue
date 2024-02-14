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
    <!--Modal form-->
    <v-dialog v-model="openFormDialog" width="500">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text="Open Dialog"> </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
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
</script>
