import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import {useAuthStore} from "@/store/auth.js";
import PostIndex from "@/views/posts/PostIndex.vue";
import PostCreate from "@/views/posts/PostCreate.vue";
import PostView from "@/views/posts/PostView.vue";
import PostEdit from "@/views/posts/PostEdit.vue";
import axiosInstance from "@/lib/axios";
import {Post} from "@/types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresGuest: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard/posts',
      name: 'PostIndex',
      component: PostIndex,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/posts/create',
      name: 'PostCreate',
      component: PostCreate,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/posts/:slug',
      name: 'PostView',
      component: PostView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/dashboard/posts/:slug/edit',
      name: 'PostEdit',
      component: PostEdit,
      meta: { requiresAuth: true },
      props: true,
      beforeEnter: async (to, from, next) => {
        const slug = to.params.slug;
        // Vérifier si l'utilisateur est connecté
        if (useAuthStore().isLoggedIn) {
          try {
            // Vérifier si l'utilisateur est l'auteur du post
            const response = await axiosInstance.get(`/api/dashboard/posts/${slug}`);
            const post = response.data.data;

            // Si l'utilisateur n'est pas l'auteur, on redirige
            if (post.user_id && post.user_id !== useAuthStore().user?.id) {
              next('/403')
            } else {
              next()
            }
          } catch (e) {
            next('/404');
          }
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/404',
      name: '404',
      component: () => import("@/views/404.vue")
    },
    {
      path: '/403',
      name: '403',
      component: () => import("@/views/403.vue")
    },
    {
      path: '/500',
      name: '500',
      component: () => import("@/views/500.vue")
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isLoggedIn)
    next({name: 'Login'})
  else if (to.matched.some((record) => record.meta.requiresGuest) && auth.isLoggedIn)
    next({name: 'Dashboard'})
  else next()
})

export default router
