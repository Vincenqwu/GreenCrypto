import { MAPS_API_KEY } from "@env";
import { updatePortfolio } from "../../Firebase/firebaseHelper";

export const getAddressFromCoords = async (coords) => {
  if (!coords) {
    return "Not located";
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.status === "ZERO_RESULTS") {
      return null;
    }
    const fullAddress = data.results[0].formatted_address;
    console.log(fullAddress);
    const res = fullAddress.split(",")[1];

    return res.trim();
  } catch (err) {
    console.log("fetch address error: ", err);
  }
};

export const constants = {
  location: "Earth",
};

export const isValuePositive = (value) => {
  return value > 0;
};

export const updatePortfolioWhenBuy = async (
  portfolio,
  portfolioId,
  coinId,
  amount
) => {
  let cryptosList = increaseCryptoHolds(portfolio, coinId, amount);
  await updatePortfoliosCryptosList(portfolio, portfolioId, cryptosList);
};

export const updatePortfolioWhenSell = async (
  portfolio,
  portfolioId,
  coinId,
  amount
) => {
  let cryptosList = decreaseCryptoHolds(portfolio, coinId, amount);
  await updatePortfoliosCryptosList(portfolio, portfolioId, cryptosList);
};

const increaseCryptoHolds = (portfolio, coinId, amount) => {
  const cryptosList = portfolio.cryptos;
  const index = cryptosList.findIndex((crypto) => crypto.coinId === coinId);

  if (index >= 0) {
    cryptosList[index].amount =
      parseFloat(amount) + parseFloat(cryptosList[index].amount);
  } else {
    cryptosList.push({ coinId: coinId, amount: amount });
  }
  return cryptosList;
};

const decreaseCryptoHolds = (portfolio, coinId, amount) => {
  const cryptosList = portfolio.cryptos;
  const index = cryptosList.findIndex((crypto) => crypto.coinId === coinId);

  if (index >= 0) {
    let newAmount = parseFloat(cryptosList[index].amount) - parseFloat(amount);
    if (newAmount < 0) {
      throw new Error("Not enough crypto to sell");
    } else if (newAmount === 0) {
      cryptosList.splice(index, 1);
    } else {
      cryptosList[index].amount = newAmount;
    }
  } else {
    throw new Error("Not enough crypto to sell");
  }
  return cryptosList;
};

const updatePortfoliosCryptosList = async (
  portfolio,
  portfolioId,
  cryptosList
) => {
  const newPortfolio = {
    ...portfolio,
    cryptos: cryptosList,
  };
  try {
    await updatePortfolio(portfolioId, newPortfolio);
  } catch (err) {
    console.log("update portfolio error: ", err);
  }
};
