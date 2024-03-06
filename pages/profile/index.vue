<template>
  <v-container class="my-5">
    <v-row>
      <v-col>
        <v-form ref="formRef" @submit.prevent="onFormSubmit">
          <v-card title="Profil" flat class="border mx-auto">
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
                    id="lastName"
                    v-model="meInformation.last_name"
                    label="Nom"
                    placeholder="Doe"
                    required
                    hint="*Champ requis"
                    persistent-hint
                    autocomplete="lastName"
                    :rules="[ruleRequired]"
                    type="text"
                    prepend-inner-icon="mdi-account"
                    name="lastName"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    id="firstName"
                    v-model="meInformation.first_name"
                    label="Prénom"
                    placeholder="John"
                    required
                    hint="*Champ requis"
                    persistent-hint
                    autocomplete="firstName"
                    :rules="[ruleRequired]"
                    type="text"
                    prepend-inner-icon="mdi-account"
                    name="firstName"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-col class="d-flex justify-space-around">
              <v-btn
                color="primary"
                :disabled="isSaving"
                :loading="isSaving"
                @click="onFormSubmit"
              >
                Sauvegarder</v-btn
              >
            </v-col>
          </v-card>
        </v-form>
      </v-col>
      <v-col class="my-auto">
        <v-card title="Mot de passe">
          <VCol cols="12">
            <VForm ref="formRef" @submit.prevent="submitForm">
              <div class="mt-1">
                <VTextField
                  id="password"
                  v-model="password"
                  :rules="[ruleRequired, rulePassLen]"
                  prepend-inner-icon="mdi-lock"
                  name="password"
                  :error-messages="errorMessages"
                  placeholder="Entrez le mot de passe"
                  autocomplete="password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  label="Nouveau mot de passe"
                />
              </div>
              <div class="mt-1">
                <VTextField
                  label="Confirmation du mot de passe"
                  id="confirm-password"
                  v-model="confirmationPassword"
                  :rules="[ruleRequired, rulePassLen]"
                  prepend-inner-icon="mdi-lock"
                  name="confirm-password"
                  :error-messages="errorMessages"
                  placeholder="Confirmez le mot de passe"
                  autocomplete="password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </div>
              <div class="mt-5">
                <VBtn
                  type="submit"
                  block
                  min-height="45"
                  color="primary"
                  :loading="loading"
                  :disabled="loading"
                  >Modifier mot de passe</VBtn
                >
              </div>
            </VForm>
          </VCol>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <VContainer class="mt-5 mb-16">
    <VRow no-gutters align="center" justify="center"> </VRow>
  </VContainer>
</template>
<script setup lang="ts">
import type { VForm } from "vuetify/lib/components/index.mjs";
import FloatingActionButton from "@/components/ui/buttons/FloatingActionButton.vue";
import {
  ruleRequired,
  ruleEmail,
  ruleLinkURL,
  rulePassLen,
} from "~/helpers/rules";
const { appName } = useAppConfig();
import { useAppStore } from "~/store";
import type { TUser } from "~/types";

useHead({
  title: `Mise à jour profil - ${appName}`,
});

definePageMeta({
  layout: "user",
});

const appStore = useAppStore();
const { $toast } = useNuxtApp();
const corverFiles = ref<File[]>([]);
const formRef: Ref<VForm | null> = ref(null);
const router = useRouter();
const isSaving = ref(false);
const route = useRoute();
const tenantId = ref(route.params.tenantId as string);

const email = ref("");
const password = ref("");
const confirmationPassword = ref("");
const errorMessages = ref([] as string[]);
const isFormValid = ref(false);
const isPasswordVisible = ref(false);
const loading = ref(false);

const resetForm = () => {
  if (process.client) {
  }
};

const submitForm = async () => {
  //   console.log(formRef.value.validate());
};

const meInformation = ref({
  first_name: "Mériadeck",
  last_name: "AMOUSSOU",
  email: "mrdeck30@gmail.com",
} as TUser);

const onFormSubmit = async () => {
  // resetForm();
};

onBeforeMount(() => {
  appStore.setCurrentPageTitle("Modifier profil");
  init();
});

async function init() {}
</script>

<style scoped></style>
