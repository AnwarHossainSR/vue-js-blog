import { usePostsApi } from '@/composables/useApi'
import type { ActionTree, Module, MutationTree } from 'vuex'

interface PostsState {
  posts: any[]
  singlePost: any
}

const state: PostsState = {
  posts: [],
  singlePost: {}
}

const mutations: MutationTree<PostsState> = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setSinglePost(state, post) {
    state.singlePost = post
  }
}

const actions: ActionTree<PostsState, any> = {
  async fetchPosts({ commit }) {
    const { posts, fetchPosts } = usePostsApi()
    await fetchPosts()
    commit('setPosts', posts.value)
  },
  async fetchSinglePost({ commit }, slug) {
    const { singlePost, fetchSinglePost } = usePostsApi()

    try {
      await fetchSinglePost(slug)
      commit('setSinglePost', singlePost.value)
    } catch (error) {
      console.error('Error fetching single post:', error)
    }
  },
  async createComment({ commit }, { postSlug, comment }) {
    const { singlePost, createComment } = usePostsApi()
    try {
      await createComment(postSlug, comment)
      console.log('singlePost.value 2:', singlePost.value);
      
      commit('setSinglePost', singlePost.value)
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }
}

export const postsModule: Module<PostsState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}
