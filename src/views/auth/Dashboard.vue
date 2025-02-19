<script setup lang="ts">
  import {useAuthStore} from "@/store/auth";
  import {usePostStore} from "@/store/post";
  import {onMounted} from "vue";

  const auth = useAuthStore();
  const postStore = usePostStore();

  onMounted(() => {
    // si le user est connecté on appelle pas getUser()
    if (!auth.isLoggedIn) auth.getUser()
    // pour récupérer le total de posts du user
    postStore.getPosts(1)
  })
</script>

<template>
  <h1 class="text-3xl mb-4">Dashboard</h1>

  <div class="flex items-center justify-between">
    <div>
      <p class="text-lg text-slate-200">Welcome back, {{ auth.user?.name }}</p>
      <p class="text-sm text-slate-200">{{ auth.user?.email }}</p>
      <hr class="h-px my-8 bg-pink-200 border-0 dark:bg-pink-500">
      <h2 class="text-2xl text-slate-200">
        Total number of posts :
        <span class="text-pink-500">{{ postStore.totalPosts}}
        </span>
      </h2>
    </div>

    <button @click="auth.logout" class="text-white bg-orange-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600/80 dark:hover:bg-pink-800 dark:focus:ring-pink-800">Logout</button>
  </div>
</template>