<template>
  <!--Actually nit send props-->
  <Auth.Form :user="user" />
</template>
<script lang="ts" setup>
// import _ from "lodash";
// import { StaticRoutes } from "~/configs/constants";
import { type TUser } from "~/types";
import * as Auth from "@/components/auth";
// import { useAuthApi } from "@/composables/api";

definePageMeta({
  layout: "auth",
});

const user = reactive<TUser>({});

// const { state: authState, login } = useAuthApi();

const router = useRouter();

const isFetching = ref(false);

const isRegistering = ref(false);
</script>
