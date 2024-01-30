<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from './components/common/Footer.vue'
import Header from './components/common/Header.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
