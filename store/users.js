import Vue from 'vue'

export const state = () => ({
  loading: false,
  users: [],
  history: [],
  count: 0,
  limit: 25,
  sortQuery: '',
  sortDirection: ''
})

export const actions = {
  GET_USERS ({ commit, state }, params) {
    const { token, limit, page } = params
    let url = `/accounts?limit=${limit}&page=${page}`

    if (state.sortQuery) {
      url += `&${state.sortQuery}`
    }
    if (state.sortDirection) {
      url += `&${state.sortDirection}`
    }
    commit('setLoading', true)
    commit('setLimit', limit)
    this.$api.get(url, { headers: { Authorization: token } }).then((res) => {
      commit('setUsers', res.data.data.list)
      commit('setCount', res.data.data.count)
      commit('setLoading', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  },
  GET_HISTORY ({ commit, state }, params) {
    const { token, limit, page } = params
    let url = `/accounts/history?limit=${limit}&page=${page}`

    if (state.sortQuery) {
      url += `&${state.sortQuery}`
    }
    if (state.sortDirection) {
      url += `&${state.sortDirection}`
    }
    commit('setLoading', true)
    commit('setLimit', limit)
    this.$api.get(url, { headers: { Authorization: token } }).then((res) => {
      commit('setHistory', res.data.data.list)
      commit('setCount', res.data.data.count)
      commit('setLoading', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  },
  GET_ALL_USERS ({ commit }, params) {
    const { token } = params
    commit('setLoading', true)
    this.$api.get('/accounts?limit=10&page=1', { headers: { Authorization: token } }).then((res) => {
      commit('setUsers', res.data.data.list)
      if (res.data.data.count > res.data.data.list.length) {
        commit('setLoading', true)
        this.$api.get(`/accounts?limit=${res.data.data.count}&page=1`, { headers: { Authorization: token } }).then((res) => {
          commit('setLoading', false)
          commit('setUsers', res.data.data.list)
        }).catch((err) => {
          Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
          commit('setLoading', false)
        })
      } else {
        commit('setLoading', false)
        commit('setUsers', res.data.data.list)
      }
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  },
  UPDATE_CURRENT_USER ({ commit }, params) {
    const { token, data, userId } = params
    this.$api.put(`/accounts/${userId}`, data, { headers: { Authorization: token } }).then(async (res) => {
      await this.app.$auth.logout()
      this.app.router.push('/')
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  async CREATE_USER ({ commit, dispatch, state }, params) {
    const { token, data } = params
    await this.$api.post('/accounts', data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_USERS', { token, limit: state.userLimit, page: 1 })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  },
  async UPDATE_USER ({ commit, dispatch, state }, params) {
    const { token, userId, data } = params
    await this.$api.put(`/accounts/${userId}`, data, { headers: { Authorization: token } }).then((res) => {
      dispatch('GET_USERS', { token, limit: state.userLimit, page: 1 })
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
    })
  }
}

export const mutations = {
  setLoading (state, status) {
    state.loading = status
  },
  setUsers (state, users) {
    state.users = users
  },
  setCount (state, count) {
    state.count = count
  },
  setLimit (state, limit) {
    state.limit = limit
  },
  setSortQuery (state, query) {
    state.sortQuery = query
  },
  setSortDirection (state, direction) {
    state.sortDirection = direction
  },
  setHistory (state, history) {
    state.history = history
  }
}
