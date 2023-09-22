import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import pages from 'virtual:generated-pages'
import App from './App.vue'

import './styles/reset.css'
import './styles/main.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(),
  routes: pages,
})

createApp(App)
  .use(router)
  .mount('#app')

