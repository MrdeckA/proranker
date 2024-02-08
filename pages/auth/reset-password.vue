<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="10" lg="8">
            <h1 class="text-center">Rénitialisation du mot de passe</h1>
            <p class="text-medium-emphasis text-center">
              Saisissez un nouveau mot de passe ...
            </p>

            <VForm ref="formRef" class="mt-7" @submit.prevent="submit">
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
            <p class="text-body-2 mt-10 text-center">
              <span
                >Vous n'avez pas de compte ?
                <NuxtLink
                  to="/auth/register"
                  class="font-weight-bold text-primary"
                  >Inscrivez-vous</NuxtLink
                ></span
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script lang="ts" setup>
import { VForm } from "vuetify/components/VForm";
import { ruleEmail, rulePassLen, ruleRequired } from "@/helpers/rules";
import { useUser } from "~/composables/api";
const { appName } = useAppConfig();

definePageMeta({
  layout: "auth",
});

useHead({
  title: `Réinialisation mot de passe - ${appName}`,
});
const password = ref("");
const confirmationPassword = ref("");
const errorMessages = ref([] as string[]);
const isFormValid = ref(false);
const isPasswordVisible = ref(false);
const loading = ref(false);
const userComposable = useUser();
const route = useRoute();
const formRef: Ref<VForm | null> = ref(null);
const { $toast } = useNuxtApp();
const router = useRouter();
const submit = async () => {
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
      "reset-password-with-token",
      "post",
      {},
      {
        password: password.value,
      },
      {
        resetToken: route.query.reset_token,
      },
    );

    loading.value = false;

    if (userComposable.requestResponse.data) {
      $toast.success(userComposable.requestResponse.data.message);
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    }
  }
};
</script>

<style scoped></style>
