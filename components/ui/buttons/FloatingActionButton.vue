<template>
  <v-fab-transition>
    <v-btn
      fab
      large
      size="large"
      position="fixed"
      location="bottom right"
      color="primary"
      :class="isMobile ? 'mb-6 mr-6' : 'mb-5 mr-5'"
      class="v-btn-fab-transition"
      icon
      :loading="isSaving"
      dark
      :disabled="disabled"
      @click="onClick"
    >
      <v-icon>{{ icon }} </v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script lang="ts" setup>
import mobile from "is-mobile";
const isMobile = mobile();

interface FloatingActionButtonProps {
  isSaving?: boolean;
  onClick?: () => void;
  icon?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<FloatingActionButtonProps>(), {
  isSaving: () => false,
  onClick: () => null,
  icon: () => "mdi-content-save",
  disabled: () => false,
});
</script>
<style scoped>
.v-btn-fab-transition {
  z-index: 1;
}
</style>
