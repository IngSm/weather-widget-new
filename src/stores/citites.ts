import { acceptHMRUpdate, defineStore } from 'pinia';
import { ICity } from '../types';

interface State {
  cities: Array<ICity>;
}

export const useCities = defineStore('cities', {
  state: () => {
    return {
      cities: [],
    } as State;
  },
  getters: {
    getCity: (state) => {
      return state.cities;
    },
  },
  actions: {
    setCity(city: ICity): void {
      this.cities.push(city);
    },
    deleteCity(city: number): void {
      this.cities.splice(city, 1);
    },
    updateList(value: ICity[]): void {
      this.cities = value;
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCities, import.meta.hot));
