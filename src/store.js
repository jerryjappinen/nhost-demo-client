import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'

import { createStore } from 'vuex'

import nhost from '@/util/nhost'

export default createStore({

  state: {

    // Data from Nhost goes here
    uploadsById: {},
    usersById: {},

    // Auth state from Nhost goes here
    currentUserIsLoading: true,
    currentUserId: null
  },

  getters: {

    // Data

    uploads ({ uploadsById }) {
      return orderBy(uploadsById, 'created_at', 'desc')
    },



    // Auth

    currentUser ({ currentUserId, usersById }) {
      return currentUserId ? usersById[currentUserId] : null
    },

    isSignedIn (state, { currentUser }) {
      return !!currentUser
    }

  },

  mutations: {

    // Data

    // Overrides any existing uploads field-by-field
    storeUploads (state, uploads) {
      state.uploadsById = merge({}, state.uploadsById, keyBy(uploads, 'id'))
    },

    unstoreUpload (state, uploadId) {
      if (state.uploadsById[uploadId]) {
        delete state.uploadsById[uploadId]
      }
    },

    storeUser (state, user) {
      state.usersById[user.id] = merge({}, state.usersById[user.id] || {}, user)
    },

    unstoreUser (state, userId) {
      if (state.usersById[userId]) {
        delete state.usersById[userId]
      }
    },



    // Auth

    setCurrentUserIsLoading (state, isLoading) {
      state.currentUserIsLoading = !!isLoading
    },

    setCurrentUserId (state, userId) {
      state.currentUserId = userId
    }

  },

  actions: {



    // Auth
    // This app uses passwordless login
    // For other login methods, see https://docs.nhost.io/platform/authentication

    // This runs when user presses the login button
    async sendLoginEmail (state, email) {
      await nhost.auth.signIn({
        email
      })
    },

    // This runs every time the app starts
    async refreshAuthStatus ({ commit, state }) {
      const { isAuthenticated, isLoading } = nhost.auth.getAuthenticationStatus()

      // eslint-disable-next-line no-console
      console.log('refreshAuthStatus', isAuthenticated, isLoading)

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

    // This ends the user's session
    async signOut () {
      await nhost.auth.signOut()
    }

  }

})
