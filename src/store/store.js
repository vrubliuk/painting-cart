import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    picture: undefined,
    frame: undefined,
    fingerprints: [],
    price: 0
  },
  getters: {
    chosenPicture (state) {
      return state.picture
    },
    chosenFrame (state) {
      return state.frame
    },
    chosenFingerprints (state) {
      return state.fingerprints
    },
    currentPrice (state) {
      return state.price
    },
  },
  mutations: {
    setPicture (state, payload) {
      state.picture !== payload ? state.picture = payload : state.picture = undefined
    },
    setFrame (state, payload) {
      state.frame !== payload ? state.frame = payload : state.frame = undefined
    },
    setFingerprints (state, payload) {
      let fingerprints = [...state.fingerprints]
      let index = fingerprints.indexOf(payload)
      if (index === -1) {
        fingerprints.push(payload)
      } else {
        fingerprints.splice(index, 1)
      }
      state.fingerprints = fingerprints
    },
  }
})