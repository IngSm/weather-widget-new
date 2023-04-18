<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  import { useCities } from './stores/citites';
  import { ICity, IGeo } from './types';

  import axios from 'axios';

  import geo from './api/geo.ts';

  const store = useCities();

  const open = ref(false);

  const gottenCitites = store.getCity;

  const update = (): void => {
    let cities: Array<ICity> = [];
    gottenCitites.forEach((item: ICity) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${`${item.city}`}&units=metric&APPID=d23058db742db7cb6fe57437bd010579`
        )
        .then((res) => {
          cities.push({ city: `${item.city}`, weather: res.data });
        })
        .catch((e) => {
          console.error(e);
        });
    });
    store.updateList(cities);
  };

  onMounted(() => {
    if (gottenCitites.length == 0) {
      geo().then((res: IGeo) => {
        let city = res.city.name;
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${`${city}`}&units=metric&APPID=d23058db742db7cb6fe57437bd010579`
          )
          .then((res) => {
            store.setCity({ city: city, weather: res.data });
          })
          .catch((e) => {
            console.error(e);
          });
      });
    }
    setInterval(() => {
      update();
    }, 3600000);
  });

  const openMenu = (): void => {
    open.value = !open.value;
  };
</script>

<template>
  <div id="app">
    <div v-for="(item, key) in gottenCitites" :key="key" class="container">
      <div class="clickable" @click="openMenu()" />
      <div class="second__click" />
      <div class="mt"><Main :i="key" /></div>
    </div>
    <div style="height: 20px" />
    <Choice v-if="open" @close="open = false" />
  </div>
</template>

<style lang="scss">
  @use './assets/styles/main.scss';
</style>
