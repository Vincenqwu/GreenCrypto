import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CoinsList from "./CoinsList";
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

const PortfolioList = ({ portfolioList, setPortfolioList }) => {
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribePortfolio = onSnapshot(
      query(
        collection(firestore, "portfolios"),
        where("uid", "==", currentUser?.uid)
      ),
      async (querySnapshot) => {
        if (!querySnapshot.empty) {
          let coinList = null;
          let snap = querySnapshot.docs.at(0);
          coinList = snap.data();

          let cryptosList = coinList.cryptos;
          const ids = cryptosList.map((item) => item.coinId);
          // console.log("ids: ", ids);
          if (ids.length === 0) {
            setPortfolioList([]);
            return;
          }
          getCryptoDetailsBasedOnIds(ids).then((res) => {
            setPortfolioList(res);
          });
        }
      },
      (error) => {
        console.log("portfolio onsnapshot error: ", error);
      }
    );
    return () => {
      if (!currentUser.uid) return;
      unsubscribePortfolio();
    };
  }, [currentUser]);

  return (
    <View>
      <Text>PortfolioList</Text>
      <CoinsList coins={portfolioList} />
    </View>
  );
};

export default PortfolioList;
export { FundButton, PortfolioTab };
