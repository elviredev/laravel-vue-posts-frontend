<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="text-center">
    <h1 class="text-6xl font-bold text-pink-500">500</h1>
    <h2 class="text-2xl text-gray-200 mt-4">Oups ! Quelque chose s'est mal passé.</h2>
    <p class="text-gray-200 mt-2">Nous travaillons à résoudre ce problème. Veuillez réessayer plus tard.</p>
    <RouterLink
      class="mt-6 inline-block px-6 py-3 bg-pink-600 text-white
      text-lg font-semibold rounded-lg shadow-md hover:bg-pink-700 transition" to="/"
    >
      Retour à l'accueil
    </RouterLink>
  </div>
</template>