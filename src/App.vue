<script lang="ts" setup>
import Footer from '@/components/common/Footer.vue'
import Header from '@/components/common/Header.vue'
import axios from 'axios'
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

watch(
  () => store.state.auth.isAuthenticated,
  (isAuthenticated) => {
    if (isAuthenticated && localStorage.getItem('token')) {
      console.log('User is authenticated')
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
  }
)
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
