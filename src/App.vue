<script lang="ts" setup>
import Footer from '@/components/common/Footer.vue'
import Header from '@/components/common/Header.vue'
import axios from 'axios'
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

watch(
  () => store.state.auth.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated && localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
  }
)

onMounted(async () => {
  if (!store.state.auth.isAuthenticated) {
    await store.dispatch('auth/checkAuthentication')
    if (store.state.auth.isAuthenticated) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
  }
})
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
