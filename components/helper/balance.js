import { Alert } from "react-native";
import { updatePortfolio } from "../../Firebase/firebaseHelper";

export const updatePortfolioWhenBuy = async (
  portfolio,
  portfolioId,
  coinId,
  amount,
  cost
) => {
  let cryptosList = increaseCryptoHolds(portfolio, coinId, amount);
  let difference = parseFloat(cost) * -1;
  console.log("cost difference", difference);
  await updatePortfoliosCryptosList(
    portfolio,
    portfolioId,
    cryptosList,
    difference
  );
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
  cryptosList,
  difference
) => {
  const newPortfolio = {
    ...portfolio,
    cryptos: cryptosList,
    cash: parseFloat(portfolio.cash) + difference,
  };
  console.log("difference", difference);
  try {
    await updatePortfolio(portfolioId, newPortfolio);
  } catch (err) {
    console.log("update portfolio error: ", err);
  }
};

export const reduceCashToBuy = (portfolio, amount, price) => {
  let moneyRequired = amount * price;
  if (portfolio.cash < moneyRequired) {
    throw new Error("Not enough cash to buy");
  }

  const newPortfolio = {
    ...portfolio,
    cash: portfolio.cash - amount,
  };
  return newPortfolio;
};

export const calculateCryptosValue = (portfolio, priceList) => {
  let totalValue = 0;
  portfolio.cryptos.forEach((crypto) => {
    const coinId = crypto.coinId;
    const amount = parseFloat(crypto.amount);
    const coin = priceList?.find((item) => item.id === coinId);
    let price = 404;
    if (coin?.current_price) {
      price = coin.current_price;
    }

    totalValue += amount * price;
  });
  return totalValue;
};

export const insufficientCashAlert = () => {
  Alert.alert(
    "Insufficient cash",
    "You don't have enough cash to buy this crypto",
    [{ text: "OK" }]
  );
  return;
};

export const displayBalance = (balance) => {
  return balance.toFixed(2);
};
