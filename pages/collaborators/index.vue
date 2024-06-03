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
            @click="onDeleteIconClick(item)"
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
              ref="collaborationFormRef"
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
                  v-model="newCollaboration.invite"
                  required
                  label="Email"
                  :rules="[ruleRequired]"
                  :items="copyOfUsersList"
                  :error-messages="errorMessages"
                  item-title="email"
                  @update:search="onAutocompleteSearchUpdate"
                  hide-no-data
                  item-value="id"
                >
                </v-combobox>
              </div>
              <div class="mt-2 mb-1">
                <v-select
                  density="comfortable"
                  placeholder="Chosissez un role"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  autocomplete="RoleCollaborateur"
                  id="RoleCollaborateur"
                  v-model="newCollaboration.role"
                  required
                  label="Role"
                  :items="Object.values(RoleCollaborateur)"
                  :rules="[ruleRequired]"
                ></v-select>
              </div>

              <div class="text-center">
                <v-btn
                  :loading="loading"
                  @click="onCollaboratorFormSubmitPrevent"
                  color="primary"
                  >Inviter</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-container>
      </template>
    </v-dialog>
    <v-dialog v-model="openDeleteDialog" width="45%">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title class="bg-red">Annuler collaboration</v-card-title>
          <v-card-text
            >Etes vous sur de vouloir d'annuler la collaboration?</v-card-text
          >
          <v-card-actions class="d-flex justify-space-around">
            <v-btn color="red" @click="deleleCollaborator()">Oui</v-btn>
            <v-btn @click="openDeleteDialog = false" color="primary ">
              Annuler</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store";
import type { Collaboration, TUser } from "~/types";
import { ruleEmail, ruleRequired } from "~/helpers/rules";
import { RoleCollaborateur } from "~/constants";
import { isString } from "lodash";
import type { VForm } from "vuetify/components";

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
const { API_BASE_URL } = useRuntimeConfig().public;
const { $toast } = useNuxtApp();
const openDeleteDialog = ref(false);

const loading = ref(false);
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
const itemsPerPage = ref(25);
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

const collaborationFormRef: Ref<VForm | undefined> = ref();

async function init() {
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
      params: {
        inviteur: authenticatedUser.value?.id,
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
}

await init();

const onCollaboratorAddClick = () => {
  openFormDialog.value = true;
};

const user = reactive<TUser>({});

const visible = ref(false);

function getCollaborator(id: string) {
  return usersList.value.find((u) => u.id == id);
}

function onAutocompleteSearchUpdate(searchText: String) {
  errorMessages.value = [];
  if (!isEmptyString(searchText)) {
    copyOfUsersList.value = usersList.value;
  } else {
    copyOfUsersList.value = [];
  }
}

const errorMessages = ref([] as string[]);

const collaborationToDelete = ref();

const onDeleteIconClick = async (item: any) => {
  console.log("delete icon is clicked ", item);
  openDeleteDialog.value = true;
  collaborationToDelete.value = item;
};

async function onCollaboratorFormSubmitPrevent() {
  const isFormValid = (await collaborationFormRef.value?.validate())?.valid;

  if (isFormValid) {
    if (isString(newCollaboration.value.invite)) {
      if (isEmail(newCollaboration.value.invite)) {
        loading.value = true;
        const { data, error } = await useFetch(
          `${API_BASE_URL}/api/collaborations/invite/?inviteur=${authenticatedUser.value?.id}&email=${newCollaboration.value.invite}&role=${newCollaboration.value.role}`,
          {
            onRequest({ request, options }) {
              //
            },
            headers: {
              Authorization: "Bearer " + authenticationToken.value,
            },
            watch: false,
            retry: 0,
          }
        );
        loading.value = false;

        if (data.value) {
          newCollaboration.value = {};

          $toast.success(data.value.message);

          await init();

          openFormDialog.value = false;

          console.log(data.value);
        }

        if (error.value) {
          console.log(error.value.data);
          $toast.error(error.value.data.message);
        }
      } else {
        errorMessages.value = ["Entrez une adresse email valide"];
      }
    } else {
      console.log(newCollaboration.value.invite?.email);
      loading.value = true;

      const { data, error } = await useFetch(
        `${API_BASE_URL}/api/collaborations/invite/?inviteur=${authenticatedUser.value?.id}&invite=${newCollaboration.value.invite?.id}&role=${newCollaboration.value.role}`,
        {
          onRequest({ request, options }) {
            //
          },
          headers: {
            Authorization: "Bearer " + authenticationToken.value,
          },
          watch: false,
          retry: 0,
        }
      );
      loading.value = false;

      if (data.value) {
        newCollaboration.value = {};
        $toast.success(data.value.message);

        await init();

        openFormDialog.value = false;

        console.log(data.value);
      }

      if (error.value) {
        console.log(error.value.data);
        $toast.error(error.value.data.message);
      }
    }
  }
}

async function deleleCollaborator() {
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `${API_BASE_URL}/api/collaborations/${collaborationToDelete.value.id}/`,
    {
      onResponseError({ request, response, options }) {
        //
      },
      method: "delete",
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );
  openDeleteDialog.value = false;
  collaborationToDelete.value = null;

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
    $toast.error("Erreur lors de la suppression !");
  }

  console.log(data.value);
  $toast.success("Collaboration supprimé avec succès !");
  return init();
}
</script>
