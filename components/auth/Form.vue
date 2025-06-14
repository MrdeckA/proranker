<!--new-->
<template>
  <v-container class="mb-0">
    <div class="py-4">
      <v-card
        :class="`mx-auto pa-md-6 px-1`"
        :elevation="isMobile ? 0 : 8"
        :max-width="isRegistering ? 500 : 450"
        rounded="lg"
      >
        <v-form
          @submit.prevent="submitForm"
          validate-on="input"
          :fast-fail="true"
          ref="formRef"
        >
          <h1 class="text-center text-h5 font-weight-bold text-primary">
            {{ isRegistering ? `INSCRIPTION` : `CONNEXION` }}
          </h1>
          <div class="mt-8 mb-1" v-if="isRegistering">
            <v-text-field
              density="comfortable"
              placeholder="Saisissez votre nom"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              autocomplete="email"
              id="last-name"
              autocapitalize="off"
              v-model="user.last_name"
              required
              :rules="[ruleRequired]"
              label="Nom"
            ></v-text-field>
          </div>
          <div class="mt-0 mb-0" v-if="isRegistering">
            <v-text-field
              density="comfortable"
              placeholder="Saisissez votre prénom"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              autocomplete="email"
              id="first-name"
              autocapitalize="off"
              v-model="user.first_name"
              required
              :rules="[ruleRequired]"
              label="Prénom"
            ></v-text-field>
          </div>
          <div class="mb-0" :class="isRegistering ? 'mt-0' : 'mt-8'">
            <v-text-field
              density="comfortable"
              placeholder="Entrez votre addresse Email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              autocomplete="email"
              id="email"
              autocapitalize="off"
              v-model="user.email"
              required
              :rules="rules"
              label="Email"
              :readonly="email ? true : false"
            ></v-text-field>
          </div>

          <div class="mb-1">
            <div
              class="text-subtitle-1 d-flex align-center justify-space-between"
            >
              <div></div>
              <a
                v-if="!isRegistering"
                class="text-caption text-decoration-none text-primary mb-2"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                >Mot de Passe Oublié</a
              >
            </div>

            <v-text-field
              density="comfortable"
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              placeholder="Entrez votre mot de passe"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              autocapitalize="off"
              autocomplete="password"
              v-model="user.password"
              required
              :rules="password_rules"
              label="Mot de passe"
              :error-messages="errorMessages"
            ></v-text-field>
          </div>

          <div v-if="isRegistering" class="mb-5">
            <v-text-field
              density="comfortable"
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              placeholder="Confirmez le mot de passe"
              prepend-inner-icon="mdi-lock-check-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="user.confirmation_passsword"
              :rules="password_rules"
              autocomplete="confirm-password"
              label="Confirmation mot de passe"
              :error-messages="errorMessages"
            ></v-text-field>
          </div>

          <v-btn
            type="submit"
            block
            class="my-6"
            color="primary"
            size="large"
            :loading="isFetching"
            >{{ isRegistering ? `INSCRIPTION` : `CONNEXION` }}</v-btn
          >

          <v-card-text class="text-center">
            <NuxtLink
              class="text-primary text-decoration-none"
              :to="isRegistering ? '/auth/login' : '/auth/register'"
              rel="noopener noreferrer"
              ><v-icon v-if="isRegistering" icon="mdi-chevron-left"></v-icon
              >{{ isRegistering ? `Se connecter` : `S'inscrire Maintenant`
              }}<v-icon v-if="!isRegistering" icon="mdi-chevron-right"></v-icon>
            </NuxtLink>
          </v-card-text>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import type { TUser, ErrorMessages } from "@/types";
import mobile from "is-mobile";
import { ruleRequired } from "@/helpers/rules";
import type { VForm } from "vuetify/lib/components/index.mjs";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store";
const router = useRouter();
const route = useRoute();

const isFormValid = ref(false);
const authStore = useAuthStore();

const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

const googleAuthLogin = ref(false);
const { API_BASE_URL } = useRuntimeConfig().public;
const { $toast } = useNuxtApp();
const errorMessages = ref([] as string[]);

//code à revoir
//vraiment le bazar

// const { login, state: authState, register } = useAuth();

const isFetching = ref(false);

const rules = ref([
  (value: any) => {
    if (value) {
      isFormValid.value = true;
      return true;
    }
    return "Vous devez entrer un email";
  },
  (value: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      isFormValid.value = true;
      return true;
    }
    return "Mauvais format d'adresse email";
  },
]);

