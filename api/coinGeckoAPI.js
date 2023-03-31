import axios from "axios"

export async function getCryptoData(coinId) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    return response.data
  }
  catch (error) {
    console.log(error)
  }

}