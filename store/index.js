export const state = () => ({
  token: null,
  authStatus: false,
  admin: false
})

export const getters = {
  getAuthStatus (state) {
    return state.authStatus
  },
  getAdmin (state) {
    return state.admin
  }
}

export const actions = {
  nuxtServerInit (context) {}
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setAdmin (state, admin) {
    state.admin = admin
  },
  setAuthStatus (state, status) {
    state.authStatus = status
  }
}
