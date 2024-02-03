import AboutView from '@/views/AboutView.vue'
import BlogDetailsView from '@/views/BlogDetailsView.vue'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import NotFound from '@/views/NotFound.vue'
import DashboardView from '@/views/DashboardView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/blog-details/:slug',
      name: 'blog-details',
      component: BlogDetailsView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/:catchAll(.*)', // Match any path that hasn't been matched by previous routes
      component: NotFound,
    },
  ]
})

export default router
