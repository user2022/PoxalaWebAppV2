import { BookOpen, Info, MessageCircle, Smile, Swords, Wand2, Zap } from 'lucide-vue-next'

export const navigationItems = [
  {
    id: 'home',
    label: 'Runes',
    icon: Swords,
    color: 'text-orange-400',
    description: 'Browse and build decks'
  },
  {
    id: 'abilities',
    label: 'Abilities',
    icon: Zap,
    color: 'text-yellow-400',
    description: 'Special powers and spells'
  },
  {
    id: 'rune-creator',
    label: 'Rune Creator',
    icon: Wand2,
    color: 'text-blue-400',
    description: 'Create custom runes'
  },
  {
    id: 'saved-decks',
    label: 'Saved Decks',
    icon: BookOpen,
    color: 'text-green-400',
    description: 'Your deck collection'
  }
]

export const utilityItems = [
  {
    id: 'useful-info',
    label: 'Information',
    icon: Info,
    color: 'text-gray-400',
    description: 'Game guides and help'
  },
  {
    id: 'discord',
    label: 'XD',
    icon: Smile,
    color: 'text-yellow-400',
    description: 'funny'
  },
  {
    id: 'discord',
    label: 'Discord',
    icon: MessageCircle,
    color: 'text-indigo-400',
    description: 'Join our community',
    external: true,
    href: 'https://discord.gg/tnNyXYX8Wd'
  }
]
