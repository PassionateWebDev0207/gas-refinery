import Vue from 'vue'

export const state = () => ({
  pageLoading: true,
  assetLoading: true,
  asset: null,
  categories: []
})

export const actions = {
  GET_CATEGORIES ({ commit, dispatch }, params) {
    const { token } = params
    commit('setPageLoding', true)
    this.$legacy.get('/v2/categories', { headers: { Authorization: token } }).then((res) => {
      commit('setCategories', res.data.data)
      commit('setPageLoding', false)
      dispatch('GET_ASSET', { token })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setPageLoding', false)
    })
  },
  GET_ASSET ({ commit }, params) {
    const { token } = params
    commit('setAssetLoading', true)
    this.$legacy.get('v2/categories/asset', { headers: { Authorization: token } }).then((res) => {
      commit('setAsset', res.data.data)
      commit('setAssetLoading', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setAssetLoading', false)
    })
  },
  ASSOCIATE ({ commit, dispatch }, params) {
    const { token, data } = params
    commit('setAssetLoading', true)
    this.$legacy.post('v2/categories/asset', data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_ASSET', { token })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setAssetLoading', false)
    })
  }
}

export const mutations = {
  setPageLoding (state, status) {
    state.pageLoading = status
  },
  setCategories (state, categories) {
    state.categories = categories
  },
  setAsset (state, asset) {
    state.asset = asset
  },
  setAssetLoading (state, status) {
    state.assetLoading = status
  }
}
