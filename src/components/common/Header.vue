<script setup lang="ts">
import imageUrl from '@/assets/images/logo.svg'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useStore } from 'vuex'
const $toast = useToast()
const route = useRoute()
const router = useRouter()
const store = useStore()

const isActive = (to: string): boolean => route.path === to

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  $toast.open({
    message: 'You have successfully logged out',
    type: 'success',
    position: 'top-right'
  })
  router.push('/')
}
</script>

<template>
  <header class="header">
    <nav class="navbar container">
      <!-- logo -->
      <div class="order-0">
        <RouterLink to="/"><img :src="imageUrl" height="30" width="147" alt="logo" /></RouterLink>
      </div>
      <!-- navbar toggler -->
      <input id="nav-toggle" type="checkbox" class="hidden" />
      <label
        id="show-button"
        for="nav-toggle"
        class="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden"
      >
        <svg class="h-6 fill-current" viewBox="0 0 20 20">
          <title>Menu Open</title>
          <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
        </svg>
      </label>
      <label
        id="hide-button"
        for="nav-toggle"
        class="order-2 hidden cursor-pointer items-center lg:order-1"
      >
        <svg class="h-6 fill-current" viewBox="0 0 20 20">
          <title>Menu Close</title>
          <polygon
            points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
            transform="rotate(45 10 10)"
          ></polygon>
        </svg>
      </label>
      <!-- /navbar toggler -->
      <ul
        id="nav-menu"
        class="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5"
      >
        <li class="nav-item">
          <RouterLink class="nav-link" to="/" :class="{ active: isActive('/') }">Blogs</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about" :class="{ active: isActive('/about') }"
            >About</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/contact" :class="{ active: isActive('/contact') }"
            >Contact</RouterLink
          >
        </li>
        <li v-if="store.state.auth.isAuthenticated" class="nav-item">
          <RouterLink class="nav-link" to="/dashboard" :class="{ active: isActive('/dashboard') }"
            >Dashboard</RouterLink
          >
        </li>
        <li v-if="store.state.auth.isAuthenticated" class="nav-item">
          <a class="nav-link cursor-pointer" @click="handleLogout">Logout</a>
        </li>
        <li class="nav-item mt-3.5 lg:hidden">
          <RouterLink
            v-if="!store.state.auth.isAuthenticated"
            class="btn btn-white btn-sm border-border"
            to="/sign-up"
            >Sign Up Now</RouterLink
          >
        </li>
      </ul>
      <div class="order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex">
        <!-- Conditionally show "Logout" link when authenticated -->
        <RouterLink
          v-if="!store.state.auth.isAuthenticated"
          class="btn btn-white btn-sm border-border"
          to="/sign-up"
          >Sign Up Now</RouterLink
        >
      </div>
    </nav>
  </header>
</template>
