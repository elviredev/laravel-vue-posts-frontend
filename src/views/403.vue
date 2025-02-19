<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600">403 - Forbidden</h1>
      <p class="text-2xl mt-4">Vous n'êtes pas autorisé à accéder à cette page.</p>
      <router-link to="/dashboard" class="mt-6 inline-block px-6 py-3 bg-red-600 text-white
      text-lg font-semibold rounded-lg shadow-md hover:bg-red-700">Retour au Dashboard</router-link>
    </div>
  </div>
</template>