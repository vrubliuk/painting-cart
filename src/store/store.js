import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    picture: undefined,
    frame: undefined,
    fingerprints: [],
    price: 0,
    title: '',
    signature: '',
    date: '',
    font: 'Ariston'
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
    currentTitle (state) {
      return state.title
    },
    currentSignature (state) {
      return state.signature
    },
    currentDate (state) {
      return state.date
    },
    currentFont (state) {
      return state.font
    }
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
    setTitle (state, payload) {
      state.title = payload
    },
    setSignature (state, payload) {
      state.signature = payload
    },
    setDate (state, payload) {
      state.date = payload
    },
    setFont (state, payload) {
      state.font = payload
    },


  }
})