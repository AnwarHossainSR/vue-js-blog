// src/store/modules/auth.ts

import { useAuthApi } from '@/composables/useApi'
import type { ActionContext, ActionTree, MutationTree } from 'vuex'

interface AuthState {
  user: any | null // Adjust the type based on your user object
  isAuthenticated: boolean
}

const state: AuthState = {
  user: null,
  isAuthenticated: false
}

const mutations: MutationTree<AuthState> = {
  setUser(state, user) {
    state.user = user
  },
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

const actions: ActionTree<AuthState, any> = {
  async register({ commit }: ActionContext<AuthState, any>, credentials) {
    const { user, register } = useAuthApi()
    await register(credentials)
    commit('setUser', user.value)
    commit('setAuthenticated', true)
  },
  async login({ commit }: ActionContext<AuthState, any>, credentials) {
    const { user, authenticate } = useAuthApi()
    await authenticate(credentials)
    commit('setUser', user.value)
    commit('setAuthenticated', true)
  },
  async logout({ commit }: ActionContext<AuthState, any>) {
    const { logout } = useAuthApi()
    await logout()
    commit('setUser', null)
    commit('setAuthenticated', false)
  }
}

export const authModule = {
  namespaced: true,
  state,
  mutations,
  actions
}
