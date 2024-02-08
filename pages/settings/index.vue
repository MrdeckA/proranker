<template>
  <v-container>
    <v-col v-if="!authenticatedUser?.emailVerified" cols="9" class="mx-auto">
      <v-alert
        density="compact"
        type="warning"
        text="N'oubliez pas de vérifier votre adresse email pour pouvoir profiter pleinement de nos services ! "
        color="primary"
      ></v-alert
    ></v-col>
    <v-card width="70%" class="mx-auto">
      <v-row>
        <v-col cols="6">
          <v-col cols="12" class="d-flex justify-center">
            <v-avatar size="5em" color="primary"
              ><span v-logolify class="text-h4">{{
                authenticatedUser?.name
              }}</span></v-avatar
            ></v-col
          >
          <v-col cols="12" class="text-subtitle-1 d-flex justify-center">
            <span class="me-1">{{ authenticatedUser?.name }}</span>
            <v-icon
              class=""
              color="primary"
              v-if="authenticatedUser?.emailVerified"
              >mdi-check-decagram</v-icon
            >
          </v-col>

          <v-col cols="12"
            ><span class="font-weight-bold"> Slogan : </span>
            {{ authenticatedUser?.tagline }}</v-col
          >

          <v-col cols="12"
            ><span class="font-weight-bold"> Lien site web : </span>
            {{ authenticatedUser?.onlinelink || "(Non défini)" }}</v-col
          >
          <v-col cols="12"
            ><span class="font-weight-bold"> Références : </span>
            {{ authenticatedUser?.references || "(Non défini)" }}</v-col
          >
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="6"
          ><v-col cols="12"
            ><span class="font-weight-bold"> Nom légal : </span>
            {{ authenticatedUser?.legalName }}</v-col
          >
          <v-col cols="12"
            ><span class="font-weight-bold"> Nom court : </span>
            {{ authenticatedUser?.shortName }}</v-col
          >

          <v-col cols="12"
            ><span class="font-weight-bold"> Email : </span>
            {{ authenticatedUser?.email }}</v-col
          >
          <v-col cols="12"
            ><span class="font-weight-bold"> Numéro de téléphone : </span>
            {{ authenticatedUser?.phoneNumber || "(Non défini)" }}</v-col
          >
          <v-col cols="12"
            ><span class="font-weight-bold"> Ville : </span>
            {{ authenticatedUser?.city }}</v-col
          >

          <v-col cols="12"
            ><span class="font-weight-bold"> Adresse : </span>
            {{ authenticatedUser?.address }}</v-col
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-col cols="12">
        <div class="text-center">
          <span class="text-h6">A propos </span>
          <div
            class="px-5"
            :class="{ 'text-truncate': truncateAboutText }"
            @click="truncateAboutText = !truncateAboutText"
          >
            {{ authenticatedUser?.about }}
          </div>
        </div>
      </v-col>
      <v-divider></v-divider>

      <v-col cols="12"
        ><v-card variant="flat">
          <v-list>
            <v-list-subheader
              >Documents
              <v-btn color="primary" size="small" icon
                ><v-icon>mdi-plus</v-icon></v-btn
              ></v-list-subheader
            >

            <v-list-item v-for="n in 5" :value="n">doc {{ n }}</v-list-item>
          </v-list></v-card
        ></v-col
      >

      <v-row class="ma-5 text-center">
        <v-col>
          <v-btn
            to="/settings/profile/update"
            color="primary"
            prepend-icon="mdi-pencil"
            >Modifier profil</v-btn
          >
        </v-col>
        <v-col
          ><v-btn
            to="/settings/password/update"
            color="primary"
            prepend-icon="mdi-lock"
            >Modifier mot de passe</v-btn
          ></v-col
        >
      </v-row>

      <template #append>
        <v-btn icon variant="flat" to="/settings/profile/update"
          ><v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import type { TAgency, THouse } from "~/types";
import { useUser } from "@/composables/api";
import { useAuthStore } from "#imports";
import { vLogolify } from "~/directives";
const { appName } = useAppConfig();
useHead({
  title: `Paramètres du compte - ${appName}`,
});

definePageMeta({
  layout: "user",
});

const truncateAboutText = ref(true);
const route = useRoute();
const userComposable = useUser();
const houseId = ref(route.params.houseId as string);
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

onBeforeMount(() => {});
</script>

<style scoped>
img {
  height: 100%;
  width: 100%;
}
</style>
