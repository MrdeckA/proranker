<template>
  <NuxtLink active-class="nuxt_link_active" to="/"
    ><v-btn
      class="text-none"
      variant="plain"
      :color="currentPath == '/' ? 'primary' : 'black'"
      >Acceuil</v-btn
    ></NuxtLink
  >
  <NuxtLink active-class="nuxt_link_active" to="/auth/login"
    ><v-btn
      class="text-none"
      :color="currentPath == '/auth/login' ? 'primary' : 'black'"
      :variant="currentPath == '/auth/login' ? 'tonal' : 'text'"
      >Connexion</v-btn
    ></NuxtLink
  >
  <NuxtLink active-class="nuxt_link_active" to="/auth/register"
    ><v-btn
      class="text-none"
      variant="plain"
      :color="currentPath == '/auth/login' ? 'primary' : 'black'"
      >Inscription</v-btn
    ></NuxtLink
  >
  <NuxtLink active-class="nuxt_link_active" to="/faq"
    ><v-btn
      class="text-none"
      variant="plain"
      :color="currentPath == '/auth/login' ? 'primary' : 'black'"
      >Comment ça marche ?</v-btn
    ></NuxtLink
  >
</template>
