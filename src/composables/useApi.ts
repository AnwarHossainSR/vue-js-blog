import * as apiService from '@/services/apiService'
import * as authService from '@/services/authService'
import { ref } from 'vue'

//categories API
export const useCategoriesApi = () => {
  const categories = ref([])

  const fetchCategories = async () => {
    try {
      const data = await apiService.fetchCategories()
      categories.value = data.result.data
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return { categories, fetchCategories }
}

// posts API
export const usePostsApi = () => {
  const posts = ref([])
  const singlePost = ref({})

  const fetchPosts = async () => {
    try {
      const data = await apiService.fetchBlogs()
      posts.value = data.result.data
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const fetchSinglePost = async (slug: string) => {
    try {
      const data = await apiService.fetchSinglePost(slug)
      singlePost.value = data.result
    } catch (error) {
      console.error('Error fetching single post:', error)
    }
  }

  const createComment = async (postSlug: string, commentText: string) => {
    try {
      const data = await apiService.createComment(postSlug, commentText)
      singlePost.value = data.result
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  return { posts, fetchPosts, fetchSinglePost, singlePost, createComment }
}

// auth API
export const useAuthApi = () => {
  const user = ref(null)
  const errors = ref(null)
  const message = ref('')
  const token = ref('')

  const register = async (credentials: any) => {
    try {
      const data = await authService.register(credentials)
      user.value = data.result.user
      token.value = data.result.token
      message.value = 'User registered successfully!'
    } catch (error: any) {
      errors.value = error.response.data.errors
    }
  }

  const authenticate = async (credentials: any) => {
    try {
      const data = await authService.login(credentials)
      user.value = data.result.user
      token.value = data.result.token
      message.value = 'User authenticated successfully!'
    } catch (error: any) {
      errors.value = error.response.data.message
    }
  }

  const whoami = async () => {
    try {
      const data = await authService.whoami()
      user.value = data.result
      message.value = 'User authenticated successfully!'
    } catch (error: any) {
      errors.value = error.response.data.message
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      user.value = null
      message.value = 'User logged out successfully!'
    } catch (error: any) {
      errors.value = error.response.data.errors
    }
  }

  return { register, user, authenticate, logout, errors, message, token, whoami }
}
