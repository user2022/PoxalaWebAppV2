export const displayRange = (minRng?: number, maxRng?: number): string => {
  if (!minRng) return ''

  if (minRng === maxRng) {
    return `${minRng}`
  } else {
    return `${minRng}-${maxRng}`
  }
}