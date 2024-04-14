<template>
  <v-container>
    <v-card flat border>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-account-multiple"></v-icon>
        <span class="ms-5">Liste des collaborateurs</span>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Rechercher"
          single-line
          flat
          hide-details
          variant="solo-filled"
          class="me-5"
        ></v-text-field>

        <v-btn class="text-none" @click="onCollaboratorAddClick" color="primary"
          >Inviter un collaborateur</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        class="border shadow-lg"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="collaborateurs.length"
        :items="collaborateurs"
        :search="search"
      >
        <template #item.id="{ item, index }">
          <span class="text-truncate">{{ index + 1 }}</span>
          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>

        <template #item.nom="{ item, index }">
          <span>{{ getCollaborator(item.invite).nom }}</span></template
        >
        <template #item.prenom="{ item, index }">
          <span>{{ getCollaborator(item.invite).prenom }}</span></template
        >
        <template #item.role="{ item, index }">
          <span>{{ item.role }}</span></template
        >
        <template #item.email="{ item, index }">
          <span>{{ getCollaborator(item.invite).email }}</span></template
        >

        <template #item.action="{ item, index }">
          <v-btn
            size="small"
            @click="openFormDialogForCampagne(item, index)"
            icon
            variant="flat"
            ><v-icon color="primary"> mdi-delete </v-icon></v-btn
          >

          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template></v-data-table
      ></v-card
    >
    <v-dialog v-model="openFormDialog" width="600">
      <template v-slot:default="{ isActive }">
        <v-container>
          <v-card class="pa-5" :title="`Nouveau collaborateur`">
            <v-form
              @submit.prevent="onCollaboratorFormSubmitPrevent"
              validate-on="input"
              :fast-fail="true"
            >
              <div class="my-2">
                <v-combobox
                  density="comfortable"
                  placeholder="Entrez votre addresse Email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  autocomplete="email"
                  id="email"
                  autocapitalize="off"
                  v-model="invitedCollaborator"
                  required
                  label="Email"
                  :rules="[ruleRequired, ruleEmail]"
                  :items="copyOfUsersList"
                  item-title="email"
                  @update:search="onAutocompleteSearchUpdate"
                  hide-no-data
                >
                </v-combobox>
              </div>
              <!-- <div class="mt-2 mb-1">
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
                  label="Nom"
                ></v-text-field>
              </div>
              <div class="mt-0 mb-0">
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
                  label="Prénom"
                ></v-text-field>
              </div>

              <div class="mb-1">
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
                  label="Mot de passe"
                ></v-text-field>
              </div>

              <div class="mb-5">
                <v-text-field
                  density="comfortable"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  placeholder="Confirmez le mot de passe"
                  prepend-inner-icon="mdi-lock-check-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                  v-model="user.confirmation_passsword"
                  autocomplete="confirm-password"
                  label="Confirmation mot de passe"
                ></v-text-field>
              </div> -->
              <div class="text-center">
                <v-btn @click="onCollaboratorInvited" color="primary"
                  >Inviter</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-container>
      </template>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store";
import type { Collaboration, TUser } from "~/types";
import { ruleEmail, ruleRequired } from "~/helpers/rules";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const openFormDialog = ref(false);
const collaborateurs = ref([] as any[]);
const campagnesList = ref([] as any[]);
const usersList = ref([] as any[]);
const copyOfUsersList = ref([] as any[]);
const serverItems = ref([] as any[]);
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

const newCollaboration = ref({} as Collaboration);
// function customFilter(itemTitle: any, queryText: any, item: any) {
//   if (item.raw.index > 2) {
//     return false;
//   }

//   return true;
// }

const headers = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Nom", key: "nom", align: "start" },
  { title: "Prénom", key: "prenom", align: "start" },
  { title: "Email", key: "email", align: "start" },
  { title: "Role", key: "role", align: "start" },
  { title: "Statut Invitation", key: "statut_invitation", align: "start" },
  { title: "Action", key: "action", align: "center" },
]);

// const { data, pending, error, refresh, execute, status } = await useFetch(
//   "http://127.0.0.1:8000/api/liste-campagnes-collaborateurs/?user=1"
// );

const totalItems = ref(0);
const itemsPerPage = ref(10);
const search = ref("");
// if (data.value) {
//   // console.log(data.value);
//   serverItems.value = data.value;
//   totalItems.value = data.value.length;
// }

// if (error.value) {
//   // console.log("error : ", error.value?.data);
//   // console.log(error.value);
// }
const selectedCampagneIndex = ref(0);
function openFormDialogForCampagne(item: any, index: number) {
  selectedCampagne.value = item;
  selectedCampagneIndex.value = index;
  // console.log(index);
  openFormDialog.value = true;
}

onBeforeMount(async () => {
  const { data, error } = await useFetch(
    "http://127.0.0.1:8000/api/user/all/",
    {
      onRequest({ request, options }) {
        //
      },
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data.value) {
    usersList.value = data.value.results;
    usersList.value = usersList.value.map((item, index) => {
      return { ...item, index };
    });
    console.log(data.value);
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value.data);
  }
  const { data: resData, error: resError } = await useFetch(
    "http://127.0.0.1:8000/api/collaborations/",
    {
      onRequest({ request, options }) {
        //
      },
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  const selectedCampagne = ref();

  if (resData.value) {
    collaborateurs.value = resData.value.results;
    // console.log(data.value);
  }

  if (resError.value) {
    // console.log("error : ", error.value?.data);
    // console.log(error.value);
  }
});

const onCollaboratorAddClick = () => {
  openFormDialog.value = true;
};

const user = reactive<TUser>({});

const visible = ref(false);

function getCollaborator(id: string) {
  return usersList.value.find((u) => u.id == id);
}

function onAutocompleteSearchUpdate(searchText: String) {
  if (!isEmptyString(searchText)) {
    copyOfUsersList.value = usersList.value;
  } else {
    copyOfUsersList.value = [];
  }
}

function onCollaboratorInvited() {
  console.log(invitedCollaborator.value);
}

function onCollaboratorFormSubmitPrevent() {
  console.log("submit form");
}
</script>
