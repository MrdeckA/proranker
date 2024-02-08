<template>
  <VContainer>
    <VRow no-gutters align="center" justify="center">
      <v-card width="50%">
        <VCol cols="12">
          <VForm ref="formRef" @submit.prevent="submitForm">
            <div class="mt-1">
              <label class="label text-grey-darken-2" for="password"
                >Nouveau mot de passe</label
              >
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
              />
            </div>
            <div class="mt-1">
              <label class="label text-grey-darken-2" for="password"
                >Confirmation du mot de passe</label
              >
              <VTextField
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
    </VRow>
  </VContainer>
</template>
<script setup lang="ts">
import { VForm } from "vuetify/components/VForm";
import { useAuthStore, useAppStore } from "@/stores";
import { ruleEmail, rulePassLen, ruleRequired } from "@/helpers/rules";
import { useUser } from "~/composables/api";

const { appName } = useAppConfig();

useHead({
  title: `Mise à jour Mot de passe  - ${appName}`,
});

definePageMeta({
  layout: "user",
});

const appStore = useAppStore();
const email = ref("");
const password = ref("");
const confirmationPassword = ref("");
const errorMessages = ref([] as string[]);
const isFormValid = ref(false);
const isPasswordVisible = ref(false);
const loading = ref(false);
const userComposable = useUser();
const router = useRouter();
const route = useRoute();
const { $toast } = useNuxtApp();
const authStore = useAuthStore();
const { authenticatedUser } = storeToRefs(authStore);
const formRef: Ref<VForm | null> = ref(null);

onBeforeMount(() => {
  appStore.setCurrentPageTitle("Modifier mon mot de passe");
});

const submitForm = async () => {
  //   console.log(formRef.value.validate());

  loading.value = true;
  errorMessages.value = [];
  if (password.value !== confirmationPassword.value) {
    errorMessages.value.push("Mauvaise confirmation du mot de passe");
    return false;
  }
  const formValid = (await formRef.value?.validate())?.valid;

  if (formValid) {
    loading.value = true;

    await userComposable.makeUserRequest(
      "agency",
      "",
      "reset-password",
      "post",
      {},
      {
        userId: authenticatedUser.value,
        password: password.value,
      },
    );

    loading.value = false;

    if (userComposable.requestResponse.data) {
      $toast.success(userComposable.requestResponse.data.message);
      router.replace("/settings");
    }
  }
};
</script>

<style scoped></style>
