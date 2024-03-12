<template>
  <v-container>
    <!--Dialog-->
    <v-card
      width="80%"
      class="pa-5 mx-auto"
      title="Détails recruitement (Lecture seule)"
    >
      <template #append>
        <v-btn class="me-5" color="primary" @click="openFormDialog = true"
          >Afficher résultats</v-btn
        >
        <v-btn
          color="primary"
          @click="startPrediction()"
          icon="mdi-play"
        ></v-btn>

        <v-btn variant="text" icon @click="isUpdate = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-form @submit.prevent="onRecruitmentFormSumbit">
        <v-col>
          <v-text-field
            v-model="campagneToEdit.nom"
            label="Nom"
            variant="outlined"
            :readonly="!isUpdate"
          ></v-text-field></v-col
        ><v-col>
          <v-text-field
            v-model="campagneToEdit.intitule_poste"
            label="Intitulé du poste"
            variant="outlined"
            :readonly="!isUpdate"
          ></v-text-field
        ></v-col>
        <v-col>
          <v-textarea
            v-model="campagneToEdit.description_poste"
            label="Description du poste"
            variant="outlined"
            :readonly="!isUpdate"
          ></v-textarea
        ></v-col>

        <v-col class="pa-0 ma-0">
          <v-list>
            <v-list-subheader>
              Critères
              <!-- <v-btn
                @click="openFormDialog = true"
                class="ms-5"
                color="primary"
                size="x-small"
                icon
                ><v-icon>mdi-plus</v-icon></v-btn
              > -->
            </v-list-subheader>

            <v-list-item v-if="isDefinedValue(campagneToEdit.degrees)"
              >Diplomes : {{ campagneToEdit.degrees }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item
              v-if="isDefinedValue(campagneToEdit.minimum_number_of_languages)"
              >Nombre Minimum de langues :
              {{ campagneToEdit.minimum_number_of_languages }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.minimum_number_of_experiences"
              >Nombre minimum d'experience :
              {{ campagneToEdit.minimum_number_of_experiences }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.languages"
              >Langues : {{ campagneToEdit.languages }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-if="campagneToEdit.skills"
              >Compétences : {{ campagneToEdit.skills }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>

            <v-list-item v-if="isDefinedValue(campagneToEdit.certifications)">
              Certifications : {{ campagneToEdit.certifications }}

              <template #append>
                <v-btn
                  variant="text"
                  size="small"
                  icon="mdi-delete"
                  v-if="isUpdate"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <div class="text-center" v-if="!isUpdate">
          <v-btn
            color="primary"
            @click="isUpdate = true"
            prepend-icon="mdi-pencil"
            >Modifier</v-btn
          >
        </div>

        <div class="text-center" v-else>
          <v-btn
            class="me-10"
            color="red"
            @click="isUpdate = false"
            prepend-icon="mdi-pencil"
            >Annuler</v-btn
          >
          <v-btn
            color="primary"
            @click="isUpdate = true"
            prepend-icon="mdi-pencil"
            >Sauvegarder</v-btn
          >
        </div>
      </v-form>
    </v-card>

    <v-dialog scrollable v-model="openFormDialog">
      <template v-slot:default="{ isActive }">
        <v-container>
          <v-card
            id="my-card"
            ref="cardRef"
            width="99%"
            title="Classement des candidats"
            class="mx-auto"
          >
            <template #append>
              <v-btn icon variant="text" @click="onPrinterClick()"
                ><v-icon size="30">mdi-download</v-icon></v-btn
              >
              <v-btn icon variant="text" @click="onPrinterClick()"
                ><v-icon size="30">mdi-printer</v-icon></v-btn
              >
            </template>
            <v-data-table
              class="border shadow-lg"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="sorteredRanking.length"
              :items="sorteredRanking"
              :search="search"
              item-value="name"
              height="500"
            >
              <template #item.id="{ item, index }">
                <span class="text-truncate">{{ index + 1 }}</span>
                <!-- <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
              </template>
              <!-- <template #item.action="{ item }">
          <v-btn
            size="small"
            :to="`/recruitments/${item.id}`"
            icon
            variant="flat"
            ><v-icon color="primary"> mdi-eye </v-icon></v-btn
          >
          <v-btn size="small" icon variant="flat">
            <v-icon color="primary"> mdi-pencil </v-icon>
          </v-btn>

          <v-btn size="small" icon variant="flat">
            <v-icon color="primary"> mdi-delete </v-icon>
          </v-btn>

          <v-btn icon variant="flat">
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> 
        </template> -->
            </v-data-table>
          </v-card>
        </v-container>
      </template>
    </v-dialog>

    <div class="pa-4 text-center">
      <v-btn
        :disabled="dialog"
        color="primary"
        icon="mdi-refresh"
        text="Start loading"
        @click="dialog = true"
      ></v-btn>

      <v-dialog v-model="dialog" max-width="320" persistent>
        <!-- <v-list class="py-2" color="primary" elevation="12" rounded="lg">
          <v-list-item
            prepend-icon="$vuetify-outline"
            title="Refreshing Application..."
          >
            <template v-slot:prepend>
              <div class="pe-4">
                <v-icon color="primary" size="x-large"></v-icon>
              </div>
            </template>

            <template v-slot:append>
            
            </template>
          </v-list-item>
        </v-list> -->
        <v-card
          height="200"
          width="500"
          class="py-2"
          elevation="12"
          rounded="lg"
          title="Classement en cours..."
          prepend-icon="mdi-time-sand"
        >
          <div class="text-center pa-10">
            <v-progress-linear
              color="primary"
              indeterminate
              size="1"
              height="5"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <!-- <pre>
      {{ sorteredRanking }}
    </pre> -->
  </v-container>
</template>
<script lang="ts" setup>
import { type Campagne } from "@/types";
import axios from "axios";
import { isUndefined, isNull } from "lodash";
import { VCard } from "vuetify/components";
import jsPDF from "jspdf";
// import VueExcelTable from "vue-excel-table";

definePageMeta({
  layout: "user",
});

const dialog = ref(false);
const { $toast } = useNuxtApp();
const route = useRoute();
const tableData = ref([
  // Vos données de tableau ici
]);

const tableColumns = ref([
  // Vos colonnes de tableau ici
]);
const criteriaTypes = ref(
  [
    "A des prix",
    "Nombre minimum d'expériences",
    "A des certifications",
    "Compétences",
    "Langues",
    "Nombre minimum de langues",
    "Diplome minimum",
  ].sort()
);

const isUpdate = ref(false);

const binariesItems = ref([
  {
    label: "Oui",
    value: true,
  },
  {
    label: "Non",
    value: false,
  },
]);

const openFormDialog = ref(false);
const campagneToEdit = ref({} as Campagne);
const campagneToEditType = ref("");

const onFormSubmit = () => {
  openFormDialog.value = false;
};

interface Critere {
  type: string;
  valeur: string;
}
const criteres: Ref<Critere[]> = ref([]);

const onNewCriteriaFormSubmit = () => {};

const onRecruitmentFormSumbit = async () => {
  // console.log(campagneToEdit.value);
  let data = new FormData();
  campagneToEdit.value.fichiers?.forEach((file, index) => {
    console.log(index);
    data.append(file.name, campagneToEdit.value.fichiers[index]);
  });
  data.append("model", JSON.stringify({ ...campagneToEdit.value, user: "1" }));
  console.log(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    data: {
      ...data,
    },
    Headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await axios
    .post("http://127.0.0.1:8000/api/campagnes/", data, config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
const search = ref("");

function isDefinedValue(value: any): boolean {
  return !isUndefined(value);
}

enum Correspondance {
  "Nombre minimum de langues" = "minimum_number_of_languages",
  "Nombre minimum d'expériences" = "minimum_number_of_experiences",
  "Nombre minimum d'années d'expérience" = "minimum_number_of_years_of_experience",
  "Diplome minimum" = "minimum_degree",
  "Langues" = "languages",
  "Compétences" = "skills",
  "A des prix" = "has_awards",
  "A des certifications" = "has_certifications",
}

watch(campagneToEdit.value, () => {
  criteriaTypes.value = filtrerClésDéfinies(
    criteriaTypes.value,
    campagneToEdit.value
  ).sort();

  console.log(criteriaTypes.value);
  // criteriaTypes.value.forEach((criteria) => {
  //   if (isDefinedValue(campagneToEdit.value[criteria])) {
  //     console.log(criteria);
  //   }
  // });
});
function filtrerClésDéfinies(tableau: string[], objet: any): string[] {
  // Filtrer les clés du tableau qui sont définies dans l'objet
  const clésDéfinies = tableau.filter((clé) => {
    return isUndefined(objet[Correspondance[clé]]);
  });

  return clésDéfinies;
}

// console.log(isDefinedValue(campagneToEdit.value["has_awards"]));

// onBeforeMount(async () => {
//   await axios
//     .get("http://127.0.0.1:8000/api/campagnes/" + route.params.recruitment_id)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

const { data, pending, error, refresh, execute, status } = await useFetch(
  `http://localhost:8000/api/campagnes/${route.params.recruitment_id}/`
);

if (data.value) {
  campagneToEdit.value = data.value;
  console.log(data.value);
  // serverItems.value = data.value;
}

if (error.value) {
  // console.log("error : ", error.value?.data);
  console.log(error.value);
}

const ranks = ref({
  "./Alice Clark CV_cbiQTzm.pdf": {
    score: 15,
    email: "Email me on Indeed",
    nom_complet: "Alice Clark",
    telephone: "",
    texte_pdf:
      "Alice Clark \nAI / Machine Learning \n \nDelhi, India Email me on Indeed \n• \n20+ years of experience in data handling, design, and development \n• \nData Warehouse: Data analysis, star/snow flake scema data modelling and design specific to \ndata warehousing and business intelligence \n• \nDatabase: Experience in database designing, scalability, back-up and recovery, writing and \noptimizing SQL code and Stored Procedures, creating functions, views, triggers and indexes. \nCloud platform: Worked on Microsoft Azure cloud services like Document DB, SQL Azure, \nStream Analytics, Event hub, Power BI, Web Job, Web App, Power BI, Azure data lake \nanalytics(U-SQL) \nWilling to relocate anywhere \n \nWORK EXPERIENCE \nSoftware Engineer \nMicrosoft – Bangalore, Karnataka \nJanuary 2000 to Present \n1. Microsoft Rewards Live dashboards: \nDescription: - Microsoft rewards is loyalty program that rewards Users for browsing and shopping \nonline. Microsoft Rewards members can earn points when searching with Bing, browsing with \nMicrosoft Edge and making purchases at the Xbox Store, the Windows Store and the Microsoft \nStore. Plus, user can pick up bonus points for taking daily quizzes and tours on the Microsoft \nrewards website. Rewards live dashboards gives a live picture of usage world-wide and by \nmarkets like US, Canada, Australia, new user registration count, top/bottom performing rewards \noffers, orders stats and weekly trends of user activities, orders and new user registrations. the \nPBI tiles gets refreshed in different frequencies starting from 5 seconds to 30 minutes. \nTechnology/Tools used \n \nEDUCATION \nIndian Institute of Technology – Mumbai \n2001 \n \nSKILLS \nMachine Learning, Natural Language Processing, and Big Data Handling \n \nADDITIONAL INFORMATION \nProfessional Skills \n• Excellent analytical, problem solving, communication, knowledge transfer and interpersonal \nskills with ability to interact with individuals at all the levels \n• Quick learner and maintains cordial relationship with project manager and team members and \ngood performer both in team and independent job environments \n• Positive attitude towards superiors &amp; peers \n• Supervised junior developers throughout project lifecycle and provided technical assistance \n",
    fichier: "Alice Clark CV_cbiQTzm.pdf",
  },
  "./CV_Mériadeck_AMOUSSOU_ATUT.pdf": {
    score: 14,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données\nBibliothèques de Machine learning et NLP : TensorFlow, Scikit-Learn, Keras, Spacy\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nSlack\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mrdecka\n\n@mériadeck-amoussou\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "CV_Mériadeck_ATUT.pdf",
  },
  "./cv3.pdf": {
    score: 14,
    email: "Email me on Indeed",
    nom_complet: "Alice Clark",
    telephone: "",
    texte_pdf:
      "Alice Clark \nAI / Machine Learning \n \nDelhi, India Email me on Indeed \n• \n20+ years of experience in data handling, design, and development \n• \nData Warehouse: Data analysis, star/snow flake scema data modelling and design specific to \ndata warehousing and business intelligence \n• \nDatabase: Experience in database designing, scalability, back-up and recovery, writing and \noptimizing SQL code and Stored Procedures, creating functions, views, triggers and indexes. \nCloud platform: Worked on Microsoft Azure cloud services like Document DB, SQL Azure, \nStream Analytics, Event hub, Power BI, Web Job, Web App, Power BI, Azure data lake \nanalytics(U-SQL) \nWilling to relocate anywhere \n \nWORK EXPERIENCE \nSoftware Engineer \nMicrosoft – Bangalore, Karnataka \nJanuary 2000 to Present \n1. Microsoft Rewards Live dashboards: \nDescription: - Microsoft rewards is loyalty program that rewards Users for browsing and shopping \nonline. Microsoft Rewards members can earn points when searching with Bing, browsing with \nMicrosoft Edge and making purchases at the Xbox Store, the Windows Store and the Microsoft \nStore. Plus, user can pick up bonus points for taking daily quizzes and tours on the Microsoft \nrewards website. Rewards live dashboards gives a live picture of usage world-wide and by \nmarkets like US, Canada, Australia, new user registration count, top/bottom performing rewards \noffers, orders stats and weekly trends of user activities, orders and new user registrations. the \nPBI tiles gets refreshed in different frequencies starting from 5 seconds to 30 minutes. \nTechnology/Tools used \n \nEDUCATION \nIndian Institute of Technology – Mumbai \n2001 \n \nSKILLS \nMachine Learning, Natural Language Processing, and Big Data Handling \n \nADDITIONAL INFORMATION \nProfessional Skills \n• Excellent analytical, problem solving, communication, knowledge transfer and interpersonal \nskills with ability to interact with individuals at all the levels \n• Quick learner and maintains cordial relationship with project manager and team members and \ngood performer both in team and independent job environments \n• Positive attitude towards superiors &amp; peers \n• Supervised junior developers throughout project lifecycle and provided technical assistance \n",
    fichier: "cv3.pdf",
  },
  "./cv17.pdf": {
    score: 13,
    email: "First.lastname@selu.edu",
    nom_complet: "Your Name",
    telephone: "985-555-1234",
    texte_pdf:
      "Your Name\nFirst.lastname@selu.edu • 985-555-1234 • City, State Zip Code\nEDUCATION\nSoutheastern Louisiana University, Hammond, LA\nBachelor of Science, Biological Sciences, GPA: 3.1, May 2025\nWORK EXPERIENCE\nDining Room Attendant, August 2020 –March 2021\nSLU Food Services, Hammond, LA\n●\nMaintained clean and safe environment for dining hall serving 1,000+ patrons daily\n●\nCommunicated with students and staff to resolve issues and ensure quality experience\n●\nCompleted the Student Manager Training Program within the first month of work\nBabysitter, August 2019 – June 2020\nSelf-Employed, Covington, LA\n●\nEnsured the safety, health, and welfare of 2 children, ages 3 and 8, every day after school\n●\nOrganized safe, fun, and educational activities such as visits to the park and crafts\n●\nSupported learning by explaining homework and working through problems together\nLEADERSHIP EXPERIENCE\nStudent Athlete, Your Role/Position, August 2020 – Present\nVolleyball Team, Southeastern Louisiana University\n●\nSelected as 1 of # team members after completing a 20-hour intensive training period\n●\nParticipated in # philanthropy events yearly to represent the university\n●\nDedicated # hours per week to training and competition while balancing # academic\nhours\nVolleyball Representative, August 2021 – May 2022\nStudent-Athlete Advisory Committee, Southeastern Louisiana University\n●\nAttended weekly committee meetings, representing the women's volleyball team fairly\n●\nAdvocated for concerns and interests of student-athletes at Southeastern\n●\nServed as a leader to implement resolutions voted on by the board each year\nParks and Recreation, Summer 2020 – 2022\nBasketball Camp Coach/Coordinator, Hammond, LA\n●\nInstructed 60-70 1st – 9th grade athletes on proper athletic skills development\n●\nCreated interactive sessions to engage youth and practice safe techniques and strategies\n●\nCollaborated with 4 other coaches in a team environment\n●\nMonitored and evaluated drills and activities and implemented proper safety measures\n●\nMaintained positive communication with campers and parents\nCERTIFICATIONS & SKILLS\n●\nCPR & First Aid Certified\n●\nProficient in Microsoft Word; basic knowledge of Microsoft PowerPoint and Excel\n",
    fichier: "cv17.pdf",
  },
  "./cv18g.pdf": {
    score: 11,
    email: "mrdeck30@gmail.com",
    nom_complet: "AMOUSSOU MÉRIADECK",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      " \n \nAMOUSSOU MÉRIADECK \nmrdeck30@gmail.com \nhttps://meriadeckamoussou.me  \nAbomey-Calavi, Bénin \n+229 52 74 69 12 \n \nCursus & Formations \nInstitut de Formation et de Recherche en Informatique (IFRI) / Université d’Abomey-Calavi (UAC)  \n2020-2023 : Licence en Génie Logiciel (3/3ans) (En instance de soutennce) \nCollège Catholique Pierre Joseph de Cloriviere d’Abomey-Calavi \n2019-2020 : Baccalauréat série D \nCollège Catholique Pierre Joseph de Cloriviere d’Abomey-Calavi \n2016-2017 : Brevet d’Etude du Premier Cycle (BEPC) \n \nLangues \nFon : parlé \nFrançais & Anglais : lu, écrit, parlé \n \nExpériences professionnelles \nDéveloppeur Web Full Stack Javascript (A distance) : De Octobre 2023 à maintenant \nLieu : Foortina Prime - Parakou  \nMissions : Développement d’applications web en Vue.js/Nuxt.js et Express.js  \n \nStagiaire, Développeur Web : D'avril 2023 à juin 2023 \nLieu : Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville \nMissions : Evaluation de la qualité du code, participation à la revue de code et à l'amélioration \ncontinue des processus de développement, intégration de tests automatisés pour assurer la qualité \ndu code et réduire les erreurs \n \nStagiaire, Développeur Web : D'août 2022 à septembre 2022  \nLieu : Foortina Prime - Parakou  \nMissions : Conception et déploiement d'Applications Web avec Vue.js/Nuxt.js, Création d’APIs REST \navec Express.js + MongoDB \n \n \n \n \nTAPEZ LE NOM \nCompétences \n• Programmation web : HTML, CSS, Javascript/Typescript, PHP \n• Langages de programmation C, C++, python, Java \n• Framework : Laravel, Express.js, Vue.js/Nuxt.js, Flutter, Flask, Django, Angular \n• Data Science : Collecte, Nettoyage, Analyse des données, Machine Leaning avec Scikit-Learn \n• CMS : Wordpress \n• Base de données : MySQL, MongoDB, Firestore, Oracle, PostgreSQL, MS SQL Server \n• Cloud : AWS, Digital Ocean, Heroku, Docker, Vercel \n• Conception et Design : Figma, Adobe XD \n• Bonne maîtrise de la méthodologie de gestion d’un projet informatique \n \nJe certifie sincères les informations que voici. \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n",
    fichier: "cv18.pdf",
  },
  "./crv19.pdf": {
    score: 20,
    email: "n.nursing@selu.edu",
    nom_complet: "jane.smith@example.com",
    telephone: "985-549-2222",
    texte_pdf:
      "Your Name\nn.nursing@selu.edu – 985-549-2222\nEDUCATION\nSoutheastern Louisiana University, Hammond, LA\nMay 2023\nBachelor of Science, Nursing\nGPA: 3.5\nHonors & Scholarships: Taylor Opportunity Program for Students (TOPS), Dean’s List (3 semesters),\nPresident’s List (4 semesters)\nLICENSES AND CERTIFICATIONS\n●\nRegistered Nurse: Louisiana License #55555555\n●\nBasic Life Support for Healthcare Providers (BLS)\n●\nAdvanced Cardiac Life Support (ACLS)\n●\nMask Fit Test Certification\nCLINICAL EXPERIENCE\nMedical-Surgery Rotation\nJanuary 2022-present\nNorth Oaks Medical Center, Hammond, LA\n●\nPerform basic cardiac life support (BLS), advanced cardiac life support (ACLS), and administer\nblood and intravenous infusions in a 90-bed medical center\n●\nTreat patients diligently with acute conditions: heart attacks, respiratory distress, shock, observing\nadvanced and invasive diagnostic and therapeutic procedures\n●\nEducate patients on wound care, infection control, and proper usage of incentive spirometers to\nensure continued healing post medical care\nObstetrics & Gynecology Rotation\nAugust 2021-December 2021\nBaton Rouge General, Baton Rouge, LA\n●\nAdministered PO and IV medication precisely while keeping patients comfortable and safe\n●\nShadowed nurses in Labor & Delivery, Intensive Care Nursery, Perinatal Evaluation Center, and\nOB/GYN\n●\nCompleted physical assessments thoroughly and checked vital signs attentively\n●\nLearned the function and operation of the following tools: forceps, hemostats, nebulizers, otoscopes\nWORK EXPERIENCE\nCamp Counselor\nMay-August 2020\nKidcam Camps, Lafayette, LA\n●\nImplemented and evaluated schedules, programs, and job positions for over 150 campers and 15\ncounselors\n●\nPlanned lessons and activities for 30 children, ages 10-12, that enforced responsibility and\ndependability\n●\nOversaw groups of 20-30 youth to ensure safety and cultivate learning throughout 14-day camp\nsessions\nServer\nAugust 2018-May 2020\nDon’s Seafood Restaurant, Hammond, LA\n●\nCollaborated with team of 5-12 to expedite and provide high-quality service to guests\n●\nCultivated strong client relationships, increasing customer satisfaction and repeat sales\nCAMPUS AND COMMUNITY INVOLVEMENT\nMember, Student Nurses Association\nAugust 2019-Present\nHospice Volunteer, North Oaks Medical Center\nMay 2019-August 2020\nDog Bathing & Adoption Event Volunteer, Tangi Humane Society\nMay 2019-August 2019\n",
    fichier: "cv19.pdf",
  },
  "./cazv20.pdf": {
    score: 8,
    email: "first.lastname@selu.edu",
    nom_complet: "john.doe@example.com",
    telephone: "555-555-5555",
    texte_pdf:
      "YOUR NAME\nfirst.lastname@selu.edu | 555-555-5555 | linkedin.com/in/firstlastname\nEDUCATION\nBachelor of Arts in Criminal Justice\nMay 2022\nSoutheastern Louisiana University (SLU), Hammond, LA\nGPA: 3.5/4.0\nMinor: French\nRELEVANT EXPERIENCE\nIntern\nMay 2021-Present\nHammond Police Department, Hammond, LA\n●\nShadowed 5+ officers during multiple shifts to understand law enforcement best practices\n●\nCollaborated with administrators to create Excel spreadsheet of training statuses of 20+\nemployees\nSenior Staff Reporter\nAugust 2020-Present\nThe Lion’s Roar (SLU student newspaper), Hammond, LA\n●\nInvestigated 5+ stories each week by attending events, interviewing key individuals, and\nconducting online research\n●\nWrote and proofread 2 stories on sports, news, or arts and entertainment for weekly publication\n●\nConsistently met deadlines to fact check up to 15 stories per week\nAdministrative Assistant\nMay 2019-March 2020\nJane Doe Private Investigations, LLP, Hammond, LA\n●\nPromoted from runner to administrative assistant in first 3 months due to excellent initiative\n●\nWorked 20+ hours per week while enrolled in 18 credit hours, maintaining a high GPA\n●\nEntrusted with receiving, recording, and depositing cash payments in excess of $3,000\nLEADERSHIP EXPERIENCE\nPhilanthropy Events Chair\nAugust 2018-May 2019\nZeta Phi Beta Sorority Inc., Eta Lambda Chapter, Hammond, LA\n●\nOversaw team of 30+ throughout academic year to create and implement 13-hour event\n●\nCreated detailed plans for motivating participants throughout event that raised $300,000+ for\nChildren’s Hospital\nMentor\nMarch 2018-October 2018\nAl’s Pals Mentorship Program, Hammond, LA\n●\nTutored 5th grade students in underserved schools, resulting in noted behavioral improvements\n●\nIncorporated simple and straightforward language to effectively convey complex concepts\nAWARDS & HONORS\nDean’s List, 3 semesters; James H. Morrison Excellence in Government Endowed Scholarship\nSERVICE & INVOLVEMENT\nHabitat for Humanity, French Club, International Festival Host\nSKILLS\nMicrosoft Office Suite (Excel, PowerPoint, Word)\n",
    fichier: "cv20.pdf",
  },
  "./cv21.zepdf": {
    score: 14,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données\nBibliothèques de Machine learning et NLP : TensorFlow, Scikit-Learn, Keras, Spacy\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nSlack\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mrdecka\n\n@mériadeck-amoussou\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "cv21.pdf",
  },
  "./cv22.trepdf": {
    score: 13,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données, Machine Leaning avec Scikit-Learn\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mériadeck-amoussou\n\n@mrdecka\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "cv22.pdf",
  },
  "./cvter23.pdf": {
    score: 17,
    email: "sydneydossou400@gmail.com",
    nom_complet: "DOSSOU",
    telephone: "+229 51588057/40544934",
    texte_pdf:
      "Nom\nDOSSOU\nPROFIL\nR E C H E R C H E  D E  S T A G E\nP R O F E S S I O N N E L  \nL I C E N C E  E N  I N F O R M A T I Q U E  \nCONTACT\nGithub\nMobile\nMail\n+229 51588057/40544934\nsydneydossou400@gmail.com\nPrénoms\nPROFIL\nNationalité\nBéninoise\n2019 - 2020\n2022\nFORMATIONS\nEXPERIENCES PROFESSIONNELLES\nSYDNEY\nDOSSOU\nAvec une licence fraîchement acquise en système informatique et logiciels, je suis animé\npar la passion du développement technologique et la résolution de défis complexes. Mes\ncompétences en développement logiciel et gestion de bases de données, renforcées par\nune formation rigoureuse, me positionnent pour contribuer de manière proactive à des\nprojets innovants. Je cherche à intégrer une équipe dynamique où je pourrais mettre en\npratique ma créativité et ma détermination.\nAUTRES COMPÉTENCES \nCOMPÉTENCES TECNIQUES & OUTILS \n2020 - 2023\nLICENCE PROFESSIONNELLE EN Informatique de gestion\nCotonou - Université Catholique de l'Afrique de l'Oeust\n2023\nStage de fin de formation à l'ASIN  \nDéveloppeur web / 2022- 2023\n Conception et réalisation d'une plateforme de\nfinancement participatif ;\nConception et réalisation d'un dashboard qui présente\nen temps réel les statistiques d'utilisation des \ne-services ;\n2019 - 2020\nBACCALAURÉAT SÉRIE D\nCalavi-Collège Catholique  Pierre Joseph de clorivière\nStage académique à  l’Agence des Systèmes d´informations et du\nNumérique (ASIN) \nImmersion dans le monde professionnel au côté de cadre compétents\n(Chef projet digital, Devops ,Développeur ,business analyst) ;\nDécouverte du cadre de développement des e-services du BENIN ;\nPrise en main de GitHub,nodejs,vuejs\nX\nW\nTravail en équipe\nDétermination et\nEndurance\nFlexibilité et\nAdaptation\nA5\n Analyses et modélisation avec :\nUml et Mérises\nStruture de gestions des bases données :\nMongoDB,Mysql\n2022 - 2023\nSèdoami Hénok Marie Sydney\nNé le \n08/09/2003\nhttps://github.com/Sydney-\nD0SSOU\n Développement frontend avec :\nHTML,CSS,JS,BOOTSTRAP,TAILWIND,\nVuejs,MDBvue5\nDéveloppement backend avec : Nodejs , Expressjs , PHP\nPython\n",
    fichier: "cv23.pdf",
  },
  "./cev20.pdf": {
    score: 8,
    email: "first.lastname@selu.edu",
    nom_complet: "john.doe@example.com",
    telephone: "555-555-5555",
    texte_pdf:
      "YOUR NAME\nfirst.lastname@selu.edu | 555-555-5555 | linkedin.com/in/firstlastname\nEDUCATION\nBachelor of Arts in Criminal Justice\nMay 2022\nSoutheastern Louisiana University (SLU), Hammond, LA\nGPA: 3.5/4.0\nMinor: French\nRELEVANT EXPERIENCE\nIntern\nMay 2021-Present\nHammond Police Department, Hammond, LA\n●\nShadowed 5+ officers during multiple shifts to understand law enforcement best practices\n●\nCollaborated with administrators to create Excel spreadsheet of training statuses of 20+\nemployees\nSenior Staff Reporter\nAugust 2020-Present\nThe Lion’s Roar (SLU student newspaper), Hammond, LA\n●\nInvestigated 5+ stories each week by attending events, interviewing key individuals, and\nconducting online research\n●\nWrote and proofread 2 stories on sports, news, or arts and entertainment for weekly publication\n●\nConsistently met deadlines to fact check up to 15 stories per week\nAdministrative Assistant\nMay 2019-March 2020\nJane Doe Private Investigations, LLP, Hammond, LA\n●\nPromoted from runner to administrative assistant in first 3 months due to excellent initiative\n●\nWorked 20+ hours per week while enrolled in 18 credit hours, maintaining a high GPA\n●\nEntrusted with receiving, recording, and depositing cash payments in excess of $3,000\nLEADERSHIP EXPERIENCE\nPhilanthropy Events Chair\nAugust 2018-May 2019\nZeta Phi Beta Sorority Inc., Eta Lambda Chapter, Hammond, LA\n●\nOversaw team of 30+ throughout academic year to create and implement 13-hour event\n●\nCreated detailed plans for motivating participants throughout event that raised $300,000+ for\nChildren’s Hospital\nMentor\nMarch 2018-October 2018\nAl’s Pals Mentorship Program, Hammond, LA\n●\nTutored 5th grade students in underserved schools, resulting in noted behavioral improvements\n●\nIncorporated simple and straightforward language to effectively convey complex concepts\nAWARDS & HONORS\nDean’s List, 3 semesters; James H. Morrison Excellence in Government Endowed Scholarship\nSERVICE & INVOLVEMENT\nHabitat for Humanity, French Club, International Festival Host\nSKILLS\nMicrosoft Office Suite (Excel, PowerPoint, Word)\n",
    fichier: "cv20.pdf",
  },
  "./cv21.hpdf": {
    score: 14,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données\nBibliothèques de Machine learning et NLP : TensorFlow, Scikit-Learn, Keras, Spacy\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nSlack\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mrdecka\n\n@mériadeck-amoussou\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "cv21.pdf",
  },
  "./cv2h2.pdf": {
    score: 13,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données, Machine Leaning avec Scikit-Learn\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mériadeck-amoussou\n\n@mrdecka\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "cv22.pdf",
  },
  "./ctv23.pdf": {
    score: 17,
    email: "sydneydossou400@gmail.com",
    nom_complet: "DOSSOU",
    telephone: "+229 51588057/40544934",
    texte_pdf:
      "Nom\nDOSSOU\nPROFIL\nR E C H E R C H E  D E  S T A G E\nP R O F E S S I O N N E L  \nL I C E N C E  E N  I N F O R M A T I Q U E  \nCONTACT\nGithub\nMobile\nMail\n+229 51588057/40544934\nsydneydossou400@gmail.com\nPrénoms\nPROFIL\nNationalité\nBéninoise\n2019 - 2020\n2022\nFORMATIONS\nEXPERIENCES PROFESSIONNELLES\nSYDNEY\nDOSSOU\nAvec une licence fraîchement acquise en système informatique et logiciels, je suis animé\npar la passion du développement technologique et la résolution de défis complexes. Mes\ncompétences en développement logiciel et gestion de bases de données, renforcées par\nune formation rigoureuse, me positionnent pour contribuer de manière proactive à des\nprojets innovants. Je cherche à intégrer une équipe dynamique où je pourrais mettre en\npratique ma créativité et ma détermination.\nAUTRES COMPÉTENCES \nCOMPÉTENCES TECNIQUES & OUTILS \n2020 - 2023\nLICENCE PROFESSIONNELLE EN Informatique de gestion\nCotonou - Université Catholique de l'Afrique de l'Oeust\n2023\nStage de fin de formation à l'ASIN  \nDéveloppeur web / 2022- 2023\n Conception et réalisation d'une plateforme de\nfinancement participatif ;\nConception et réalisation d'un dashboard qui présente\nen temps réel les statistiques d'utilisation des \ne-services ;\n2019 - 2020\nBACCALAURÉAT SÉRIE D\nCalavi-Collège Catholique  Pierre Joseph de clorivière\nStage académique à  l’Agence des Systèmes d´informations et du\nNumérique (ASIN) \nImmersion dans le monde professionnel au côté de cadre compétents\n(Chef projet digital, Devops ,Développeur ,business analyst) ;\nDécouverte du cadre de développement des e-services du BENIN ;\nPrise en main de GitHub,nodejs,vuejs\nX\nW\nTravail en équipe\nDétermination et\nEndurance\nFlexibilité et\nAdaptation\nA5\n Analyses et modélisation avec :\nUml et Mérises\nStruture de gestions des bases données :\nMongoDB,Mysql\n2022 - 2023\nSèdoami Hénok Marie Sydney\nNé le \n08/09/2003\nhttps://github.com/Sydney-\nD0SSOU\n Développement frontend avec :\nHTML,CSS,JS,BOOTSTRAP,TAILWIND,\nVuejs,MDBvue5\nDéveloppement backend avec : Nodejs , Expressjs , PHP\nPython\n",
    fichier: "cv23.pdf",
  },
  "./cv2t0.pdf": {
    score: 8,
    email: "first.lastname@selu.edu",
    nom_complet: "john.doe@example.com",
    telephone: "555-555-5555",
    texte_pdf:
      "YOUR NAME\nfirst.lastname@selu.edu | 555-555-5555 | linkedin.com/in/firstlastname\nEDUCATION\nBachelor of Arts in Criminal Justice\nMay 2022\nSoutheastern Louisiana University (SLU), Hammond, LA\nGPA: 3.5/4.0\nMinor: French\nRELEVANT EXPERIENCE\nIntern\nMay 2021-Present\nHammond Police Department, Hammond, LA\n●\nShadowed 5+ officers during multiple shifts to understand law enforcement best practices\n●\nCollaborated with administrators to create Excel spreadsheet of training statuses of 20+\nemployees\nSenior Staff Reporter\nAugust 2020-Present\nThe Lion’s Roar (SLU student newspaper), Hammond, LA\n●\nInvestigated 5+ stories each week by attending events, interviewing key individuals, and\nconducting online research\n●\nWrote and proofread 2 stories on sports, news, or arts and entertainment for weekly publication\n●\nConsistently met deadlines to fact check up to 15 stories per week\nAdministrative Assistant\nMay 2019-March 2020\nJane Doe Private Investigations, LLP, Hammond, LA\n●\nPromoted from runner to administrative assistant in first 3 months due to excellent initiative\n●\nWorked 20+ hours per week while enrolled in 18 credit hours, maintaining a high GPA\n●\nEntrusted with receiving, recording, and depositing cash payments in excess of $3,000\nLEADERSHIP EXPERIENCE\nPhilanthropy Events Chair\nAugust 2018-May 2019\nZeta Phi Beta Sorority Inc., Eta Lambda Chapter, Hammond, LA\n●\nOversaw team of 30+ throughout academic year to create and implement 13-hour event\n●\nCreated detailed plans for motivating participants throughout event that raised $300,000+ for\nChildren’s Hospital\nMentor\nMarch 2018-October 2018\nAl’s Pals Mentorship Program, Hammond, LA\n●\nTutored 5th grade students in underserved schools, resulting in noted behavioral improvements\n●\nIncorporated simple and straightforward language to effectively convey complex concepts\nAWARDS & HONORS\nDean’s List, 3 semesters; James H. Morrison Excellence in Government Endowed Scholarship\nSERVICE & INVOLVEMENT\nHabitat for Humanity, French Club, International Festival Host\nSKILLS\nMicrosoft Office Suite (Excel, PowerPoint, Word)\n",
    fichier: "cv20.pdf",
  },
  "./cv2e1.pdf": {
    score: 14,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données\nBibliothèques de Machine learning et NLP : TensorFlow, Scikit-Learn, Keras, Spacy\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nSlack\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mrdecka\n\n@mériadeck-amoussou\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "cv21.pdf",
  },
  "./cv2d2.pdf": {
    score: 13,
    email: "mrdeck30@gmail.com",
    nom_complet: "Mériadeck AMOUSSOU",
    telephone: "+229 52 74 69 12",
    texte_pdf:
      "Langues\nFrançais\nAnglais\nAtouts\nCuriosité\nPonctualité\nDiscipline\nCentres d'intérêt\nProgrammation\nJeux Vidéos\nMusique\nRéseaux sociaux\nMériadeck AMOUSSOU\nDéveloppeur web Full stack\nDiplômes et Formations\nExpériences professionnelles\nCompétences\nLangages de programmation web : HTML, CSS, Javascript/Typescript, PHP\nLangages de programmation C, C++, python, Java\nFramework : Laravel, Vue.js/Nuxt.js, Angular, Django, Express.js, Flask, Flutter\nData Science : Collecte, Nettoyage, Analyse des données, Machine Leaning avec Scikit-Learn\nCMS : Wordpress\nBase de données : MySQL, MonGoDB, Firestore, Oracle\nCloud : AWS, DigitalOcean, Heroku, Docker, Vercel\nConception et Design : Figma, Adobe XD\nBonne maîtrise de la méthodologie de gestion d’un projet informatique\nOutils\nTrello\nGithub\nGitlab\nmrdeck30@gmail.com\n\nAbomey-Calavi\n\nNé le 30/05/2003\n\nhttps://meriadeckamo\nussou.me/\n\n+229 52 74 69 12\n\n@mériadeck-amoussou\n\n@mrdecka\n\nLicence en Génie Logiciel\nDepuis 2020\nInstitut de Formation et de Recherche en Informatique (IFRI) Université d’Abomey-Calavi (UAC)\nBaccalauréat série D\nDe 2019 à 2020 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nBrevet d’Etude du Premier Cycle (BEPC)\nDe 2016 à 2017 Collège Catholique Pierre Joseph de Cloriviere Abomey-Calavi\nDéveloppeur web Full stack Javascript/PHP (A distance)\nDepuis octobre 2023 Foortina Prime Parakou, Bénin\nDéveloppement d'application Nuxt.js\nDéveloppement d'api Express.js\nCréation d'api avec Laravel\nDéveloppeur web Full stack\nD'avril 2023 à juin 2023 Jilmonde Consulting SARL Bénin, Abomey-Calavi, Arconville\nEvaluation de la qualité du code sur la base des principes SOLID\nParticipation à la revue de code et à l'amélioration continue des processus de\ndéveloppement\nIntégration de tests automatisés pour assurer la qualité du code et réduire les erreurs\nDéveloppeur web Vue.js/Express.js\nD'août 2022 à septembre 2022 Foortina Prime Parakou\nConception et déploiement d'une Application Web avec Vue.js/Nuxt.js\nCréation d'une API REST avec express.js + MongoDB\nDéploiement d'une API Node.js\n",
    fichier: "cv22.pdf",
  },
  "./cv23.epdf": {
    score: 17,
    email: "sydneydossou400@gmail.com",
    nom_complet: "DOSSOU",
    telephone: "+229 51588057/40544934",
    texte_pdf:
      "Nom\nDOSSOU\nPROFIL\nR E C H E R C H E  D E  S T A G E\nP R O F E S S I O N N E L  \nL I C E N C E  E N  I N F O R M A T I Q U E  \nCONTACT\nGithub\nMobile\nMail\n+229 51588057/40544934\nsydneydossou400@gmail.com\nPrénoms\nPROFIL\nNationalité\nBéninoise\n2019 - 2020\n2022\nFORMATIONS\nEXPERIENCES PROFESSIONNELLES\nSYDNEY\nDOSSOU\nAvec une licence fraîchement acquise en système informatique et logiciels, je suis animé\npar la passion du développement technologique et la résolution de défis complexes. Mes\ncompétences en développement logiciel et gestion de bases de données, renforcées par\nune formation rigoureuse, me positionnent pour contribuer de manière proactive à des\nprojets innovants. Je cherche à intégrer une équipe dynamique où je pourrais mettre en\npratique ma créativité et ma détermination.\nAUTRES COMPÉTENCES \nCOMPÉTENCES TECNIQUES & OUTILS \n2020 - 2023\nLICENCE PROFESSIONNELLE EN Informatique de gestion\nCotonou - Université Catholique de l'Afrique de l'Oeust\n2023\nStage de fin de formation à l'ASIN  \nDéveloppeur web / 2022- 2023\n Conception et réalisation d'une plateforme de\nfinancement participatif ;\nConception et réalisation d'un dashboard qui présente\nen temps réel les statistiques d'utilisation des \ne-services ;\n2019 - 2020\nBACCALAURÉAT SÉRIE D\nCalavi-Collège Catholique  Pierre Joseph de clorivière\nStage académique à  l’Agence des Systèmes d´informations et du\nNumérique (ASIN) \nImmersion dans le monde professionnel au côté de cadre compétents\n(Chef projet digital, Devops ,Développeur ,business analyst) ;\nDécouverte du cadre de développement des e-services du BENIN ;\nPrise en main de GitHub,nodejs,vuejs\nX\nW\nTravail en équipe\nDétermination et\nEndurance\nFlexibilité et\nAdaptation\nA5\n Analyses et modélisation avec :\nUml et Mérises\nStruture de gestions des bases données :\nMongoDB,Mysql\n2022 - 2023\nSèdoami Hénok Marie Sydney\nNé le \n08/09/2003\nhttps://github.com/Sydney-\nD0SSOU\n Développement frontend avec :\nHTML,CSS,JS,BOOTSTRAP,TAILWIND,\nVuejs,MDBvue5\nDéveloppement backend avec : Nodejs , Expressjs , PHP\nPython\n",
    fichier: "cv23.pdf",
  },
});

const sorteredRanking = Object.values(ranks.value)
  .sort((a, b) => a.score - b.score)
  .reverse();

const itemsPerPage = ref(15);

const headers = ref([
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Nom", width: "25%", key: "nom_complet", align: "start" },

  {
    title: "Email",
    width: "25%",
    key: "email",
    align: "start",
  },
  {
    title: "Score",
    width: "25%",
    key: "score",
    align: "start",
  },
  {
    title: "Téléphone",
    width: "25%",
    key: "telephone",
    align: "start",
  },
  {
    title: "Fichier",
    width: "25%",
    key: "fichier",
    align: "start",
  },

  // { title: "Action", key: "action", align: "center" },
]);

// console.log();

const cardRef: Ref<VCard | null> = ref(null);

function onPrinterClick() {
  if (process.client) {
    const prtHtml = cardRef.value?.$el.innerHTML;
    const mycard = document.getElementById("my-card");
    // // const prtHtml = cardContent.value.$el.innerHTML;
    // const WinPrint = window.open(
    //   "",
    //   "",
    //   "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    // );
    // WinPrint?.document.write(prtHtml);
    // WinPrint?.document.close();
    // WinPrint?.focus();
    // WinPrint?.print();
    // WinPrint?.close();
    // window.open();
    // window.print;
    exportToPDF("my-pdf-file.pdf", mycard);
  }
}

onBeforeMount(() => {
  if (route.query.created === "true") {
    $toast.success("Recrutement créé avec succès !");
  }
});

// watch(dialog, () => {
//   if (!dialog.value) return;

//   setTimeout(() => (dialog.value = false), 4000);
// });

async function startPrediction() {
  dialog.value = true;
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `http://localhost:8000/api/prediction/start/?campagne=26`
  );

  if (data.value) {
    dialog.value = false;
    console.log(data.value);
    // serverItems.value = data.value;
  }

  if (error.value) {
    // console.log("error : ", error.value?.data);
    console.log(error.value);
  }
}
</script>
