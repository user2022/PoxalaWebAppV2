import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AbilitiesView from '@/views/AbilitiesView.vue'
import RuneMakerView from '@/views/RuneMakerView.vue'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'
import UsefulInformation from '@/views/UsefulInformation.vue'
import DiscordView from '@/views/DiscordView.vue'

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
      meta: { title: 'Poxala' }
      // beforeEnter: (to, from, next) => resetRuneOnNav(next)
    },
    {
      path: '/abilities',
      name: 'abilities',
      component: AbilitiesView,
      meta: { title: 'Poxala - Abilities' }
    },
    {
      path: '/rune-creator',
      name: 'rune-creator',
      component: RuneMakerView,
      meta: { title: 'Poxala - Rune Creator' }
      // beforeEnter: (to, from, next) => resetRuneOnNav(next)
    },
    {
      path: '/useful-info',
      name: 'useful-info',
      component: UsefulInformation,
      meta: { title: 'Poxala - Useful Info' }
    },
    {
      path: '/discord',
      name: 'discord',
      component: DiscordView,
      meta: { title: 'Poxala - Discord' }
    }
  ]
})

export default router
