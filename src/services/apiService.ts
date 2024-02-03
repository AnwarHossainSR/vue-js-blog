import { api } from './index'

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export const fetchBlogs = async () => {
  try {
    const response = await api.get('/posts')
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export const fetchSinglePost = async (slug: string) => {
  try {
    const response = await api.get(`/posts/${slug}`)
    return response.data
  } catch (error) {
    console.error('Error fetching single post:', error)
    throw error
  }
}
