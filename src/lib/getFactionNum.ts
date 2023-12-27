export const getFactionNum = (faction?: string | null): string => {
  let num = ''

  if (!faction) return num

  switch (faction) {
    case 'Forsaken Wastes':
      num = '1'
      break
    case 'Forglar Swamp':
      num = '6'
      break
    case 'Underdepths':
      num = '4'
      break
    case 'Savage Tundra':
      num = '7'
      break
    case 'Shattered Peaks':
      num = '8'
      break
    case 'Ironfist Stronghold':
      num = '3'
      break
    case 'Sundered Lands':
      num = '2'
      break
    case "K'thir Forest":
      num = '5'
      break
  }

  return num
}
