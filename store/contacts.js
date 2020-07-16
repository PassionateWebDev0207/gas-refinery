import Vue from 'vue'

export const state = () => ({
  loading: false,
  count: 0,
  sortQuery: '',
  sortDirection: '',
  searchQuery: '',
  contacts: [],
  funnels: []
})

export const actions = {
  GET_CONTACTS ({ commit, state }, params) {
    const { token, limit, page } = params
    let url = `/v2/contacts?limit=${limit}&page=${page}`
    if (state.searchQuery) {
      url += state.searchQuery
    }
    if (state.sortQuery) {
      url += `&${state.sortQuery}`
    }
    if (state.sortDirection) {
      url += `&${state.sortDirection}`
    }
    commit('setLoading', true)
    this.$legacy.get(url, { headers: { Authorization: token } }).then((res) => {
      commit('setContacts', res.data.data)
      commit('setCount', res.data.length)
      commit('setLoading', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  },
  async DELETE_CONTACTS ({ commit, dispatch }, params) {
    const { token, data, limit, page } = params
    await this.$legacy.delete('/v2/contacts', { data: { items: data }, headers: { Authorization: token } }).then((res) => {
      dispatch('GET_CONTACTS', { token, limit, page })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  async NEW ({ commit, dispatch }, params) {
    const { token, data, limit, page } = params
    await this.$legacy.post('/v2/contacts', data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_CONTACTS', { token, limit, page })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  async UPDATE ({ commit, dispatch }, params) {
    const { token, data, contactID, limit, page } = params
    await this.$legacy.put(`/v2/contacts/${contactID}`, data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_CONTACTS', { token, limit, page })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  GET_FUNNELS ({ commit }, params) {
    const { token, limit, page } = params
    commit('setLoading', true)
    this.$api.get(`/crm/funnels?limit=${limit}&page=${page}`, { headers: { Authorization: token } }).then((res) => {
      commit('setFunnels', res.data.data.list)
      commit('setCount', res.data.data.count)
      commit('setLoading', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  },
  async DELETE_FUNNEL ({ commit, dispatch }, params) {
    const { token, limit, funnelID } = params
    await this.$api.delete(`/crm/funnels/${funnelID}`, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_FUNNELS', { token, limit, page: 1 })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  async NEW_FUNNEL ({ commit, dispatch }, params) {
    const { token, data, limit } = params
    await this.$api.post('/crm/funnels', data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_FUNNELS', { token, limit, page: 1 })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  async UPDATE_FUNNEL ({ commit, dispatch }, params) {
    const { token, data, funnelID, limit, page } = params
    await this.$api.put(`/crm/funnels/${funnelID}`, data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_FUNNELS', { token, limit, page })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  }
}

export const mutations = {
  setLoading (state, status) {
    state.loading = status
  },
  setContacts (state, contacts) {
    state.contacts = contacts
  },
  setCount (state, count) {
    state.count = count
  },
  setSortQuery (state, query) {
    state.sortQuery = query
  },
  setSortDirection (state, direction) {
    state.sortDirection = direction
  },
  setSearchQuery (state, searchQuery) {
    state.searchQuery = searchQuery
  },
  setFunnels (state, funnels) {
    state.funnels = funnels
  }
}
