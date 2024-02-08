<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="10" lg="8">
            <h1 class="text-center">Inscription agence</h1>
            <p class="text-medium-emphasis text-center">
              Entrez vos identifiants pour commencer...
            </p>

            <VForm ref="formRef" class="mt-7" @submit.prevent="submit">
              <div>
                <label class="label text-grey-darken-2" for="name"
                  >Nom de l'agence</label
                >
                <VTextField
                  id="name"
                  v-model="newAgency.name"
                  :rules="[ruleRequired]"
                  prepend-inner-icon="mdi-domain"
                  name="name"
                  placeholder="Entrez le nom de l'agence"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email"
                  >Email</label
                >
                <VTextField
                  id="email"
                  v-model="newAgency.email"
                  :rules="[ruleRequired, ruleEmail]"
                  type="email"
                  prepend-inner-icon="mdi-email-box"
                  name="email"
                  placeholder="Entrez l'adresse email"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password"
                  >Mot de passe</label
                >
                <VTextField
                  id="password"
                  v-model="newAgency.password"
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
                  v-model="newAgency.confirmationPassword"
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
                  >Créer un compte</VBtn
                >
              </div>
            </VForm>
            <p class="text-body-2 mt-10 text-center">
              <span
                >Vous avez déjà un compte?
                <NuxtLink to="/auth/login" class="font-weight-bold text-primary"
                  >Connectez-vous</NuxtLink
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
          class="h-100 rounded-xl d-flex align-center justify-center"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">Start your journey today</h2>
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
import type { TAgency } from "~/types";
import { useAuth, useHttpCore, useUser } from "@/composables/api";
const { appName } = useAppConfig();

definePageMeta({
  layout: "auth",
});

useHead({
  title: `Inscription - ${appName}`,
});

const newAgency: TAgency = reactive({});
const errorMessages = ref([] as string[]);
const isFormValid = ref(false);
const isPasswordVisible = ref(false);
const loading = ref(false);
const formRef: Ref<VForm | undefined> = ref();
const authComposable = useAuth();
const userComposable = useUser();
const router = useRouter();

const submit = async () => {
  errorMessages.value = [];
  if (newAgency.password !== newAgency.confirmationPassword) {
    errorMessages.value.push("Mauvaise confirmation du mot de passe");
    return false;
  }

  const formValid = (await formRef.value?.validate())?.valid;

  if (formValid) {
    loading.value = true;

    await authComposable.register("agency", {
      email: newAgency.email as string,
      password: newAgency.password as string,
      name: newAgency.name as string,
    });
    loading.value = false;

    if (authComposable.authResponse.data) {
      router.replace("/auth/login");
    }
  }
};
</script>

<style scoped></style>
