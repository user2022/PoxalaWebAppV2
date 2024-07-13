export interface FilterColours {
  borderCol: string
  bgCol: string
  textCol: string
}

export const getColoursForFilter = (name: string): FilterColours => {
  switch (name) {
    case 'type':
      return {
        borderCol: 'border-green-500',
        bgCol: 'bg-green-700/50',
        textCol: 'text-green-100'
      }
    case 'ability':
      return {
        borderCol: 'border-blue-500',
        bgCol: 'bg-blue-700/50',
        textCol: 'text-blue-100'
      }
    case 'faction':
      return {
        borderCol: 'border-indigo-500',
        bgCol: 'bg-indigo-700/50',
        textCol: 'text-indigo-100'
      }
    case 'rarity':
      return {
        borderCol: 'border-purple-500',
        bgCol: 'bg-purple-700/50',
        textCol: 'text-purple-100'
      }
    case 'race':
      return {
        borderCol: 'border-yellow-500',
        bgCol: 'bg-yellow-700/50',
        textCol: 'text-yellow-100'
      }
    case 'class':
      return {
        borderCol: 'border-red-500',
        bgCol: 'bg-red-700/50',
        textCol: 'text-red-100'
      }
    case 'noraCost':
      return {
        borderCol: 'border-cyan-500',
        bgCol: 'bg-cyan-700/50',
        textCol: 'text-cyan-100'
      }
    case 'speed':
      return {
        borderCol: 'border-fuchsia-500',
        bgCol: 'bg-fuchsia-700/50',
        textCol: 'text-fuchsia-100'
      }
    case 'name':
      return {
        borderCol: 'border-rose-500',
        bgCol: 'bg-rose-700/50',
        textCol: 'text-rose-100'
      }
    case 'condition':
      return {
        borderCol: 'border-orange-500',
        bgCol: 'bg-orange-700/50',
        textCol: 'text-orange-100'
      }
    default:
      return {
        borderCol: 'border-indigo-500',
        bgCol: 'bg-indigo-700/50',
        textCol: 'text-indigo-100'
      }
  }
}
