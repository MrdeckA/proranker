<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="8">
            <h1 class="text-center">Connexion</h1>
            <p class="text-medium-emphasis text-center">
              Entrez vos identifiants pour commencer...
            </p>

            <VForm ref="formRef" class="mt-7" @submit.prevent="submit">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email"></label
                >Email
                <VTextField
                  id="email"
                  v-model="email"
                  :rules="[ruleRequired, ruleEmail]"
                  prepend-inner-icon="mdi-email-box"
                  name="email"
                  type="email"
                  placeholder="Entrez votre adresse email..."
                  autocomplete="email"
                />
              </div>
              <div class="mt-3">
                <label class="label text-grey-darken-2" for="password"
                  >Mot de Passe</label
                >
                <VTextField
                  id="password"
                  v-model="password"
                  :rules="[ruleRequired, rulePassLen]"
                  prepend-inner-icon="mdi-lock"
                  name="password"
                  placeholder="Entrez votre mot de passe..."
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
                  :loading="loading"
                  block
                  min-height="44"
                  color="primary"
                  :disabled="loading"
                  >Se connecter</VBtn
                >
              </div>
            </VForm>
            <p class="text-body-2 mt-10 text-center">
              <NuxtLink
                to="/auth/forgot-password"
                class="font-weight-bold text-primary"
                >Mot de passe oublié ?</NuxtLink
              >
            </p>
            <p class="text-body-2 mt-4 text-center">
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
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <VImg
          src="../images/login-side.jpg"
          cover
          class="h-100 rounded-xl d-flex align-center justify-center side-image"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4 text-black">Start your journey today</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores, inventore quia. Dolorum dolores ad ipsum voluptatum
              rem, hic placeat, odio, odit numquam quod veritatis accusantium
              assumenda! Sequi, provident in! Iure!
            </p>
          </div>
        </VImg>
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

const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
useHead({
  title: `Connexion - ${appName}`,
});

definePageMeta({
  layout: "auth",
});

const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);
const loading = ref(false);
const formRef: Ref<VForm | undefined> = ref();
const router = useRouter();
const submit = async () => {
  const formValid = (await formRef.value?.validate())?.valid;

  if (formValid) {
    loading.value = true;
    // loading.value = true;
    await authComposable.login(email.value, password.value);
    loading.value = false;

    if (authComposable.authResponse.data) {
      if (authComposable.authResponse.data.agency.firstLogin)
        userComposable.makeUserRequest(
          "agency",
          "",
          "send-verification-mail",
          "get",
        );
      router.replace("/dashboard");
    }
  }
};
</script>

<style scoped></style>
