import { createStore } from 'vuex'

// src/store/index.js
import { useCategoriesApi, usePostsApi, useSinglePostAPI } from '@/composables/useApi'

export default createStore({
  state: {
    categories: [],
    posts: [],
    singlePost: {}
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setSinglePost(state, post) {
      state.singlePost = post
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
    },
    async fetchSinglePost({ commit }, slug) {
      const { singlePost, fetchSinglePost } = useSinglePostAPI(slug)

      try {
        await fetchSinglePost()
        commit('setSinglePost', singlePost.value)
      } catch (error) {
        console.error('Error fetching single post:', error)
      }
    }
  },
  getters: {
    getCategories: (state) => state.categories,
    getPosts: (state) => state.posts,
    getSinglePost: (state) => state.singlePost
  }
})
