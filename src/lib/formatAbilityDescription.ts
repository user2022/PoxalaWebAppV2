export const formatAbilityDescription = (inputString: string): string => {
  // Define a regular expression pattern to match and capture <ability>...</ability> tags
  const allTagsRegex = /<[^<>]*>/gi

  // Use replace() with the regular expression to extract the values and remove the tags
  const resultString = inputString.replace(allTagsRegex, (match, group1) => group1)

  return resultString
}
