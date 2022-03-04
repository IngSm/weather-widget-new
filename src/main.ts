import { createApp } from 'vue'
import App from './App.vue'

import { store } from '@/store/store.ts'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

import momentjs from 'moment-timezone'

const app = createApp(App)

app.config.globalProperties = {
  date: {
    get() {
      return dayjs
    },
  },
  moment: {
    get() {
      return momentjs
    },
  },
}

app.use(store)
app.mount('#app')
