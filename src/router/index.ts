import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AbilitiesView from '@/views/AbilitiesView.vue'
import RuneMakerView from '@/views/RuneMakerView.vue'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'
import UsefulInformation from '@/views/UsefulInformation.vue'
import DiscordView from '@/views/DiscordView.vue'
import DeckView from '@/views/DeckView.vue'
import SavedDecksView from '@/views/SavedDecksView.vue'

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
    },
    {
      path: '/saved-decks',
      name: 'saved-decks',
      component: SavedDecksView,
      meta: { title: 'Poxala - Saved Decks' }
    },
    {
      path: '/deck',
      name: 'deck',
      component: DeckView,
      meta: { title: 'Poxala - Deck View' }
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

router.beforeEach((to, from, next) => {
  const defaultTitle = 'My Vue App' // Default title if not specified in meta
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  } else {
    document.title = defaultTitle
  }
  next()
})
export default router
