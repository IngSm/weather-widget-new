<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useCities } from '@/stores/citites.ts';

  import dayjs from 'dayjs';
  import momentjs from 'moment-timezone';

  import Celcius from '@/assets/svgs/celcius.svg';

  const store = useCities();

  const props = defineProps<{
    i: number;
  }>();

  const time = ref(dayjs().format('ddd DD MMM YYYY HH:mm:ss'));
  const timeZones = [];
  const gottenCity = store.getCity;

  const makeClock = (): void => {
    let tz = gottenCity[props.i].weather.timezone;
    let date = new Date(new Date().getTime() + tz * 1000);
    time.value = date.toUTCString();
  };

  onMounted(() => {
    setInterval(() => {
      makeClock();
    }, 1000);
    timeZones.push(
      momentjs.tz.zonesForCountry(gottenCity[props.i].weather.sys.country, true)
    );
  });

  const returnStyle = (): string => {
    if (gottenCity[props.i].weather.main.temp.toFixed(0) < 0) {
      return 'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);';
    } else if (gottenCity[props.i].weather.main.temp.toFixed(0) < 10) {
      return 'background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);';
    } else if (gottenCity[props.i].weather.main.temp.toFixed(0) > 10) {
      return 'background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);';
    } else {
      return '';
    }
  };
</script>

<template>
  <div :style="returnStyle()" class="main">
    <div class="drop-menu">
      <div class="drop-menu__icon drop-menu__item">
        <img class="icon" src="@/assets/svgs/settings.svg" alt="settings" />
        <img
          class="icon second__icon"
          src="@/assets/svgs/drag_whole.svg"
          alt="drag"
        />
      </div>
      <div
        class="drop-menu__text drop-menu__item bold"
        v-text="
          `${gottenCity[i].weather.name}, ${gottenCity[i].weather.sys.country}`
        "
      />
    </div>
    <div class="temp-block mt">
      <div class="temp-block__left">
        <div class="text" v-text="gottenCity[i].weather.weather[0].main" />
        <div class="text">
          Feels:
          {{ gottenCity[i].weather.main.feels_like.toFixed(0) }}
          <img :src="Celcius" alt="" />
        </div>
      </div>
      <div class="temp-block__right">
        <div
          :style="{
            backgroundImage: `url(http://openweathermap.org/img/w/${gottenCity[i].weather.weather[0].icon}.png)`,
          }"
          class="weather-icon"
        />
        <div class="temp-block__text">
          {{ gottenCity[i].weather.main.temp.toFixed(0) }}
          <img :src="Celcius" alt="" />
        </div>
      </div>
    </div>
    <div class="clock-block">
      <div v-text="time" />
    </div>
  </div>
</template>

<style scoped>
  .text {
    text-transform: capitalize;
  }

  .second__icon {
    margin-left: 10px;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  .weather-icon {
    width: 40px;
    height: 1.9em;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .temp-block__right {
    width: 50%;
  }

  .temp-block__left {
    width: 50%;
    text-align: left;
    padding-bottom: 2px;
    box-sizing: border-box;
  }

  .temp-block__text {
    font-size: 24px;
  }

  .text-block__left {
    width: 45%;
  }

  .text-block__right {
    width: 60%;
  }

  .text_marginL {
    margin-left: 5px;
  }

  .spclI {
    height: 20px;
  }
</style>
