import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import WatchList from "../components/WatchList";
import styles from "../styles/styles";
import { isValuePositive } from "../components/helper/service";
import PortfolioList from "../components/PortfolioList";

const Portfolio = () => {
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [profit, setProfit] = useState(-200);
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <View style={styles.portContainer}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Current Balance:</Text>
        <Text style={styles.headerValue}>$ {currentBalance}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          {isValuePositive(profit) ? "Profit" : "Loss"}:
        </Text>
        <Text
          style={[
            styles.headerValue,
            isValuePositive(profit) ? styles.green : styles.red,
          ]}
        >
          {isValuePositive(profit) ? "+" : "-"}$ {Math.abs(profit)}
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
      {activeTab === "portfolio" ? <PortfolioList /> : <WatchList />}
    </View>
  );
};

export default Portfolio;
