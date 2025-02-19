<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { TailwindPagination } from 'laravel-vue-pagination';
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { usePostStore } from "@/store/post";
import { useRoute, useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";

const postStore = usePostStore();
const route = useRoute()
const router = useRouter()
const page = ref<number>(postStore.currentPage || Number(route.query.page) || 1)

onMounted(async () => {
 await postStore.getPosts(page.value)
})

const handleDelete = async (slug: string) => {
  await postStore.deletePost(page.value, slug);

  // Met à jour la page si nécessaire
  if (postStore.postsCollection && postStore.postsCollection.data.length === 0 && page.value > 1) {
    page.value -= 1;
  }
};

watch(page, async () => {
  postStore.setCurrentPage(page.value);
  await postStore.getPosts(page.value)
  await router.push({query: {page: page.value}})
})
</script>

<template>
  <div class="flex p-4 justify-end">
    <RouterLink :to="{name: 'PostCreate'}">Create a new post</RouterLink>
  </div>
    <section>
      <template v-if="postStore.isLoading">
        <Loading message="Loading..." />
      </template>
      <template v-else>
        <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="hidden sm:table-cell px-2 py-3">ID</th>
            <th scope="col" class="px-4 py-3">Title</th>
            <th scope="col" class="hidden sm:table-cell px-4 py-3">Slug</th>
            <th scope="col" class="px-2 py-3">Published</th>
            <th scope="col" class="hidden sm:table-cell px-2 py-3">Created</th>
            <th scope="col" class="px-4 py-3">Actions</th>
          </tr>
          </thead>
          <tbody>
            <template v-if="postStore.postsCollection">
              <tr
                v-for="post in postStore.postsCollection.data"
                :key="post.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="hidden sm:table-cell px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ post.id }}
                </th>
                <td class="px-4 py-4">{{ post.title }}</td>
                <td class="hidden sm:table-cell px-4 py-4">{{ post.slug }}</td>
                <td class="px-2 py-4">{{ post.published }}</td>
                <td class="hidden sm:table-cell px-2 py-4">{{ post.createdAt }}</td>
                <td class="px-4 py-4">
                  <div class="flex space-x-4">
                    <RouterLink :to="{ name: 'PostView', params: { slug: post.slug } }">
                      <EyeIcon class="w-5 h-5 text-blue-500 dark:text-blue-400 hover:text-blue-700" />
                    </RouterLink>
                    <RouterLink :to="{ name: 'PostEdit', params: { slug: post.slug } }">
                      <PencilSquareIcon class="w-5 h-5 text-green-500 dark:text-green-400 hover:text-green-700" />
                    </RouterLink>
                    <TrashIcon @click="handleDelete(post.slug)" class="w-5 h-5 cursor-pointer text-red-500 dark:text-red-400 hover:text-red-700" />
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- Pagination Laravel Vue -->
        <template v-if="postStore.postsCollection">
          <TailwindPagination
            :data="postStore.postsCollection"
            @pagination-change-page="page = $event"
          />
        </template>
      </div>
      </template>
    </section>
</template>