import { api } from './index'

export const login = async (credentials: any) => {
  try {
    const response = await api.post('/login', credentials)
    return response.data
  } catch (error) {
    console.error('Error authenticating user:', error)
    throw error
  }
}

export const register = async (credentials: any) => {
  try {
    const response = await api.post('/register', credentials)
    return response.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await api.post('/logout')
    return response.data
  } catch (error) {
    console.error('Error logging out user:', error)
    throw error
  }
}
