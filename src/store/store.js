import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    image: 'не выбрано',
    frame: 'не выбрано',
    fingerprints: 'не выбраны',
    price: 750
  },
  getters: {
    chosenImage (state) {
      return state.image
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
    
  }
})