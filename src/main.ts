import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

import momentjs from 'moment-timezone';

const app = createApp(App);

app.config.globalProperties = {
  date: {
    get() {
      return dayjs;
    },
  },
  moment: {
    get() {
      return momentjs;
    },
  },
};

app.use(createPinia());
app.mount('#app');
