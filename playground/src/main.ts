import { createApp } from 'vue'
import './style.css'
import pages from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

console.log(pages)
const router = createRouter({
  history: createWebHistory(),
  routes: pages,
})

createApp(App)
  .use(router)
  .mount('#app')

