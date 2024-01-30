import * as api from '@/services/api'
import { createStore } from 'vuex'

export default createStore({
  state: {
    categories: [],
    posts: []
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    setPosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      // Perform an API request to fetch categories
      const categories = await api.fetchCategories()
      commit('setCategories', categories)
    },
    async fetchPosts({ commit }) {
      // Perform an API request to fetch blogs
      const posts = await api.fetchBlogs()
      commit('setPosts', posts)
    }
  },
  getters: {
    getCategories: (state) => state.categories,
    getPosts: (state) => state.posts
  }
})
