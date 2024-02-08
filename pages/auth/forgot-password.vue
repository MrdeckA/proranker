<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" lg="5" sm="6">
        <h1 class="text-center">Mot de de passe oublié</h1>
        <p class="text-medium-emphasis text-center">
          Saisissez votre email pour obtenir des instructions
        </p>

        <VForm ref="formRef" class="mt-7" @submit.prevent="submit">
          <div class="mt-1">
            <label class="label text-grey-darken-2" for="email">Email</label>
            <VTextField
              id="email"
              v-model="email"
              :rules="[ruleRequired, ruleEmail]"
              prepend-inner-icon="mdi-email-box"
              name="email"
              type="email"
              placeholder="Saisissez votre email..."
            />
          </div>
          <div class="mt-5">
            <VBtn
              type="submit"
              :loading="loading"
              block
              :disabled="loading"
              min-height="44"
              color="primary"
              >Envoyer</VBtn
            >
          </div>
        </VForm>
        <p class="text-body-2 mt-10 text-center">
          <span
            >Vous n'avez pas de compte ?
            <NuxtLink to="/auth/register" class="font-weight-bold text-primary"
              >Inscrivez-vous</NuxtLink
            ></span
          >
        </p>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ruleEmail, rulePassLen, ruleRequired } from "@/helpers/rules";
import type { VForm } from "vuetify/lib/components/index.mjs";
import { useUser } from "~/composables/api";
const { appName } = useAppConfig();

useHead({
  title: `Mot de passe oublié - ${appName}`,
});

definePageMeta({
  layout: "auth",
});

const email = ref("");
const password = ref("");
const formRef: Ref<VForm | undefined> = ref();
const loading = ref(false);
const userComposable = useUser();
const router = useRouter();
const { $toast } = useNuxtApp();
const submit = async () => {
  const formValid = (await formRef.value?.validate())?.valid;

  if (formValid) {
    loading.value = true;
    // loading.value = true;

    await userComposable.makeUserRequest(
      "agency",
      "",
      "forgot-agency-password",
      "post",
      {},
      {
        email: email.value,
      },
    );

    loading.value = false;

    if (userComposable.requestResponse.data) {
      $toast.success(userComposable.requestResponse.data.message);
      setTimeout(() => {
        router.replace("/auth/login");
      }, 3000);
    }
  }
};
</script>
