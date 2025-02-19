<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center">
    <h1 class="text-6xl font-bold text-cyan-600">404</h1>
    <h2 class="text-2xl text-gray-200 mt-4">Oups ! Page introuvable.</h2>
    <p class="text-gray-200 mt-2">La page que vous recherchez n'existe pas ou a été déplacée.</p>
    <RouterLink
      class="mt-6 inline-block px-6 py-3 bg-cyan-600 text-white
      text-lg font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition" to="/"
    >
      Retour à l'accueil
    </RouterLink>
  </div>
</template>