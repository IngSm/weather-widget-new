import { acceptHMRUpdate ,defineStore } from 'pinia'

interface State {
  cities: Array<any>
}

export const useCities = defineStore('cities', {
  state: () => {
    return {
     cities: []
    } as State
  },
  getters: {
    getCity: (state) => {
      return state.cities
    }
  },
  actions: {
    setCity(city: object): void {
      this.cities.push(city)
    },
    deleteCity(city: number): void {
      this.cities.splice(city, 1)
    },
    updateList(value: any): void {
      this.cities = value
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCities, import.meta.hot));