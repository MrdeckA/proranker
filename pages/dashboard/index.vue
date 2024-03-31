<template>
  <v-container>
    <h1 class="text-center mt-5 mb-10">Statistiques globales</h1>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto" prepend-icon="mdi-view-dashboard">
          <template #text>
            <div class="stats-number">
              <number-animation
                :from="0"
                :to="stats.recruitments"
                :duration="1"
                autoplay
                easing="linear"
                :format="formatValue"
              />
            </div>
          </template>
          <template v-slot:title>Recrutements</template>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" prepend-icon="mdi-account-group">
          <template #text>
            <div class="stats-number">
              <number-animation
                :from="0"
                :to="stats.collaborators"
                :duration="1"
                autoplay
                easing="linear"
                :format="formatValue"
              />
            </div>
          </template>
          <template v-slot:title>Collaborateurs</template>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="mx-auto" prepend-icon="mdi-file">
          <template #text>
            <div class="stats-number">
              <number-animation
                :from="0"
                :to="stats.files"
                :duration="1"
                autoplay
                easing="linear"
                :format="formatValue"
              />
            </div>
          </template>
          <template v-slot:title>Fichiers</template>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" prepend-icon="mdi-account-multiple">
          <template #text>
            <div class="stats-number">
              <number-animation
                :from="0"
                :to="stats.candidates"
                :duration="1"
                autoplay
                easing="linear"
                :format="formatValue"
              />
            </div>
          </template>
          <template v-slot:title>Candidats</template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import NumberAnimation from "vue-number-animation";
import { useAuthStore } from "~/store";

definePageMeta({
  layout: "user",
});

const stats = ref({
  recruitments: 0,
  files: 0,
  collaborators: 0,
  candidates: 0,
});

const authStore = useAuthStore();
const { authenticatedUser, authenticationToken } = storeToRefs(authStore);

function formatValue(value: number) {
  return `${value.toFixed(0)}`;
}

onBeforeMount(async () => {
  await init();
});

async function init() {
  const { data, error } = await useFetch(
    `http://127.0.0.1:8000/api/user/stats/${authenticatedUser.value.id}/`,
    {
      // query: {
      //   user: "1",
      // },

      onRequest({ request, options }) {
        //
      },
      headers: {
        Authorization: "Bearer " + authenticationToken.value,
      },
    }
  );

  if (data.value) {
    stats.value = data.value;
  }

  if (error.value) {
    console.log("error : ", error.value);
  }
}
</script>

<style scoped>
.stats-number {
  font-size: 2em;
  color: #5a5a5a;
  /* font-weight: 600; */
  text-align: center;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
</style>
