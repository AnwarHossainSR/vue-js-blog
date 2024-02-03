// src/store/modules/auth.ts

import { useAuthApi } from '@/composables/useApi'
import axios from 'axios'
import type { ActionContext, ActionTree, MutationTree } from 'vuex'
interface AuthState {
  user: any | null // Adjust the type based on your user object
  isAuthenticated: boolean
  errors: any | null
  message: string | null
  token: string | null
}

const state: AuthState = {
  user: null,
  isAuthenticated: false,
  errors: null,
  message: null,
  token: null
}

const mutations: MutationTree<AuthState> = {
  setUser(state, user) {
    state.user = user
  },
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  setErrors(state, errors) {
    state.errors = errors
  },
  setMessage(state, message) {
    state.message = message
  },
  setToken(state, token) {
    state.token = token
    if (token) localStorage.setItem('token', token)
  }
}

const actions: ActionTree<AuthState, any> = {
  async register({ commit }: ActionContext<AuthState, any>, credentials) {
    const { user, register, errors, message, token } = useAuthApi()
    await register(credentials)
    console.log(user.value)

    if (user.value) {
      commit('setToken', token.value)
      commit('setUser', user.value)
      commit('setAuthenticated', true)
      commit('setMessage', message.value)
      commit('setErrors', null)
      if (token.value) axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    } else {
      commit('setUser', null)
      commit('setAuthenticated', false)
      commit('setErrors', errors.value)
    }
  },
  async login({ commit }: ActionContext<AuthState, any>, credentials) {
    const { user, authenticate, errors, message, token } = useAuthApi()
    await authenticate(credentials)

    if (user.value) {
      commit('setToken', token.value)
      commit('setUser', user.value)
      commit('setAuthenticated', true)
      commit('setMessage', message.value)
      commit('setErrors', null)
    } else {
      commit('setUser', null)
      commit('setAuthenticated', false)
      commit('setErrors', errors.value)
    }
  },
  async logout({ commit }: ActionContext<AuthState, any>) {
    const { logout, errors, message } = useAuthApi()
    await logout()

    if (!errors.value) {
      commit('setUser', null)
      commit('setAuthenticated', false)
      commit('setMessage', message.value)
      commit('setErrors', null)
      delete axios.defaults.headers.common['Authorization'] // Remove token from Axios headers
      localStorage.removeItem('token')
    } else {
      commit('setMessage', null)
      commit('setErrors', errors.value)
    }
  },
  async checkAuthentication({ commit }: ActionContext<AuthState, any>) {
    const { user, whoami } = useAuthApi()
    await whoami()

    if (user.value) {
      commit('setUser', user.value)
      commit('setAuthenticated', true)
      commit('setErrors', null)
    } else {
      commit('setUser', null)
      commit('setAuthenticated', false)
    }
  }
}

export const authModule = {
  namespaced: true,
  state,
  mutations,
  actions
}
