import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PortfoliList from "../components/PortfoliList";
import WatchList from "../components/WatchList";
import styles from "../styles/styles";

const Portfolio = () => {
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [profit, setProfit] = useState(100);
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <View style={styles.portContainer}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Current Balance:</Text>
        <Text style={styles.headerValue}>$ {currentBalance}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          {profit > 0 ? "Profit" : "Loss"}:
        </Text>
        <Text
          style={[styles.headerValue, profit > 0 ? styles.green : styles.red]}
        >
          {profit > 0 ? "+" : "-"}$ {Math.abs(profit)}
        </Text>
      </View>
      <View style={styles.tabs}>
        <View
          style={[
            styles.tabItem,
            activeTab === "portfolio" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={styles.tabLabel}
            onPress={() => setActiveTab("portfolio")}
          >
            Portfolio
          </Text>
        </View>
        <View
          style={[
            styles.tabItem,
            activeTab === "watchlist" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={styles.tabLabel}
            onPress={() => setActiveTab("watchlist")}
          >
            WatchList
          </Text>
        </View>
      </View>
      {activeTab === "portfolio" ? <PortfoliList /> : <WatchList />}
    </View>
  );
};

export default Portfolio;
