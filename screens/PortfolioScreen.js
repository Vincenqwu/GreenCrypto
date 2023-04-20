import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import WatchList from "../components/WatchList";
import styles from "../styles/styles";
import PortfolioList, {
  FundButton,
  PortfolioTab,
} from "../components/PortfolioList";
import { Colors } from "../styles/Color";
import AddFundField, { BalanceList } from "../components/AddFundField";
import { auth, firestore } from "../Firebase/firebase-setup";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { createPortfolio } from "../Firebase/firebaseHelper";

const Portfolio = () => {
  const currentUser = auth.currentUser;

  const [cash, setCash] = useState(0);
  const [cashAdded, setCashAdded] = useState(0);
  const [profit, setProfit] = useState(-200);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showFundInput, setShowFundInput] = useState(false); // required
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [portfolio, setPortfolio] = useState(null);
  const [profileId, setProfileId] = useState(null);

  const handleAddFunds = () => {
    setShowFundInput(true);
  };

  useEffect(() => {
    if (portfolio) {
      const availableFund = parseFloat(portfolio.cash);
      const totalBalance = availableFund + "?";
      setCash(availableFund);
    }
  }, [portfolio]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "portfolios"),
        where("uid", "==", currentUser.uid)
      ),
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          console.log("no profile data");
          let newPortfolio = {
            uid: currentUser.uid,
            fund: 0,
            cash: 0,
            cryptos: [],
          };
          if (!profileId)
            try {
              await createPortfolio(currentUser.uid);
            } catch (error) {
              console.log("create portfolio error: ", error);
            }
        } else {
          let newPortfolio = null;
          let snap = querySnapshot.docs.at(0);

          newPortfolio = snap.data();
          setPortfolio(newPortfolio);
          setProfileId(snap.id);
        }
      },
      (error) => {
        console.log("portfolio onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [portfolio]);

  return (
    <View style={styles.portContainer}>
      <View style={styles.balanceWrapper}>
        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceLabel}>Total Balance:</Text>
          <Text style={styles.totalBalanceValue}>$ {cash + "+cryptos"}</Text>
        </View>
        {!showFundInput && <FundButton addFund={handleAddFunds} />}
      </View>
      <BalanceList
        profit={profit}
        availableFund={cash}
        currentBalance={currentBalance}
      />
      {showFundInput && (
        <AddFundField
          portfolioId={profileId}
          portfolio={portfolio}
          setShowFundInput={setShowFundInput}
        />
      )}
      <PortfolioTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "portfolio" ? (
        <PortfolioList styles={styles.list} />
      ) : (
        <WatchList styles={styles.list} />
      )}
    </View>
  );
};

export default Portfolio;
