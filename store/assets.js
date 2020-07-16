import Vue from 'vue'

export const state = () => ({
  count: 0,
  pageLoading: true,
  pageData: [],
  meta: [],
  assetsByCreator: [],
  detail: null,
  loadingDetail: true,
  loadingMeta: true,
  currentPage: 1,
  currentLimit: 25
})

export const actions = {
  async GET_COUNT ({ commit }) {
    await this.$legacy.get('/assets/stats').then((res) => {
      commit('setCount', res.data.data.total)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  LOAD_PAGE ({ commit }, params) {
    const { limit, page, token } = params
    commit('setPageLoding', true)
    this.$legacy.get(`/v2/assets?sort=video_created&limit=${limit}&page=${page}`, { headers: { Authorization: token } }).then((res) => {
      commit('setPageData', res.data.data)
      commit('setPageLoding', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setPageLoding', false)
    })
  },
  async LOAD_DETAIL ({ commit }, params) {
    const { id, token } = params
    commit('setLoadingDetail', true)
    await this.$legacy.get(`/v2/assets/${id}`, { headers: { Authorization: token } }).then((res) => {
      commit('setDetail', res.data.data)
      commit('setLoadingDetail', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoadingDetail', false)
    })
  },
  async LOAD_META ({ commit }, params) {
    const { id, limit, token } = params
    commit('setLoadingMeta', true)
    await this.$legacy.get(`/v2/assets/${id}/meta?meta=tiktok&limit=${limit}`, { headers: { Authorization: token } }).then((res) => {
      commit('setMeta', res.data.data)
      commit('setLoadingMeta', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoadingMeta', false)
    })
  },
  async LOAD_ASSETS_BY_CREATOR ({ commit }, params) {
    const { creator, token } = params
    commit('setLoadingDetail', true)
    await this.$legacy.get(`/v2/assets?creator=${creator}`, { headers: { Authorization: token } }).then((res) => {
      commit('setAssetsByCreator', res.data.data)
      commit('setLoadingDetail', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoadingDetail', false)
    })
  }
}

export const mutations = {
  setPageLoding (state, status) {
    state.pageLoading = status
  },
  setPageData (state, data) {
    state.pageData = data
  },
  setCount (state, count) {
    state.count = count
  },
  setDetail (state, detail) {
    state.detail = detail
  },
  setLoadingDetail (state, status) {
    state.loadingDetail = status
  },
  setLoadingMeta (state, status) {
    state.loadingMeta = status
  },
  setCurrentPage (state, page) {
    state.currentPage = page
  },
  setCurrentLimit (state, limit) {
    state.currentLimit = limit
  },
  setMeta (state, meta) {
    state.meta = meta
  },
  setAssetsByCreator (state, assets) {
    state.assetsByCreator = assets
  }
}
