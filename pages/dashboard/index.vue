<template>
  <v-container>
    <h1 class="text-center mt-5 mb-10">Statistiques globales</h1>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="mdi-home">
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
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="mdi-home">
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
          <template v-slot:title>Collaborateurs</template>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="mdi-home">
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
          <template v-slot:title>Classements en cours</template>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="mdi-home">
          <template #text>
            <div class="stats-number">
              <number-animation
                :from="0"
                :to="stats.inProgressRanking"
                :duration="1"
                autoplay
                easing="linear"
                :format="formatValue"
              />
            </div>
          </template>
          <template v-slot:title>Classements achevés</template>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="mdi-home">
          <template #text>
            <div class="stats-number">
              <number-animation
                :from="0"
                :to="stats.endedRanking"
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
      <v-col cols="4">
        <v-card class="mx-auto" prepend-icon="mdi-home">
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

definePageMeta({
  layout: "user",
});

const stats = ref({
  recruitments: 5,
  files: 50,
  collaborators: 5,
  inProgressRanking: 1,
  endedRanking: 4,
  candidates: 40,
});

function formatValue(value: number) {
  return `${value.toFixed(0)}`;
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
