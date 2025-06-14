<template>
  <v-container class="my-5">
    <v-row>
      <v-col cols="6" class="mx-auto">
        <v-form ref="formRef" @submit.prevent="onProfilFormSubmit">
          <v-card
            title="Configuration"
            width="100%"
            flat
            class="border mx-auto"
          >
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    id="_openai_api_key"
                    v-model="meInformation.api_key"
                    label="Clé API OpenAI"
                    placeholder="Openai_api_key"
                    required
                    hint="*Champ requis"
                    persistent-hint
                    autocomplete="_openai_api_key"
                    :rules="[ruleRequired, ruleOpenAIAPIKey]"
                    type="text"
                    prepend-inner-icon="mdi-key"
                    name="_openai_api_key"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    id="_openai_api_key"
                    v-model="meInformation.model"
                    label="Model OpenAI"
                    placeholder="Openai_api_key"
                    required
                    hint="*Champ requis"
                    persistent-hint
                    autocomplete="_openai_api_key"
                    :rules="[ruleRequired]"
                    type="text"
                    prepend-inner-icon="mdi-key"
                    name="_openai_api_key"
                    :items="openaiModels"
                  ></v-autocomplete>
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
  ruleOpenAIAPIKey,
} from "~/helpers/rules";
const { appName } = useAppConfig();
import { useAppStore, useAuthStore } from "~/store";
import type { TUser } from "~/types";

useHead({
  title: `Configuration - ${appName}`,
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

const openaiModels = ref([
  "GPT-3-Ada",
  "GPT-3-Babbage",
  "GPT-3-Curie",
  "GPT-3-Davinci",
  "GPT-3.5-Ada",
  "GPT-3.5-Babbage",
  "GPT-3.5-Curie",
  "GPT-3.5-Davinci",
  "GPT-3.5-Turbo",
  "GPT-4-Standard",
  "GPT-4-Turbo",
  "GPT-4o",
]);

console.log(openaiModels);

const onProfilFormSubmit = async () => {
  // console.log("ok");

  const isFormValid = (await formRef.value?.validate())?.valid;
  if (isFormValid) {
    loading.value = true;

    setTimeout(() => {
      loading.value = false;
    }, 3000);
  }
};

interface TConfig {
  model?: string;
  api_key?: string;
}

const meInformation = ref({
  model: "GPT-3.5-Turbo",
  api_key: "sk-bMF2oqyJlKGdwHvvrvrvnIvrevC0aCVutyyutC",
} as TConfig);

const onFormSubmit = async () => {
  // resetForm();
};

onMounted(async () => {
  appStore.setCurrentPageTitle("Ma configuration");

  // await init();
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
