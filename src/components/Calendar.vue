<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-date-picker></v-date-picker>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker';

// Make sure to export components
const components = {
  VDatePicker,
};
</script>
