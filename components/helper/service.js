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

const addCrypto = (portfolio, coinId, amount) => {
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

export const updatePortfolioWhenBuy = async (
  portfolio,
  portfolioId,
  coinId,
  amount
) => {
  // const cryptoslist = portfolio.cryptos;
  // const index = cryptoslist.findIndex((crypto) => crypto.coinId === coinId);

  // if (index >= 0) {
  //   cryptos[index].amount += amount;
  // } else {
  //   cryptos.push({ coinId: coinId, amount: amount });
  // }
  let cryptosList = addCrypto(portfolio, coinId, amount);
  console.log("cryptosList", cryptosList);
  const newPortfolio = {
    ...portfolio,
    cryptos: cryptosList,
  };
  await updatePortfolio(portfolioId, newPortfolio);
};
