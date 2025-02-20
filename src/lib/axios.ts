import axios from 'axios'
import router from "@/router";
import {useAuthStore} from "@/store/auth";
import {useToast} from "vue-toast-notification";
import { API_BASE_URL } from "@/config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // authentification basée sur la session
  withCredentials: true,
  withXSRFToken: true,
})

axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const auth = useAuthStore()
      const $toast = useToast();
      switch (error.response.status) {
        case 401:
          auth.cleanState()
          $toast.error("Unauthorized");
          router.push("/login");
          break;
        case 404:
          $toast.error("Page not found");
          router.push("/404");
          break;
        case 419:
          auth.cleanState()
          $toast.error("Unauthorized");
          router.push("/login");
          break;
        case 500:
          $toast.error("Internal server error");
          router.push("/500");
          break;
      }
      return Promise.reject(error);
    }
)

export default axiosInstance