<script lang="ts" setup>
import Modal from '@/components/shared/Modal.vue'
import InputNormal from '@/components/form/normal/InputNormal.vue'
import { ref } from 'vue'
import { useDeckStore } from '@/stores/deck'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/stores/storeRoute'
import { saveDeckToStorage } from '@/lib/util/saveDeckToStorage'
import { getFactionAmountFromDeck } from '@/lib/getFactionAmountFromDeck'

interface Props {
  closeModal: (val: boolean) => void
  showModal: boolean
}

const { closeModal, showModal } = defineProps<Props>()

const deckName = ref<string>('')
const user = ref<string>('')
const errMsg = ref<string>('')

const setErrMsg = (val: string) => {
  errMsg.value = val
}

const setUser = (val: string) => {
  user.value = val
}
const setDeckName = (val: string) => {
  deckName.value = val
}

const deckStore = useDeckStore()
const { deckHolder } = storeToRefs(deckStore)

const router = useRouter()

const onClose = () => {
  closeModal(false)
  setUser('')
  setDeckName('')
  setErrMsg('')
}

const routeStore = useRouteStore()

const onSave = async () => {
  // Check there is no nulls in the deckHolder
  if (deckHolder.value.includes(null)) {
    setErrMsg('Your deck must contain 30 runes.')
    return
  }

  if (deckName.value === '') {
    setErrMsg('Deck name cannot be empty.')
    return
  }

  if (user.value === '') {
    setErrMsg('Username cannot be empty.')
    return
  }

  if (user.value.length > 25) {
    setErrMsg('Username cannot be longer than 25 characters.')
    return
  }

  if (deckName.value.length > 25) {
    setErrMsg('Deck name cannot be longer than 25 characters.')
    return
  }

  let urlString = ''

  for (let i = 0; i < deckHolder.value.length; i++) {
    const rune = deckHolder.value[i]
    if (!rune) {
      setErrMsg('Unable to parse rune')
      return
    }
    let type = 'c'
    if (rune.type === 'champ') {
      type = 'c'
    } else if (rune.type === 'spell') {
      type = 's'
    } else if (rune.type === 'equip') {
      type = 'e'
    } else if (rune.type === 'relic') {
      type = 'r'
    }

    urlString += type + ':' + rune.id + '-'
  }

  await router.push('/deck')

  const combined = `?deckName=${deckName.value}&user=${user.value}&runes=${urlString.slice(0, -1)}`

  const facs = getFactionAmountFromDeck(deckHolder.value)

  saveDeckToStorage(combined, deckName.value, user.value, facs)

  routeStore.addToQuery({ name: 'deckName', value: deckName.value })
  routeStore.addToQuery({ name: 'user', value: user.value })
  routeStore.addToQuery({ name: 'runes', value: urlString.slice(0, -1) }, true)
}
</script>

<template>
  <template v-if="showModal">
    <Modal :close-modal="onClose" :on-save="onSave" header="Save Deck">
      <InputNormal :input="deckName" :set-input="setDeckName" label="Deck Name" name="deck-name" />
      <InputNormal :input="user" :set-input="setUser" label="Username" name="username" />
      <p v-if="errMsg" class="text-red-600 text-xs">* {{ errMsg }}</p>
    </Modal>
  </template>
</template>

<style scoped></style>
