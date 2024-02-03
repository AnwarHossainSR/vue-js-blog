<template>
  <main>
    <!-- floating assets -->
    <img
      class="floating-bubble-1 absolute right-0 top-0 -z-[1]"
      src="/images/floating-bubble-1.svg"
      alt=""
    />
    <img
      class="floating-bubble-2 absolute left-0 top-[387px] -z-[1]"
      src="/images/floating-bubble-2.svg"
      alt=""
    />
    <img
      class="floating-bubble-3 absolute right-0 top-[605px] -z-[1]"
      src="/images/floating-bubble-3.svg"
      alt=""
    />
    <!-- ./end floating assets -->

    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p class="text-gray-600">The page you are looking for does not exist.</p>
      <router-link to="/" class="text-blue-500 mt-4">Go back to Home</router-link>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
