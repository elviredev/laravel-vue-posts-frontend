<script setup lang="ts">
  import { useAuthStore } from "@/store/auth";
  const { login } = useAuthStore();
</script>

<template>
  <h1 class="text-3xl mb-4">Login</h1>
  <FormKit type="form" submit-label="Login" @submit="login">
    <FormKit type="email" label="Email" name="email" placeholder="Email" outer-class="mb-5" />
    <FormKit type="password" label="Password" name="password" placeholder="Password" outer-class="mb-5" />
  </FormKit>
</template>