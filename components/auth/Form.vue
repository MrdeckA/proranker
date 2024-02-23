<!--new-->
<template>
  <v-container class="mb-0">
    <div class="py-4">
      <v-card
        :class="`mx-auto pa-md-6 px-1`"
        :elevation="isMobile ? 0 : 8"
        :max-width="isRegistering ? 500 : 450"
        rounded="lg"
        v-model="isFormValid"
      >
        <v-form
          @submit.prevent="submitForm"
          validate-on="input"
          :fast-fail="true"
        >
          <h1 class="text-center text-h5 font-weight-bold text-primary">
            {{ isRegistering ? `INSCRIPTION` : `CONNEXION` }}
          </h1>
          <div class="mt-5 mb-1">
            <div class="text-subtitle-1">Email</div>

            <v-text-field
              density="compact"
              placeholder="Addresse Email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              autocomplete="email"
              id="email"
              autocapitalize="off"
              v-model="user.email"
              required
              :rules="rules"
            ></v-text-field>
          </div>

          <div class="mb-1">
            <div
              class="text-subtitle-1 d-flex align-center justify-space-between"
            >
              Mot de Passe

              <a
                v-if="!isRegistering"
                class="text-caption text-decoration-none text-primary"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                >Mot de Passe Oublié</a
              >
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Entrez votre mot de passe"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              autocapitalize="off"
              autocomplete="password"
              v-model="user.password"
              required
              :rules="password_rules"
            ></v-text-field>
          </div>

          <div v-if="isRegistering" class="mb-5">
            <div
              class="text-subtitle-1 d-flex align-center justify-space-between"
            >
              Confirmation
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Confirmez le mot de passe"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="user.confirmation_passsword"
              :rules="password_rules"
              autocomplete="confirm-password"
            ></v-text-field>
          </div>

          <v-btn
            type="submit"
            block
            class="mb-5"
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

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store";
const router = useRouter();
const route = useRoute();

const isFormValid = ref(false);
const { $toast } = useNuxtApp();
const { authenticationToken } = useAuthStore();

const googleAuthLogin = ref(false);

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

const { isRegistering } = toRefs(props);
let user: TUser = reactive({});

function submitForm() {
  if (
    user.password === "" ||
    user.confirmation_passsword === "" ||
    user.email === ""
  ) {
    $toast.warning("Erreur ! Tous les champs sont requis");
    isFetching.value = false;
  }
  if (isFormValid.value) {
    isRegistering.value
      ? onRegistrationFormSubmitPrevent()
      : onLoginFormSubmitPrevent();
  }
}
const errorMessage = ref();

async function onLoginFormSubmitPrevent() {
  try {
    // emit(EnikejiEvents.LOGIN_FORM_SUBMIT, user.value as IUser)
    // return navigateTo("/menu");
    return console.log("onLoginFormSubmitPrevent");
  } catch (error) {
    console.log("Login Error from catch block");
  } finally {
    isFetching.value = false;
  }
}

async function onRegistrationFormSubmitPrevent() {
  // emit(EnikejiEvents.REGISTRATION_FORM_SUBMIT, user.value as IUser);
  return console.log("onRegistrationFormSubmitPrevent");
}

//Begin auth ith google

/* start auth */

// const auth = useAuth();

async function googleAuth() {
  googleAuthLogin.value = true;
  console.log("Authentication with google");
  const url = "http://localhost:5000/auth/google";
  // googleAuthLogin.value = true

  if (process.client) {
    //const newWindow =
    window.location.href = url;
  }
}
</script>
