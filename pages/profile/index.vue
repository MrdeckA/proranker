<template>
  <v-container class="my-5">
    <v-row>
      <v-col cols="12">
        <v-form ref="formRef" @submit.prevent="onProfilFormSubmit">
          <v-card title="Profil" width="55%" flat class="border mx-auto">
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
                    v-model="meInformation.nom"
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
                    v-model="meInformation.prenom"
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
                :disabled="loading"
                :loading="loading"
                @click="onProfilFormSubmit"
              >
                Sauvegarder</v-btn
              >
            </v-col>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="12" class="my-auto mt-14">
        <v-card width="55%" title="Mot de passe" class="border mx-auto">
          <VCol cols="12">
            <VForm ref="passworFormRef" @submit.prevent="submitForm">
              <div class="mt-1">
                <VTextField
                  id="password"
                  v-model="meInformation.password"
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
                  v-model="meInformation.confirmation_passsword"
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
              <div class="mt-5 text-center">
                <VBtn
                  type="submit"
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
import { useAppStore, useAuthStore } from "~/store";
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
const formRef: Ref<VForm | undefined> = ref();
const passworFormRef: Ref<VForm | undefined> = ref();
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
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
const isFetching = ref(false);
const resetForm = () => {
  if (process.client) {
  }
};

const submitForm = async () => {
  console.log("fffff");

  const isFormValid = (await passworFormRef.value?.validate())?.valid;
  console.log(isFormValid);
  if (isFormValid) {
    if (
      meInformation.value.password != meInformation.value.confirmation_passsword
    ) {
      isFetching.value = false;
      return $toast.warning("Les deux mots de passe doivent êtres identiques");
    }
    loading.value = true;
    let fetchData = { password: meInformation.value.password };
    // delete fetchData.value.password;
    // delete fetchData.value.confirmation_passsword;
    const { data, error } = await useFetch(
      `http://localhost:8000/api/user/${authenticatedUser.value?.id}/`,
      {
        onRequest({ request, options }) {
          //
          console.log(request, options);
        },
        method: "put",
        watch: false,
        headers: {
          Authorization: "Bearer " + authenticationToken.value,
        },
        body: fetchData,
      }
    );

    loading.value = false;
    if (data.value) {
      meInformation.value = data.value;
      delete meInformation.value.password;
      console.log(data.value);
      return $toast.success("Mot de passe mis à jour avec succès !");
    }

    if (error.value) {
      console.log(error.value.data);
      if (error.value.data) {
        return $toast.error(error.value.data);
      }
      return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
    }
  }
};
const onProfilFormSubmit = async () => {
  // console.log("ok");

  const isFormValid = (await formRef.value?.validate())?.valid;
  if (isFormValid) {
    loading.value = true;
    let fetchData = meInformation;
    // delete fetchData.value.password;
    // delete fetchData.value.confirmation_passsword;
    const { data, error } = await useFetch(
      `http://localhost:8000/api/user/${authenticatedUser.value?.id}/`,
      {
        onRequest({ request, options }) {
          //
          console.log(request, options);
        },
        method: "put",
        watch: false,
        headers: {
          Authorization: "Bearer " + authenticationToken.value,
        },
        body: fetchData.value,
      }
    );

    loading.value = false;
    if (data.value) {
      meInformation.value = data.value;
      delete meInformation.value.password;
      console.log(data.value);
      return $toast.success("Profil mis à jour avec succès !");
    }

    if (error.value) {
      console.log(error.value.data);
      if (error.value.data) {
        return $toast.error(error.value.data);
      }
      return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
    }
  }
};

const meInformation = ref({} as TUser);

const onFormSubmit = async () => {
  // resetForm();
};

onBeforeMount(async () => {
  appStore.setCurrentPageTitle("Modifier profil");

  await init();
});

async function init() {
  const { data, error } = await useFetch(
    `http://localhost:8000/api/user/${authenticatedUser.value?.id}/`,
    {
      onRequest({ request, options }) {
        //
        // console.log(request, options);
      },
      watch: false,
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data.value) {
    meInformation.value = data.value;
    delete meInformation.value.password;
    console.log(data.value);
  }

  if (error.value) {
    if (error.value.data?.detail) {
      return $toast.error(error.value.data.detail);
    }
    return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
  }
}
</script>

<style scoped></style>
