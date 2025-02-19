<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from "@/store/auth.js";

const auth = useAuthStore();
</script>

<template>
  <header>
    <div class="dark:bg-slate-950 bg-slate-700">
      <nav class="container mx-auto flex items-center justify-between p-4">
        <div class="flex space-x-4">
          <RouterLink class="text-slate-200" to="/">Home</RouterLink>
          <RouterLink class="text-slate-200" to="/dashboard">Dashboard</RouterLink>
          <RouterLink class="text-slate-200" to="/dashboard/posts">Posts</RouterLink>
        </div>
        <div class="flex space-x-4">
          <RouterLink v-if="!auth.isLoggedIn" class="text-slate-200" to="/login">Login</RouterLink>
          <RouterLink v-if="!auth.isLoggedIn" class="text-slate-200" to="/register">Register</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <main class="w-full text-slate-200 bg-slate-900 bg-slate-100 dark:bg-slate-900 min-h-screen pt-6">
    <div class="container mx-auto pb-6">
      <RouterView />
    </div>
  </main>
</template>


