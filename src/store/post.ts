import { defineStore } from 'pinia'
import type {PersistenceOptions} from "pinia-plugin-persistedstate";
import {LaravelResponseCollection, Post, PostForm} from "@/types";
import {ref} from "vue";
import axiosInstance from "@/lib/axios";
import {FormKitNode} from "@formkit/core";
import router from "@/router";
import {AxiosError} from "axios";

export const usePostStore = defineStore("post", () => {
    // state
    const postsCollection = ref<LaravelResponseCollection<Post> | null>(null);
    const post = ref<Post | null>(null);
    const isLoading = ref<boolean>(false);
    const currentPage = ref<number>(1)
    const setCurrentPage = (page: number) => {
        currentPage.value = page;
    }
    const totalPosts = ref<number>(0);

    // actions/methods
    const getPosts = async (page: number) => {
        isLoading.value = true;
        try {
            const { data } = await axiosInstance.get(`/api/dashboard/posts?page=${page}`);
            postsCollection.value = data
            totalPosts.value = data.meta.total_posts;
        } catch (e) {
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    }

    const getPost = async (slug: string | string[]) => {
        isLoading.value = true;
        try {
            const { data } = await axiosInstance.get(`/api/dashboard/posts/${slug}`);
            post.value = data.data;
        } catch (e) {
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    }

    const createPost = async (payload: PostForm, imageFile: File | null) => {
        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("body", payload.body);

        if (imageFile instanceof File) {
            formData.append("image", imageFile);
        } else {
            console.warn("⚠️ Aucune image sélectionnée !");
        }

        try {
            const response = await axiosInstance.post('/api/dashboard/posts', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            await router.push('/dashboard/posts');
            return response;
        } catch (error) {
            console.error("Erreur lors de la création du post :", error);
            throw error;
        }
    }

    const updatePost = async (slug: string, payload: PostForm, node?: FormKitNode) => {
        if (post.value) {
            try {
                await axiosInstance.put(`/api/dashboard/posts/${slug}`, payload);
                await router.push('/dashboard/posts');
            } catch (e) {
                if (e instanceof AxiosError && e.response?.status === 422) {
                    node?.setErrors([], e.response?.data.errors)
                }
            }
        }
    }

    const deletePost = async (page: number, slug: string | string[]) => {
        isLoading.value = true;
        try{
            await axiosInstance.delete(`/api/dashboard/posts/${slug}`);

            // Récupération des posts après suppression
            await getPosts(page)

            // Vérifier si la page actuelle est vide et qu'on n'est pas sur la première page
            if (postsCollection.value && postsCollection.value.data.length === 0 && page > 1) {
                await getPosts(page - 1); // Charger la page précédente
            }
        } catch (e) {
            console.error(e);
        } finally {
            isLoading.value = false;
        }
    }

    const updatePostImage = async (slug: string, imageFile: File) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const { data } = await axiosInstance.post(`/api/dashboard/posts/${slug}/image`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            // Mettre à jour l'image directement dans le store après l'upload
            if (post.value) {
                post.value.image = data.image;
                await getPost(slug);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image :", error);
        }
    };

    const deletePostImage = async (slug: string) => {
        try {
            await axiosInstance.delete(`/api/dashboard/posts/${slug}/image`);
            if (post.value) {
                post.value.image = null;
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'image :", error);
        }
    };

    const cleanState = () => {
        console.log("cleanState() exécuté !")
        postsCollection.value = null;
        post.value = null;
        isLoading.value = false;
    }

    return {
        postsCollection,
        post,
        isLoading,
        currentPage,
        totalPosts,
        getPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
        updatePostImage,
        deletePostImage,
        cleanState,
        setCurrentPage,
    }
}, {
    persist: {
        storage: sessionStorage,
        pick: ['user', 'isLoggedIn'],
    } as PersistenceOptions,
})

