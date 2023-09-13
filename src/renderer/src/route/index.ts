import { createRouter, createWebHashHistory } from 'vue-router'
import configRoutes from '../modules/config/route'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'config-home' }
    },
    ...configRoutes
  ]
})

export default router
