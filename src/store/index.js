import { createStore } from 'vuex'

import nhost from '@/util/nhost'

export default createStore({

  state: {
    // Currently attempting login
    // We don't use this as the magic link is not
    // isLoggingIn: false,

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
      const user = nhost.auth.getUser()

      // Active session
      if (user) {
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
