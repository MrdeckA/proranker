<template>
  <v-container>
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
  </v-container>
</template>
<script lang="ts" setup>
import fs from "fs";

const route = useRoute();
definePageMeta({
  layout: "user",
});

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
</script>
