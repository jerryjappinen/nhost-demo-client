import { createStore } from 'vuex'

import nhost from '@/util/nhost'

export default createStore({

  state: {
    // Currently attempting login
    isLoggingIn: false,

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

    startLoggingIn (state) {
      if (!state.isLoggingIn) {
        state.isLoggingIn = true
      }
    },

    stopLoggingIn (state) {
      if (state.isLoggingIn) {
        state.isLoggingIn = false
      }
    },

    setCurrentUserId (state, userId) {
      state.currentUserId = userId
    },

    storeUser (state, user) {
      state.users[user.id] = user
    }

  },

  actions: {

    async sendLoginEmail ({ commit }, email) {
      await nhost.auth.signIn({
        email
      })
    },

    logIn ({ commit }) {
      commit('startLoggingIn')

      // await signIn({})

      const user = {
        id: 'fake-id-654748484674',
        name: 'Simone Nadal',
        email: 'simonenadal@gmail.com',
        avatarUrl: 'https://i.pravatar.cc/80?img=35'
      }

      commit('storeUser', user)
      commit('setCurrentUserId', user.id)

      commit('stopLoggingIn')
    },

    logOut ({ commit }) {
      commit('setCurrentUserId', null)
    }

  }

})
