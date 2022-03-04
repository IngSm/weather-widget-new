import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  cities: Array<any>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    cities: [],
  },
  getters: {
    getCity(state) {
      return state.cities
    },
  },
  mutations: {
    getCity(state, city) {
      state.cities.push(city)
    },
    deleteCity(state, city) {
      state.cities.splice(city, 1)
    },
    updateList(state, value) {
      state.cities = value
    },
  },
  actions: {
    setCity(context, city) {
      context.commit('getCity', city)
    },
    deleteCity(context, city) {
      context.commit('deleteCity', city)
    },
    makeCityFirst(context, city) {
      context.commit('makeCityFirst', city)
    },
    commitUpdateList(context, city) {
      context.commit('updateList', city)
    },
  },
  modules: {},
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
