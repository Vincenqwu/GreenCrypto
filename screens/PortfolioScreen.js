import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import WatchList from "../components/WatchList";
import styles from "../styles/styles";
import PortfolioList, {
  FundButton,
  PortfolioTab,
} from "../components/PortfolioList";
import AddFundField, { BalanceList } from "../components/AddFundField";
import { auth, firestore } from "../Firebase/firebase-setup";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { createPortfolio } from "../Firebase/firebaseHelper";
import {
  calculateCryptosValue,
  displayBalance,
} from "../components/helper/balance";

const PortfolioScreen = () => {
  const currentUser = auth.currentUser;

  const [cash, setCash] = useState(0);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showFundInput, setShowFundInput] = useState(false); // required
  // query db
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioId, setPortfolioId] = useState(null);
  const [portfolioList, setPortfolioList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  // calculate balance
  const [assetsValue, setAssetsValue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const handleAddFunds = () => {
    setShowFundInput(true);
  };

  useEffect(() => {
    if (portfolio) {
      const availableFund = parseFloat(portfolio.cash);
      const cryptoValue = calculateCryptosValue(portfolio, portfolioList);
      const profit = cryptoValue + availableFund - portfolio.fund;

      setProfit(profit);
      setCash(availableFund);
      setAssetsValue(cryptoValue);
      setTotalValue(cryptoValue + availableFund);
    }
  }, [portfolioList]);

  useEffect(() => {
    const unsubscribePortfolio = onSnapshot(
      query(
        collection(firestore, "portfolios"),
        where("uid", "==", currentUser.uid)
      ),
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          try {
            await createPortfolio(currentUser.uid);
          } catch (error) {
            console.log("create portfolio error: ", error);
          }
        } else {
          let newPortfolio = null;
          let snap = querySnapshot.docs.at(0);
          newPortfolio = snap.data();
          setPortfolioId(snap.id);
          setPortfolio(newPortfolio);
        }
      },
      (error) => {
        console.log("portfolio onsnapshot error: ", error);
      }
    );
    return () => {
      if (!currentUser.uid) unsubscribePortfolio();
    };
  }, [currentUser]);

  return (
    <View style={styles.portContainer}>
      <View style={styles.balanceWrapper}>
        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceLabel}>Total Balance:</Text>
          <Text style={styles.totalBalanceValue}>
            $ {displayBalance(totalValue)}
          </Text>
        </View>
        {!showFundInput && <FundButton addFund={handleAddFunds} />}
      </View>
      <BalanceList
        profit={profit}
        availableFund={cash}
        currentBalance={assetsValue}
      />
      {showFundInput && (
        <AddFundField
          portfolioId={portfolioId}
          portfolio={portfolio}
          setShowFundInput={setShowFundInput}
        />
      )}
      <PortfolioTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "portfolio" ? (
        <PortfolioList
          styles={styles.list}
          portfolioList={portfolioList}
          setPortfolioList={setPortfolioList}
        />
      ) : (
        <WatchList
          styles={styles.list}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        />
      )}
    </View>
  );
};

export default PortfolioScreen;
