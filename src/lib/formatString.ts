export const formatString = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')
