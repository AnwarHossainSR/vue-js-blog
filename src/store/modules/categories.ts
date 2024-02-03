// src/store/modules/categories.ts

import { useCategoriesApi } from '@/composables/useApi'
import type { ActionTree, Module, MutationTree } from 'vuex'

interface CategoriesState {
  data: any[] // Adjust the type based on your API response
}

const state: CategoriesState = {
  data: []
}

const mutations: MutationTree<CategoriesState> = {
  setCategories(state, categories) {
    state.data = categories
  }
}

const actions: ActionTree<CategoriesState, any> = {
  async fetchCategories({ commit }) {
    const { categories, fetchCategories } = useCategoriesApi()
    await fetchCategories()
    commit('setCategories', categories.value)
  }
}

export const categoriesModule: Module<CategoriesState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}
