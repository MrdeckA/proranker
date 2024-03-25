<template>
  <v-container fluid class="mx-16">
    <v-row align="center" class="mt-14">
      <v-col class="">
        <h1 class="text-h2">Bienvenue sur ProRanker</h1>
        <div class="mt-5 ms-5">Optimisez vos recrutements grâce à l'IA !</div>
        <v-row class="mt-5 ms-10">
          <NuxtLink active-class="nuxt_link_active" to="/recruitments"
            ><v-btn prepend-icon="mdi-play" color="primary"
              >Démarrer un Classement</v-btn
            ></NuxtLink
          >
        </v-row>
      </v-col>
      <v-col>
        <img src="assets/images/hero-3.png" style="border-radius: 1em" />
      </v-col>
    </v-row>
  </v-container>
</template>
