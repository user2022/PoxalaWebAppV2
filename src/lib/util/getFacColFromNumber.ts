export const getFacColFromNumber = (factionNumber: number | string): string => {
  switch (+factionNumber) {
    case 1:
      return '75, 75, 75' // Forsaken Wastes (Gray)
    case 2:
      return '194, 178, 128' // Sundered Lands (Khaki)
    case 3:
      return '125, 125, 125' // Ironfist Stronghold (Stone Gray)
    case 4:
      return '224, 60, 49' // Underdepths (Red)
    case 5:
      return '60, 110, 71' // K'thir Forest (Green)
    case 6:
      return '85, 107, 47' // Forglar Swamp (Swamp Green)
    case 7:
      return '127, 210, 246' // Savage Tundra (Ice Blue)
    case 8:
      return '210, 180, 140' // Shattered Peaks (Clay)
    default:
      return '255, 255, 255'
  }
}
