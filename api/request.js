import axios from "axios";

export async function getCryptoData(coinId) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export const getAllCryptosData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=false`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMarketData = async (pageNumber = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCryptoHistoricalData = async (coinId, dateRange) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${dateRange}&interval=hourly`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
