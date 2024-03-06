<template>
  <v-card
    width="80%"
    class="pa-5 mx-auto"
    title="Détails recruitement (Lecture seule)"
  >
    <template #append>
      <v-btn color="primary" @click="isUpdate = true" icon="mdi-play"></v-btn>
      <v-btn variant="text" icon @click="isUpdate = true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-form @submit.prevent="onRecruitmentFormSumbit">
      <v-col>
        <v-text-field
          v-model="campagneToEdit.nom"
          label="Nom"
          variant="outlined"
          :readonly="!isUpdate"
        ></v-text-field></v-col
      ><v-col>
        <v-text-field
          v-model="campagneToEdit.intitule_poste"
          label="Intitulé du poste"
          variant="outlined"
          :readonly="!isUpdate"
        ></v-text-field
      ></v-col>
      <v-col>
        <v-textarea
          v-model="campagneToEdit.description_poste"
          label="Description du poste"
          variant="outlined"
          :readonly="!isUpdate"
        ></v-textarea
      ></v-col>

      <v-col class="pa-0 ma-0">
        <v-list>
          <v-list-subheader>
            Critères
            <!-- <v-btn
                @click="openFormDialog = true"
                class="ms-5"
                color="primary"
                size="x-small"
                icon
                ><v-icon>mdi-plus</v-icon></v-btn
              > -->
          </v-list-subheader>

          <v-list-item v-if="isDefinedValue(campagneToEdit.degrees)"
            >Diplomes : {{ campagneToEdit.degrees }}

            <template #append>
              <v-btn
                variant="text"
                size="small"
                icon="mdi-delete"
                v-if="isUpdate"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item
            v-if="isDefinedValue(campagneToEdit.minimum_number_of_languages)"
            >Nombre Minimum de langues :
            {{ campagneToEdit.minimum_number_of_languages }}

            <template #append>
              <v-btn
                variant="text"
                size="small"
                icon="mdi-delete"
                v-if="isUpdate"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item v-if="campagneToEdit.minimum_number_of_experiences"
            >Nombre minimum d'experience :
            {{ campagneToEdit.minimum_number_of_experiences }}

            <template #append>
              <v-btn
                variant="text"
                size="small"
                icon="mdi-delete"
                v-if="isUpdate"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item v-if="campagneToEdit.languages"
            >Langues : {{ campagneToEdit.languages }}

            <template #append>
              <v-btn
                variant="text"
                size="small"
                icon="mdi-delete"
                v-if="isUpdate"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item v-if="campagneToEdit.skills"
            >Compétences : {{ campagneToEdit.skills }}

            <template #append>
              <v-btn
                variant="text"
                size="small"
                icon="mdi-delete"
                v-if="isUpdate"
              ></v-btn>
            </template>
          </v-list-item>

          <v-list-item v-if="isDefinedValue(campagneToEdit.certifications)">
            Certifications : {{ campagneToEdit.certifications }}

            <template #append>
              <v-btn
                variant="text"
                size="small"
                icon="mdi-delete"
                v-if="isUpdate"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <div class="text-center" v-if="!isUpdate">
        <v-btn
          color="primary"
          @click="isUpdate = true"
          prepend-icon="mdi-pencil"
          >Modifier</v-btn
        >
      </div>

      <div class="text-center" v-else>
        <v-btn
          class="me-10"
          color="red"
          @click="isUpdate = false"
          prepend-icon="mdi-pencil"
          >Annuler</v-btn
        >
        <v-btn
          color="primary"
          @click="isUpdate = true"
          prepend-icon="mdi-pencil"
          >Sauvegarder</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>
