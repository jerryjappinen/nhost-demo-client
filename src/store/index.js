import { createStore } from 'vuex'

import nhost from '@/util/nhost'

export default createStore({

  state: {
    // Currently attempting login
    currentUserIsLoading: false,

    // Current user
    currentUserId: null,

    // Data
    uploads: {},
    users: {}
  },

  getters: {

    currentUser ({ currentUserId, users }) {
      return currentUserId ? users[currentUserId] : null
    },

    isLoggedIn (state, { currentUser }) {
      return !!currentUser
    }

  },

  mutations: {

    setCurrentUserIsLoading (state, isLoading) {
      state.currentUserIsLoading = !!isLoading
    },

    setCurrentUserId (state, userId) {
      state.currentUserId = userId
    },

    storeUser (state, user) {
      state.users[user.id] = user
    }

  },

  actions: {

    async logOut ({ commit }) {
      await nhost.auth.signOut()
    },

    async refreshLoginStatus ({ commit, state }) {
      const { isAuthenticated, isLoading } = nhost.auth.getAuthenticationStatus()

      console.log('refreshLoginStatus', isAuthenticated, isLoading)

      commit('setCurrentUserIsLoading', isLoading)

      // Active session
      if (isAuthenticated) {
        const user = nhost.auth.getUser()
        commit('storeUser', user)
        commit('setCurrentUserId', user.id)

      // No session
      } else if (state.currentUserId) {
        commit('setCurrentUserId', null)
      }
    },

    async sendLoginEmail ({ commit }, email) {
      await nhost.auth.signIn({
        email
      })
    }

  }

})
