<script setup lang="ts">
const props = defineProps(['post'])

const categoryLink = `/categories/${props.post.category.id}`

const getSubBody = (fullBody: string): string => {
  const subBodyLength = 200
  return fullBody.slice(0, subBodyLength)
}
</script>

<template>
  <div class="mb-8 md:col-6 lg:col-4">
    <div class="card">
      <img
        class="card-img"
        width="335"
        height="210"
        src="https://via.placeholder.com/640x480.png/006644?text=qui"
        alt="image"
      />
      <div class="card-content">
        <div class="card-tags">
          <a class="tag" :href="categoryLink">{{ post.category.title }}</a>
        </div>
        <h3 class="h4 card-title">
          <RouterLink :to="{ name: 'blog-details', params: { blogId: post.id } }">
            {{ post.title }}
          </RouterLink>
        </h3>
        <p>{{ getSubBody(post.body) }}</p>
        <div class="card-footer mt-6 flex space-x-4">
          <span class="inline-flex items-center text-xs text-[#666]">
            <svg
              class="mr-1.5"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Add the SVG path for the first icon here -->
            </svg>
            {{ post.createdAt }}
          </span>
          <span class="inline-flex items-center text-xs text-[#666]">
            <svg
              class="mr-1.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Add the SVG path for the second icon here -->
            </svg>
            10 Min To Read
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
