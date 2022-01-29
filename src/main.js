import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

import App from './App.vue'

import store from './store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Mount app into index.html
createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
