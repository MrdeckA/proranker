<template>
  <v-container>
    <v-form ref="formRef" @submit.prevent="onFormSubmit">
      <v-card flat class="border mx-auto" width="80%">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="email"
                v-model="meInformation.email"
                label="Email"
                placeholder="johndoe@gmail.com"
                required
                hint="*Champ requis"
                persistent-hint
                autocomplete="email"
                :rules="[ruleRequired, ruleEmail]"
                type="email"
                prepend-inner-icon="mdi-email-box"
                name="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                id="firstName"
                v-model="meInformation.name"
                label="Nom"
                placeholder="Doe"
                required
                hint="*Champ requis"
                persistent-hint
                autocomplete="fisrtName"
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-account"
                name="firstName"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="legalName"
                v-model="meInformation.legalName"
                label="Nom légal de l'agence"
                placeholder="Nom légal"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-domain"
                name="legalName"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="shortName"
                v-model="meInformation.shortName"
                label="Nom court de l'agence"
                placeholder="Nom court"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-domain"
                name="shortName"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="tagline"
                v-model="meInformation.tagline"
                label="Slogan de l'agence"
                placeholder="Slogan"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-comment-text-outline"
                name="tagline"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                id="about"
                v-model="meInformation.about"
                label="À propos de l'agence"
                placeholder="Description de l'agence"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                prepend-inner-icon="mdi-comment-text-outline"
                name="about"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                id="address"
                v-model="meInformation.address"
                label="Adresse de l'agence"
                placeholder="Adresse"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-map-marker"
                name="address"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                id="city"
                v-model="meInformation.city"
                name="city"
                label="Ville de l'agence"
                hint="*Champ requis"
                placeholder="Ville"
                autocomplete="ville"
                :items="Benin_Cities"
                :rules="[ruleRequired]"
                prepend-inner-icon="mdi-city"
                persistent-hint
                required
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-text-field
                id="phoneNumber"
                v-model="meInformation.phoneNumber"
                label="Numéro de téléphone de l'agence"
                placeholder="+22995000000"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-phone"
                name="phoneNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                id="onlinelink"
                v-model="meInformation.onlinelink"
                label="Lien en ligne de l'agence"
                placeholder="https://www.exemple.com"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired, ruleLinkURL]"
                type="text"
                prepend-inner-icon="mdi-link"
                name="onlinelink"
              ></v-text-field>
            </v-col>

            <!-- <v-col cols="12">
                  <v-file-input
                    label="Preuves légales de l'entité"
                    required
                    hint="*Champ requis"
                    persistent-hint
                    :rules="[ruleRequired]"
                    v-model="meInformation.legalProofs"
                    accept=".pdf, .doc, .docx"
                    multiple
                    prepend-inner-icon="mdi-file"
                    id="legalProofs"
                    name="legalProofs"
                  ></v-file-input>
                </v-col> -->

            <v-col cols="12">
              <v-text-field
                id="references"
                v-model="meInformation.references"
                label="Références de l'entité"
                placeholder="Références"
                required
                hint="*Champ requis"
                persistent-hint
                :rules="[ruleRequired]"
                type="text"
                prepend-inner-icon="mdi-text-box"
                name="references"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-col class="d-flex justify-space-around">
          <v-btn color="red" @click="resetForm"> Réinitialiser </v-btn>

          <v-btn
            color="primary"
            :disabled="isSaving"
            :loading="isSaving"
            @click="onFormSubmit"
          >
            Sauvegarder</v-btn
          >
        </v-col>
        <FloatingActionButton
          :disabled="isSaving"
          :is-saving="isSaving"
          :on-click="onFormSubmit"
        />
      </v-card>
    </v-form>
  </v-container>
</template>
<script setup lang="ts">
import type { VForm } from "vuetify/lib/components/index.mjs";
import FloatingActionButton from "@/components/ui/buttons/FloatingActionButton.vue";
import type { TTenant, THouse, TAgency } from "~/types";
import { useResource, useUser } from "@/composables/api";
import { ruleRequired, ruleEmail, ruleLinkURL } from "~/helpers/rules";
import { useAuthStore, useAppStore } from "@/stores";
import { getUpdateSuccessText } from "@/helpers";
import { Benin_Cities } from "~/config/constants";
const { appName } = useAppConfig();

useHead({
  title: `Mise à jour profil - ${appName}`,
});

definePageMeta({
  layout: "user",
});

const userComposable = useUser();
const { $toast } = useNuxtApp();
const corverFiles = ref<File[]>([]);
const formRef: Ref<VForm | null> = ref(null);
const router = useRouter();
const authStore = useAuthStore();
const { authenticationToken, authenticatedUser } = storeToRefs(authStore);
const appStore = useAppStore();
const isSaving = ref(false);
const route = useRoute();
const tenantId = ref(route.params.tenantId as string);
const meInformation = ref({} as TAgency);

const resetForm = () => {
  if (process.client) {
    loadMe();
  }
};

const onFormSubmit = async () => {
  const formValid = (await formRef.value?.validate())?.valid;
  if (!formValid) return false;

  isSaving.value = true;

  await userComposable.updateMe("agency", meInformation.value);
  isSaving.value = false;

  if (userComposable.requestResponse.data) {
    router.replace("/settings");
    $toast.success(getUpdateSuccessText("Informations de l'agence"));
  }
  // resetForm();
};

async function loadMe() {
  await userComposable.loadMe("agency");
  if (userComposable.requestResponse.data) {
    meInformation.value = userComposable.requestResponse.data.agency;
  }
}

onBeforeMount(() => {
  appStore.setCurrentPageTitle("Modifier profil");
  loadMe();
  init();
});

async function init() {}
</script>

<style scoped></style>
