<template>
  <v-container>
    <v-card flat border>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-view-list"></v-icon>
        <span class="ms-5">Liste des Recrutements</span>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Recherche"
          single-line
          flat
          hide-details
          variant="solo-filled"
          class="me-5"
        ></v-text-field>

        <v-btn class="text-none" :to="'/recruitments/add'" color="primary"
          >Nouveau Recrutement</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        class="border shadow-lg"
        v-model:items-per-page="itemsPerPage"
        :headers="tableHeaders"
        :items-length="serverItems.length"
        :items="serverItems"
        :search="search"
        item-value="name"
      >
        <template #item.description_poste="{ item }">
          <span class="text-truncate">{{ item.description_poste }}</span>
          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>
        <template #item.id="{ item, index }">
          <span class="text-truncate">{{ index + 1 }}</span>
          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>
        <template #item.user="{ item, index }">
          <span class="text-truncate"
            >{{
              authenticatedUser?.id == item.user
                ? "moi"
                : findOneUser(item.user).nom_complet
            }}
          </span>
          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template>
        <template #item.action="{ item }">
          <v-btn
            size="small"
            :to="
              item.role == 'Lecture'
                ? `/recruitments/${item.id}?noUpdate=true`
                : `/recruitments/${item.id}`
            "
            icon
            variant="flat"
            ><v-icon color="primary"> mdi-eye </v-icon></v-btn
          >
          <v-btn
            :to="`/recruitments/${item.id}?update=true`"
            size="small"
            icon
            variant="flat"
            v-if="!item.role || item.role == 'Ecriture'"
          >
            <v-icon color="primary"> mdi-pencil </v-icon>
          </v-btn>

          <v-btn
            @click="onDeleteIconClick(item)"
            size="small"
            icon
            variant="flat"
            v-if="!item.role || item.role == 'Ecriture'"
          >
            <v-icon color="primary"> mdi-delete </v-icon>
          </v-btn>

          <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        </template></v-data-table
      ></v-card
    >

    <v-dialog v-model="openDeleteDialog" width="45%">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title class="bg-red">Supprimer recrutement</v-card-title>
          <v-card-text
            >Etes vous sur de vouloir supprimer définitivement le
            recrutement?</v-card-text
          >
          <v-card-actions class="d-flex justify-space-around">
            <v-btn color="red" @click="deleleRecruitment()">Oui</v-btn>
            <v-btn @click="openDeleteDialog = false" color="primary "
              >Annuler</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);
const serverItems = ref([] as any[]);
const { $toast } = useNuxtApp();
const openDeleteDialog = ref(false);
const usersList = ref([] as any[]);
const collaborations = ref([] as any[]);

const tableHeaders = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Nom", width: "25%", key: "nom", align: "start" },

  {
    title: "Intitulé du poste",
    width: "25%",
    key: "intitule_poste",
    align: "start",
  },
  {
    title: "Auteur",
    width: "25%",
    key: "user",
    align: "start",
  },
  { title: "Action", key: "action", align: "center" },
]);

async function loadRecruitments() {
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `http://127.0.0.1:8000/api/campagnes/?user=${authenticatedUser.value.id}`,
    {
      onResponseError({ request, response, options }) {
        //
      },

      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data.value) {
    console.log(data.value);
    serverItems.value = data.value.results;
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
  }
}

async function init() {
  const { data: data1, error: error1 } = await useFetch(
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

  if (data1.value) {
    usersList.value = data1.value.results;
    usersList.value = usersList.value.map((item, index) => {
      return { ...item, index };
    });
    console.log(data1.value);
  }

  if (error1.value) {
    console.log(error1.value.data);
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
        invite: authenticatedUser.value?.id,
      },
    }
  );

  const selectedCampagne = ref();

  if (resData.value) {
    collaborations.value = resData.value.results;
    collaborations.value.forEach(async (collaboration) => {
      console.log(collaboration.inviteur);
      if (collaboration.inviteur) {
        const { data, pending, error, refresh, execute, status } =
          await useFetch(
            `http://127.0.0.1:8000/api/campagnes/?user=${collaboration.inviteur}`,
            {
              onResponseError({ request, response, options }) {
                //
              },

              headers: {
                Authorization: "Bearer " + authenticationToken.value,
              },
            }
          );

        if (data.value) {
          data.value.results.forEach((result) => {
            serverItems.value.push({ ...result, role: collaboration.role });
          });
        }

        if (error.value) {
          // console.log("error : ", error.value?.data);
          console.log(error.value);
        }
      }
    });
    console.log(collaborations.value);
  }

  if (resError.value) {
    console.log(resError.value.data);
  }
}

await loadRecruitments();
await init();

const itemsPerPage = ref(15);
const search = ref("");

const onDeleteIconClick = async (item: any) => {
  console.log("delete icon is clicked ", item);
  openDeleteDialog.value = true;
  recruitementToDelete.value = item;
};

const recruitementToDelete = ref();

async function deleleRecruitment() {
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `http://127.0.0.1:8000/api/campagnes/${recruitementToDelete.value.id}/`,
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
  recruitementToDelete.value = null;
  if (data.value) {
    loadRecruitments();
    console.log(data.value);
    return $toast.success("Recrutement supprimé avec succès !");
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
    $toast.error("Erreur lors de la suppression !");
  }
}

function findOneUser(id: string) {
  return usersList.value.find((user) => user.id == id);
}
</script>
