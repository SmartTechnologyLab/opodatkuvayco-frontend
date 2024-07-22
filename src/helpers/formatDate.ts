const UA_FORMAT = 'uk-UA'

export const formatDateForCurrencyExchange = (date: string) => {
  const dateObj = new Date(date)

  const intl = new Intl.DateTimeFormat(UA_FORMAT, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj)

  const formattedDate = intl.split('.').reverse().join('')

  return formattedDate
}
