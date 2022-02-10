import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'
import { createStore } from 'vuex'

import nhost from '@/util/nhost'

export default createStore({

  state: {

    // Local data
    uploadsById: {},
    usersById: {},

    // Auth
    currentUserIsLoading: false,
    currentUserId: null
  },

  getters: {

    // Local data

    uploads ({ uploadsById }) {
      return orderBy(uploadsById, 'created_at')
    },



    // Auth

    currentUser ({ currentUserId, usersById }) {
      return currentUserId ? usersById[currentUserId] : null
    },

    isLoggedIn (state, { currentUser }) {
      return !!currentUser
    }

  },

  mutations: {

    // Local data

    // Overrides any existing data field-by-field
    storeUploadsById (state, uploads) {
      state.uploadsById = merge({}, state.uploadsById, keyBy(uploads, 'id'))
    },



    // Auth

    setCurrentUserIsLoading (state, isLoading) {
      state.currentUserIsLoading = !!isLoading
    },

    setCurrentUserId (state, userId) {
      state.currentUserId = userId
    },

    storeUser (state, user) {
      state.usersById[user.id] = merge({}, state.usersById[user.id] || {}, user)
    }

  },

  actions: {

    // Local data

    storeUpload ({ dispatch }, upload) {
      dispatch('storeUploads', [upload])
    },

    storeUploads ({ commit }, uploads) {
      commit('storeUploadsById', uploads)
    },



    // Auth

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
