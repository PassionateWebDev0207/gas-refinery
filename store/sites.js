import Vue from 'vue'
import FileSaver from 'file-saver'

export const state = () => ({
  proxies: null,
  loading: false
})

export const actions = {
  GET_PROXIES ({ commit, dispatch }) {
    commit('setLoading', true)
    this.$legacy.get('/v2/proxies').then((res) => {
      commit('setProxies', res.data.data)
      commit('setLoading', false)
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  },
  GET_DOWNLOAD_DATA ({ commit, dispatch }) {
    commit('setLoading', true)
    this.$legacy.get('/v2/proxies?type=file').then((res) => {
      commit('setLoading', false)
      // save text data
      const blob = new Blob([res.data], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'proxies.txt')
    }).catch((err) => {
      Vue.prototype.$message({ title: 'Error', type: 'error', message: `${err}`, offset: 80 })
      commit('setLoading', false)
    })
  }
}

export const mutations = {
  setLoading (state, status) {
    state.loading = status
  },
  setProxies (state, proxies) {
    state.proxies = proxies
  }
}
