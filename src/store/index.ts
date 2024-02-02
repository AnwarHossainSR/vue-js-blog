import { createStore } from 'vuex'

// src/store/index.js
import { useCategoriesApi, usePostsApi } from '@/composables/useApi'

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
      const { categories, fetchCategories } = useCategoriesApi()
      await fetchCategories()
      commit('setCategories', categories.value)
    },
    async fetchPosts({ commit }) {
      const { posts, fetchPosts } = usePostsApi()
      await fetchPosts()
      commit('setPosts', posts.value)
    }
  },
  getters: {
    getCategories: (state) => state.categories,
    getPosts: (state) => state.posts
  }
})
