import { defineStore } from 'pinia'
import type { RegisterForm, User } from "@/types";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";
import { ref } from "vue";
import { FormKitNode } from "@formkit/core";
import axiosInstance from "@/lib/axios";
import router from "@/router";
import { AxiosError } from "axios";
import { LoginForm } from "@/types";

export const useAuthStore = defineStore("auth", () => {
    // state
    const user = ref<User | null>(null)
    const isLoggedIn = ref<boolean>(false)

    //methods
    const register = async (payload: RegisterForm, node?:FormKitNode) => {
        await axiosInstance.get("/sanctum/csrf-cookie", {
            baseURL: "http://localhost:8000"
        })

        try {
            await axiosInstance.post("/register", payload)
            await getUser()
            await router.push("/dashboard")
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response?.data.errors)
            }
        }
    }

    const login = async (payload: LoginForm, node?:FormKitNode) => {
        await axiosInstance.get("/sanctum/csrf-cookie", {
            baseURL: "http://localhost:8000"
        })

        try {
            await axiosInstance.post("/login", payload)
            await getUser()
            await router.push("/dashboard")
        } catch (e) {
            if (e instanceof AxiosError && e.response?.status === 422) {
                node?.setErrors([], e.response?.data.errors)
            }
        }
    }

    // Récupérer les infos du user connecté
    const getUser = async () => {
        try {
            const response = await axiosInstance.get("/user");
            user.value = response.data;
            isLoggedIn.value = true;
        } catch (e) {
            console.error(e);
        }
    }

    const cleanState = () => {
        user.value = null;
        isLoggedIn.value = false;
    }

    const logout = async () => {
        try {
            await axiosInstance.post("/logout");
            cleanState()
            await router.push('/login')
        } catch (e) {
            console.error(e);
        }
    }

    return {
        isLoggedIn,
        user,
        register,
        login,
        getUser,
        logout,
        cleanState
    }
}, {
    persist: {
        storage: sessionStorage,
        pick: ['user', 'isLoggedIn'],
    } as PersistenceOptions,
})