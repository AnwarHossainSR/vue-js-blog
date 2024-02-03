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

  return { posts, fetchPosts, fetchSinglePost, singlePost }
}

// auth API
export const useAuthApi = () => {
  const user = ref(null)

  const register = async (credentials: any) => {
    try {
      const data = await authService.register(credentials)
      user.value = data.result
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  const authenticate = async (credentials: any) => {
    try {
      const data = await authService.login(credentials)
      user.value = data.result
    } catch (error) {
      console.error('Error authenticating user:', error)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      user.value = null
    } catch (error) {
      console.error('Error logging out user:', error)
    }
  }

  return { register, user, authenticate, logout }
}