const password_rules = ref([
  (value: string) => {
    if (value) {
      isFormValid.value = true;
      return true;
    }

    return "Vous devez entrer un mot de passe";
  },
  (value: string) => {
    if (value.length > 6) {
      isFormValid.value = true;
      return true;
    }
    return "Minimum Six(06) caractères pour le mot de passe";
  },
]);

const isMobile = mobile();

interface FormProps {
  isRegistering?: boolean;
}

const visible = ref(false);

const props = withDefaults(defineProps<FormProps>(), {
  isRegistering: () => false,
});

const formRef: Ref<VForm | undefined> = ref();

const { isRegistering } = toRefs(props);
let user: TUser = reactive({});

async function submitForm() {
  errorMessages.value = [];

  isFetching.value = true;

  const formValid = (await formRef.value?.validate())?.valid;

  if (
    user.password === "" ||
    user.confirmation_passsword === "" ||
    user.email === ""
  ) {
    $toast.warning("Erreur ! Tous les champs sont requis");
    isFetching.value = false;
  }
  if (formValid) {
    isRegistering.value
      ? onRegistrationFormSubmitPrevent()
      : onLoginFormSubmitPrevent();
  } else isFetching.value = false;
}
const errorMessage = ref();

async function onLoginFormSubmitPrevent() {
  isFetching.value = true;
  // emit(EnikejiEvents.LOGIN_FORM_SUBMIT, user.value as IUser)
  // return navigateTo("/menu");
  const { data, error } = await useFetch(
    "http://localhost:8000/api/user/login/",
    {
      method: "post",
      body: user,
      onRequest({ request, options }) {
        //
        // console.log(request, options);
      },
      watch: false,
      timeout: 6000,
    }
  );

  if (data.value) {
    console.log(data.value);
    authStore.updateAuthenticatedUser(data.value.user);
    authStore.updateAuthenticationToken(data.value.token);
    $toast.success("Connexion Réussie !");
    setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);
  }

  if (error.value) {
    isFetching.value = false;
    if (error.value.data?.detail) {
      return $toast.error(error.value.data.detail);
    }
    return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
  }

  // console.log("onLoginFormSubmitPrevent", user);
}

const inviteur = ref(route.query.inviteur);
const role = ref(route.query.role);
const email = ref(route.query.email);

onMounted(() => {
  if (email) {
    user.email = email.value as string;
  }
});

async function addNewCollaborator(
  inviteur: string,
  invite: string,
  role: string
) {
  isFetching.value = true;

  const { data, error } = await useFetch(
    `${API_BASE_URL}/api/collaborations/invite/?inviteur=${inviteur}&invite=${invite}&role=${role}&statut_invitation=Acceptée`,
    {
      onRequest({ request, options }) {
        //
      },

      watch: false,
      retry: 0,
    }
  );

  if (data.value) {
    isFetching.value = false;

    console.log(data.value);
  }

  if (error.value) {
    console.log(error.value.data);
  }
}

async function onRegistrationFormSubmitPrevent() {
  // emit(EnikejiEvents.REGISTRATION_FORM_SUBMIT, user.value as IUser);
  isFetching.value = true;
  console.log(user);
  if (user.password != user.confirmation_passsword) {
    isFetching.value = false;
    errorMessages.value = ["Les deux mots de passe doivent êtres identiques"];

    return $toast.warning("Les deux mots de passe doivent êtres identiques");
  }
  // emit(EnikejiEvents.LOGIN_FORM_SUBMIT, user.value as IUser)
  // return navigateTo("/menu");
  const { data, error } = await useFetch(
    "http://localhost:8000/api/user/register/",
    {
      method: "post",
      body: {
        email: user.email,
        nom: user.last_name,
        prenom: user.first_name,
        password: user.password,
      },
      onRequest({ request, options }) {
        //
        // console.log(request, options);
      },
      watch: false,
    }
  );

  if (data.value) {
    console.log(data.value);
    $toast.success("Inscription Réussie !");

    if (inviteur.value) {
      await addNewCollaborator(
        inviteur.value as string,
        data.value.id as string,
        role.value as string
      );
    }

    setTimeout(() => {
      router.replace("/auth/login");
    }, 2000);
  }

  if (error.value) {
    isFetching.value = false;

    console.log(error.value.data);

    if (error.value.data?.detail) {
      return $toast.error(error.value.data.detail);
    }
    if (error.value.data?.email) {
      return $toast.error(error.value.data.email);
    }

    return $toast.error("Erreur lors de la requête ! Veuillez rééssayer.");
  }
}
</script>
