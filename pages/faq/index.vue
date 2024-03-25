<template>
  <div>
    <v-container>
      <h1 class="headline text-center my-4">ProRanker - Comment ça marche</h1>
      <v-row>
        <!-- Création du Recrutement -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h3 class="subtitle-1">1. Création du Recrutement</h3>
            <p>
              L'utilisateur démarre le processus en interagissant avec notre
              interface conviviale. Il renseigne les détails du recrutement tels
              que le nom du poste, la description et l'intitulé. Ensuite, il
              téléverse les fichiers PDF contenant les CV des postulants et
              définit les critères de sélection des candidats.
            </p>
          </v-card>
        </v-col>
        <!-- Soumission du Formulaire -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h3 class="subtitle-1">2. Soumission du Formulaire</h3>
            <p>
              Une fois le formulaire rempli, l'utilisateur soumet les
              informations au système. Notre système prend en charge la tâche en
              ajoutant le nouveau recrutement à la base de données. Une
              confirmation de la création du recrutement est renvoyée à
              l'utilisateur pour validation.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Validation du Recrutement -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h3 class="subtitle-1">3. Validation du Recrutement</h3>
            <p>
              L'interface affiche le nouveau recrutement à l'utilisateur pour
              vérification. Une fois validé, l'utilisateur peut passer à l'étape
              suivante.
            </p>
          </v-card>
        </v-col>
        <!-- Lancement du Processus de Classement -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h3 class="subtitle-1">4. Lancement du Processus de Classement</h3>
            <p>
              L'utilisateur lance le processus de classement à partir de
              l'interface.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Analyse des CV -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h3 class="subtitle-1">5. Analyse des CV</h3>
            <p>
              Notre système extrait le contenu textuel de chaque CV soumis. Le
              modèle NLP entre en jeu en initiant la prédiction sur le texte
              extrait. Le modèle effectue des traitements avancés et renvoie la
              liste des entités nommées.
            </p>
          </v-card>
        </v-col>
        <!-- Classement des Candidats -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <h3 class="subtitle-1">6. Classement des Candidats</h3>
            <p>
              Les entités nommées permettent au système de comparer les
              informations des candidats aux critères définis par le recruteur.
              Des points sont attribués à chaque candidat en fonction de leur
              correspondance avec les critères. Ce processus permet à notre
              système de réaliser un classement efficace des candidats.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Affichage des Résultats -->
        <v-col cols="12">
          <v-card class="pa-4">
            <h3 class="subtitle-1">7. Affichage des Résultats</h3>
            <p>
              Les résultats du classement sont renvoyés à l'interface.
              L'interface se charge d'afficher les résultats de manière claire
              et concise à l'utilisateur.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CommentCaMarche",
};
</script>

<style scoped>
.subtitle-1 {
  margin-top: 0;
  margin-bottom: 15px;
}
</style>
