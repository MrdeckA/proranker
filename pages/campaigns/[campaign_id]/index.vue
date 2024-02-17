<template>
  <v-container>
<<<<<<< Updated upstream
    <v-card class="pa-5">
      <v-form ref="formRef" @submit.prevent="onFormSubmit">
        <v-file-input
          v-model="files"
          color="deep-purple-accent-4"
          counter
          label="File input"
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          variant="outlined"
          :show-size="1000"
          accept="application/pdf"
          multiple
          maxlength="20"
        >
          <template v-slot:selection="{ fileNames }">
            <template v-for="(fileName, index) in fileNames" :key="fileName">
              <v-chip
                v-if="index < 2"
                color="deep-purple-accent-4"
                label
                size="small"
                class="me-2"
              >
                {{ fileName }}
              </v-chip>
=======
    <v-file-input
      v-model="files"
      color="deep-purple-accent-4"
      counter
      label="File input"
      placeholder="Select your files"
      prepend-icon="mdi-paperclip"
      variant="outlined"
      :show-size="1000"
      accept=".pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      @change="onFileInputChange"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="(fileName, index) in fileNames" :key="fileName">
          <v-chip
            v-if="index < 2"
            color="deep-purple-accent-4"
            label
            size="small"
            class="me-2"
          >
            {{ fileName }}
          </v-chip>
>>>>>>> Stashed changes

              <span
                v-else-if="index === 2"
                class="text-overline text-grey-darken-3 mx-2"
              >
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
          </template>
        </v-file-input>
        <div class="text-center">
          <v-btn type="submit" v-on:submit.prevent="onFormSubmit"
            >Soumettre</v-btn
          >
<<<<<<< Updated upstream
        </div>
      </v-form>
      <div class="text-center mt-10">
        <v-btn
          :to="'/campaigns/' + route.params.campaign_id + '/criteria'"
          color="primary"
          >Next</v-btn
        >
      </div>
    </v-card>
=======
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </template>
    </v-file-input>
    <img :src="fileUrl" alt="file-uploaded" />
>>>>>>> Stashed changes
  </v-container>
</template>
<script lang="ts" setup>
import fs from "fs";
<<<<<<< Updated upstream

=======
import pdf from "pdf-parse";
>>>>>>> Stashed changes
const route = useRoute();
definePageMeta({
  layout: "user",
});

<<<<<<< Updated upstream
const { $toast } = useNuxtApp();

const onFileUploadChange = () => {
  console.log(files.value[0]);
};

const files = ref([] as File[]);
console.log(route.params.campaign_id);

function encodeFileToBase64(file: any, callback: any) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var base64String = event.target?.result?.split(",")[1];
    callback(base64String);
  };

  reader.readAsDataURL(file);
}

interface OneFileLike {
  originalName: string;
  dataUrl: string;
}

const data_urls = ref([] as OneFileLike[]);

async function onFormSubmit(e: Event) {
  if (files.value.length > 20) {
    return $toast.warning("Vous ne pouvez uploader que maximum 20 fichiers");
  }

  files.value.forEach((file) => {
    encodeFileToBase64(file, function (base64String: string) {
      data_urls.value.push({
        originalName: file.name,
        dataUrl: "data:application/pdf;base64," + base64String,
      });
    });
  });

  console.log(data_urls.value);

  // const { data, pending, error, refresh, execute, status } = await useFetch(
  //   "http://127.0.0.1:8000/api/upload/",
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Cookie:
  //         "csrftoken=ToQ7pP6B3fqNB860Qt0gOZVAQfiiULqfPr1gmluWJdkCjtZX7HunZ9HQDOQXEvgr",
  //     },
  //     body: formData,
  //     method: "POST",
  //     mode: "cors",
  //   }
  // );

  // if (data.value) {
  //   console.log(data.value);
  // }

  // if (error.value) {
  //   // console.log("error : ", error.value?.data);
  //   console.log(error.value);
  // }
}
=======
const files = ref([]);
const fileUrl = ref("");
console.log(route.params.campaign_id);

const onFileInputChange = async () => {
  console.log(files.value[0]);
  fileUrl.value = URL.createObjectURL(files.value[0]);
  console.log(fileUrl.value);
};

async function extractTextFromPDF(pdfPath) {
  const response = await fetch(pdfPath);
  const buffer = await response.arrayBuffer();

  const data = new Uint8Array(buffer);
  const text = await parse(data);

  console.log(text.text); // Affiche le texte extrait du PDF
}

// async function extractText(file: File) {
//   fileUrl.value = URL.createObjectURL(file);
//   // Charger le fichier PDF
//   const pdf = await pdfjsLib.getDocument(fileUrl.value).promise;

//   // Obtenir le nombre de pages
//   const numPages = await pdf.numPages;

//   // Extraire le texte de chaque page
//   let text = "";
//   for (let i = 1; i <= numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     text += textContent.items.map((item) => item.str).join("\n");
//   }

//   // Retourner le texte extrait
//   return text;
// }
>>>>>>> Stashed changes
</script>
