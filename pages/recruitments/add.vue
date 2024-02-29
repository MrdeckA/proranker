<template>
  <v-container>
    <v-card width="80%" class="pa-5 mx-auto" title="Nouveau recrutement"
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

        <v-col>
          <v-file-input
            v-model="files"
            color="primary"
            counter
            label="File input"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            variant="outlined"
            :show-size="1000"
            accept="application/pdf"
            multiple
            maxlength="20"
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
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col>
          <v-list>
            <v-list-subheader
              >Critères
              <v-btn class="ms-5" color="primary" size="x-small" icon
                ><v-icon>mdi-plus</v-icon></v-btn
              ></v-list-subheader
            >

            <v-list-item v-for="n in 5"
              >doc {{ n }}

              <template #append>
                <v-btn variant="text" size="small" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
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
