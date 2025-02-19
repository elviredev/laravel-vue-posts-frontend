<script setup lang="ts">
import {useRoute} from "vue-router";
import { ref, watch } from "vue";
import { usePostStore } from "@/store/post";
import { PostForm } from "@/types";
import { FormKitNode } from "@formkit/core";
import Loading from "@/components/Loading.vue";

const route = useRoute();
const postStore = usePostStore();
const imageFile = ref<File | null>(null);

const handleUpdate = (payload: PostForm, node?: FormKitNode) => {
  postStore.updatePost(String(route.params.slug), payload, node);
}

const handleImageUpload = async () => {
  if (!imageFile) return;

  if (imageFile.value) {
    await postStore.updatePostImage(String(route.params.slug), imageFile.value);
    imageFile.value = null;
  }
};

const handleImageDelete = async () => {
  await postStore.deletePostImage(String(route.params.slug));
};


watch(
  () => route.params.slug,
  async (slug) => {
    postStore.isLoading = true
    await postStore.getPost(String(slug));
    postStore.isLoading = false
  },
  {immediate: true}
)
</script>

<template>
  <section v-if="postStore.post">
    <Loading v-if="postStore.isLoading" />
    <div v-else class="p-4">
      <h1 class="text-3xl text-slate-200 text-center mb-4">Update: {{ postStore.post.title }}</h1>

      <div class="max-w-[24em] mx-auto rounded-lg">
        <FormKit
          type="form"
          submit-label="Update"
          @submit="handleUpdate"
          :key="postStore.post.title"
        >
          <FormKit
            type="text"
            label="Title"
            name="title"
            :value="postStore.post.title"
            outer-class="mb-5" />
          <FormKit
            type="textarea"
            label="Body"
            name="body"
            :value="postStore.post.body"
            outer-class="mb-5" />
        </FormKit>

        <!-- Formulaire pour la gestion de l'image -->
        <div class="mt-6 p-4 bg-gray-800 rounded-lg">
          <h2 class="text-lg text-white mb-3">Post Image</h2>

          <div v-if="postStore.post?.image" class="mb-3">
            <img :src="`${postStore.post.image}?t=${Date.now()}`" alt="Post Image" class="w-full h-auto rounded-md" />
            <div class="flex justify-end">
              <button @click="handleImageDelete" class="mt-2 bg-red-600 text-sm text-white px-4 py-2 rounded-md cursor-pointer">
                Delete
              </button>
            </div>
          </div>

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="image">Upload file</label>
          <input
            type="file"
            id="image"
            @change="(e) => (imageFile = (e.target as HTMLInputElement).files?.[0] || null)"
            class="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
          <div class="flex justify-end">
            <button
              @click="handleImageUpload" :disabled="!imageFile"
              class="mt-2 bg-pink-600 text-sm text-white px-4 py-2 rounded-md cursor-pointer">
              Update
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>