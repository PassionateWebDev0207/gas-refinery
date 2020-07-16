import Vue from 'vue'

export const state = () => ({
  newClientRecruiting: false,
  newClientRecruited: false,
  count: 0,
  pageLoading: true,
  pageData: [],
  meta: [],
  detail: null,
  loadingDetail: true,
  loadingMeta: true,
  currentPage: 1,
  currentLimit: 25
})

export const getters = {
  client (state) {
    return state.detail
  },
  clientLoading (state) {
    return state.loadingDetail
  }
}

export const actions = {
  async GET_COUNT ({ commit }) {
    await this.$legacy.get('/clients/count').then((res) => {
      commit('setCount', res.data.data)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  LOAD_PAGE ({ commit }, params) {
    const { limit, page, token } = params
    commit('setPageLoding', true)
    this.$legacy.get(`/v2/clients?focus=full&limit=${limit}&page=${page}`, { headers: { Authorization: token } }).then((res) => {
      commit('setPageData', res.data.data)
      commit('setPageLoding', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setPageLoding', false)
    })
  },
  async LOAD_DETAIL ({ commit }, params) {
    const { id, idType, token } = params
    commit('setLoadingDetail', true)
    await this.$legacy.get(`/v2/clients/${id}?id_type=${idType}`, { headers: { Authorization: token } }).then((res) => {
      commit('setDetail', res.data.data)
      commit('setLoadingDetail', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoadingDetail', false)
    })
  },
  async LOAD_META ({ commit }, params) {
    const { id, idType, limit, metaType, token } = params
    commit('setLoadingMeta', true)
    await this.$legacy.get(`/v2/clients/${id}/meta?id_type=${idType}&limit=${limit}&meta=${metaType}`, { headers: { Authorization: token } }).then((res) => {
      commit('setMeta', res.data.data)
      commit('setLoadingMeta', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoadingMeta', false)
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
  setNewClientRecruiting (state, status) {
    state.newClientRecruiting = status
  },
  setNewClientRecruited (state, status) {
    state.newClientRecruited = status
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
  }
}
