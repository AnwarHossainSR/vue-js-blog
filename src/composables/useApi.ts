// useApi.js
import * as api from '@/services/api'
import { ref } from 'vue'

export const useCategoriesApi = () => {
  const categories = ref([])

  const fetchCategories = async () => {
    try {
      const data = await api.fetchCategories()
      categories.value = data.result
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return { categories, fetchCategories }
}

export const usePostsApi = () => {
  const posts = ref([])

  const fetchPosts = async () => {
    try {
      const data = await api.fetchBlogs()
      posts.value = data.result
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  return { posts, fetchPosts }
}

export const useSinglePostAPI = (slug: string) => {
  const singlePost = ref({})

  const fetchSinglePost = async () => {
    try {
      const data = await api.fetchSinglePost(slug)      
      singlePost.value = data.result
    } catch (error) {
      console.error('Error fetching single post:', error)
    }
  }

  return { singlePost, fetchSinglePost }
}
