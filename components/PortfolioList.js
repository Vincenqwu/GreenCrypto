import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CoinsList from "./CoinsList";
import cryptos from "../assets/data/cryptos";
import styles from "../styles/styles";
import { Colors } from "../styles/Color";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, firestore } from "../Firebase/firebase-setup";
import { getCryptoDetailsBasedOnIds } from "../api/request";

const FundButton = ({ addFund }) => {
  return (
    <TouchableOpacity
      style={[styles.portfolioBtn, { backgroundColor: Colors.oragne }]}
    >
      <Text style={styles.portfolioBtnLabel} onPress={addFund}>
        Fund +
      </Text>
    </TouchableOpacity>
  );
};

const PortfolioTab = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabs}>
      <View
        style={[
          styles.tabItem,
          activeTab === "portfolio" ? styles.activeTab : null,
        ]}
      >
        <Text style={styles.tabLabel} onPress={() => setActiveTab("portfolio")}>
          Portfolio
        </Text>
      </View>
      <View
        style={[
          styles.tabItem,
          activeTab === "watchlist" ? styles.activeTab : null,
        ]}
      >
        <Text style={styles.tabLabel} onPress={() => setActiveTab("watchlist")}>
          WatchList
        </Text>
      </View>
    </View>
  );
};

const PortfolioList = () => {
  const currentUser = auth.currentUser;

  const [portfolioList, setPortfolioList] = useState([]);
  const [detailsList, setDetailsList] = useState([]);
  // console.log(cryptos);
  useEffect(() => {
    const unsubscribePortfolio = onSnapshot(
      query(
        collection(firestore, "portfolios"),
        where("uid", "==", currentUser.uid)
      ),
      async (querySnapshot) => {
        if (!querySnapshot.empty) {
          let coinList = null;
          let snap = querySnapshot.docs.at(0);
          coinList = snap.data();
          console.log("portfolio list: ", coinList);
          setPortfolioList(coinList.cryptos);
          console.log("portfolioList: ", portfolioList);
          console.log("detailsList: ", detailsList);
        }
      },
      (error) => {
        console.log("portfolio onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribePortfolio();
    };
  }, [currentUser]);

  useEffect(() => {
    console.log("length: ", portfolioList);
    if (portfolioList.length > 0) {
      const ids = portfolioList.map((item) => item.coinId);
      console.log("ids: ", ids);
      getCryptoDetailsBasedOnIds(ids).then((res) => {
        console.log("res: ", res);
        setDetailsList(res);
      });
    }
  }, [portfolioList]);

  return (
    <View>
      <Text>PortfolioList</Text>
      <CoinsList coins={cryptos} />
    </View>
  );
};

export default PortfolioList;
export { FundButton, PortfolioTab };
