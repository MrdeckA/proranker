<template>
  <v-container fluid style="min-height: 100vh">
    <v-container fluid class="mx-0">
      <v-row align="center" justify="center" class="mt-0">
        <v-col class="" cols="6">
          <h1 class="text-h2">Bienvenue sur ProRanker</h1>
          <div class="mt-5 ms-5">
            Trouvez votre meilleur candidat grâce à notre outil de classement
            des CV alimenté par l'IA !
          </div>
          <v-row class="mt-5" justify="center">
            <NuxtLink active-class="nuxt_link_active" to="/recruitments"
              ><v-btn color="primary">Commencer</v-btn></NuxtLink
            >
          </v-row>
        </v-col>
        <v-col class="text-center" cols="6">
          <img
            src="assets/images/image4.png"
            class=""
            style="border-radius: 1em; width: 35em"
          />
        </v-col>
      </v-row> </v-container
  ></v-container>
</template>
