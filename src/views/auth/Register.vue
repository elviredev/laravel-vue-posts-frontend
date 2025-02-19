<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const { register } = useAuthStore();
</script>

<template>
  <h1 class="text-3xl mb-4">Register</h1>
    <FormKit type="form" submit-label="Register" @submit="register">
      <FormKit type="text" label="Name" name="name" placeholder="Name" outer-class="mb-5" />
      <FormKit type="email" label="Email" name="email" placeholder="Email" outer-class="mb-5" />
      <FormKit type="password" label="Password" name="password" placeholder="Password" outer-class="mb-5" />
      <FormKit type="password" label="Password Confirmation" name="password_confirmation" placeholder="Password confirm" outer-class="mb-5" />
    </FormKit>
</template>