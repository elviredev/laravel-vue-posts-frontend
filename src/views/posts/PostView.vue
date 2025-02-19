<script setup lang="ts">
import { useRoute } from "vue-router";
import { watch } from "vue";
import { usePostStore } from "@/store/post";

const route = useRoute();
const postStore = usePostStore();

watch(
  () => route.params.slug,
  (slug) => {
    if (slug) {
      postStore.post = null;
      postStore.getPost(String(slug))
    }
  }, {immediate: true}
)

</script>

<template>
  <section>
    <div class="text-center p-4">
      <h1 class="text-3xl text-slate-200">{{ postStore.isLoading ? "Loading..." : postStore.post?.title }}</h1>
      <span v-if="!postStore.isLoading" class="text-sm text-slate-100/50">
        Created at: {{ postStore.post?.createdAt }}
      </span>
    </div>
    <div class="max-w-[28em] mx-auto bg-slate-950 rounded-lg p-4">
      <p v-if="postStore.isLoading">Loading...</p>
      <div v-else>
        <p>{{ postStore.post?.body }}</p>
        <img
          v-if="postStore.post?.image"
          :src="postStore.post.image"
          alt="Post image"
          class="w-full h-auto rounded-lg my-4"
        >
      </div>
    </div>
  </section>
</template>