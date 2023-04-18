<script setup lang="ts">
  import { ref, computed } from 'vue';

  import draggable from 'vuedraggable';
  import axios from 'axios';
  import { useCities } from '../stores/citites';
  import { ICity } from '../types';

  const store = useCities();

  const drag = ref(false);
  const city = ref('');
  const alert = ref(false);

  const emit = defineEmits<{
    (close: 'close'): void;
  }>();

  const myList = computed<ICity[]>({
    get() {
      return store.getCity;
    },

    set(val) {
      store.updateList(val);
    },
  });

  const addCity = (x: string): void => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=d23058db742db7cb6fe57437bd010579`
      )
      .then((res) => {
        store.setCity({ city: x, weather: res.data });
        emit('close');
      })
      .catch((e) => {
        console.error(e);
        alert.value = true;
      });
    city.value = '';
  };
</script>

<template>
  <div class="main">
    <div class="scroll">
      <draggable
        :list="myList"
        item-key="city"
        class="display"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <div class="display__item mt-5">
            <div>
              <img
                class="icon_small icon_drag"
                src="@/assets/svgs/drag.svg"
                alt=""
              />
            </div>
            <div class="display__text">
              {{ element.city }}
            </div>
            <div>
              <img
                class="icon_small icon_bin"
                src="@/assets/svgs/bin.svg"
                alt=""
                @click="store.deleteCity(index)"
              />
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div class="input-block mt">
      <input
        v-model="city"
        placeholder="Add city..."
        type="text"
        @keypress.enter="addCity(city)"
      />
      <button class="btn btn_mLeft" @click="addCity(city)">Add</button>
    </div>
    <Alert v-if="alert" class="modal" @hide="alert = false" />
  </div>
</template>

<style scoped>
  .main {
    position: relative;
  }

  .scroll {
    overflow: hidden;
    border-radius: 20px;
  }

  .display::-webkit-scrollbar {
    width: 7px;
    border-radius: 10px;
  }

  .display::-webkit-scrollbar-thumb {
    background: #3399ff;
    border-radius: 20px;
  }

  .display__item:hover {
    background: #e0e0e0;
    cursor: grab;
  }

  .display__item:last-child {
    margin-bottom: 5px;
  }

  .display__text {
    color: black;
  }

  .icon_drag {
    cursor: grab;
    margin-left: 15px;
  }

  .icon_bin {
    margin-right: 15px;
    z-index: 10;
  }

  .modal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
