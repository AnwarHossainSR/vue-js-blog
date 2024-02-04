import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'
const token = localStorage.getItem('token')

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})
