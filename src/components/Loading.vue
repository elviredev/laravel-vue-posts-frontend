<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: "Chargement..."
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-2">
    <svg class="animate-spin h-8 w-8 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    <p class="text-gray-600 text-sm">{{ message }}</p>
  </div>
</template>

<style scoped>

</style>