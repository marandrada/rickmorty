<script setup>
import router from '@/router';

const redirectToHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <h1 class="display-1 mb-4">404</h1>
        <h2 class="headline mb-3">Page not found</h2>
        <v-btn @click="redirectToHome" variant="elevated" theme="dark">Back to Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>