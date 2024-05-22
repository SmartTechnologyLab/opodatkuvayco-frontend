import { formatDateForCurrencyExchange } from '@/helpers/formatDate'
import type { ICurrencyExchange } from './type'

const NBU_API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange'

export const getCurrencyExchange = async (currency: string, date: string): Promise<ICurrencyExchange> => {
  try {
    const formattedDate = formatDateForCurrencyExchange(date)

    const response = await fetch(`${NBU_API_URL}?valcode=${currency}&date=${formattedDate}&json`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error('Could not get the currency exhcange data')
    }

    return data[0]
  } catch (error) {
    throw new Error('Error while fetching currency exchange')
  }
}
