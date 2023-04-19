import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CoinsList from "./CoinsList";
import cryptos from "../assets/data/cryptos";
import styles from "../styles/styles";
import { Colors } from "../styles/Color";

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
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(cryptos);

  return (
    <View>
      <Text>PortfolioList</Text>
      <CoinsList coins={cryptos} />
    </View>
  );
};

export default PortfolioList;
export { FundButton, PortfolioTab };
