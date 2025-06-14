<template>
  <v-container
    fluid
    class="border"
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <v-card width="600">
      <v-card-title>{{ campagneToEdit.nom }}</v-card-title>
      <v-card-text class="font-light">
        {{ campagneToEdit.description_poste }}
      </v-card-text>
      <v-card-text v-if="submitted"
        ><v-alert color="primary" icon="mdi-check-circle" type="info"
          >Votré réponse a été envoyée avec succès</v-alert
        ></v-card-text
      >

      <v-card-text v-if="!submitted">
        <v-form ref="formRef" v-model="valid">
          <v-text-field
            v-model="formData.email"
            label="E-mail *"
            required
            variant="outlined"
            autocomplete="email"
            autocapitalize="off"
            type="email"
            id="email"
          ></v-text-field>

          <v-text-field
            density="comfortable"
            placeholder="Saisissez votre nom"
            variant="outlined"
            autocomplete="email"
            id="last-name"
            autocapitalize="off"
            required
            v-model="formData.nom"
            label="Nom"
            class="mt-2"
          ></v-text-field>

          <v-text-field
            density="comfortable"
            placeholder="Saisissez votre prénom"
            variant="outlined"
            autocomplete="first-name"
            id="first-name"
            autocapitalize="off"
            required
            v-model="formData.prenom"
            label="Prénom"
            class="mt-2"
          ></v-text-field>

          <v-file-input
            variant="outlined"
            v-model="formData.file"
            color="primary"
            label="Fichier du CV"
            placeholder="Sélectionner votre CV"
            append-icon="mdi-paperclip"
            prepend-icon=""
            :show-size="1000"
            accept="application/pdf"
            persistent-hint
            hint="*format PDF"
            required
            class="mt-2"
            :rules="[rules.fileRequired, rules.fileSize]"
          >
          </v-file-input>

          <div class="text-center">
            <v-btn
              color="primary"
              variant="flat"
              @click="submit"
              :loading="loading"
              >Envoyer</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import type { Campagne } from "~/types";
import axios from "axios";

definePageMeta({
  layout: "no-footer",
});

const valid = ref(false);

const route = useRoute();

const rules = {
  required: (value: any) => !!value || "* Ce champ est requis.",
  email: (value: string) => {
    const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value) || "Adresse e-mail invalide.";
  },
  fileSize: (value: File[]) => {
    if (value[0].size > 5000000)
      return "La taille du fichier doit être inférieure à 5 MB";
    return true;
  },
  fileRequired: (value: File[]) => {
    if (!value || !value.length) return "Le fichier est requis !";
    console.log(value);
    return true;
  },
};

const { $toast } = useNuxtApp();

const submitted = ref(false);

const loading = ref(false);

const formRef: Ref<VForm | undefined> = ref();

const formData = ref({} as any);

const submit = async () => {
  const isFormValid = (await formRef.value?.validate())?.valid;

  if (isFormValid) valid.value = true;

  if (valid.value) {
    console.log("Form submitted!");
    // Handle form submission

    let data = new FormData();

    const file = ref<File>(formData.value.file[0]);

    if (!file) return;

    data.append("file", file.value);
    data.append(
      "model",
      JSON.stringify({
        ...formData.value,
        email: formData.value.email,
        nom_complet: `${formData.value.prenom} ${formData.value.nom}`,
      })
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,

      Headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    loading.value = true;

    await axios
      .put(
        `http://127.0.0.1:8000/api/campagnes/add-file/${route.params.recruitment_id}/`,
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        submitted.value = true;
      })
      .catch((error) => {
        loading.value = false;
        console.log(error);
        $toast.error("Une erreur s'est produit. Veullez rééssayer", {
          delay: 5000,
        });
      });
    loading.value = false;
  }
};

const campagneToEdit = ref<Campagne>({});

async function init() {
  const { data, pending, error, refresh, execute, status } = await useFetch(
    `http://localhost:8000/api/campagnes/${route.params.recruitment_id}/`
  );

  if (data.value) {
    campagneToEdit.value = data.value;

    console.log(data.value);
  }

  if (error.value) {
    console.log(error.value);
    $toast.error("Une erreur s'est produit. Veullez rééssayer", {
      delay: 5000,
    });
  }
}

onMounted(async () => {
  await init();
});
</script>

<style scoped>
.v-btn {
  margin-top: 16px;
}
</style>
