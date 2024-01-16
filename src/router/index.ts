import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AbilitiesView from '@/views/AbilitiesView.vue'
import RuneMakerView from '@/views/RuneMakerView.vue'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'

const resetRuneOnNav = (next: NavigationGuardNext) => {
  const { setRune } = useRuneStore()
  const { removeAllQueries } = useRouteStore()

  setRune(null)
  removeAllQueries()

  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => resetRuneOnNav(next)
    },
    {
      path: '/abilities',
      name: 'abilities',
      component: AbilitiesView
    },
    {
      path: '/rune-creator',
      name: 'rune-creator',
      component: RuneMakerView,
      beforeEnter: (to, from, next) => resetRuneOnNav(next)
    }
  ]
})

export default router
