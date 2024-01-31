import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL
})

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
