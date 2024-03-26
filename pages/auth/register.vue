<template>
  <Auth.Form :user="user" is-registering />
</template>
<script lang="ts" setup>
import type { TUser } from "~/types";
import * as Auth from "../../components/auth";

definePageMeta({
  layout: "register",
});

const user = reactive<TUser>({});
</script>
