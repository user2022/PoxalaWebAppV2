<script lang="ts" setup>
import { Sparkles, XCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import Modal from '@/components/shared/Modal.vue'
import type { FavoriteRune } from '@/types/FavoriteRune'

const poxApi = import.meta.env.VITE_POXAPI

const showFavorites = ref<boolean>(false)

const favorites = ref<FavoriteRune[]>([])

const setShowFavorites = (val: boolean) => {
  const favs = localStorage.getItem('savedRunes')
  if (favs) {
    favorites.value = JSON.parse(favs)
  }

  showFavorites.value = val
}

const removeFromFavorites = (index: number) => {
  favorites.value.splice(index, 1)
  localStorage.setItem('savedRunes', JSON.stringify(favorites.value))
}

const setNewPath = (path: string) => {
  location.href = location.protocol + '//' + location.host + path
}
</script>

<template>
  <template v-if="!showFavorites">
    <div class="right-0 top-40 fixed z-50">
      <div
        class="cursor-pointer px-6 py-4 bg-alpha-700/50 rounded-l-full text-neutral-100 flex flex-row items-center gap-3"
        @click="setShowFavorites(true)"
      >
        <Sparkles :size="22" :stroke-width="1.5" />
        <span>Favorites</span>
      </div>
    </div>
  </template>
  <template v-else>
    <Modal :close-modal="setShowFavorites" header="Favorite Runes">
      <template v-if="favorites.length > 0">
        <div class="h-60 flex flex-col gap-2 overflow-y-scroll px-1.5">
          <template v-for="(item, index) in favorites" :key="item.name + index">
            <div
              :class="`cursor-pointer px-3 py-1.5 border bg-alpha-700/20 border-alpha-600 rounded-md text-alpha-100 hover:bg-alpha-700/50 :border-alpha-400 h-16`"
              @click="setNewPath(item.path)"
            >
              <div class="flex flex-row items-center justify-between">
                <div class="flex flex-row items-center gap-2">
                  <img
                    :src="`${poxApi}/images/runes/idols/${item.sprite}.gif`"
                    alt="rune-idol"
                    class="idol h-12 w-auto"
                  />
                  <div class="flex flex-col gap-2">
                    <h2 class="text-alpha-100">{{ item.name }}</h2>
                    <p class="text-alpha-400 text-xs">
                      {{ item.champName }} - <span class="italic">{{ item.date }}</span>
                    </p>
                  </div>
                </div>
                <div class="p-1 rounded-full hover:bg-black/20" @click="removeFromFavorites(index)">
                  <XCircle :size="24" :stroke-width="1.5" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <h2 class="text-neutral-200">You have no saved runes</h2>
      </template>
    </Modal>
  </template>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #aeacac;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #6f6a6a;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
