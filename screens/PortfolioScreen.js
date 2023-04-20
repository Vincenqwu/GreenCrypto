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
import { displayBalance } from "../components/helper/balance";

const PortfolioScreen = () => {
  const currentUser = auth.currentUser;

  const [cash, setCash] = useState(0);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showFundInput, setShowFundInput] = useState(false); // required
  // query db
  const [portfolio, setPortfolio] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [portfolioId, setPortfolioId] = useState(null);
  // calculate balance
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [profit, setProfit] = useState(-200);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const unsubscribeActivities = onSnapshot(
      query(
        collection(firestore, "activities"),
        where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setActivities([]);
        } else {
          let docs = [];
          // update activities array
          querySnapshot.docs.forEach((snap) => {
            docs.push({ ...snap.data(), id: snap.id });
          });
          setActivities(docs);
        }
        setLoading(false);
      },
      (error) => {
        console.log("onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribeActivities();
    };
  }, []);

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
            $ {displayBalance(cash) + "+cryptos"}
          </Text>
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
          portfolioId={portfolioId}
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

export default PortfolioScreen;
