<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12">
            <v-card class="mx-auto" elevation="1" :loading="loading">
              <v-divider></v-divider>
              <template #title>
                <h4 class="text-center">
                  {{ appName }} - Vérification du compte
                </h4>
              </template>

              <div class="py-12 text-center">
                <v-icon
                  v-if="!loading"
                  class="mb-6"
                  color="primary"
                  icon="mdi-check-circle-outline"
                  size="128"
                ></v-icon>

                <v-progress-circular
                  v-else
                  class="mb-6"
                  indeterminate
                  model-value="20"
                  color="primary"
                  size="100"
                ></v-progress-circular>

                <div class="text-h6 font-weight-bold" v-if="loading">
                  Vérification en cours
                </div>
                <div class="text-h6 font-weight-bold" v-else>
                  Compte verifié. Vous pouvez fermer cette page.
                </div>
              </div>

              <v-divider></v-divider>
            </v-card>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script lang="ts" setup>
import type { VForm } from "vuetify/lib/components/index.mjs";
import { ruleEmail, rulePassLen, ruleRequired } from "@/helpers/rules";
import { useAuth, useHttpCore, useUser } from "@/composables/api";
import { useAuthStore } from "~/stores";
const authComposable = useAuth();
const userComposable = useUser();
const authStore = useAuthStore();
const httpCore = useHttpCore();
const { appName } = useAppConfig();
const route = useRoute();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
useHead({
  title: `Vérification du compte - ${appName}`,
});

definePageMeta({
  layout: "auth",
});

const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);
const loading = ref(true);
const formRef: Ref<VForm | undefined> = ref();
const router = useRouter();
const { $toast } = useNuxtApp();
onMounted(async () => {
  loading.value = true;
  await userComposable.makeUserRequest(
    "agency",
    "",
    "check-verify-token",
    "get",
    {},
    {},
    {
      verifyID: route.query.verify_token?.toString(),
    },
    {},
  );

  if (userComposable.requestResponse.data?.verified) {
    $toast.info("Compte vérifié avec succès !");
    loading.value = false;
  }
  if (
    !userComposable.requestResponse.error &&
    userComposable.requestResponse.data?.verified === false
  ) {
    $toast.info("Le compte est déjà vérifié !");
  }
});
</script>

<style scoped></style>
