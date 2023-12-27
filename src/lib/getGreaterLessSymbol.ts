export const getGreaterLessSymbol = (val: string) => {
  const gtRegex = /gt/g
  const ltRegex = /lt/g

  if (gtRegex.test(val)) {
    const str = val.split('gt')
    return `> ${str[1]}`
  } else if (ltRegex.test(val)) {
    const str = val.split('lt')
    return `< ${str[1]}`
  }

  return val
}