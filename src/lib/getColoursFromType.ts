export const getColoursFromType = (type: string): string => {
  switch (type) {
    case 'champ':
      return 'bg-gray-900 border-3 border-red-700 dark:border-red-700'
    case 'spell':
      return 'bg-blue-400 border-3 border-blue-400 dark:border-blue-400'
    case 'relic':
      return 'bg-green-300 border-3 border-green-300 dark:border-green-300'
    case 'equip':
      return 'bg-purple-600 border-3 border-purple-600 dark:border-purple-600'
    default:
      return ''
  }
}
