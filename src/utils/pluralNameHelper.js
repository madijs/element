export const pickPlural = (number, pluralForms) => {
  if (
    number % 10 === 0 ||
    number % 10 >= 5 ||
    (number % 100 >= 11 && number % 100 <= 15)
  ) {
    return pluralForms[0]
  }
  if (number % 10 === 1) {
    return pluralForms[1]
  }
  return pluralForms[2]
}

export const pluralFormsBuilder = (pluralForms) => {
  const pf = pluralForms
  return {
    pick: (number) => pickPlural(number, pf),
  }
}
