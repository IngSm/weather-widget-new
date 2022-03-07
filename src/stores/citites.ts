import { acceptHMRUpdate ,defineStore } from 'pinia'

export const useCities = defineStore('cities', {
  state: () => ({
     cities: []
  }),
  getters: {
    getCity: (state) => {
      return state.cities
    }
  },
  actions: {
    setCity: (city: object): void => {
      this.cities.push(city)
    },
    deleteCity: (city: number): void => {
      this.cities.splice(city, 1)
    },
    updateList: (value: object): void => {
      this.cities = value
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCities, import.meta.hot));