<script setup lang="ts">
import { defineProps, watch } from 'vue'

// Define the props
const props = defineProps(['categories', 'activeCategory'])

const emit = defineEmits(['updateActiveCategory'])

const isActiveCategory = (categoryName: string) => props.activeCategory === categoryName

const setActiveCategory = (categoryName: string) => {
  if (!isActiveCategory(categoryName)) {
    // Emit the custom event to update the active category in the parent component
    emit('updateActiveCategory', categoryName)
  }
}

// Watch for changes in the activeCategory prop
watch(
  () => props.activeCategory,
  (newValue) => {
    console.log('Active category changed to:', newValue)
  }
)
</script>
<template>
  <div class="category-filter mb-10 mt-3 rounded-xl bg-[#EEEEEE] px-4">
    <ul class="filter-list">
      <li>
        <a
          :class="{
            'filter-btn btn btn-sm': true,
            'filter-btn-active': isActiveCategory('All Categories')
          }"
          @click="setActiveCategory('All Categories')"
          >All Categories</a
        >
      </li>
      <li v-for="category in categories" :key="category.id">
        <a
          :class="{
            'filter-btn btn btn-sm': true,
            'filter-btn-active': isActiveCategory(category.title)
          }"
          @click="setActiveCategory(category.title)"
          >{{ category.title }}</a
        >
      </li>
    </ul>
  </div>
</template>
