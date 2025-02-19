<script setup lang="ts">
import { ref } from "vue";
import { usePostStore } from "@/store/post";
import {PostForm} from "@/types";


const { createPost } = usePostStore();
const imageFile = ref<File | null>(null); // Stocke l’image sélectionnée

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
  } else {
    console.warn("⚠️ Aucune image sélectionnée !");
  }
};

const handleSubmit = async (payload: PostForm) => {
  try {
    const response = await createPost(payload, imageFile.value);
    console.log("Post créé :", response);
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);
  }
}
</script>

<template>
  <h1 class="text-3xl mb-4">Create Post</h1>
  <FormKit type="form" submit-label="Create" @submit="handleSubmit" enctype="multipart/form-data" >
    <FormKit type="text" label="Title" name="title" outer-class="mb-5" />
    <FormKit type="textarea" label="Body" name="body" outer-class="mb-5" />

    <!-- Utilisation d'un input classique pour l'image -->
    <label class="block mb-2">Image</label>
    <input
      type="file"
      id="image"
      @change="handleFileChange"
      accept="image/*"
      class="p-2 w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200">
  </FormKit>
</template>